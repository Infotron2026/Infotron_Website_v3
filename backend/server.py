from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request, UploadFile, File, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
from urllib.parse import quote
import os
import re
import asyncio
import base64
import hashlib
import hmac
import httpx
import uuid
import logging
import bcrypt
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Literal, Optional
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ─── Env / Mongo ───────────────────────────────────────────────────────────
mongo_url = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']
_mongo = {'loop': None, 'client': None}


def get_db():
    # Vercel runs each request in a new event loop; Motor clients are loop-bound.
    loop = asyncio.get_running_loop()
    if _mongo['loop'] is not loop:
        if _mongo['client'] is not None:
            _mongo['client'].close()
        _mongo['client'] = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
        _mongo['loop'] = loop
    return _mongo['client'][DB_NAME]

ADMIN_EMAIL = os.environ['ADMIN_EMAIL']
ADMIN_PASSWORD_HASH = os.environ['ADMIN_PASSWORD_HASH']
JWT_SECRET = os.environ['JWT_SECRET']
JWT_EXPIRY_HOURS = int(os.environ.get('JWT_EXPIRY_HOURS', '24'))
JWT_ALGO = 'HS256'

app = FastAPI()
api_router = APIRouter(prefix="/api")
bearer_scheme = HTTPBearer(auto_error=True)


# ─── Models ────────────────────────────────────────────────────────────────
WorkMode = Literal['Remote', 'Hybrid', 'Onsite']


class JobBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    location: str = Field(..., min_length=1, max_length=200)
    work_mode: WorkMode
    employment_type: str = Field(..., min_length=1, max_length=80)
    experience: Optional[str] = Field(None, max_length=120)
    description: str = Field(..., min_length=1)
    requirements: Optional[str] = None
    published: bool = True


class JobCreate(JobBase):
    client_request_id: Optional[str] = Field(None, max_length=100)


class JobUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    location: Optional[str] = Field(None, min_length=1, max_length=200)
    work_mode: Optional[WorkMode] = None
    employment_type: Optional[str] = Field(None, min_length=1, max_length=80)
    experience: Optional[str] = Field(None, max_length=120)
    description: Optional[str] = Field(None, min_length=1)
    requirements: Optional[str] = None
    published: Optional[bool] = None


class Job(JobBase):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    created_at: str
    updated_at: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    token: str
    expires_at: str


# ─── Helpers ───────────────────────────────────────────────────────────────
def _slugify(text: str) -> str:
    s = re.sub(r'[^a-zA-Z0-9\s-]', '', text).strip().lower()
    s = re.sub(r'[\s_-]+', '-', s)
    return s[:120] or 'job'


async def _ensure_unique_slug(base: str, exclude_id: Optional[str] = None) -> str:
    slug = base
    i = 2
    while True:
        q = {'slug': slug}
        if exclude_id:
            q['id'] = {'$ne': exclude_id}
        exists = await get_db().jobs.find_one(q, {'_id': 0, 'id': 1})
        if not exists:
            return slug
        slug = f"{base}-{i}"
        i += 1


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _issue_token() -> LoginResponse:
    exp = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS)
    payload = {'sub': ADMIN_EMAIL, 'role': 'admin', 'exp': exp}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)
    return LoginResponse(token=token, expires_at=exp.isoformat())


def require_admin(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGO])
        if payload.get('role') != 'admin':
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Not an admin token')
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')


# ─── Health ────────────────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "Infotron API"}


REQUIRED_ENV = ['MONGO_URL', 'DB_NAME', 'ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH', 'JWT_SECRET']


@api_router.get("/health")
async def health():
    env = {k: bool(os.environ.get(k)) for k in REQUIRED_ENV}
    env['ADMIN_PASSWORD_HASH_format_ok'] = bool(re.fullmatch(r'\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}', ADMIN_PASSWORD_HASH))
    try:
        await asyncio.wait_for(get_db().command('ping'), timeout=5)
        mongo = 'ok'
    except Exception as e:
        mongo = f'error: {type(e).__name__}'
    return {"status": "ok" if mongo == 'ok' and all(env.values()) else "degraded", "env": env, "mongo": mongo,
            "resume_storage": {"read_write_token": bool(os.environ.get('BLOB_READ_WRITE_TOKEN')),
                               "store_id": bool(os.environ.get('BLOB_STORE_ID'))}}


# ─── Admin auth ────────────────────────────────────────────────────────────
@api_router.post("/admin/login", response_model=LoginResponse)
async def admin_login(payload: LoginRequest):
    if payload.email.lower() != ADMIN_EMAIL.lower():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    ok = bcrypt.checkpw(payload.password.encode(), ADMIN_PASSWORD_HASH.encode())
    if not ok:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    return _issue_token()


@api_router.get("/admin/me")
async def admin_me(user=Depends(require_admin)):
    return {"email": user.get('sub'), "role": user.get('role')}


# ─── Public jobs (published only) ──────────────────────────────────────────
@api_router.get("/jobs", response_model=List[Job])
async def list_published_jobs():
    cursor = get_db().jobs.find({'published': True}, {'_id': 0}).sort('created_at', -1)
    return await cursor.to_list(500)


@api_router.get("/jobs/{slug}", response_model=Job)
async def get_published_job(slug: str):
    doc = await get_db().jobs.find_one({'slug': slug, 'published': True}, {'_id': 0})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Job not found')
    return doc


# ─── Admin jobs CRUD (auth required) ───────────────────────────────────────
@api_router.get("/admin/jobs", response_model=List[Job])
async def admin_list_jobs(user=Depends(require_admin)):
    cursor = get_db().jobs.find({}, {'_id': 0}).sort('created_at', -1)
    return await cursor.to_list(1000)


@api_router.get("/admin/jobs/{job_id}", response_model=Job)
async def admin_get_job(job_id: str, user=Depends(require_admin)):
    doc = await get_db().jobs.find_one({'id': job_id}, {'_id': 0})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Job not found')
    return doc


@api_router.post("/admin/jobs", response_model=Job, status_code=status.HTTP_201_CREATED)
async def admin_create_job(payload: JobCreate, user=Depends(require_admin)):
    jobs = get_db().jobs
    rid = payload.client_request_id
    if rid:
        # Retries with the same client_request_id return the job already created.
        await jobs.create_index('client_request_id', unique=True, partialFilterExpression={'client_request_id': {'$type': 'string'}})
        existing = await jobs.find_one({'client_request_id': rid}, {'_id': 0})
        if existing:
            return existing
    now = _now_iso()
    slug = await _ensure_unique_slug(_slugify(payload.title))
    doc = payload.model_dump(exclude_none=False)
    if not rid:
        doc.pop('client_request_id', None)
    doc.update({
        'id': str(uuid.uuid4()),
        'slug': slug,
        'created_at': now,
        'updated_at': now,
    })
    try:
        await jobs.insert_one(doc)
    except DuplicateKeyError:
        return await jobs.find_one({'client_request_id': rid}, {'_id': 0})
    doc.pop('_id', None)
    return doc


@api_router.put("/admin/jobs/{job_id}", response_model=Job)
async def admin_update_job(job_id: str, payload: JobUpdate, user=Depends(require_admin)):
    existing = await get_db().jobs.find_one({'id': job_id}, {'_id': 0})
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Job not found')
    updates = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None or k in ('experience', 'requirements')}
    # Regenerate slug only if the title changed
    if 'title' in updates and updates['title'] != existing['title']:
        updates['slug'] = await _ensure_unique_slug(_slugify(updates['title']), exclude_id=job_id)
    updates['updated_at'] = _now_iso()
    await get_db().jobs.update_one({'id': job_id}, {'$set': updates})
    merged = {**existing, **updates}
    return merged


@api_router.delete("/admin/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_job(job_id: str, user=Depends(require_admin)):
    result = await get_db().jobs.delete_one({'id': job_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Job not found')
    return None

# ─── Resume uploads (private Vercel Blob store) ────────────────────────────
RESUME_MAX_BYTES = 4 * 1024 * 1024  # Vercel function bodies are capped at 4.5 MB
RESUME_TYPES = {
    '.pdf': ('application/pdf', (b'%PDF',)),
    '.doc': ('application/msword', (b'\xd0\xcf\x11\xe0',)),
    '.docx': ('application/vnd.openxmlformats-officedocument.wordprocessingml.document', (b'PK\x03\x04',)),
}


def _blob_headers(request: Request) -> Optional[dict]:
    # Same credential order as @vercel/blob: OIDC + BLOB_STORE_ID, else BLOB_READ_WRITE_TOKEN.
    oidc = request.headers.get('x-vercel-oidc-token') or os.environ.get('VERCEL_OIDC_TOKEN')
    store_id = os.environ.get('BLOB_STORE_ID', '').removeprefix('store_')
    if oidc and store_id:
        return {'Authorization': f'Bearer {oidc}', 'x-vercel-blob-store-id': store_id}
    rw = os.environ.get('BLOB_READ_WRITE_TOKEN')
    if rw:
        parts = rw.split('_')
        return {'Authorization': f'Bearer {rw}', 'x-vercel-blob-store-id': parts[3] if len(parts) > 3 else ''}
    return None


def _sign(value: str) -> str:
    return hmac.new(JWT_SECRET.encode(), value.encode(), hashlib.sha256).hexdigest()


@api_router.post("/applications/resume")
async def upload_resume(request: Request, file: UploadFile = File(...)):
    auth = _blob_headers(request)
    if not auth:
        raise HTTPException(status_code=503, detail='Resume storage is not configured')
    ext = Path(file.filename or '').suffix.lower()
    if ext not in RESUME_TYPES:
        raise HTTPException(status_code=415, detail='Only PDF, DOC or DOCX files are allowed')
    data = await file.read(RESUME_MAX_BYTES + 1)
    if len(data) > RESUME_MAX_BYTES:
        raise HTTPException(status_code=413, detail='Resume must be 4 MB or smaller')
    content_type, magics = RESUME_TYPES[ext]
    if not data.startswith(magics):
        raise HTTPException(status_code=415, detail='File content does not match its type')

    pathname = f"resumes/{uuid.uuid4()}{ext}"
    async with httpx.AsyncClient(timeout=30) as client:
        res = await client.put(
            f"https://vercel.com/api/blob/?pathname={quote(pathname, safe='/')}",
            content=data,
            headers={
                **auth,
                'x-api-version': '12',
                'x-vercel-blob-access': 'private',
                'x-content-type': content_type,
                'x-add-random-suffix': '1',
            },
        )
    if res.status_code >= 400:
        logger.error('Blob upload failed: HTTP %s %s', res.status_code, res.text[:300])
        raise HTTPException(status_code=502, detail='Resume upload failed')
    blob_url = res.json()['url']
    ref = base64.urlsafe_b64encode(blob_url.encode()).decode().rstrip('=')
    host = request.headers.get('x-forwarded-host') or request.headers.get('host')
    return {'resume_link': f"https://{host}/api/applications/resume/{ref}.{_sign(ref)}"}


@api_router.get("/applications/resume/{signed_ref}")
async def download_resume(signed_ref: str, request: Request):
    ref, _, sig = signed_ref.rpartition('.')
    if not ref or not hmac.compare_digest(sig, _sign(ref)):
        raise HTTPException(status_code=404, detail='Not found')
    blob_url = base64.urlsafe_b64decode(ref + '=' * (-len(ref) % 4)).decode()
    auth = _blob_headers(request) or {}
    async with httpx.AsyncClient(timeout=30) as client:
        res = await client.get(blob_url, headers={'Authorization': auth.get('Authorization', '')})
    if res.status_code != 200:
        raise HTTPException(status_code=404, detail='Not found')
    filename = 'resume' + Path(blob_url.split('?')[0]).suffix
    return Response(content=res.content, media_type=res.headers.get('content-type', 'application/octet-stream'), headers={
        'Content-Disposition': f'attachment; filename="{filename}"',
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
    })




# ─── App wiring ────────────────────────────────────────────────────────────
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    if _mongo['client'] is not None:
        _mongo['client'].close()
