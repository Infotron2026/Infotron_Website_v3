import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { blogPosts, caseStudies } from '../data/mockData';
import { ArrowRight, Calendar, Clock, Tag, FileText, BookOpen } from 'lucide-react';

const Resources = () => {
  const observerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('case-studies');
  const [showFloatingTabs, setShowFloatingTabs] = useState(true);

  // Animate-in observer for cards
  useEffect(() => {
    const options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('scroll-reveal');
        }
      });
    }, options);
    document.querySelectorAll('.scroll-reveal').forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  // Track which section is currently in view to highlight the right pill
  useEffect(() => {
    const sections = ['case-studies-section', 'blog-section']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry most prominently in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id === 'blog-section' ? 'blogs' : 'case-studies');
        }
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-20% 0px -40% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Auto-hide the floating dock when the CTA section is in view
  useEffect(() => {
    const el = document.getElementById('resources-cta');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowFloatingTabs(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      <SEO
        title="Resources & Insights"
        description="Case studies, expert perspectives, and field-tested playbooks on enterprise technology delivery, talent strategy, AI adoption, and platform transformation."
        path="/resources"
      />

      {/* ─── Floating right-side jump dock ─── */}
      <div
        aria-hidden={!showFloatingTabs}
        className={`hidden lg:flex fixed right-5 top-[42%] -translate-y-1/2 z-40 flex-col gap-3 transition-all duration-500 ${
          showFloatingTabs
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-6 pointer-events-none'
        }`}
        data-testid="resources-floating-dock"
      >
        <button
          type="button"
          onClick={() => scrollToSection('case-studies-section')}
          data-testid="floating-tab-case-studies"
          aria-current={activeSection === 'case-studies' ? 'true' : 'false'}
          className={`group flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
            activeSection === 'case-studies'
              ? 'text-white bg-gradient-to-r from-blue-600 to-violet-500 shadow-[0_12px_30px_-10px_rgba(59,130,246,0.55)]'
              : 'text-blue-100 bg-white/[0.06] border border-blue-300/30 backdrop-blur-md hover:bg-blue-300/[0.12] hover:border-blue-300/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Case Studies
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('blog-section')}
          data-testid="floating-tab-blogs"
          aria-current={activeSection === 'blogs' ? 'true' : 'false'}
          className={`group flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
            activeSection === 'blogs'
              ? 'text-white bg-gradient-to-r from-blue-600 to-violet-500 shadow-[0_12px_30px_-10px_rgba(59,130,246,0.55)]'
              : 'text-blue-100 bg-white/[0.06] border border-blue-300/30 backdrop-blur-md hover:bg-blue-300/[0.12] hover:border-blue-300/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Blog
        </button>
      </div>

      {/* ─── Hero ─── */}
      <section
        className="relative pt-16 lg:pt-20 pb-14 lg:pb-16 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 50% 30%, #0F1B3D 0%, #08122A 60%, #050917 100%),
            #050917
          `,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #93C5FD 1px, transparent 0)',
            backgroundSize: '44px 44px',
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.40) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.40) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/90 px-3 py-1.5 rounded-full border border-blue-400/25 bg-blue-400/5 mb-4">
            Resources
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-3"
            style={{
              fontFamily: "'Playfair Display', 'Libre Baskerville', Georgia, serif",
              letterSpacing: '-0.018em',
              lineHeight: 1.1,
            }}
          >
            Insights worth{' '}
            <span
              className="italic"
              style={{
                backgroundImage: 'linear-gradient(90deg, #93C5FD 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 600,
              }}
            >
              your time.
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Field-tested perspectives on delivery, talent strategy, and platform transformation.
          </p>
        </div>
      </section>

      {/* ─── Mobile-only inline jump pills ─── */}
      <div className="lg:hidden bg-[#0A192F] border-b border-white/[0.05]">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex gap-2 justify-center">
          <button
            type="button"
            onClick={() => scrollToSection('case-studies-section')}
            data-testid="mobile-tab-case-studies"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeSection === 'case-studies'
                ? 'text-white bg-gradient-to-r from-blue-600 to-violet-500'
                : 'text-blue-200 bg-white/[0.04] border border-white/[0.08]'
            }`}
          >
            <FileText className="w-3 h-3" />
            Case Studies
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('blog-section')}
            data-testid="mobile-tab-blogs"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeSection === 'blogs'
                ? 'text-white bg-gradient-to-r from-blue-600 to-violet-500'
                : 'text-blue-200 bg-white/[0.04] border border-white/[0.08]'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            Blog
          </button>
        </div>
      </div>

      {/* ─── Case Studies section (first) ─── */}
      <section
        id="case-studies-section"
        className="py-14 lg:py-20 bg-[#0A192F] scroll-mt-24"
      >
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 scroll-reveal">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/90 mb-3">
                <FileText className="w-3.5 h-3.5" />
                Case Studies
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white"
                style={{
                  fontFamily: "'Playfair Display', 'Libre Baskerville', Georgia, serif",
                  letterSpacing: '-0.018em',
                  lineHeight: 1.15,
                }}
              >
                Delivery in{' '}
                <span
                  className="italic"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #93C5FD 0%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 600,
                  }}
                >
                  the field.
                </span>
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              How our teams execute against real client problems, told with the same rigor we bring to the work.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Link
                key={study.id}
                to={`/case-studies/${study.slug}`}
                className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
                data-testid={`case-study-card-${study.slug}`}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase">
                      {study.industry}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <div className="text-xs text-gray-300">{study.client}</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-blue-300/90 font-medium mb-3">{study.impact}</p>
                  <p className="text-gray-400 mb-6 line-clamp-2">{study.challenge}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{study.duration}</span>
                      <span>•</span>
                      <span>{study.teamSize}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 group-hover:gap-3 transition-all">
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Blog section (below case studies) ─── */}
      <section
        id="blog-section"
        className="py-14 lg:py-20 bg-[#0A192F] scroll-mt-24 border-t border-white/[0.04]"
      >
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 scroll-reveal">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/90 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                Blog
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white"
                style={{
                  fontFamily: "'Playfair Display', 'Libre Baskerville', Georgia, serif",
                  letterSpacing: '-0.018em',
                  lineHeight: 1.15,
                }}
              >
                Notes from{' '}
                <span
                  className="italic"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #93C5FD 0%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 600,
                  }}
                >
                  the desk.
                </span>
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Short reads on delivery, technology choices, and what we've learned working with enterprise teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/resources/blog/${post.slug}`}
                className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
                data-testid={`blog-card-${post.slug}`}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1 bg-violet-500/20 text-violet-400 px-3 py-1 rounded-full text-xs font-semibold">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <ArrowRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="resources-cta"
        className="py-24"
        style={{ background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center scroll-reveal">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how Infotron can help you achieve similar results
          </p>
          <Link to="/contact?type=client">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Resources;
