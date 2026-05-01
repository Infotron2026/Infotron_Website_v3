import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle, BarChart3, Users, DollarSign, HardHat, LineChart, Building2, Factory, Radio, Server, Warehouse, Target, UserCheck, Globe, Activity, Zap } from 'lucide-react';

const CapitalProjects = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('scroll-reveal');
        }
      });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const coreCapabilities = [
    {
      title: 'Project Controls & Delivery Support',
      icon: BarChart3,
      items: [
        'Planning & scheduling (Primavera, MS Project)',
        'Cost tracking & earned value management',
        'Risk analysis & reporting',
        'Project performance monitoring',
        'Delay analysis support'
      ]
    },
    {
      title: 'Program Management Office (PMO)',
      icon: Users,
      items: [
        'PMO setup & governance',
        'Project reporting & dashboards',
        'Stakeholder reporting frameworks',
        'Change management & tracking',
        'Delivery assurance'
      ]
    },
    {
      title: 'Cost & Commercial Support',
      icon: DollarSign,
      items: [
        'Cost estimation & planning',
        'Budget management & forecasting',
        'Procurement & vendor coordination',
        'Contract administration support'
      ]
    },
    {
      title: 'Construction & Field Support',
      icon: HardHat,
      items: [
        'Site coordination & reporting',
        'QA/QC and compliance support',
        'Commissioning coordination',
        'Field engineering support'
      ]
    },
    {
      title: 'Digital PMO & Analytics',
      icon: LineChart,
      items: [
        'Data-driven reporting (Power BI dashboards)',
        'Workflow automation',
        'Common Data Environment (CDE) support',
        'Project data integration tools'
      ]
    }
  ];

  const industries = [
    { name: 'Infrastructure & Utilities', icon: Building2 },
    { name: 'Real Estate & Construction', icon: HardHat },
    { name: 'Data Centers', icon: Server },
    { name: 'Industrial & Manufacturing', icon: Factory },
    { name: 'Telecom', icon: Radio }
  ];

  const whyInfotron = [
    {
      icon: Target,
      title: 'Execution-Focused Approach',
      description: 'We prioritize delivery outcomes, ensuring projects move forward with clarity, structure, and accountability.'
    },
    {
      icon: UserCheck,
      title: 'Program-Ready Talent',
      description: 'Our teams are experienced in live project environments, enabling immediate contribution without ramp-up delays.'
    },
    {
      icon: Globe,
      title: 'Flexible Global Delivery',
      description: 'We operate across the US, Canada, UK, and India, supporting projects with scalable and responsive delivery models.'
    },
    {
      icon: Activity,
      title: 'Integrated Digital Support',
      description: 'We enhance execution through data visibility, reporting, and workflow efficiency, without adding complexity.'
    },
    {
      icon: Zap,
      title: 'Aligned to Fast-Paced Environments',
      description: 'We understand the pace and demands of large-scale programs and adapt quickly to evolving project needs.'
    }
  ];

  const deliveryModels = [
    'Staff augmentation (role-based support)',
    'Dedicated project teams',
    'Hybrid delivery (onshore + offshore)',
    'Rapid deployment of project-ready professionals'
  ];

  const techEnablement = [
    'Digital reporting platforms',
    'Workflow automation',
    'Integration with enterprise systems',
    'Secure and scalable infrastructure support'
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      {/* HERO SECTION */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&auto=format")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3}} />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT — Hero Text */}
            <div className="lg:col-span-7 scroll-reveal">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8">
                Capital Projects & Program Delivery
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 max-w-3xl">
                Delivering execution excellence across complex programs through project controls, digital PMO, and scalable delivery support.
              </p>
              <p className="text-base lg:text-lg text-gray-400 leading-relaxed mb-10 max-w-3xl">
                Supporting project-driven organizations with structured delivery, control, and scalable execution.
              </p>
              <Link to="/contact?type=client&service=capital-projects" data-testid="capital-projects-hero-cta">
                <Button size="lg" className="bg-[#3B82F6] hover:bg-[#1E3A8A] text-white text-lg px-8 py-6 transition-colors duration-300">
                  Let's Work Together
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* RIGHT — Structured Overlay Panel */}
            <div className="lg:col-span-5 scroll-reveal delay-200" data-testid="capital-projects-hero-panel">
              <div className="relative rounded-2xl border border-white/10 bg-[#0A192F]/60 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />

                {/* Subtle grid background */}
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                  }}
                />

                <div className="relative p-8 lg:p-10">
                  {/* Panel header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/80">
                      Delivery Pillars
                    </span>
                    <span className="text-[11px] font-mono text-white/40 tracking-widest">
                      / 04
                    </span>
                  </div>

                  {/* Stacked labels */}
                  <ul className="divide-y divide-white/10">
                    {[
                      { num: '01', label: 'Program Visibility' },
                      { num: '02', label: 'Cost Control' },
                      { num: '03', label: 'Delivery Assurance' },
                      { num: '04', label: 'Execution Discipline' }
                    ].map((item) => (
                      <li
                        key={item.num}
                        className="flex items-center justify-between py-4 group"
                      >
                        <div className="flex items-center gap-5">
                          <span className="text-xs font-mono text-blue-400/70 tracking-wider">
                            {item.num}
                          </span>
                          <span className="text-base lg:text-lg font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                            {item.label}
                          </span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/70 group-hover:bg-[#3B82F6] transition-colors duration-300" />
                      </li>
                    ))}
                  </ul>

                  {/* Bottom meta row */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.22em] uppercase text-white/50">
                      Engineered Delivery
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      Infotron / CP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES SECTION */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                Core Capabilities
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive support across the project lifecycle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreCapabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <div
                  key={index}
                  className={`scroll-reveal delay-${index * 100} bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl p-8 hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3B82F6]/10 transition-all duration-300`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6]/20 to-[#7C3AED]/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{capability.title}</h3>
                  <ul className="space-y-3">
                    {capability.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-400">
                        <CheckCircle className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DELIVERY MODEL SECTION */}
      <section className="py-24 bg-[#111827]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                  Scalable Delivery Model
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                We provide flexible delivery models aligned to project needs:
              </p>
              <ul className="space-y-4">
                {deliveryModels.map((model, index) => (
                  <li key={index} className="flex items-center gap-4 text-gray-300">
                    <div className="w-10 h-10 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <span className="text-lg">{model}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="scroll-reveal delay-200">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&h=600&fit=crop&auto=format"
                  alt="Project Team Collaboration"
                  className="rounded-2xl shadow-2xl border border-[#3B82F6]/20"
                />
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#3B82F6]/30 to-[#7C3AED]/30 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY ENABLEMENT SECTION */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format"
                  alt="Digital Analytics Dashboard"
                  className="rounded-2xl shadow-2xl border border-[#3B82F6]/20"
                />
                <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-gradient-to-br from-[#7C3AED]/30 to-[#3B82F6]/30 rounded-2xl"></div>
              </div>
            </div>
            <div className="scroll-reveal order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                  Technology-Enabled Delivery
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                We enhance execution outcomes through:
              </p>
              <ul className="space-y-4">
                {techEnablement.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-gray-300">
                    <div className="w-10 h-10 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="py-24 bg-[#111827]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={index}
                  className={`scroll-reveal delay-${index * 100} bg-[#0A192F] border border-[#3B82F6]/20 rounded-2xl p-6 text-center hover:border-[#3B82F6]/50 hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6]/20 to-[#7C3AED]/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-white font-semibold">{industry.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY INFOTRON SECTION */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                Why Infotron
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A delivery partner aligned to the pace and discipline of large-scale programs.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyInfotron.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className={`scroll-reveal delay-${index * 100} group relative bg-[#111827]/60 border border-white/10 rounded-2xl p-8 hover:border-white/25 transition-all duration-300`}
                    data-testid={`why-infotron-card-${index}`}
                  >
                    {/* Top thin accent */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="w-11 h-11 rounded-lg border border-white/15 bg-white/[0.03] flex items-center justify-center mb-6 group-hover:bg-white/[0.06] transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-white/80" strokeWidth={1.75} />
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Positioning Line */}
            <div className="mt-16 text-center scroll-reveal">
              <p className="text-xl text-gray-300 italic border-l-4 border-[#3B82F6] pl-6 text-left max-w-3xl mx-auto">
                Infotron bridges execution gaps in complex programs by combining project delivery expertise with scalable, technology-enabled support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 border-t border-white/10" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        {/* Subtle top divider accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center scroll-reveal">
          <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-200/80 mb-6">
            Final Step
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
            Whether you need project controls support, PMO resources, or scalable delivery capabilities, Infotron can integrate seamlessly into your program.
          </p>
          <p className="text-base lg:text-lg text-blue-100/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Engage with a delivery partner that understands the pace, complexity, and accountability required for large-scale programs.
          </p>
          <Link to="/contact?type=client&service=capital-projects" data-testid="capital-projects-bottom-cta">
            <Button size="lg" className="bg-white text-[#3B82F6] hover:bg-gray-100 text-lg px-8 py-6 transition-colors duration-300">
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CapitalProjects;
