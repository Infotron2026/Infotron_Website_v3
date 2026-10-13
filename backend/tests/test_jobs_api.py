"""Backend tests for Infotron jobs/admin API — health, auth, CRUD, idempotency."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@infotronsolutions.com"
ADMIN_PASSWORD = "Infotron2026_XS1keb4G30sTpg"


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=10)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="session")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


@pytest.fixture(scope="session")
def created_ids():
    ids = []
    yield ids
    # cleanup: delete anything we created
    tok = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}).json()["token"]
    h = {"Authorization": f"Bearer {tok}"}
    for jid in ids:
        requests.delete(f"{API}/admin/jobs/{jid}", headers=h)


# ─── Health ───────────────────────────────────────────────────────────────
def test_health_ok():
    r = requests.get(f"{API}/health", timeout=10)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert data["mongo"] == "ok"


def test_public_jobs_200():
    r = requests.get(f"{API}/jobs", timeout=10)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ─── Auth ─────────────────────────────────────────────────────────────────
def test_login_wrong_password():
    r = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=10)
    assert r.status_code == 401


def test_admin_me(auth_headers):
    r = requests.get(f"{API}/admin/me", headers=auth_headers, timeout=10)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL


def test_admin_jobs_requires_auth():
    r = requests.get(f"{API}/admin/jobs", timeout=10)
    assert r.status_code in (401, 403)


# ─── CRUD ─────────────────────────────────────────────────────────────────
def _job_payload(title_suffix: str, published: bool = True, rid: str | None = None):
    p = {
        "title": f"TEST QA Toast Role {title_suffix}",
        "location": "Remote",
        "work_mode": "Remote",
        "employment_type": "Full-time",
        "description": "Automated backend test job.",
        "published": published,
    }
    if rid:
        p["client_request_id"] = rid
    return p


def test_create_published_job_and_persist(auth_headers, created_ids):
    payload = _job_payload(f"pub-{uuid.uuid4().hex[:6]}", published=True)
    r = requests.post(f"{API}/admin/jobs", json=payload, headers=auth_headers, timeout=15)
    assert r.status_code == 201, r.text
    job = r.json()
    created_ids.append(job["id"])
    assert job["title"] == payload["title"]
    assert job["published"] is True
    assert "slug" in job and job["slug"]

    # appears on public /jobs
    public = requests.get(f"{API}/jobs", timeout=10).json()
    assert any(j["id"] == job["id"] for j in public)

    # fetch by slug publicly
    r2 = requests.get(f"{API}/jobs/{job['slug']}", timeout=10)
    assert r2.status_code == 200
    assert r2.json()["id"] == job["id"]


def test_create_draft_not_on_public(auth_headers, created_ids):
    payload = _job_payload(f"draft-{uuid.uuid4().hex[:6]}", published=False)
    r = requests.post(f"{API}/admin/jobs", json=payload, headers=auth_headers, timeout=15)
    assert r.status_code == 201
    job = r.json()
    created_ids.append(job["id"])
    assert job["published"] is False

    public = requests.get(f"{API}/jobs", timeout=10).json()
    assert not any(j["id"] == job["id"] for j in public)
    # public slug lookup must 404 for drafts
    r2 = requests.get(f"{API}/jobs/{job['slug']}", timeout=10)
    assert r2.status_code == 404


# ─── Idempotency (client_request_id) ─────────────────────────────────────
def test_duplicate_client_request_id_returns_same_job(auth_headers, created_ids):
    rid = str(uuid.uuid4())
    payload = _job_payload(f"idem-{uuid.uuid4().hex[:6]}", published=True, rid=rid)

    r1 = requests.post(f"{API}/admin/jobs", json=payload, headers=auth_headers, timeout=15)
    assert r1.status_code == 201, r1.text
    j1 = r1.json()
    created_ids.append(j1["id"])

    r2 = requests.post(f"{API}/admin/jobs", json=payload, headers=auth_headers, timeout=15)
    assert r2.status_code in (200, 201), r2.text
    j2 = r2.json()
    assert j2["id"] == j1["id"], "Same client_request_id must return the same job id"

    # Verify only one record was created with this rid, via admin list
    all_jobs = requests.get(f"{API}/admin/jobs", headers=auth_headers, timeout=10).json()
    matching = [j for j in all_jobs if j.get("title") == payload["title"]]
    assert len(matching) == 1, f"Expected 1 job, found {len(matching)}"


# ─── Update / Delete ──────────────────────────────────────────────────────
def test_update_and_delete_job(auth_headers, created_ids):
    payload = _job_payload(f"upd-{uuid.uuid4().hex[:6]}", published=True)
    r = requests.post(f"{API}/admin/jobs", json=payload, headers=auth_headers, timeout=15)
    jid = r.json()["id"]

    r2 = requests.put(f"{API}/admin/jobs/{jid}", json={"published": False}, headers=auth_headers, timeout=10)
    assert r2.status_code == 200
    assert r2.json()["published"] is False

    r3 = requests.delete(f"{API}/admin/jobs/{jid}", headers=auth_headers, timeout=10)
    assert r3.status_code == 204

    r4 = requests.get(f"{API}/admin/jobs/{jid}", headers=auth_headers, timeout=10)
    assert r4.status_code == 404
    # don't append to created_ids since already deleted
