import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import {
  ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Layers,
  Target, Wrench, TrendingUp, FileText
} from 'lucide-react';
import { caseStudies } from '../data/mockData';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const study = caseStudies.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen bg-[#0A192F] pt-32 pb-24" data-testid="case-study-not-found">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Case study not found</h1>
          <p className="text-gray-400 mb-8">
            The case study you're looking for may have moved or been renamed.
          </p>
          <Button
            onClick={() => navigate('/resources')}
            className="bg-[#3B82F6] hover:bg-[#1E3A8A] text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Button>
        </div>
      </div>
    );
  }

  const otherStudies = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20" data-testid="case-study-detail">
      <SEO
        title={study.title}
        description={study.impact ? `${study.impact}. ${study.challenge}` : study.challenge}
        path={`/case-studies/${study.slug}`}
        image={study.image}
        imageAlt={study.title}
        type="article"
        keywords={study.industry}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": study.title,
          "description": study.impact ? `${study.impact}. ${study.challenge}` : study.challenge,
          "image": study.image,
          "author": { "@type": "Organization", "name": "Infotron Solutions" },
          "publisher": {
            "@type": "Organization",
            "name": "Infotron Solutions",
            "logo": { "@type": "ImageObject", "url": "https://customer-assets.emergentagent.com/job_ba897003-eeca-4b0e-8e12-dd77cec76f35/artifacts/mcntdahb_INFOTRON%20Gradient%20Logo%20cropped.png" }
          },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://infotronsolutions.com/case-studies/${study.slug}` },
          "articleSection": study.industry,
          "about": study.client,
          "inLanguage": "en-US"
        }}
      />
      {/* Breadcrumb / Back nav */}
      <div className="border-b border-white/5 bg-[#0A192F]/80 backdrop-blur">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            data-testid="back-to-case-studies"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
          <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/40 hidden sm:block">
            Infotron / Case Study
          </div>
        </div>
      </div>

      {/* HERO */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 45%, #3B82F6 80%, #7C3AED 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
        />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white/90 text-xs font-semibold tracking-wider uppercase">
              {study.industry}
            </span>
            <span className="text-xs text-white/60 font-mono tracking-widest uppercase">
              {study.client}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            {study.title}
          </h1>
          <p className="text-lg lg:text-xl text-blue-100/90 leading-relaxed max-w-3xl mb-10">
            {study.impact}
          </p>

          {/* Meta strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/15 max-w-3xl">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60 mb-2">
                <Clock className="w-3.5 h-3.5" /> Duration
              </div>
              <div className="text-white text-lg font-semibold">{study.duration}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60 mb-2">
                <Users className="w-3.5 h-3.5" /> Team
              </div>
              <div className="text-white text-lg font-semibold">{study.teamSize}</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60 mb-2">
                <Layers className="w-3.5 h-3.5" /> Model
              </div>
              <div className="text-white text-lg font-semibold">{study.deliveryModel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-[#0A192F]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 -mt-10 relative z-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/40">
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-[340px] md:h-[460px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-[#0A192F]">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 space-y-20">

          {/* Overview */}
          <article>
            <SectionLabel icon={FileText} label="Overview" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Business context &amp; problem
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {study.overview}
            </p>
          </article>

          {/* Challenges */}
          <article>
            <SectionLabel icon={Target} label="Challenges" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
              What stood in the way
            </h2>
            <ul className="space-y-4">
              {study.challenges.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 p-5 rounded-xl border border-white/10 bg-[#111827]/60 hover:border-white/20 transition-colors"
                >
                  <span className="mt-1 text-[11px] font-mono text-blue-400/70 tracking-wider shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Solution */}
          <article>
            <SectionLabel icon={Wrench} label="Solution" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Architecture &amp; approach
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {study.solution}
            </p>
          </article>

          {/* Execution */}
          <article>
            <SectionLabel icon={Users} label="Execution" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Delivery model
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {study.execution}
            </p>
          </article>

          {/* Results */}
          <article>
            <SectionLabel icon={TrendingUp} label="Results" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
              Quantified outcomes
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {study.results.map((res, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-xl border border-[#3B82F6]/25 bg-gradient-to-br from-[#111827]/80 to-[#0A192F]/80"
                >
                  <CheckCircle className="w-5 h-5 text-[#3B82F6] shrink-0 mt-1" />
                  <span className="text-gray-200 leading-relaxed font-medium">{res}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Tech Stack */}
          <article>
            <SectionLabel icon={Layers} label="Tech Stack" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
              Technologies used
            </h2>
            <div className="flex flex-wrap gap-3">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-sm font-medium text-white/90 hover:border-white/30 hover:bg-white/[0.08] transition-all"
                  data-testid={`tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Other case studies */}
      {otherStudies.length > 0 && (
        <section className="py-20 bg-[#111827]/40 border-t border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-white">More case studies</h2>
              <Link
                to="/resources"
                className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-2"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {otherStudies.map((c) => (
                <Link
                  key={c.slug}
                  to={`/case-studies/${c.slug}`}
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-[#111827]/60 hover:border-white/25 transition-all"
                  data-testid={`related-case-study-${c.slug}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-300 tracking-wider uppercase">
                        {c.industry}
                      </span>
                      <span className="text-[11px] text-white/60 font-mono">{c.duration}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{c.impact}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:gap-3 transition-all">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)' }}
      >
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5">
            Have a program that needs this kind of delivery?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Talk to our team about how we can plug into your roadmap.
          </p>
          <Link to="/contact?type=client" data-testid="case-study-cta">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 transition-colors duration-300"
            >
              Talk to Our Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const SectionLabel = ({ icon: Icon, label }) => (
  <div className="inline-flex items-center gap-3 mb-5">
    <span className="w-9 h-9 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center">
      <Icon className="w-4 h-4 text-white/80" strokeWidth={1.8} />
    </span>
    <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/80">
      {label}
    </span>
  </div>
);

export default CaseStudyDetail;
