import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, LogOut, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { adminApi, adminAuth, ApiError } from '../lib/api';

const WORK_MODES = ['Remote', 'Hybrid', 'Onsite'];
const EMPLOYMENT_TYPES = ['Full-time', 'Contract', 'C2C', 'Part-time', 'Internship'];

const emptyForm = {
  title: '',
  location: '',
  work_mode: 'Remote',
  employment_type: 'Full-time',
  experience: '',
  description: '',
  requirements: '',
  published: true,
};

const AdminJobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | job object
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const sortedJobs = useMemo(
    () => [...jobs].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
    [jobs]
  );

  const handleAuthError = (err) => {
    if (err instanceof ApiError && err.status === 401) {
      adminAuth.clear();
      navigate('/admin/login', { replace: true });
      return true;
    }
    return false;
  };

  const load = async () => {
    setLoading(true);
    try {
      const list = await adminApi.listAll();
      setJobs(list || []);
    } catch (err) {
      if (!handleAuthError(err)) {
        toast({ title: 'Failed to load jobs', description: err.message, variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminAuth.get()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditing('new');
  };

  const openEdit = (job) => {
    setForm({
      title: job.title,
      location: job.location,
      work_mode: job.work_mode,
      employment_type: job.employment_type,
      experience: job.experience || '',
      description: job.description,
      requirements: job.requirements || '',
      published: job.published,
    });
    setEditing(job);
  };

  const closeEditor = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        experience: form.experience || null,
        requirements: form.requirements || null,
      };
      if (editing === 'new') {
        const created = await adminApi.create(payload);
        setJobs((prev) => [created, ...prev]);
        toast({ title: 'Job created', description: created.title });
      } else {
        const updated = await adminApi.update(editing.id, payload);
        setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
        toast({ title: 'Job updated', description: updated.title });
      }
      closeEditor();
    } catch (err) {
      if (!handleAuthError(err)) {
        toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
      }
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (job) => {
    try {
      const updated = await adminApi.update(job.id, { published: !job.published });
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
      toast({ title: updated.published ? 'Published' : 'Unpublished', description: updated.title });
    } catch (err) {
      if (!handleAuthError(err)) {
        toast({ title: 'Update failed', description: err.message, variant: 'destructive' });
      }
    }
  };

  const removeJob = async (job) => {
    if (!window.confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    try {
      await adminApi.remove(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      toast({ title: 'Job deleted', description: job.title });
    } catch (err) {
      if (!handleAuthError(err)) {
        toast({ title: 'Delete failed', description: err.message, variant: 'destructive' });
      }
    }
  };

  const signOut = () => {
    adminAuth.clear();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0A192F] pt-24 pb-20">
      <SEO title="Admin — Jobs" description="Manage Infotron job postings." path="/admin/jobs" noIndex />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Job postings</h1>
            <p className="text-sm text-slate-400">Create, publish, and manage roles shown on the Careers page.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={openNew}
              className="bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:from-blue-500 hover:to-violet-400"
              data-testid="admin-new-job"
            >
              <Plus className="w-4 h-4 mr-1.5" /> New job
            </Button>
            <Button
              variant="outline"
              onClick={signOut}
              className="bg-white/[0.04] border-white/[0.10] text-slate-300 hover:bg-white/[0.08]"
              data-testid="admin-signout"
            >
              <LogOut className="w-4 h-4 mr-1.5" /> Sign out
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0E1B36]/80 backdrop-blur-sm overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading jobs…
            </div>
          ) : sortedJobs.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              No jobs yet. Click <span className="text-blue-300 font-semibold">New job</span> to create your first posting.
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.05]" data-testid="admin-jobs-list">
              {sortedJobs.map((job) => (
                <li key={job.id} className="px-5 py-4 flex items-center gap-4 flex-wrap" data-testid={`admin-job-${job.id}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                        job.published ? 'text-emerald-200 bg-emerald-500/15 border border-emerald-400/25'
                                       : 'text-amber-200 bg-amber-500/15 border border-amber-400/25'
                      }`}>
                        {job.published ? 'Published' : 'Draft'}
                      </span>
                      <h3 className="text-white font-semibold truncate">{job.title}</h3>
                    </div>
                    <div className="mt-1 text-sm text-slate-400 truncate">
                      {job.location} • {job.work_mode} • {job.employment_type}
                      {job.experience ? ` • ${job.experience}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(job)}
                      className="bg-white/[0.04] border-white/[0.10] text-slate-300 hover:bg-white/[0.08]"
                      data-testid={`admin-toggle-${job.id}`}
                    >
                      {job.published ? <><EyeOff className="w-3.5 h-3.5 mr-1" /> Unpublish</>
                                     : <><Eye className="w-3.5 h-3.5 mr-1" /> Publish</>}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(job)}
                      className="bg-white/[0.04] border-white/[0.10] text-slate-300 hover:bg-white/[0.08]"
                      data-testid={`admin-edit-${job.id}`}
                    >
                      <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeJob(job)}
                      className="bg-red-500/10 border-red-400/20 text-red-200 hover:bg-red-500/20"
                      data-testid={`admin-delete-${job.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Editor modal ───────────────────────────────────────────────── */}
      {editing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" data-testid="admin-editor-modal">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0E1B36] shadow-2xl">
            <button
              type="button"
              onClick={closeEditor}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
              data-testid="admin-editor-close"
            >
              <X className="w-4 h-4" />
            </button>
            <form onSubmit={onSave} className="p-6 sm:p-8 space-y-4" data-testid="admin-editor-form">
              <h2 className="text-xl font-bold text-white mb-1">
                {editing === 'new' ? 'Create a new job' : 'Edit job'}
              </h2>
              <p className="text-sm text-slate-400 mb-4">Fields marked with * are required.</p>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Job title *</label>
                <Input name="title" required value={form.title} onChange={onChange}
                       className="bg-[#0A192F]/50 border-slate-700 text-white" data-testid="editor-title" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">Location *</label>
                  <Input name="location" required value={form.location} onChange={onChange}
                         placeholder="e.g. Remote (US), London, Mumbai"
                         className="bg-[#0A192F]/50 border-slate-700 text-white" data-testid="editor-location" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">Experience</label>
                  <Input name="experience" value={form.experience} onChange={onChange}
                         placeholder="e.g. 5+ years"
                         className="bg-[#0A192F]/50 border-slate-700 text-white" data-testid="editor-experience" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">Work mode *</label>
                  <select name="work_mode" value={form.work_mode} onChange={onChange}
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-[#0A192F]/50 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                          data-testid="editor-work-mode">
                    {WORK_MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">Employment type *</label>
                  <select name="employment_type" value={form.employment_type} onChange={onChange}
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-[#0A192F]/50 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                          data-testid="editor-employment-type">
                    {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Job description *</label>
                <Textarea name="description" required value={form.description} onChange={onChange} rows={6}
                          placeholder="Role summary, responsibilities, scope…"
                          className="resize-none bg-[#0A192F]/50 border-slate-700 text-white" data-testid="editor-description" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Requirements</label>
                <Textarea name="requirements" value={form.requirements} onChange={onChange} rows={5}
                          placeholder="Skills, tools, certifications…"
                          className="resize-none bg-[#0A192F]/50 border-slate-700 text-white" data-testid="editor-requirements" />
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" name="published" checked={form.published} onChange={onChange}
                       className="w-4 h-4 rounded accent-blue-500" data-testid="editor-published" />
                Publish to Careers page
              </label>

              <div className="flex items-center gap-2 pt-2">
                <Button type="button" variant="outline" onClick={closeEditor}
                        className="bg-white/[0.04] border-white/[0.10] text-slate-300 hover:bg-white/[0.08]">
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}
                        className="bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:from-blue-500 hover:to-violet-400"
                        data-testid="editor-save">
                  {saving ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>) : (editing === 'new' ? 'Create job' : 'Save changes')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
