# Vercel entry point: re-exports the FastAPI app from /backend/server.py.
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backend'))

REQUIRED_ENV = ['MONGO_URL', 'DB_NAME', 'ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH', 'JWT_SECRET']


def _load_app():
    try:
        from server import app as backend_app
        return backend_app
    except Exception as exc:
        # Startup failed: serve a safe JSON diagnostic (env var names only, never values).
        from fastapi import FastAPI
        from fastapi.responses import JSONResponse

        error = {
            "detail": "Backend failed to start",
            "error_type": type(exc).__name__,
            "missing_env": [k for k in REQUIRED_ENV if not os.environ.get(k)],
        }
        fallback = FastAPI()

        @fallback.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
        async def _startup_failed(path: str):
            return JSONResponse(status_code=503, content=error)

        return fallback


app = _load_app()
