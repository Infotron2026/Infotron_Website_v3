import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, MapPin, Briefcase, Clock, Loader2, Upload, FileText, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { jobsApi, ApiError } from '../lib/api';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrerqvrb';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx'];

const JobDetail = () => {
  const { jobId } = useParams(); // route param is the job slug now
  const { toast } = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Application form state
  const fileInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', message: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await jobsApi.getBySlug(jobId);
        if (!cancelled) setJob(data);
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 404) setNotFound(true);
          else toast({ title: 'Could not load job', description: err.message, variant: 'destructive' });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    if (!file) { setResumeFile(null); return; }
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(ext)) {
      setFileError('Please upload a PDF, DOC, or DOCX file.');
      setResumeFile(null); e.target.value = ''; return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be less than 5MB.');
      setResumeFile(null); e.target.value = ''; return;
    }
    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onApply = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!resumeFile) { setFileError('Please upload your resume.'); return; }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('_subject', `Job Application – ${job.title} – ${form.name}`);
      fd.append('form_type', 'Job Application');
      fd.append('job_title', job.title);
      fd.append('job_slug', job.slug);
      fd.append('job_location', job.location);
      fd.append('work_mode', job.work_mode);
      fd.append('employment_type', job.employment_type);
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('linkedin', form.linkedin || 'Not provided');
      fd.append('message', form.message || '');
      fd.append('resume', resumeFile);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd,
      });
      if (!res.ok) throw new Error('Submission failed');
      toast({ title: 'Application submitted', description: 'Our team will review your profile and reach out shortly.' });
      setForm({ name: '', email: '', phone: '', linkedin: '', message: '' });
      removeFile();
    } catch (err) {
      toast({
        title: 'Submission error',
        description: 'There was an error submitting your application. Please try again or email syno@infotronsolutions.com',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A192F] pt-28 pb-20">
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-center gap-2 text-slate-400 py-20">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading role…
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen bg-[#0A192F] pt-28 pb-20">
        <SEO title="Job not found" description="This position is no longer available." path="/careers" noIndex />
        <div className="max-w-[900px] mx-auto px-6 text-center py-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Position no longer available</h1>
          <p className="text-slate-400 mb-8">This role has been filled or unpublished. Explore our other open positions.</p>
          <Link to="/careers">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:from-blue-500 hover:to-violet-400">
              View all open positions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const description = job.description || '';
  const requirements = job.requirements || '';

  return (
    <div className="min-h-screen bg-[#0A192F] pt-24 pb-20">
      <SEO
        title={job.title}
        description={`${job.title} — ${job.location} • ${job.work_mode} • ${job.employment_type}`}
        path={`/careers/${job.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": job.title,
          "description": description,
          "datePosted": job.created_at,
          "employmentType": job.employment_type,
          "jobLocationType": job.work_mode === 'Remote' ? 'TELECOMMUTE' : undefined,
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Infotron Solutions",
            "sameAs": "https://infotronsolutions.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": { "@type": "PostalAddress", "addressLocality": job.location }
          }
        }}
      />

      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
        <Link to="/careers" className="inline-flex items-center text-blue-300 hover:text-violet-300 text-sm mb-6">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to all positions
        </Link>

        {/* Role summary */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0E1B36]/80 backdrop-blur-sm p-6 sm:p-8 mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3" data-testid="job-detail-title">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{job.work_mode}</span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{job.employment_type}</span>
            {job.experience ? (<><span className="text-slate-600">•</span><span>{job.experience}</span></>) : null}
          </div>
        </div>

        {/* Description + Requirements */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0E1B36]/80 backdrop-blur-sm p-6 sm:p-8 mb-6 space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">About this role</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{description}</p>
          </div>
          {requirements && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">Requirements</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{requirements}</p>
            </div>
          )}
        </div>

        {/* Apply */}
        <div id="apply" className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0E1B36] to-[#0A1428] p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Apply for this position</h2>
          <p className="text-sm text-slate-400 mb-6">Your application will reach the Infotron hiring team at <span className="text-blue-300">syno@infotronsolutions.com</span>.</p>

          <form onSubmit={onApply} className="space-y-4" data-testid="apply-form">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Full name *</label>
                <Input name="name" required value={form.name} onChange={onFormChange}
                       className="bg-[#0A192F]/50 border-slate-700 text-white" data-testid="apply-name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Email *</label>
                <Input name="email" type="email" required value={form.email} onChange={onFormChange}
                       className="bg-[#0A192F]/50 border-slate-700 text-white" data-testid="apply-email" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Phone *</label>
                <Input name="phone" required value={form.phone} onChange={onFormChange}
                       className="bg-[#0A192F]/50 border-slate-700 text-white" data-testid="apply-phone" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">LinkedIn URL</label>
                <Input name="linkedin" value={form.linkedin} onChange={onFormChange}
                       placeholder="https://linkedin.com/in/…"
                       className="bg-[#0A192F]/50 border-slate-700 text-white" data-testid="apply-linkedin" />
              </div>
            </div>

            {/* Resume upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">Resume / CV *</label>
              {!resumeFile ? (
                <label className="flex items-center justify-center w-full h-24 rounded-md border-2 border-dashed border-slate-700 bg-[#0A192F]/50 cursor-pointer hover:border-blue-500/60 transition-colors">
                  <div className="text-center">
                    <Upload className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <span className="text-xs text-slate-400">Click to upload PDF, DOC, or DOCX (max 5MB)</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={onFileChange}
                    className="hidden"
                    data-testid="apply-resume"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between rounded-md border border-slate-700 bg-[#0A192F]/50 px-3 py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-blue-300 flex-shrink-0" />
                    <span className="text-sm text-white truncate" data-testid="apply-resume-name">{resumeFile.name}</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button type="button" onClick={removeFile} aria-label="Remove file"
                          className="text-slate-400 hover:text-white" data-testid="apply-resume-remove">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {fileError && <p className="text-sm text-red-400 mt-1.5" data-testid="apply-file-error">{fileError}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">Message</label>
              <Textarea name="message" rows={4} value={form.message} onChange={onFormChange}
                        placeholder="Anything you'd like our team to know (optional)…"
                        className="resize-none bg-[#0A192F]/50 border-slate-700 text-white" data-testid="apply-message" />
            </div>

            <Button type="submit" disabled={submitting} size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:from-blue-500 hover:to-violet-400"
                    data-testid="apply-submit">
              {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting application…</>) : 'Submit application'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
