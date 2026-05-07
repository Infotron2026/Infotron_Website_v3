import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import {
  ArrowRight, CheckCircle, Database, Layers, Activity,
  Settings, Server, CloudCog, Sparkles, BarChart3,
  Globe, ShieldCheck, Brain, Workflow
} from 'lucide-react';

const OracleAMS = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('scroll-reveal');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 120px 0px' }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) =>
      observerRef.current.observe(el)
    );
    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  const whatWeDo = [
    { icon: Layers, label: 'End-to-end Oracle application management' },
    { icon: Activity, label: 'Continuous performance optimization' },
    { icon: ShieldCheck, label: 'Production support for business-critical systems' },
    { icon: Workflow, label: 'Integration across applications and data layers' },
  ];

  const coreCapabilities = [
    { icon: Database, title: 'ERP, HCM, SCM Management', desc: 'Full lifecycle support across enterprise applications' },
    { icon: Settings, title: 'Production Support', desc: 'L1 to L3 support with SLA-driven operations' },
    { icon: Sparkles, title: 'Enhancements & Optimization', desc: 'Performance tuning and continuous improvements' },
    { icon: Workflow, title: 'Integration & Middleware', desc: 'APIs, data flows, and system connectivity' },
    { icon: Server, title: 'Database & Infrastructure', desc: 'Performance tuning, reliability, and monitoring' },
    { icon: CloudCog, title: 'Cloud & DevOps', desc: 'Automation, CI/CD, and scalable cloud operations' },
  ];

  const differentiators = [
    { icon: Brain, label: 'Predictive issue resolution, not reactive support' },
    { icon: Activity, label: 'AI-assisted monitoring and automation' },
    { icon: BarChart3, label: 'Outcome-driven delivery, not ticket-based' },
    { icon: Sparkles, label: 'Continuous performance improvement' },
  ];

  const outcomes = [
    'Faster processing and transaction speeds',
    'Improved system availability',
    'Reduced operational costs',
    'Stability during peak business cycles',
    'Better data accuracy and integration',
  ];

  const deliveryPhases = [
    { num: '01', title: 'Scalable Global Delivery', icon: Globe, desc: 'Onshore, offshore, and hybrid pods aligned to your business cycles' },
    { num: '02', title: 'Tiered Support Structure', icon: Layers, desc: 'L1, L2, L3 support with defined SLAs and escalation paths' },
    { num: '03', title: 'Continuous Monitoring', icon: BarChart3, desc: 'Live dashboards, performance reporting, predictive alerts' },
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20" data-testid="page-oracle-ams">
      <SEO
        title="Oracle Applications (AMS)"
        description="End-to-end management and optimization of Oracle ERP, HCM, SCM environments. Predictive support, AI-assisted monitoring, and outcome-driven delivery."
        path="/services/managed-services/oracle-ams"
      />

      {/* HERO */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)' }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1920&h=1080&fit=crop&auto=format")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 scroll-reveal">
              <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-200/90 mb-4">
                Managed Services / Run
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                Run. Optimize. Scale Your Enterprise Applications.
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed mb-10 max-w-3xl">
                We manage and continuously optimize Oracle environments, ensuring performance, stability, and business-critical outcomes.
              </p>
              <Link to="/contact?type=client&service=oracle-ams" data-testid="oracle-hero-cta">
                <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-gray-100 text-base font-semibold px-8 py-6 transition-colors">
                  Talk to Our Team <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-5 scroll-reveal delay-200">
              <div className="relative rounded-2xl border border-white/10 bg-[#0A192F]/60 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />
                <div className="relative p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/80">Operating Model</span>
                    <span className="text-[11px] font-mono text-white/40 tracking-widest">/ 04</span>
                  </div>
                  <ul className="divide-y divide-white/10">
                    {[
                      { num: '01', label: 'Predictive Support' },
                      { num: '02', label: 'Performance Tuning' },
                      { num: '03', label: 'Integration Stability' },
                      { num: '04', label: 'Cloud Operations' },
                    ].map((item) => (
                      <li key={item.num} className="flex items-center justify-between py-4 group">
                        <div className="flex items-center gap-5">
                          <span className="text-xs font-mono text-blue-400/70 tracking-wider">{item.num}</span>
                          <span className="text-base lg:text-lg font-medium text-white/90">{item.label}</span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/70 group-hover:bg-[#3B82F6] transition-colors" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">What We Do</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Run-state ownership for business-critical Oracle systems.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDo.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`scroll-reveal delay-${i * 100} bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl p-6 hover:border-[#3B82F6]/50 hover:-translate-y-1 transition-all duration-300`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6]/20 to-[#7C3AED]/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <p className="text-white text-sm leading-relaxed">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-24 bg-[#111827]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">Core Capabilities</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Six pillars of Oracle application management.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className={`scroll-reveal delay-${(i % 5) * 100} bg-[#0A192F] border border-[#3B82F6]/20 rounded-2xl p-7 hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3B82F6]/10 transition-all duration-300`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6]/20 to-[#7C3AED]/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">What Makes Us Different</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">Outcomes over tickets. Prediction over reaction.</p>
              <ul className="space-y-4">
                {differentiators.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-4 text-gray-300">
                      <div className="w-10 h-10 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#3B82F6]" />
                      </div>
                      <span className="text-base lg:text-lg leading-relaxed">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="scroll-reveal delay-200">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=650&fit=crop&auto=format" alt="Enterprise application operations" className="rounded-2xl shadow-2xl border border-[#3B82F6]/20" />
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#3B82F6]/30 to-[#7C3AED]/30 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS OUTCOMES */}
      <section className="py-24 bg-[#111827]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">Business Outcomes</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {outcomes.map((o, i) => (
              <div key={i} className={`scroll-reveal delay-${i * 100} bg-[#0A192F] border border-[#3B82F6]/20 rounded-2xl p-6 text-center hover:border-[#3B82F6]/50 hover:-translate-y-1 transition-all duration-300`}>
                <CheckCircle className="w-8 h-8 text-[#3B82F6] mx-auto mb-3" />
                <p className="text-white text-sm leading-relaxed font-medium">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY MODEL */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">Delivery Model</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Run operations engineered for resilience and scale.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {deliveryPhases.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className={`scroll-reveal delay-${i * 100} relative bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl p-8 hover:border-[#3B82F6]/50 transition-all duration-300`}>
                  <span className="absolute top-4 right-5 text-xs font-mono text-blue-400/60 tracking-wider">{p.num}</span>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6]/20 to-[#7C3AED]/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/10" style={{ background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center scroll-reveal">
          <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-200/80 mb-6">Get Started</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Run, Optimize, and Scale?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">Engage a partner that owns Oracle outcomes, not tickets.</p>
          <Link to="/contact?type=client&service=oracle-ams" data-testid="oracle-bottom-cta">
            <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-gray-100 text-base font-semibold px-8 py-6 transition-colors">
              Talk to Our Team <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OracleAMS;
