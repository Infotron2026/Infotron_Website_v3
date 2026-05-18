import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

const Careers = () => {
  useEffect(() => {
    // Load CEIPAL script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://jobsapi.ceipal.com/APISource/widget.js';
    script.setAttribute('data-ceipal-api-key', 'dC9SNzQyRVlIMTgwdVcweko3Mm5Gdz09');
    script.setAttribute('data-ceipal-career-portal-id', 'Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09');
    script.async = true;
    
    const container = document.getElementById('ceipal-jobs-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      // Cleanup script on unmount
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      <SEO
        title="Careers | Join World-Class Technology Teams"
        description="Open roles at Infotron Solutions. Work on high-impact engineering, AI, cloud, and platform programs with Fortune 500 clients across Americas, EMEA, and APAC."
        path="/careers"
      />
      {/* Hero */}
      <section className="py-24 lg:py-32" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8">
              Join World-Class Technology Teams
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-12">
              Work on complex, high-impact projects with Fortune 500 companies, FinTech innovators, 
              and enterprise clients. Elite talent. Execution excellence. Global opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact?type=candidate">
                <Button size="lg" className="bg-[#3B82F6] hover:bg-[#1E3A8A] transition-colors duration-300 text-white text-lg px-8 py-6">
                  Submit Your Profile
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work with Infotron */}
      <section className="py-20 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Join Infotron?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111827]/50 border border-[#3B82F6]/20 rounded-lg p-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">High-Impact Projects</h3>
              <p className="text-gray-400 leading-relaxed">
                Work on mission-critical systems for Fortune 500 companies, trading platforms handling 
                billions in transactions, and cutting-edge SaaS applications.
              </p>
            </div>
            <div className="bg-[#111827]/50 border border-violet-500/20 rounded-lg p-8">
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Competitive Compensation</h3>
              <p className="text-gray-400 leading-relaxed">
                Market-leading salaries, performance bonuses, comprehensive benefits, and opportunities 
                for rapid career growth based on merit.
              </p>
            </div>
            <div className="bg-[#111827]/50 border border-[#3B82F6]/20 rounded-lg p-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌎</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Flexibility</h3>
              <p className="text-gray-400 leading-relaxed">
                Remote-first culture with opportunities across Americas, EMEA, and APAC. Work from anywhere 
                while collaborating with world-class teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEIPAL Job Listings */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[#050B1A]">
        {/* Ambient brand glow — deep blue / violet, never green or harsh */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(37,99,235,0.16) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 85% 75%, rgba(124,58,237,0.14) 0%, transparent 60%)',
          }}
        />
        {/* Faint dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #93c5fd 1px, transparent 0)',
            backgroundSize: '44px 44px',
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section header — eyebrow + headline + subtitle for native feel */}
          <div className="text-center mb-10 lg:mb-14">
            <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/90 px-3 py-1.5 rounded-full border border-blue-400/25 bg-blue-400/5 mb-5">
              Talent Network
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-3"
              style={{
                fontFamily: "'Playfair Display', 'Libre Baskerville', Georgia, serif",
                letterSpacing: '-0.018em',
                lineHeight: 1.1,
              }}
            >
              Open{' '}
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
                Positions.
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Live roles across our delivery teams. Updated as new requirements come in.
            </p>
          </div>

          {/* Premium dark container with subtle border glow — wraps the embed natively */}
          <div className="relative">
            {/* Soft outer halo for depth */}
            <div
              aria-hidden="true"
              className="absolute -inset-px rounded-3xl pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(124,58,237,0.25) 50%, rgba(59,130,246,0.20) 100%)',
                filter: 'blur(0.5px)',
              }}
            />
            <div
              id="ceipal-jobs-container"
              data-testid="careers-jobs-container"
              className="ceipal-wrapper relative w-full rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0E1B36]/95 to-[#0A1428]/95 backdrop-blur-sm p-4 sm:p-6 lg:p-10 shadow-[0_30px_80px_-30px_rgba(15,30,80,0.7)]"
              style={{ minHeight: '480px' }}
            >
              <div id="example-widget-container" className="w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're always looking for exceptional talent. Submit your profile and we'll reach out 
            when opportunities matching your skills become available.
          </p>
          <Link to="/contact?type=candidate">
            <Button size="lg" className="bg-white text-[#3B82F6] hover:bg-gray-100 text-lg px-8 py-6">
              Submit General Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Careers;
