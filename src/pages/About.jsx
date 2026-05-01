import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle, Code, Handshake, Rocket, BookOpen, Eye } from 'lucide-react';
import { companyValues, aboutStats } from '../data/mockData';

const About = () => {
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

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      {/* Hero */}
      <section className="py-24 lg:py-32" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8">
              Built for Enterprise Technology Delivery
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              Infotron Solutions is a US-headquartered IT services and talent solutions firm 
              delivering Managed Services, Staff Augmentation, and Business Consulting to organizations 
              that demand execution excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#111827]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {aboutStats.map((stat, index) => (
              <div key={index} className={`scroll-reveal delay-${index * 100} text-center`}>
                <div className="text-5xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                  Our Story
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Infotron Solutions was built to support organizations operating in complex, fast-moving environments.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We focus on delivering structured execution support through a combination of domain-aligned talent, scalable delivery models, and practical digital enablement.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our approach emphasizes adaptability, clarity, and consistent delivery, helping teams navigate complexity and execute with confidence.
              </p>
              <p className="text-base text-gray-400 leading-relaxed border-l-2 border-[#3B82F6]/40 pl-4">
                Experience supporting complex programs across multiple industries and geographies.
              </p>
            </div>
            <div className="scroll-reveal delay-200">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1367272/pexels-photo-1367272.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Infotron Team Collaboration"
                  className="rounded-2xl shadow-2xl border border-[#3B82F6]/20"
                />
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-600/30 to-violet-600/30 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#111827]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="scroll-reveal bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl p-12 hover:border-[#3B82F6]/40 transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To empower organizations with technology delivery capabilities that accelerate growth, 
                drive innovation, and create competitive advantage through execution excellence, 
                elite talent, and full accountability for outcomes.
              </p>
            </div>
            <div className="scroll-reveal delay-200 bg-[#111827]/80 border border-violet-500/20 rounded-2xl p-12 hover:border-violet-500/40 transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To be the global standard for technology services delivery, recognized as the partner 
                of choice for organizations that demand world-class talent, predictable execution, 
                and measurable business impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide how we work, make decisions, and serve our clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => {
              const IconMap = { CheckCircle, Handshake, Code, Rocket, BookOpen, Eye };
              const IconComponent = IconMap[value.icon];
              return (
                <div 
                  key={index} 
                  className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl p-8 hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership/Culture - Enhanced with Images */}
      <section className="py-24 bg-slate-800/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                Our Culture
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Infotron is built by technologists, for technologists. We hire senior professionals who 
              value craftsmanship, continuous learning, and delivering work they're proud of. Our teams 
              operate with autonomy, ownership, and a bias toward action.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're distributed across the Americas, EMEA, and APAC, but united by a shared commitment to 
              technical excellence and client success. If you're a builder who wants to work on complex, 
              high-impact projects with world-class teams, Infotron is your home.
            </p>
          </div>

          {/* Diverse Team Images Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="scroll-reveal relative rounded-2xl overflow-hidden h-64 shadow-lg group border border-[#3B82F6]/20">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Diverse team collaboration" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold">Team Collaboration</div>
              </div>
            </div>
            <div className="scroll-reveal delay-100 relative rounded-2xl overflow-hidden h-64 shadow-lg group border border-violet-500/20">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Inclusive workplace meeting" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold">Inclusive Workspace</div>
              </div>
            </div>
            <div className="scroll-reveal delay-200 relative rounded-2xl overflow-hidden h-64 shadow-lg group border border-[#3B82F6]/20">
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Women in tech leadership" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold">Leadership</div>
              </div>
            </div>
            <div className="scroll-reveal delay-300 relative rounded-2xl overflow-hidden h-64 shadow-lg group border border-violet-500/20">
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Global diverse workforce" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold">Global Workforce</div>
              </div>
            </div>
          </div>

          <div className="text-center scroll-reveal delay-400">
            <Link to="/careers">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90 text-lg px-8 py-6">
                Join Our Team
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center scroll-reveal">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Whether you need a full managed team or strategic advisory, we're ready to deliver results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact?type=client">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services/managed-services">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
