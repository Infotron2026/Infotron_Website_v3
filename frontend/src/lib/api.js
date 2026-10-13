// Lightweight API client for Infotron jobs/admin endpoints.
//
// REACT_APP_BACKEND_URL may be:
//  • an absolute origin (e.g. https://api.example.com) — used in dev and
//    when the frontend is hosted separately from the backend
//  • empty / unset — used when the frontend and backend share the same
//    origin (e.g. deployed together on Vercel as /api/*). In that case
//    requests are made as relative URLs like `/api/jobs`.
const RAW_BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || '').trim();
const BACKEND_URL = RAW_BACKEND_URL.replace(/\/+$/, ''); // strip trailing slash
const BASE = `${BACKEND_URL}/api`;

const ADMIN_TOKEN_KEY = 'infotron_admin_token';
const REQUEST_TIMEOUT_MS = 20000;

export const adminAuth = {
  get() {
    try {
      return sessionStorage.getItem(ADMIN_TOKEN_KEY) || null;
    } catch {
      return null;
    }
  },
  set(token) {
    try {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    } catch {
      /* no-op */
    }
  },
  clear() {
    try {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    } catch {
      /* no-op */
    }
  },
};

export class ApiError extends Error {
  constructor(status, message, { url, cause } = {}) {
    super(message);
    this.status = status;    // 0 = network / CORS / DNS / build-time misconfig
    this.url = url;          // the URL the browser attempted (useful for diagnosis)
    this.cause = cause;      // original error if we're wrapping one
  }
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = adminAuth.get();
    if (!token) throw new ApiError(401, 'Not authenticated', { url: `${BASE}${path}` });
    headers.Authorization = `Bearer ${token}`;
  }

  const fullUrl = `${BASE}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let res;
  try {
    res = await fetch(fullUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new ApiError(0, 'The server took too long to respond. Please try again.', { url: fullUrl, cause: err });
    }
    // Fetch itself threw — this is a network / CORS / DNS / mixed-content failure
    const target = BACKEND_URL || 'same-origin /api';
    throw new ApiError(
      0,
      `Could not reach the backend at ${target}. This usually means the backend is not deployed, the URL is wrong, CORS is blocking the request, or the production page is HTTPS while the backend is HTTP.`,
      { url: fullUrl, cause: err }
    );
  }

  finally {
    clearTimeout(timer);
  }

  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    let detail = data && (data.detail || data.message);
    if (Array.isArray(detail)) detail = detail.map((d) => d.msg).join('; ');
    if (!detail) detail = `Server error (HTTP ${res.status}). Please try again in a moment.`;
    throw new ApiError(res.status, detail, { url: fullUrl });
  }

  return data;
}

// Public
export const jobsApi = {
  listPublished: () => request('/jobs'),
  getBySlug: (slug) => request(`/jobs/${encodeURIComponent(slug)}`),
};

// Admin
export const adminApi = {
  login: (email, password) => request('/admin/login', { method: 'POST', body: { email, password } }),
  me: () => request('/admin/me', { auth: true }),
  listAll: () => request('/admin/jobs', { auth: true }),
  get: (id) => request(`/admin/jobs/${id}`, { auth: true }),
  create: (data) => request('/admin/jobs', { method: 'POST', auth: true, body: data }),
  update: (id, data) => request(`/admin/jobs/${id}`, { method: 'PUT', auth: true, body: data }),
  remove: (id) => request(`/admin/jobs/${id}`, { method: 'DELETE', auth: true }),
};

// Exposed for the admin login page so it can display what URL it tried.
export const getBackendBaseUrl = () => BACKEND_URL;
