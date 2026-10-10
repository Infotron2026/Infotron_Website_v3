"""Vercel serverless entry point for the Infotron FastAPI backend.

Vercel's @vercel/python runtime auto-detects ASGI apps exported as `app`.
This file simply re-exports the FastAPI app defined in /backend/server.py
so we don't have to duplicate any code.

Routing: this file is named [...path].py which makes it a catch-all for
`/api/*` requests. Vercel preserves the original request path, so FastAPI
sees `/api/jobs`, `/api/admin/login`, etc. — matching its existing routes.
"""
import os
import sys

# Add /backend to the import path so `from server import app` resolves.
# includeFiles in vercel.json ensures /backend/*.py is bundled with this
# function.
_BACKEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backend')
if _BACKEND_DIR not in sys.path:
    sys.path.insert(0, _BACKEND_DIR)

from server import app  # noqa: E402, F401  (Vercel reads this symbol)
