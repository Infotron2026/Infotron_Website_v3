// Lightweight API client for Infotron jobs/admin endpoints.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = adminAuth.get();
    if (!token) throw new ApiError(401, 'Not authenticated');
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return null;
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    throw new ApiError(res.status, (data && (data.detail || data.message)) || res.statusText);
  }
  return data;
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
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
