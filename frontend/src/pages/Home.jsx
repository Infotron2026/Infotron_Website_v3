import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Server, Users, Briefcase, Zap, Target, Award, 
  TrendingUp, Shield, Globe, ArrowRight, CheckCircle 
} from 'lucide-react';
import { clientLogos, services, whyInfotron, caseStudies, testimonials } from '../data/mockData';

// cubic-bezier(0.22, 1, 0.36, 1) — easeOutQuint approximation
const easeOutPortal = (t) => {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 5);
};
const lerp = (a, b, t) => a + (b - a) * t;

const Home = () => {
  const observerRef = useRef(null);
  const heroRef = useRef(null);
  const oRef = useRef(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [oAnchor, setOAnchor] = useState({ x: 0, y: 0, r: 60 });
  const [viewport, setViewport] = useState({ w: 1, h: 1 });

  // Measure initial O center + radius (used as starting point for the mask peephole)
  useLayoutEffect(() => {
    const measure = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      if (!oRef.current) return;
      const r = oRef.current.getBoundingClientRect();
      setOAnchor({
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        r: Math.min(r.width, r.height) / 2,
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Pinned scroll progress 0 → 1 (over heroSection.height − 100vh)
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setHeroProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // ----- Animation curves -----
  // Hero content fade (BOTH left + right side fade in unison)
  const heroContentOpacity = 1 - easeOutPortal(Math.max(0, Math.min(1, heroProgress / 0.18)));

  // Overlay activation: fades in quickly so the mask peephole appears just as the inline O fades out
  const overlayOpacity = easeOutPortal(Math.max(0, Math.min(1, heroProgress / 0.15)));

  // Mask geometry — peephole expansion
  const expandT = easeOutPortal(Math.max(0, Math.min(1, (heroProgress - 0.05) / 0.85)));
  const viewportDiag = Math.sqrt(viewport.w * viewport.w + viewport.h * viewport.h);
  const maskRadius = lerp(oAnchor.r, viewportDiag * 0.7, expandT); // grows past viewport bounds
  const maskCenterX = lerp(oAnchor.x, viewport.w / 2, expandT);
  const maskCenterY = lerp(oAnchor.y, viewport.h / 2, expandT);

  // For backwards compatibility in JSX (was used; now disabled — everything fades together)
  const textOpacity = heroContentOpacity;


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
      {/* HERO SECTION — Pinned scroll: section is tall, inner sticky stays in viewport while overlay takes over */}
      <section
        ref={heroRef}
        className="relative"
        style={{ height: '280vh' }}
      >
        <div
          className="sticky top-0 h-screen w-full flex items-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #050B1A 0%, #0A192F 35%, #1E3A8A 70%, #4C1D95 100%)' }}
        >

        {/* FULLSCREEN PORTAL OVERLAY — absolute inside sticky inner, so it scrolls away with the hero after the pin releases */}
        <div
          className="absolute inset-0 pointer-events-none will-change-[opacity]"
          style={{
            opacity: overlayOpacity,
            zIndex: 70,
            visibility: heroProgress > 0.001 ? 'visible' : 'hidden',
          }}
          data-testid="hero-portal-overlay"
          aria-hidden="true"
        >
          {/* Video layer — fills the sticky viewport, plays underneath the dark mask */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            data-testid="hero-portal-video"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/media/portal-tunnel.mp4" type="video/mp4" />
          </video>

          {/* Dark mask with circular peephole — peephole grows from O's position to fill screen */}
          <div
            className="absolute inset-0 bg-[#04050E] will-change-[mask-image]"
            style={{
              WebkitMaskImage: `radial-gradient(circle ${maskRadius}px at ${maskCenterX}px ${maskCenterY}px, transparent ${Math.max(0, maskRadius - 1)}px, #000 ${maskRadius}px)`,
              maskImage: `radial-gradient(circle ${maskRadius}px at ${maskCenterX}px ${maskCenterY}px, transparent ${Math.max(0, maskRadius - 1)}px, #000 ${maskRadius}px)`,
            }}
          />
        </div>
        {/* Animated mesh glow layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', animation: 'float-slow 14s ease-in-out infinite' }}
          />
          <div
            className="absolute top-1/4 right-0 w-[640px] h-[640px] rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', animation: 'float-slow 18s ease-in-out infinite reverse' }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', animation: 'float-slow 22s ease-in-out infinite' }}
          />
        </div>

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050B1A]/60 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="lg:col-span-7 animate-fade-in-up will-change-[opacity]" style={{ opacity: heroContentOpacity }}>
              {/* Trust pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white/80 text-xs font-semibold tracking-[0.18em] uppercase mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                </span>
                Trusted by enterprise delivery teams
              </div>

              <h1 className="text-[clamp(2.5rem,5.2vw,4.75rem)] font-black text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                <span className="bg-gradient-to-r from-blue-400 via-violet-300 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 6s linear infinite' }}>
                  Outcomes.
                </span>
                <br />
                <span className="text-white">Not Headcount.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-5 leading-relaxed max-w-2xl font-medium">
                Full-stack engineering teams that own delivery.
              </p>
              <p className="text-base lg:text-lg text-gray-400 mb-10 max-w-2xl">
                Built for technology leaders who measure results, not hours.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link to="/contact?type=client" data-testid="hero-primary-cta">
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] text-base font-semibold px-10 py-7 rounded-lg transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Talk to Our Team
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
                <Link to="/careers" data-testid="hero-secondary-cta">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/40 text-base font-semibold px-10 py-7 rounded-lg transition-all duration-300 backdrop-blur"
                  >
                    View Open Positions
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — INFOTRON Wordmark with Portal "O" */}
            <div className="lg:col-span-5 relative animate-fade-in will-change-[opacity]" style={{ opacity: heroContentOpacity }}>
              {/* Background panel — clipped to rounded-2xl; all decorative layers live here */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#04050E] shadow-2xl shadow-purple-900/50 overflow-hidden">

                {/* Deep galaxy base — near-black navy/purple */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, #02030A 0%, #060A22 30%, #0E0C2E 55%, #1B0B3A 78%, #2A0E4D 100%)',
                    backgroundSize: '180% 180%',
                    animation: 'hero-bg-drift 22s ease-in-out infinite'
                  }}
                />

                {/* Galaxy nebula clouds — deeper purples and indigos */}
                <div
                  className="absolute -top-24 -right-20 w-[22rem] h-[22rem] rounded-full blur-3xl opacity-55 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(76,29,149,0.65) 0%, rgba(49,16,107,0.30) 45%, transparent 75%)',
                    animation: 'hero-blob-a 18s ease-in-out infinite'
                  }}
                />
                <div
                  className="absolute -bottom-28 -left-16 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-45 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(30,58,138,0.65) 0%, rgba(15,23,80,0.30) 45%, transparent 75%)',
                    animation: 'hero-blob-b 26s ease-in-out infinite'
                  }}
                />
                <div
                  className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(91,33,182,0.55) 0%, transparent 70%)'
                  }}
                />

                {/* Starfield — tiny static specks (CSS only, no library) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-90"
                  style={{
                    backgroundImage: `
                      radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.85), transparent 60%),
                      radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,0.75), transparent 60%),
                      radial-gradient(1px 1px at 44% 36%, rgba(196,181,253,0.85), transparent 60%),
                      radial-gradient(1.2px 1.2px at 62% 22%, rgba(255,255,255,0.95), transparent 60%),
                      radial-gradient(1px 1px at 78% 64%, rgba(147,197,253,0.85), transparent 60%),
                      radial-gradient(1px 1px at 88% 32%, rgba(255,255,255,0.7), transparent 60%),
                      radial-gradient(1px 1px at 18% 88%, rgba(167,139,250,0.7), transparent 60%),
                      radial-gradient(1px 1px at 56% 84%, rgba(255,255,255,0.6), transparent 60%),
                      radial-gradient(1.4px 1.4px at 36% 12%, rgba(255,255,255,0.85), transparent 60%),
                      radial-gradient(1px 1px at 72% 8%, rgba(196,181,253,0.7), transparent 60%),
                      radial-gradient(1px 1px at 6% 52%, rgba(147,197,253,0.7), transparent 60%),
                      radial-gradient(1px 1px at 92% 78%, rgba(255,255,255,0.7), transparent 60%)
                    `,
                    animation: 'starfield-twinkle 6s ease-in-out infinite'
                  }}
                />

                {/* Faint grid texture (kept inside right container only) */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)'
                  }}
                />

                {/* Inner vignette for extra depth */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 35%, rgba(2,3,12,0.55) 85%, rgba(2,3,12,0.85) 100%)'
                  }}
                />

                {/* Top hairline accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent pointer-events-none" />
              </div>
              {/* End of clipped background panel */}

              {/* Wordmark layer — same min-height/padding as panel but NOT clipped, so the O can scale beyond */}
              <div className="relative min-h-[480px] lg:min-h-[560px] p-8 lg:p-10 flex items-center justify-center">
                {/* Wordmark — cinematic INFOTRON with portal "O" as the literal 4th letter */}
                <div
                  className="relative z-10 flex items-center justify-center select-none w-full"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', 'Helvetica Neue', system-ui, -apple-system, sans-serif"
                  }}
                  data-testid="hero-infotron-wordmark"
                  aria-label="INFOTRON"
                >
                  {['I', 'N', 'F', 'O', 'T', 'R', 'O', 'N'].map((ch, i) => {
                    const isPortalO = i === 3;

                    // Cinematic Portal O — still the 4th letter, just rendered as a portal
                    if (isPortalO) {
                      return (
                        <span
                          key={i}
                          ref={oRef}
                          className="relative inline-flex items-center justify-center shrink-0"
                          style={{
                            fontSize: 'clamp(3.6rem, 7.8vw, 6.4rem)', // ~1.5x scale of body letters
                            width: '1.18em',
                            height: '1.18em',
                            margin: '0 0.04em',
                            verticalAlign: 'middle'
                          }}
                          aria-hidden="true"
                        >
                          {/* Wide outer halo — soft purple/blue bloom */}
                          <span
                            className="absolute rounded-full pointer-events-none"
                            style={{
                              inset: '-32%',
                              background:
                                'radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(59,130,246,0.28) 35%, rgba(139,92,246,0.10) 60%, transparent 78%)',
                              filter: 'blur(28px)',
                              animation: 'portal-aura 7s ease-in-out infinite'
                            }}
                          />

                          {/* Chrome metallic ring (the rim of the portal) */}
                          <span
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                'conic-gradient(from 220deg, #C7D2FE 0%, #ffffff 12%, #A78BFA 28%, #4C1D95 45%, #1E3A8A 58%, #93C5FD 72%, #ffffff 86%, #C7D2FE 100%)',
                              padding: '6%',
                              animation: 'portal-ring-rotate 16s linear infinite'
                            }}
                          >
                            {/* Inner cutout to leave only the ring visible */}
                            <span
                              className="block w-full h-full rounded-full"
                              style={{ background: '#0A0F2A' }}
                            />
                          </span>

                          {/* Inner ring inset shading */}
                          <span
                            className="absolute rounded-full pointer-events-none"
                            style={{
                              inset: '6.5%',
                              boxShadow:
                                'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(0,0,0,0.55), 0 0 28px rgba(139,92,246,0.45)'
                            }}
                          />

                          {/* Deep tunnel core — radial perspective */}
                          <span
                            className="absolute rounded-full overflow-hidden"
                            style={{
                              inset: '11%',
                              background:
                                'radial-gradient(circle at 50% 55%, #93C5FD 0%, #6366F1 8%, #1E3A8A 22%, #1E1B4B 50%, #050518 100%)'
                            }}
                          >
                            {/* Looping abstract video — initial state, plays inside the inline O */}
                            <video
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                              data-testid="hero-inline-portal-video"
                              className="absolute top-1/2 left-1/2 w-full h-full object-cover pointer-events-none"
                              style={{
                                transform: 'translate(-50%, -50%) scale(0.92)',
                                opacity: 0.82,
                                filter: 'none',
                                mixBlendMode: 'screen'
                              }}
                            >
                              <source src="/media/portal-tunnel.mp4" type="video/mp4" />
                            </video>

                            {/* Rotating data-streak conic lines */}
                            <span
                              className="absolute inset-0"
                              style={{
                                background:
                                  'conic-gradient(from 0deg, transparent 0deg, rgba(147,197,253,0.55) 8deg, transparent 16deg, transparent 40deg, rgba(196,181,253,0.45) 50deg, transparent 60deg, transparent 100deg, rgba(147,197,253,0.40) 110deg, transparent 120deg, transparent 170deg, rgba(196,181,253,0.50) 180deg, transparent 190deg, transparent 230deg, rgba(147,197,253,0.45) 240deg, transparent 250deg, transparent 300deg, rgba(196,181,253,0.40) 312deg, transparent 322deg, transparent 360deg)',
                                mixBlendMode: 'screen',
                                opacity: 0.9,
                                animation: 'portal-streaks 10s linear infinite'
                              }}
                            />

                            {/* Concentric perspective rings (depth tunnel) */}
                            <span className="absolute inset-0 pointer-events-none">
                              <span className="absolute rounded-full" style={{ inset: '8%',  border: '1px solid rgba(147,197,253,0.18)' }} />
                              <span className="absolute rounded-full" style={{ inset: '20%', border: '1px solid rgba(147,197,253,0.22)' }} />
                              <span className="absolute rounded-full" style={{ inset: '32%', border: '1px solid rgba(196,181,253,0.28)' }} />
                              <span className="absolute rounded-full" style={{ inset: '42%', border: '1px solid rgba(196,181,253,0.35)' }} />
                            </span>

                            {/* Central light burst / lens flare */}
                            <span
                              className="absolute rounded-full pointer-events-none"
                              style={{
                                top: '50%',
                                left: '50%',
                                width: '32%',
                                height: '32%',
                                transform: 'translate(-50%, -50%)',
                                background:
                                  'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(191,219,254,0.55) 25%, rgba(167,139,250,0.20) 55%, transparent 80%)',
                                filter: 'blur(2px)',
                                animation: 'portal-core 4.5s ease-in-out infinite'
                              }}
                            />

                            {/* Crisp center pinpoint */}
                            <span
                              className="absolute rounded-full pointer-events-none"
                              style={{
                                top: '50%',
                                left: '50%',
                                width: '7%',
                                height: '7%',
                                transform: 'translate(-50%, -50%)',
                                background: '#ffffff',
                                boxShadow: '0 0 14px 4px rgba(255,255,255,0.85), 0 0 32px 10px rgba(167,139,250,0.55)'
                              }}
                            />

                            {/* Light shaft cross — anamorphic flare */}
                            <span
                              className="absolute pointer-events-none"
                              style={{
                                top: '50%',
                                left: '50%',
                                width: '120%',
                                height: '2px',
                                transform: 'translate(-50%, -50%)',
                                background:
                                  'linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.6) 35%, rgba(255,255,255,0.95) 50%, rgba(196,181,253,0.6) 65%, transparent 100%)',
                                filter: 'blur(0.6px)',
                                opacity: 0.85
                              }}
                            />
                            <span
                              className="absolute pointer-events-none"
                              style={{
                                top: '50%',
                                left: '50%',
                                width: '2px',
                                height: '120%',
                                transform: 'translate(-50%, -50%)',
                                background:
                                  'linear-gradient(180deg, transparent 0%, rgba(147,197,253,0.45) 35%, rgba(255,255,255,0.9) 50%, rgba(196,181,253,0.45) 65%, transparent 100%)',
                                filter: 'blur(0.6px)',
                                opacity: 0.7
                              }}
                            />
                          </span>

                          {/* Top specular highlight on the chrome rim */}
                          <span
                            className="absolute rounded-full pointer-events-none"
                            style={{
                              top: '4%',
                              left: '20%',
                              width: '46%',
                              height: '14%',
                              background:
                                'radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, transparent 70%)',
                              filter: 'blur(1.5px)'
                            }}
                          />

                          {/* Bottom specular reflection */}
                          <span
                            className="absolute rounded-full pointer-events-none"
                            style={{
                              bottom: '5%',
                              right: '18%',
                              width: '36%',
                              height: '10%',
                              background:
                                'radial-gradient(ellipse, rgba(196,181,253,0.55) 0%, transparent 75%)',
                              filter: 'blur(2px)'
                            }}
                          />
                        </span>
                      );
                    }

                    // Other letters — premium chrome/blue gradient with subtle sheen
                    return (
                      <span
                        key={i}
                        className="relative font-extrabold leading-none shrink-0 will-change-[opacity,transform]"
                        style={{
                          fontSize: 'clamp(2.4rem, 5.2vw, 4.3rem)',
                          letterSpacing: '-0.01em',
                          background:
                            'linear-gradient(180deg, #ffffff 0%, #DBE7FF 45%, #B4A8E0 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter:
                            'drop-shadow(0 1px 0 rgba(255,255,255,0.25)) drop-shadow(0 6px 20px rgba(76,29,149,0.45))',
                          opacity: textOpacity
                        }}
                      >
                        {/* Sheen overlay */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.55) 50%, transparent 62%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            backgroundSize: '220% 100%',
                            animation: `wordmark-sheen 9s ease-in-out ${i * 0.25}s infinite`,
                            mixBlendMode: 'screen'
                          }}
                        >
                          {ch}
                        </span>
                        {ch}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
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

          {/* Services Grid - Unified Consistent Cards */}
          <div className="flex justify-center">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1400px]">
            {services.map((service, index) => {
              const IconComponent = service.icon === 'Server' ? Server : service.icon === 'Users' ? Users : Briefcase;
              // Subtle accent variation only on the icon glow - NOT the card body
              const accentGlows = [
                'from-blue-400/30 to-blue-500/10',
                'from-violet-400/30 to-blue-500/10',
                'from-blue-400/30 to-violet-500/10'
              ];

              return (
                <Link
                  key={service.id}
                  to={service.href}
                  data-testid={`service-card-${service.id}`}
                  className={`feature-card group relative p-10 lg:p-14 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2E4BA8] to-[#4C3CA8] border border-white/10 shadow-xl shadow-blue-900/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 hover:border-white/20 transition-all duration-500 overflow-hidden scroll-reveal delay-${index * 200 + 200}`}
                >
                  {/* Top thin accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  {/* Unified dot pattern */}
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  {/* Subtle hover glow (same for all cards) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with subtle accent variation */}
                    <div className="mb-8">
                      <div className={`relative w-24 h-24 rounded-2xl flex items-center justify-center mb-6 bg-white/15 backdrop-blur-sm border border-white/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accentGlows[index]} opacity-60`} />
                        <IconComponent className="w-11 h-11 text-white relative z-10" strokeWidth={2} />
                      </div>
                      <div className="text-xs font-mono tracking-[0.2em] text-white/60 uppercase">
                        0{index + 1} / 03
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

      {/* Enterprise Outcomes Strip — Premium Editorial Panels */}
      <section className="py-20 bg-[#0A192F] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blue-300/80 mb-3 block">
                How Enterprise Teams Win
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-2xl">
                Built for the pace and scale of real delivery.
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Global Delivery */}
            <div
              className="group relative rounded-2xl overflow-hidden h-80 border border-white/10 hover:border-white/25 transition-colors duration-500"
              data-testid="banner-global-delivery"
              style={{ background: 'linear-gradient(140deg, #0A192F 0%, #1E3A8A 55%, #2563EB 100%)' }}
            >
              {/* Abstract mesh glow */}
              <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full blur-3xl opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 65%)' }} />
              {/* Grid */}
              <div className="absolute inset-0 opacity-[0.09]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              {/* Orbit rings */}
              <svg className="absolute right-6 top-6 opacity-30" width="180" height="180" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="70" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2 4" />
                <circle cx="90" cy="90" r="50" stroke="#ffffff" strokeWidth="0.7" />
                <circle cx="90" cy="90" r="30" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2 4" />
                <circle cx="90" cy="20" r="3" fill="#93C5FD" />
                <circle cx="160" cy="90" r="3" fill="#A78BFA" />
                <circle cx="90" cy="140" r="2.5" fill="#60A5FA" />
              </svg>

              <div className="relative h-full flex flex-col justify-between p-7">
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-white/60">01 / Delivery</span>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-2">Global Delivery, Locally Aligned</div>
                  <div className="text-sm text-blue-100/80 leading-relaxed">
                    Four hubs across the US, Canada, UK, and India moving in your time zone.
                  </div>
                </div>
              </div>
            </div>

            {/* Ownership / Collaboration */}
            <div
              className="group relative rounded-2xl overflow-hidden h-80 border border-white/10 hover:border-white/25 transition-colors duration-500"
              data-testid="banner-ownership"
              style={{ background: 'linear-gradient(140deg, #0A192F 0%, #3730A3 55%, #6D28D9 100%)' }}
            >
              <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 transition-opacity duration-700 group-hover:opacity-70"
                style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 65%)' }} />
              <div className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              {/* Network lines */}
              <svg className="absolute top-0 right-0 w-full h-full opacity-[0.22]" viewBox="0 0 400 400" preserveAspectRatio="none">
                <g stroke="#ffffff" strokeWidth="0.5" fill="none">
                  <path d="M 40 60 L 200 120 L 340 60" />
                  <path d="M 40 60 L 160 220 L 340 60" />
                  <path d="M 200 120 L 160 220 L 280 280" />
                  <path d="M 280 280 L 340 60" />
                </g>
                <g fill="#A78BFA">
                  <circle cx="40" cy="60" r="3.5" />
                  <circle cx="200" cy="120" r="3.5" />
                  <circle cx="340" cy="60" r="3.5" />
                  <circle cx="160" cy="220" r="3.5" />
                  <circle cx="280" cy="280" r="3.5" />
                </g>
              </svg>

              <div className="relative h-full flex flex-col justify-between p-7">
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-white/60">02 / Ownership</span>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-2">Teams That Own Outcomes</div>
                  <div className="text-sm text-violet-100/80 leading-relaxed">
                    Senior engineers accountable for delivery, not just hours.
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Delivery */}
            <div
              className="group relative rounded-2xl overflow-hidden h-80 border border-white/10 hover:border-white/25 transition-colors duration-500"
              data-testid="banner-exec-delivery"
              style={{ background: 'linear-gradient(140deg, #050B1A 0%, #1E3A8A 60%, #3B82F6 100%)' }}
            >
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-35 transition-opacity duration-700 group-hover:opacity-55"
                style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 65%)' }} />
              <div className="absolute inset-0 opacity-[0.09]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              {/* Bar chart metaphor */}
              <div className="absolute right-6 top-6 flex items-end gap-1.5 h-24">
                {[40, 62, 48, 78, 92, 70, 88].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-sm bg-gradient-to-t from-blue-500/70 to-white/90"
                    style={{ height: `${h}%`, animation: `slide-in-left 1.4s ease-out ${0.08 * i}s both` }}
                  />
                ))}
              </div>

              <div className="relative h-full flex flex-col justify-between p-7">
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-white/60">03 / Impact</span>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-2">Executive-Grade Delivery</div>
                  <div className="text-sm text-blue-100/80 leading-relaxed">
                    Senior leadership engaged from kickoff to transfer, measurable every step.
                  </div>
                </div>
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
                to={`/case-studies/${study.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                data-testid={`home-case-study-${study.slug}`}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white text-[11px] font-semibold tracking-wider uppercase">
                      {study.industry}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <div className="text-xs opacity-90">{study.client}</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold mb-3">{study.impact}</p>
                  <p className="text-gray-600 mb-6 line-clamp-2">{study.challenge}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{study.duration}</span>
                      <span>•</span>
                      <span>{study.teamSize}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
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
