import asyncio, os, sys, json, importlib.util
from dotenv import dotenv_values
os.environ.update({k: v for k, v in dotenv_values('/app/backend/.env').items() if v})
os.environ['BLOB_READ_WRITE_TOKEN'] = 'vercel_blob_rw_TESTSTORE_secret'
import httpx

store, calls = {}, []
_Real = httpx.AsyncClient


def handler(req: httpx.Request):
    calls.append(req)
    if req.method == 'PUT':
        path = req.url.params['pathname']
        url = f'https://teststore.private.blob.vercel-storage.com/{path}'
        store[url] = (req.content, req.headers['x-content-type'])
        return httpx.Response(200, json={'url': url, 'pathname': path})
    if req.headers.get('authorization') != 'Bearer vercel_blob_rw_TESTSTORE_secret':
        return httpx.Response(403)
    body, ct = store.get(str(req.url), (None, None))
    return httpx.Response(200, content=body, headers={'content-type': ct}) if body else httpx.Response(404)


class MockClient(_Real):
    def __init__(self, *a, **kw):
        kw.setdefault('transport', httpx.MockTransport(handler))
        super().__init__(*a, **kw)


spec = importlib.util.spec_from_file_location('idx', '/app/api/index.py'); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
import server
server.httpx.AsyncClient = MockClient


def call(method, path, **kw):
    async def go():
        async with _Real(transport=httpx.ASGITransport(app=m.app), base_url='http://t') as c:
            return await c.request(method, path, headers={'host': 'www.infotronsolutions.com'}, **kw)
    return asyncio.run(go())


pdf = b'%PDF-1.4\n%dummy resume\n%%EOF\n'
r = call('POST', '/api/applications/resume', files={'file': ('Jane Doe CV.pdf', pdf, 'application/pdf')})
print('upload pdf:', r.status_code, r.json())
put = calls[-1]
print('blob PUT headers ok:', put.headers['x-api-version'] == '12', put.headers['x-vercel-blob-access'] == 'private',
      put.headers['x-content-type'] == 'application/pdf', put.headers['x-vercel-blob-store-id'] == 'TESTSTORE',
      put.url.host == 'vercel.com', put.content == pdf)
link = r.json()['resume_link']
print('link on production host:', link.startswith('https://www.infotronsolutions.com/api/applications/resume/'))
path = link.split('www.infotronsolutions.com')[1]
d = call('GET', path)
print('download:', d.status_code, d.content == pdf, d.headers.get('content-disposition'), d.headers.get('cache-control'))
print('tampered sig:', call('GET', path[:-3] + 'abc').status_code)
print('wrong ext:', call('POST', '/api/applications/resume', files={'file': ('cv.exe', b'MZ', 'application/octet-stream')}).status_code)
print('fake pdf:', call('POST', '/api/applications/resume', files={'file': ('cv.pdf', b'hello', 'application/pdf')}).status_code)
print('too big:', call('POST', '/api/applications/resume', files={'file': ('cv.pdf', b'%PDF' + b'0' * (4 * 1024 * 1024), 'application/pdf')}).status_code)
print('docx ok:', call('POST', '/api/applications/resume', files={'file': ('cv.docx', b'PK\x03\x04rest', 'application/octet-stream')}).status_code)
os.environ.pop('BLOB_READ_WRITE_TOKEN')
print('no storage configured:', call('POST', '/api/applications/resume', files={'file': ('cv.pdf', pdf, 'application/pdf')}).status_code)
print('jobs still ok:', call('GET', '/api/jobs').status_code)
