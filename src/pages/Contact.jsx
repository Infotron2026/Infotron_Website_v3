import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
      {/* Hero */}
      <section className="py-24 lg:py-32" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8">
              Let's Start a Conversation
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              Whether you're a company looking for technology delivery excellence or a professional 
              seeking your next challenge, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Our Global Offices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* USA - Las Vegas */}
            <div className="bg-[#0A192F]/50 border border-[#3B82F6]/20 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-bold text-white text-lg">USA</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                3225 McLeod Dr. Ste 100<br />
                Las Vegas, NV 89121
              </p>
            </div>

            {/* USA - Santa Clarita */}
            <div className="bg-[#0A192F]/50 border border-[#3B82F6]/20 rounded-lg p-8" data-testid="contact-office-santa-clarita">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-bold text-white text-lg">USA</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                27125 Sierra Hwy, Ste 325<br />
                Santa Clarita, CA 91351
              </p>
            </div>

            {/* Canada */}
            <div className="bg-[#0A192F]/50 border border-violet-500/20 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-bold text-white text-lg">CANADA</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                357 Bay Street<br />
                Toronto, ON M5H 4A6
              </p>
            </div>

            {/* India */}
            <div className="bg-[#0A192F]/50 border border-[#3B82F6]/20 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-bold text-white text-lg">INDIA</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                C-20, G Block, Bandra Kurla Complex<br />
                Mumbai, MH 400051
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="tel:+17753059399" className="flex items-center gap-3 text-blue-500 hover:text-blue-400 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="text-lg">+1 (775) 305 9399</span>
            </a>
            <a href="mailto:contact@infotronsolutions.com" className="flex items-center gap-3 text-blue-500 hover:text-blue-400 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-lg">contact@infotronsolutions.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#0A192F]">
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
                  {formType === 'client' ? 'Project Details / Requirements *' : 'Cover Letter / Additional Information *'}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
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
