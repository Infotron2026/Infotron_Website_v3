import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import {
  ArrowRight, CheckCircle, Mail, Headphones, Smartphone,
  Workflow, Brain, MessagesSquare, GitBranch, BookOpenCheck,
  ShieldCheck, Layers, Globe, BarChart3
} from 'lucide-react';

const MicrosoftWorkplaceSupport = () => {
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
    { icon: Headphones, label: 'End-user IT support across the organization' },
    { icon: Mail, label: 'Microsoft ecosystem support and administration' },
    { icon: Smartphone, label: 'Workplace and endpoint services' },
    { icon: Workflow, label: 'ITSM and ticketing operations' },
  ];

  const coreCapabilities = [
    { icon: Mail, title: 'Microsoft 365 Support', desc: 'Outlook, Teams, SharePoint, OneDrive' },
    { icon: ShieldCheck, title: 'Identity & Device Management', desc: 'Azure AD, Intune, MFA, device enrollment' },
    { icon: Headphones, title: 'Helpdesk Operations', desc: 'Multi-channel support across chat, email, portal' },
    { icon: Smartphone, title: 'Workplace & Endpoint Support', desc: 'Devices, VPN, connectivity, OS issues' },
    { icon: Workflow, title: 'ITSM Systems', desc: 'Workflow automation, SLA tracking, reporting' },
  ];

  const aiCapabilities = [
    { icon: MessagesSquare, label: 'AI-driven self-service and chatbots' },
    { icon: GitBranch, label: 'Intelligent ticket routing and prioritization' },
    { icon: Brain, label: 'Automated issue resolution' },
    { icon: BookOpenCheck, label: 'Continuous knowledge base learning' },
  ];

  const outcomes = [
    '30 to 60 percent cost optimization',
    'Faster response and resolution times',
    'Improved employee experience',
    'Reduced ticket volume through automation',
    'Standardized and measurable support delivery',
  ];

  const deliveryPhases = [
    { num: '01', title: 'Hybrid & Offshore Delivery', icon: Globe, desc: 'Onshore plus offshore support models tuned to your time zones and SLAs' },
    { num: '02', title: 'Scalable Support Structure', icon: Layers, desc: 'Tiered teams that scale up or down with business demand' },
    { num: '03', title: 'Continuous Optimization', icon: BarChart3, desc: 'Live reporting, automation rollout, ticket-deflection tracking' },
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20" data-testid="page-microsoft-workplace-support">
      <SEO
        title="Microsoft Workplace & End-User Support"
        description="AI-enabled Microsoft 365 and end-user support. Helpdesk operations, Intune, Azure AD, and ITSM with automated ticket deflection."
        path="/services/managed-services/microsoft-workplace-support"
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
                Modern Workplace Support. Powered by AI.
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed mb-10 max-w-3xl">
                We deliver scalable, AI-enabled end-user support across Microsoft environments, improving experience, reducing costs, and increasing efficiency.
              </p>
              <Link to="/contact?type=client&service=microsoft-workplace-support" data-testid="ms-hero-cta">
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
                    <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/80">Support Pillars</span>
                    <span className="text-[11px] font-mono text-white/40 tracking-widest">/ 04</span>
                  </div>
                  <ul className="divide-y divide-white/10">
                    {[
                      { num: '01', label: 'AI-Powered Helpdesk' },
                      { num: '02', label: 'Microsoft 365 Stack' },
                      { num: '03', label: 'Endpoint Operations' },
                      { num: '04', label: 'ITSM Discipline' },
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
      <section className="section-light py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">What We Do</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">A modern workplace stack, supported end-to-end.</p>
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
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Five pillars of end-user excellence.</p>
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

      {/* AI CAPABILITIES */}
      <section className="section-light py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal order-2 lg:order-1">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&h=650&fit=crop&auto=format" alt="AI-powered support automation" className="rounded-2xl shadow-2xl border border-[#3B82F6]/20" />
                <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-gradient-to-br from-[#7C3AED]/30 to-[#3B82F6]/30 rounded-2xl" />
              </div>
            </div>
            <div className="scroll-reveal order-1 lg:order-2">
              <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-violet-300/90 mb-3">Accelerated by AI</span>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">AI Capabilities</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">Layered intelligence that deflects tickets, accelerates resolution, and learns over time.</p>
              <ul className="space-y-4">
                {aiCapabilities.map((item, i) => {
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
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section-outcomes py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">Outcomes</span>
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
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Flexible support engineered for scale and continuous improvement.</p>
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to modernize your end-user experience?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">Engage a partner that pairs AI with operational discipline, so your employees, and your costs, both win.</p>
          <Link to="/contact?type=client&service=microsoft-workplace-support" data-testid="ms-bottom-cta">
            <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-gray-100 text-base font-semibold px-8 py-6 transition-colors">
              Talk to Our Team <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MicrosoftWorkplaceSupport;
