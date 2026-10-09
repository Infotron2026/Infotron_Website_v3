import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Loader2, Lock } from 'lucide-react';
import { adminApi, adminAuth, getBackendBaseUrl } from '../lib/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorDetail, setErrorDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorDetail('');
    setSubmitting(true);
    try {
      const res = await adminApi.login(email.trim(), password);
      adminAuth.set(res.token);
      navigate('/admin/jobs', { replace: true });
    } catch (err) {
      // This is an admin-only page (noIndex) so surfacing diagnostic info
      // helps the operator fix misconfiguration without leaking credentials.
      // Note: 'err.message' never contains passwords or JWT secrets.
      if (err.status === 401) {
        setError('Invalid email or password.');
      } else if (err.status === 0) {
        setError('Cannot reach the backend.');
        const base = getBackendBaseUrl() || '(not configured)';
        setErrorDetail(`${err.message} Backend URL in this build: ${base}`);
      } else if (err.status) {
        setError(`Server error (HTTP ${err.status}).`);
        setErrorDetail(err.message || '');
      } else {
        setError('Something went wrong.');
        setErrorDetail(err.message || '');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] pt-28 pb-20">
      <SEO title="Admin Sign In" description="Infotron administrator sign in." path="/admin/login" noIndex />
      <div className="max-w-md mx-auto px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0E1B36]/95 to-[#0A1428]/95 backdrop-blur-sm shadow-[0_30px_80px_-30px_rgba(15,30,80,0.7)] p-8">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl mb-5"
               style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(124,58,237,0.18) 100%)',
                        border: '1px solid rgba(99,137,255,0.25)' }}>
            <Lock className="w-5 h-5 text-blue-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin sign in</h1>
          <p className="text-sm text-slate-400 mb-6">Manage job postings on the Infotron Careers page.</p>

          <form onSubmit={onSubmit} className="space-y-4" data-testid="admin-login-form">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                data-testid="admin-email"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                data-testid="admin-password"
              />
            </div>
            {error && (
              <div
                className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                data-testid="admin-login-error"
              >
                <div className="font-semibold">{error}</div>
                {errorDetail && (
                  <div className="mt-1 text-xs text-red-200/80 break-words" data-testid="admin-login-error-detail">
                    {errorDetail}
                  </div>
                )}
              </div>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:from-blue-500 hover:to-violet-400"
              data-testid="admin-login-submit"
            >
              {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in…</>) : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
