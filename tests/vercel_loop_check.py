import asyncio, os, sys, secrets, bcrypt, uuid
from dotenv import dotenv_values
os.environ.update({k: v for k, v in dotenv_values('/app/backend/.env').items() if v})
PW = secrets.token_urlsafe(12)
os.environ['ADMIN_PASSWORD_HASH'] = bcrypt.hashpw(PW.encode(), bcrypt.gensalt(12)).decode()
sys.path.insert(0, '/app/api')
import importlib.util
s = importlib.util.spec_from_file_location('idx', '/app/api/index.py'); m = importlib.util.module_from_spec(s); s.loader.exec_module(m)
import httpx


def call(method, path, **kw):
    async def go():
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=m.app), base_url='http://t') as c:
            return await c.request(method, path, **kw)
    return asyncio.run(go())  # fresh event loop per request, like Vercel


print('health x3:', [call('GET', '/api/health').json()['mongo'] for _ in range(3)])
print('jobs x3:', [call('GET', '/api/jobs').status_code for _ in range(3)])
tok = call('POST', '/api/admin/login', json={'email': os.environ['ADMIN_EMAIL'], 'password': PW}).json()['token']
H = {'Authorization': f'Bearer {tok}'}
rid = str(uuid.uuid4())
body = {'title': 'Idempotency Test Role', 'location': 'Remote', 'work_mode': 'Remote', 'employment_type': 'Full-time',
        'description': 'test', 'published': True, 'client_request_id': rid}
r1 = call('POST', '/api/admin/jobs', json=body, headers=H); r2 = call('POST', '/api/admin/jobs', json=body, headers=H)
print('create:', r1.status_code, 'retry:', r2.status_code, 'same id:', r1.json()['id'] == r2.json()['id'])
print('client_request_id hidden in response:', 'client_request_id' not in r1.json())
n = sum(1 for j in call('GET', '/api/admin/jobs', headers=H).json() if j['title'] == 'Idempotency Test Role')
print('copies in DB:', n)
slug = r1.json()['slug']
print('on public /jobs:', any(j['slug'] == slug for j in call('GET', '/api/jobs').json()), '| by slug:', call('GET', f'/api/jobs/{slug}').status_code)
r3 = call('POST', '/api/admin/jobs', json={**body, 'client_request_id': None, 'title': 'No Key Role'}, headers=H)
print('create without key:', r3.status_code)
for j in (r1.json(), r3.json()):
    print('delete:', call('DELETE', f"/api/admin/jobs/{j['id']}", headers=H).status_code)
print('validation error:', call('POST', '/api/admin/jobs', json={'title': ''}, headers=H).status_code)
