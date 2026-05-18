import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2, Upload, FileText, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrerqvrb';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx'];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  
  const [formType, setFormType] = useState('client');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    linkedin: '',
    service: '',
    jobId: '',
    message: ''
  });

  useEffect(() => {
    const type = searchParams.get('type');
    const service = searchParams.get('service');
    const jobId = searchParams.get('job');
    
    if (type) setFormType(type);
    if (service) setFormData(prev => ({ ...prev, service }));
    if (jobId) setFormData(prev => ({ ...prev, jobId }));
  }, [searchParams]);

  // Hide the floating CTA dock once the form section is in view
  const [showFloatingCta, setShowFloatingCta] = useState(true);
  useEffect(() => {
    const el = document.getElementById('contact-form');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowFloatingCta(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToForm = (type) => {
    setFormType(type);
    requestAnimationFrame(() => {
      const el = document.getElementById('contact-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    
    if (!file) {
      setResumeFile(null);
      return;
    }
    
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      setFileError('Please upload a PDF, DOC, or DOCX file.');
      setResumeFile(null);
      e.target.value = '';
      return;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be less than 5MB.');
      setResumeFile(null);
      e.target.value = '';
      return;
    }
    
    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Validate resume for candidate form
    if (formType === 'candidate' && !resumeFile) {
      setFileError('Please upload your resume.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use FormData for file uploads
      const formDataToSend = new FormData();
      
      if (formType === 'client') {
        formDataToSend.append('_subject', 'Infotron Website Enquiry');
        formDataToSend.append('form_type', 'Client Enquiry');
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('company', formData.company);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('service_interest', formData.service || 'Not specified');
        formDataToSend.append('message', formData.message);
      } else {
        formDataToSend.append('_subject', 'Job Application – Infotron Solutions');
        formDataToSend.append('form_type', 'Candidate Application');
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('linkedin', formData.linkedin || 'Not provided');
        formDataToSend.append('job_title_or_id', formData.jobId || 'General Application');
        formDataToSend.append('message', formData.message);
        
        // Append resume file
        if (resumeFile) {
          formDataToSend.append('resume', resumeFile);
        }
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formDataToSend
      });

      if (response.ok) {
        // Success
        toast({
          title: "Success!",
          description: formType === 'client' 
            ? "Your enquiry has been submitted successfully."
            : "Your application has been submitted successfully.",
        });
        
        // Clear form fields
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          linkedin: '',
          service: formData.service,
          jobId: formData.jobId,
          message: ''
        });
        setResumeFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again or email us directly at contact@infotronsolutions.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      <SEO
        title="Contact Infotron Solutions"
        description="Talk to our delivery team about Managed Services, Staff Augmentation, Business Consulting, or Capital Projects engagements. Offices in the USA, United Kingdom, Canada, and India."
        path="/contact"
        keywords="contact Infotron, IT services contact, enterprise technology consultation, hire engineers, staff augmentation inquiry"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Infotron Solutions",
            "url": "https://infotronsolutions.com/contact",
            "description": "Reach the Infotron Solutions delivery team. Offices in the USA, United Kingdom, Canada, and India."
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Infotron Solutions",
            "url": "https://infotronsolutions.com",
            "telephone": "+1-775-305-9399",
            "email": "contact@infotronsolutions.com",
            "address": [
              { "@type": "PostalAddress", "streetAddress": "3225 McLeod Dr. Ste 100", "addressLocality": "Las Vegas", "addressRegion": "NV", "postalCode": "89121", "addressCountry": "US" },
              { "@type": "PostalAddress", "streetAddress": "27125 Sierra Hwy, Ste 325", "addressLocality": "Santa Clarita", "addressRegion": "CA", "postalCode": "91351", "addressCountry": "US" },
              { "@type": "PostalAddress", "streetAddress": "71-75 Shelton Street, Covent Garden", "addressLocality": "London", "postalCode": "WC2H 9JQ", "addressCountry": "GB" },
              { "@type": "PostalAddress", "streetAddress": "357 Bay Street", "addressLocality": "Toronto", "addressRegion": "ON", "postalCode": "M5H 4A6", "addressCountry": "CA" },
              { "@type": "PostalAddress", "streetAddress": "C-20, G Block, Bandra Kurla Complex", "addressLocality": "Mumbai", "addressRegion": "MH", "postalCode": "400051", "addressCountry": "IN" }
            ]
          }
        ]}
      />

      {/* ─── Floating right-side CTA dock (sticky while scrolling) ─── */}
      <div
        aria-hidden={!showFloatingCta}
        className={`hidden lg:flex fixed right-5 top-[42%] -translate-y-1/2 z-40 flex-col gap-3 transition-all duration-500 ${
          showFloatingCta
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-6 pointer-events-none'
        }`}
        data-testid="floating-cta-dock"
      >
        <button
          type="button"
          onClick={() => scrollToForm('client')}
          data-testid="floating-cta-client"
          className="group relative flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-500 shadow-[0_12px_30px_-10px_rgba(59,130,246,0.55)] hover:shadow-[0_18px_40px_-10px_rgba(59,130,246,0.75)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          I'm a Client
        </button>
        <button
          type="button"
          onClick={() => scrollToForm('candidate')}
          data-testid="floating-cta-candidate"
          className="group relative flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full text-sm font-semibold text-cyan-100 bg-white/[0.06] border border-cyan-300/30 backdrop-blur-md hover:bg-cyan-300/[0.12] hover:border-cyan-300/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          I'm a Candidate
        </button>
      </div>

      {/* Global Offices — premium glassmorphism cards (US · UK · Canada · India) */}
      <section
        className="relative pt-16 lg:pt-20 pb-20 lg:pb-24 overflow-hidden"
        data-testid="contact-locations"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 50% 30%, #0F1B3D 0%, #08122A 60%, #050917 100%),
            #050917
          `,
        }}
      >
        {/* Faint dot grid for premium texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #67E8F9 1px, transparent 0)',
            backgroundSize: '44px 44px',
          }}
        />
        {/* Aurora corner halos in negative space */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.40) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -right-32 w-[640px] h-[640px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.40) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-14 lg:mb-16">
            <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-cyan-300/90 px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 mb-5">
              Global Presence
            </span>
            <h2
              className="text-3xl lg:text-5xl font-semibold text-white mb-3"
              style={{
                fontFamily: "'Playfair Display', 'Libre Baskerville', Georgia, serif",
                letterSpacing: '-0.018em',
                lineHeight: 1.1,
              }}
            >
              Where we{' '}
              <span
                className="italic"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #67E8F9 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 600,
                }}
              >
                deliver.
              </span>
            </h2>
            <p className="text-base lg:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Four regions. One delivery standard. Talk to the team closest to you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {/* ── United States ── */}
            <div className="loc-card group" data-testid="contact-office-usa">
              <span className="loc-card-border" aria-hidden="true" />
              <div className="loc-card-inner">
                <div className="loc-card-head">
                  <img src="https://flagcdn.com/w160/us.png" alt="USA flag" className="loc-flag-img" />
                  <div className="loc-meta">
                    <div className="loc-region">Americas</div>
                    <h3 className="loc-country">United States</h3>
                  </div>
                </div>
                <ul className="loc-list">
                  <li>
                    <div className="loc-city">Las Vegas, Nevada</div>
                    <div className="loc-addr">3225 McLeod Dr. Ste 100, NV 89121</div>
                  </li>
                  <li>
                    <div className="loc-city">Santa Clarita, California</div>
                    <div className="loc-addr">27125 Sierra Hwy, Ste 325, CA 91351</div>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── United Kingdom ── */}
            <div className="loc-card group" data-testid="contact-office-uk">
              <span className="loc-card-border" aria-hidden="true" />
              <div className="loc-card-inner">
                <div className="loc-card-head">
                  <img src="https://flagcdn.com/w160/gb.png" alt="UK flag" className="loc-flag-img" />
                  <div className="loc-meta">
                    <div className="loc-region">Europe</div>
                    <h3 className="loc-country">United Kingdom</h3>
                  </div>
                </div>
                <ul className="loc-list">
                  <li>
                    <div className="loc-city">London</div>
                    <div className="loc-addr">71–75 Shelton Street, Covent Garden, WC2H 9JQ</div>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── Canada ── */}
            <div className="loc-card group" data-testid="contact-office-canada">
              <span className="loc-card-border" aria-hidden="true" />
              <div className="loc-card-inner">
                <div className="loc-card-head">
                  <img src="https://flagcdn.com/w160/ca.png" alt="Canada flag" className="loc-flag-img" />
                  <div className="loc-meta">
                    <div className="loc-region">Americas</div>
                    <h3 className="loc-country">Canada</h3>
                  </div>
                </div>
                <ul className="loc-list">
                  <li>
                    <div className="loc-city">Toronto, Ontario</div>
                    <div className="loc-addr">357 Bay Street, ON M5H 4A6</div>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── India ── */}
            <div className="loc-card group" data-testid="contact-office-india">
              <span className="loc-card-border" aria-hidden="true" />
              <div className="loc-card-inner">
                <div className="loc-card-head">
                  <img src="https://flagcdn.com/w160/in.png" alt="India flag" className="loc-flag-img" />
                  <div className="loc-meta">
                    <div className="loc-region">Asia Pacific</div>
                    <h3 className="loc-country">India</h3>
                  </div>
                </div>
                <ul className="loc-list">
                  <li>
                    <div className="loc-city">Mumbai</div>
                    <div className="loc-addr">C-20, G Block, Bandra Kurla Complex, MH 400051</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Direct contact strip */}
          <div className="mt-14 lg:mt-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
            <a href="tel:+17753059399" className="flex items-center gap-2.5 text-cyan-300 hover:text-cyan-200 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-base font-medium">+1 (775) 305 9399</span>
            </a>
            <span className="hidden md:inline-block w-px h-5 bg-white/15" />
            <a href="mailto:contact@infotronsolutions.com" className="flex items-center gap-2.5 text-cyan-300 hover:text-cyan-200 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-base font-medium">contact@infotronsolutions.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-[#0A192F] scroll-mt-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          {/* Form Type Toggle */}
          <div className="flex gap-4 mb-10 justify-center">
            <Button
              variant={formType === 'client' ? 'default' : 'outline'}
              onClick={() => setFormType('client')}
              size="lg"
              className={formType === 'client' 
                ? "px-8 bg-gradient-to-r from-blue-600 to-violet-500 text-white" 
                : "px-8 border-[#3B82F6]/50 text-blue-500 hover:bg-blue-600/10"}
            >
              I'm a Client
            </Button>
            <Button
              variant={formType === 'candidate' ? 'default' : 'outline'}
              onClick={() => setFormType('candidate')}
              size="lg"
              className={formType === 'candidate' 
                ? "px-8 bg-gradient-to-r from-blue-600 to-violet-500 text-white" 
                : "px-8 border-[#3B82F6]/50 text-blue-500 hover:bg-blue-600/10"}
            >
              I'm a Candidate
            </Button>
          </div>

          <div className="bg-[#111827]/50 border border-[#3B82F6]/20 rounded-lg p-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              {formType === 'client' ? 'Client Inquiry Form' : 'Candidate Application Form'}
            </h2>
            <p className="text-gray-400 mb-8">
              {formType === 'client' 
                ? 'Tell us about your project requirements and our team will respond within 1 business day.'
                : 'Submit your profile and we\'ll match you with opportunities that align with your skills and career goals.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="h-12 bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.smith@company.com"
                  className="h-12 bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                />
              </div>

              {/* Company (Client) / Phone + LinkedIn (Candidate) */}
              <div className="grid md:grid-cols-2 gap-6">
                {formType === 'client' ? (
                  <>
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                        Company Name *
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corporation"
                        className="h-12 bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="h-12 bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="h-12 bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-300 mb-2">
                        LinkedIn Profile
                      </label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="h-12 bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Service (Client) / Job ID (Candidate) */}
              {formType === 'client' && (
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-12 px-3 bg-[#0A192F]/50 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select a service...</option>
                    <option value="managed-services">Managed Services</option>
                    <option value="staff-augmentation">Staff Augmentation</option>
                    <option value="business-consulting">Business Consulting</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              )}

              {formType === 'candidate' && (
                <div>
                  <label htmlFor="jobId" className="block text-sm font-semibold text-gray-300 mb-2">
                    Job Title / Job ID
                  </label>
                  <Input
                    id="jobId"
                    name="jobId"
                    type="text"
                    value={formData.jobId}
                    onChange={handleChange}
                    placeholder="e.g., Senior React Developer or Job ID"
                    className="h-12 bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                  />
                </div>
              )}

              {/* Resume Upload (Candidate Only) */}
              {formType === 'candidate' && (
                <div>
                  <label htmlFor="resume" className="block text-sm font-semibold text-gray-300 mb-2">
                    Upload Resume (PDF/DOC/DOCX) *
                  </label>
                  <div className="relative">
                    {!resumeFile ? (
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-300 ${
                          fileError 
                            ? 'border-red-500 bg-red-500/10' 
                            : 'border-slate-700 hover:border-[#3B82F6] bg-[#0A192F]/50'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-400 text-sm">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-[#0A192F]/50 border border-[#3B82F6] rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-[#3B82F6]" />
                          <div>
                            <p className="text-white text-sm font-medium truncate max-w-[200px]">
                              {resumeFile.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-slate-700 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-400 hover:text-white" />
                        </button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {fileError && (
                    <p className="text-red-500 text-sm mt-2">{fileError}</p>
                  )}
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  {formType === 'client' ? 'Project Details / Requirements' : 'Cover Letter / Additional Information'}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={formType === 'client' 
                    ? 'Tell us about your project scope, timeline, team size needed, and key requirements...'
                    : 'Tell us about your experience, skills, and what type of opportunities you\'re seeking...'}
                  rows={6}
                  className="resize-none bg-[#0A192F]/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-[#3B82F6]"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-[#3B82F6] hover:bg-[#1E3A8A] text-white text-lg py-6 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    {formType === 'client' ? 'Submit Inquiry' : 'Submit Application'}
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our{' '}
                <Link to="/privacy" className="text-blue-500 hover:text-blue-400">Privacy Policy</Link>
                {' '}and{' '}
                <Link to="/terms" className="text-blue-500 hover:text-blue-400">Terms of Service</Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-violet-600">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prefer to Schedule a Call?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            For immediate assistance or to schedule a consultation, reach out directly via email or phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contact@infotronsolutions.com">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Mail className="mr-2 w-5 h-5" />
                contact@infotronsolutions.com
              </Button>
            </a>
            <a href="tel:+17753059399">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Phone className="mr-2 w-5 h-5" />
                +1 (775) 305 9399
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
