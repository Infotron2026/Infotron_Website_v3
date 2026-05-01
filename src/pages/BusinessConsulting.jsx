import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle, Briefcase, Target, Users, LineChart, Lightbulb, TrendingUp } from 'lucide-react';

const BusinessConsulting = () => {
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

  const methodology = [
    { step: 1, title: 'Strategic Assessment', description: 'Current state analysis, competitive landscape review, and opportunity identification', icon: Target },
    { step: 2, title: 'Vision & Roadmap', description: 'Define target architecture, technology strategy, and transformation priorities', icon: Lightbulb },
    { step: 3, title: 'Stakeholder Alignment', description: 'Executive workshops, team engagement, and change management planning', icon: Users },
    { step: 4, title: 'Pilot & Validation', description: 'Proof-of-concept development and quick wins to validate approach', icon: CheckCircle },
    { step: 5, title: 'Implementation Oversight', description: 'Hands-on execution support with embedded technical leadership', icon: TrendingUp },
    { step: 6, title: 'Measurement & Evolution', description: 'KPI tracking, continuous improvement, and strategic course correction', icon: LineChart }
  ];

  const benefits = [
    { text: 'C-level strategic advisory from experienced technology executives', icon: Briefcase },
    { text: 'AI strategy development and machine learning roadmaps', icon: Target },
    { text: 'Data-driven insights powered by intelligent analytics', icon: LineChart },
    { text: 'Risk mitigation through proven transformation methodologies', icon: CheckCircle },
    { text: 'Implementation support beyond advisory, we help execute', icon: TrendingUp },
    { text: 'Knowledge transfer to build internal AI/ML capabilities', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      {/* Hero */}
      <section className="py-24 lg:py-32" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-[#3B82F6]/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-8">
                <Briefcase className="w-4 h-4" />
                Business Consulting
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8">
                Strategic Technology Advisory and Transformation Leadership
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-10">
                Partner with senior technology executives who have led digital transformations, 
                platform modernizations, and strategic technology initiatives for Fortune 500 companies 
                and high-growth startups.
              </p>
              <Link to="/contact?type=client&service=business-consulting">
                <Button size="lg" className="bg-[#3B82F6] hover:bg-[#1E3A8A] transition-colors duration-300 text-white text-lg px-8 py-6">
                  Discuss Your Challenge
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="scroll-reveal delay-200">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&auto=format"
                  alt="Executive Strategy Session"
                  className="rounded-2xl shadow-2xl border border-[#3B82F6]/20"
                />
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-700/30 to-violet-600/30 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-[#111827]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
                Key Benefits
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Strategic guidance from executives who've been in your seat
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index} 
                  className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl p-6 hover:border-[#3B82F6]/50 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-violet-500/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-gray-300 leading-relaxed pt-2">{benefit.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
                Our Methodology
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive framework that combines strategic thinking with hands-on execution support
            </p>
          </div>
          
          {/* Step-by-step process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodology.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.step} className={`scroll-reveal delay-${index * 100} relative group`}>
                  {/* Connector line */}
                  {index < methodology.length - 1 && index !== 2 && (
                    <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-blue-600/50 to-transparent z-0" />
                  )}
                  
                  <div className="bg-[#111827]/50 border border-[#3B82F6]/20 rounded-2xl p-8 h-full hover:border-[#3B82F6]/50 hover:bg-[#111827]/80 transition-all duration-300 relative">
                    {/* Step number badge */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/30">
                      {item.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-violet-500/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-blue-500" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 bg-slate-800/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 scroll-reveal">
            <span className="bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
              Success Story
            </span>
          </h2>
          <div className="scroll-reveal delay-200 bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-12">
                <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-sm font-semibold rounded-full mb-4">HEDGE FUND</div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Built Algorithmic Trading Platform from Scratch
                </h3>
                
                <div className="mb-8">
                  <h4 className="font-bold text-blue-400 mb-3">Challenge</h4>
                  <p className="text-gray-400 leading-relaxed">
                    A $5B hedge fund required a proprietary algorithmic trading platform with complex quantitative 
                    models, real-time risk management, and institutional-grade reliability. No internal technology leadership.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-blue-400 mb-3">Approach</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Embedded fractional CTO and technology advisory team. Defined architecture, selected technology stack, 
                    assembled specialized team (quant developers, data engineers, trading system specialists), and 
                    provided hands-on delivery oversight.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-blue-400 mb-3">Results</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Platform handling $2B+ daily trade volume</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Real-time risk calculations across 10,000+ positions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">99.999% system reliability achieved</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Reduced trade execution time by 85%</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative h-full min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop&auto=format"
                  alt="Trading Platform"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-800/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center scroll-reveal">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Navigate Your Technology Transformation with Confidence
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Partner with executives who have successfully navigated the challenges you're facing today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact?type=client&service=business-consulting">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services/managed-services">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
                Explore Managed Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessConsulting;
