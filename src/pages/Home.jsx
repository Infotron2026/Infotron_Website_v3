import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Server, Users, Briefcase, Zap, Target, Award, 
  TrendingUp, Shield, Globe, ArrowRight, CheckCircle 
} from 'lucide-react';
import { clientLogos, services, whyInfotron, caseStudies, testimonials } from '../data/mockData';

const Home = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
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
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Split Layout */}
      <section className="relative min-h-[90vh] flex items-center" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-[#3B82F6]/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-8">
                Enterprise Technology Delivery
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
                  Outcomes.
                </span>
                <br />
                Not Headcount.
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
                Full-stack engineering teams that own delivery.
              </p>
              <p className="text-lg text-gray-400 mb-10">
                Built for CTOs who measure results, not hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact?type=client">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:shadow-xl hover:shadow-blue-600/30 text-base font-semibold px-10 py-7 rounded-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="flex items-center gap-2">
                      Talk to Our Team
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-[#3B82F6]/50 text-blue-400 hover:bg-blue-600/20 hover:border-[#3B82F6] text-base font-semibold px-10 py-7 rounded-lg transition-all duration-300"
                  >
                    View Open Positions
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3B82F6]/20">
                <img 
                  src="https://images.pexels.com/photos/1181226/pexels-photo-1181226.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Diverse women tech professionals collaborating"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-700/30 to-violet-600/30 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Build. Operate. Transfer. - Delivery Model Section */}
      <section className="py-24 bg-[#0A192F]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Section with subtle gradient background */}
          <div className="relative bg-[#111827]/50 rounded-2xl border border-[#3B82F6]/20 p-12 lg:p-16 shadow-xl backdrop-blur">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600 rounded-t-2xl" />
            
            <div className="text-center mb-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
                Build. Operate. Transfer.
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                A delivery-first model designed for companies that want speed now, and ownership later.
              </p>
            </div>

            {/* Body Copy */}
            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-3xl mx-auto text-center">
              We help companies build high-performing engineering teams, operate them to deliver real outcomes, 
              and transfer full ownership when the organization is ready. This model reduces execution risk, 
              accelerates time-to-market, and ensures long-term continuity, without vendor lock-in.
            </p>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-black text-blue-500">B</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Build</h3>
                <p className="text-gray-400 leading-relaxed">
                  Assemble and onboard senior, outcome-driven teams
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-black text-violet-400">O</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Operate</h3>
                <p className="text-gray-400 leading-relaxed">
                  Own delivery, quality, and execution
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-violet-500/10 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-black bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">T</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Transfer</h3>
                <p className="text-gray-400 leading-relaxed">
                  Seamlessly transition teams, systems, and knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* BOLD SERVICES SECTION - Consulting Style */}
      <section className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 rounded-full filter blur-3xl" />
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header - BOLD */}
          <div className="text-center mb-20 scroll-reveal">
            <div className="inline-block mb-6">
              <span className="text-blue-500 font-black text-sm tracking-[0.2em] uppercase">How We Work</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Three Engagement<br/>Models. One Goal.
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Your results. Our accountability.
            </p>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-violet-500 mx-auto rounded-full" />
          </div>

          {/* Services Grid - BOLD GRAPHIC LAYOUT */}
          <div className="flex justify-center">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1400px]">
            {services.map((service, index) => {
              const IconComponent = service.icon === 'Server' ? Server : service.icon === 'Users' ? Users : Briefcase;
              const gradients = [
                'from-[#1E3A8A] to-[#3B82F6]',
                'from-[#3B82F6] to-[#7C3AED]',
                'from-[#0A192F] to-[#1E3A8A]'
              ];
              
              return (
                <Link
                  key={service.id}
                  to={service.href}
                  className={`feature-card group relative bg-gradient-to-br ${gradients[index]} p-10 lg:p-14 rounded-2xl hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#3B82F6]/20 transition-all duration-500 scroll-reveal delay-${index * 200 + 200}`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Large Icon */}
                    <div className="mb-8">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <IconComponent className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="text-sm font-black tracking-wider text-white/70 uppercase">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-white/90 leading-relaxed mb-8 font-medium">
                      {service.shortDesc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all duration-300">
                      <span className="text-lg">Explore Service</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </Link>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Infotron */}
      <section className="py-32 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Infotron?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not another staffing firm. A delivery partner with skin in the game.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyInfotron.map((item, index) => {
              const IconMap = { Zap, Target, Award, TrendingUp, Shield, Globe };
              const IconComponent = IconMap[item.icon];
              return (
                <div 
                  key={index} 
                  className={`premium-card bg-white rounded-2xl p-8 hover-lift scroll-reveal delay-${index * 100 + 200}`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 icon-glow">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  <div className="mt-4 h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professional Team Banner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden h-72 shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?w=800&h=600&fit=crop&auto=format" 
                alt="Diverse professional team" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">Global Teams</div>
                <div className="text-sm opacity-90">Diverse talent across continents</div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-72 shadow-xl group">
              <img 
                src="https://images.pexels.com/photos/1367272/pexels-photo-1367272.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Multicultural team collaboration" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">Collaborative Culture</div>
                <div className="text-sm opacity-90">World-class engineering teams</div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-72 shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?w=800&h=600&fit=crop&auto=format" 
                alt="Executive professional" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">Executive Leadership</div>
                <div className="text-sm opacity-90">Senior talent, real impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real engagements with Fortune 500 and high-growth companies
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.slice(0, 2).map((study) => (
              <Link
                key={study.id}
                to={`/resources/case-studies/${study.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <div className="text-sm font-semibold mb-1">{study.industry}</div>
                    <div className="text-xs opacity-90">{study.client}</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{study.challenge}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-500">{study.duration}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{study.teamSize}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/resources">
              <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                View All Case Studies
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <div className="inline-block mb-4">
              <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Executive perspectives from CTOs, CPOs, and technology leaders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-card bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 scroll-reveal delay-${index * 100 + 200}`}
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-8 italic text-lg">
                  "{testimonial.quote}"
                </p>
                
                <div className="pt-6 border-t border-gray-700">
                  <div className="font-semibold text-white text-lg">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.title}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Built for Enterprise Delivery
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Infotron Solutions is a US-headquartered IT services and talent solutions firm 
                serving Fortune 500 companies, high-growth SaaS platforms, FinTech innovators, 
                and institutional investors.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We've spent 15+ years building a reputation for execution excellence, 
                delivering mission-critical technology programs that scale businesses and 
                drive measurable ROI.
              </p>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                  About Infotron
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            {/* Professional Team Imagery Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden h-48 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=600&h=400&fit=crop&auto=format" 
                  alt="Professional business consultant" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-48 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=600&h=400&fit=crop&auto=format" 
                  alt="Team meeting in boardroom" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-48 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1580894732930-0babd100d356?w=600&h=400&fit=crop&auto=format" 
                  alt="Software engineer at work" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-48 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573497491207-618cc224f243?w=600&h=400&fit=crop&auto=format" 
                  alt="Business professional leader" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" style={{animation: 'float-slow 15s ease-in-out infinite'}} />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className="scroll-reveal">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                Ready to Get Started?
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Scale Your<br />Technology Capabilities?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how Infotron can accelerate your technology roadmap with 
              elite talent and execution-focused delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact?type=client">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-7 rounded-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    Schedule a Consultation
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
              <Link to="/services/managed-services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-10 py-7 rounded-lg transition-all duration-300"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
