// Lightweight API client for Infotron jobs/admin endpoints.
const RAW_BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || '').trim();
const BACKEND_URL = RAW_BACKEND_URL.replace(/\/+$/, ''); // strip trailing slash
const BASE = `${BACKEND_URL}/api`;

const ADMIN_TOKEN_KEY = 'infotron_admin_token';

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
  // Fail fast with a precise message if the production build was shipped
  // without REACT_APP_BACKEND_URL — this is the single most common prod bug
  // and the one that previously surfaced as "Something went wrong. Try again."
  if (!BACKEND_URL) {
    throw new ApiError(
      0,
      'Backend URL is not configured. Set REACT_APP_BACKEND_URL in the deployment environment variables and redeploy.',
      { url: `${BASE}${path}` }
    );
  }

  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = adminAuth.get();
    if (!token) throw new ApiError(401, 'Not authenticated', { url: `${BASE}${path}` });
    headers.Authorization = `Bearer ${token}`;
  }

  const fullUrl = `${BASE}${path}`;
  let res;
  try {
    res = await fetch(fullUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    // Fetch itself threw — this is a network / CORS / DNS / mixed-content failure
    throw new ApiError(
      0,
      `Could not reach the backend at ${BACKEND_URL}. This usually means the backend is not deployed, the URL is wrong, CORS is blocking the request, or the production page is HTTPS while the backend is HTTP.`,
      { url: fullUrl, cause: err }
    );
  }

  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const detail = (data && (data.detail || data.message)) || res.statusText || 'Unknown error';
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
