import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { caseStudies, blogPosts } from '../data/mockData';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [managedFlyoutOpen, setManagedFlyoutOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileManagedOpen, setMobileManagedOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Instant scroll to top, even when clicking the same route as current
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

  // Auto-hide nav: hidden when scrolling DOWN past the threshold,
  // returns immediately whenever the user scrolls UP — even mid-page.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 40) {
        setHidden(false);
      } else if (y > lastY) {
        setHidden(true);   // scrolling down
      } else if (y < lastY) {
        setHidden(false);  // scrolling up
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-[#3B82F6]/20 shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      data-testid="site-header"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-2">
          {/* Logo - proportionally scaled to fit header */}
          <Link to="/" className="flex items-center" onClick={scrollTop}>
            <img 
              src="https://customer-assets.emergentagent.com/job_ba897003-eeca-4b0e-8e12-dd77cec76f35/artifacts/mcntdahb_INFOTRON%20Gradient%20Logo%20cropped.png" 
              alt="Infotron Solutions" 
              className="h-12 lg:h-14 w-auto object-contain"
              data-testid="header-logo"
            />
          </Link>

          {/* Desktop Navigation - Refined */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              onClick={scrollTop}
              className={`text-sm font-normal transition-colors duration-300 ${
                isActive('/') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown — Managed Services has a side-flyout for sub-pages */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
            >
              <button
                className="flex items-center gap-1 text-sm font-normal text-gray-300 hover:text-[#3B82F6] transition-colors py-4"
                data-testid="nav-services"
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="flex">
                    {/* Main panel */}
                    <div className="w-72 bg-[#0F172A] border border-[#3B82F6]/20 rounded-lg shadow-2xl py-2" data-testid="services-dropdown">
                      {/* Managed Services with side flyout */}
                      <div
                        className="relative"
                        onMouseEnter={() => setManagedFlyoutOpen(true)}
                      >
                        <Link
                          to="/services/managed-services"
                          className={`flex items-center justify-between px-6 py-3 transition-all ${managedFlyoutOpen ? 'bg-[#3B82F6]/10' : 'hover:bg-[#3B82F6]/10'}`}
                          onClick={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
                        >
                          <div>
                            <div className="font-semibold text-white text-sm">Managed Services</div>
                            <div className="text-xs text-gray-400 mt-1">Run and operate at scale</div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-blue-400/80" />
                        </Link>
                      </div>

                      <Link
                        to="/capital-projects"
                        className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                        onClick={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
                        onMouseEnter={() => setManagedFlyoutOpen(false)}
                      >
                        <div className="font-semibold text-white text-sm">Capital Projects</div>
                        <div className="text-xs text-gray-400 mt-1">Build and execute large programs</div>
                      </Link>
                      <Link
                        to="/services/staff-augmentation"
                        className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                        onClick={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
                        onMouseEnter={() => setManagedFlyoutOpen(false)}
                      >
                        <div className="font-semibold text-white text-sm">Staff Augmentation</div>
                        <div className="text-xs text-gray-400 mt-1">Senior engineers in two weeks</div>
                      </Link>
                      <Link
                        to="/services/business-consulting"
                        className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                        onClick={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
                        onMouseEnter={() => setManagedFlyoutOpen(false)}
                      >
                        <div className="font-semibold text-white text-sm">Business Consulting</div>
                        <div className="text-xs text-gray-400 mt-1">Former CTOs and VPs of Engineering</div>
                      </Link>
                    </div>

                    {/* Side flyout for Managed Services sub-pages */}
                    {managedFlyoutOpen && (
                      <div
                        className="ml-2 w-80 bg-[#0F172A] border border-[#3B82F6]/20 rounded-lg shadow-2xl py-2 animate-fade-in"
                        data-testid="managed-services-flyout"
                      >
                        <div className="px-6 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-300/80 border-b border-white/5">
                          Managed Services
                        </div>
                        <Link
                          to="/services/managed-services/oracle-ams"
                          className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                          onClick={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
                        >
                          <div className="font-semibold text-white text-sm">Oracle Applications (AMS)</div>
                          <div className="text-xs text-gray-400 mt-1">ERP, HCM, SCM run and optimize</div>
                        </Link>
                        <Link
                          to="/services/managed-services/infrastructure-it-operations"
                          className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                          onClick={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
                        >
                          <div className="font-semibold text-white text-sm">Infrastructure & IT Operations</div>
                          <div className="text-xs text-gray-400 mt-1">Standardize, secure, audit-ready</div>
                        </Link>
                        <Link
                          to="/services/managed-services/microsoft-workplace-support"
                          className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                          onClick={() => { setServicesOpen(false); setManagedFlyoutOpen(false); }}
                        >
                          <div className="font-semibold text-white text-sm">Microsoft Workplace & End-User Support</div>
                          <div className="text-xs text-gray-400 mt-1">AI-powered helpdesk and Microsoft 365</div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`text-sm font-normal transition-colors ${
                isActive('/about') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              About
            </Link>

            <div 
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <Link
                to="/resources"
                onClick={scrollTop}
                className={`flex items-center gap-1 text-sm font-normal transition-colors ${
                  location.pathname.startsWith('/resources') || location.pathname.startsWith('/case-studies') || location.pathname.startsWith('/blog')
                    ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
                }`}
                data-testid="nav-resources"
              >
                Resources
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </Link>
              {resourcesOpen && (
                <div className="absolute top-full left-0 pt-3 w-[440px]" data-testid="resources-dropdown">
                  <div className="bg-[#111827] border border-[#3B82F6]/20 rounded-xl shadow-2xl shadow-blue-900/40 overflow-hidden">
                    <div className="grid grid-cols-2 gap-0 divide-x divide-white/5">
                      {/* Case Studies column */}
                      <div className="p-4">
                        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-300/80 mb-3 px-2">Case Studies</div>
                        <div className="space-y-1">
                          {caseStudies.slice(0, 4).map((c) => (
                            <Link
                              key={c.slug}
                              to={`/case-studies/${c.slug}`}
                              onClick={() => { setResourcesOpen(false); window.scrollTo(0, 0); }}
                              className="block px-2 py-2 rounded-md hover:bg-white/[0.04] transition-colors group"
                              data-testid={`dropdown-cs-${c.slug}`}
                            >
                              <div className="text-[13px] font-medium text-white group-hover:text-[#3B82F6] line-clamp-2 leading-snug">
                                {c.title}
                              </div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{c.industry}</div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Blog column */}
                      <div className="p-4">
                        <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-violet-300/80 mb-3 px-2">From the Blog</div>
                        <div className="space-y-1">
                          {blogPosts.slice(0, 4).map((p) => (
                            <Link
                              key={p.slug}
                              to={`/blog/${p.slug}`}
                              onClick={() => { setResourcesOpen(false); window.scrollTo(0, 0); }}
                              className="block px-2 py-2 rounded-md hover:bg-white/[0.04] transition-colors group"
                              data-testid={`dropdown-blog-${p.slug}`}
                            >
                              <div className="text-[13px] font-medium text-white group-hover:text-violet-300 line-clamp-2 leading-snug">
                                {p.title}
                              </div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{p.category} · {p.readTime}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Footer link */}
                    <Link
                      to="/resources"
                      onClick={() => { setResourcesOpen(false); scrollTop(); }}
                      className="block px-4 py-3 text-[12px] font-semibold text-[#3B82F6] hover:text-white text-center bg-[#0F172A] border-t border-white/5 transition-colors"
                    >
                      View all resources →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/careers"
              className={`text-sm font-normal transition-colors ${
                isActive('/careers') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              Careers
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-normal transition-colors ${
                isActive('/contact') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons - Refined with Brand Colors */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/careers">
              <Button variant="ghost" className="text-gray-300 hover:text-[#3B82F6] text-sm font-normal">
                Join Our Team
              </Button>
            </Link>
            <Link to="/contact?type=client">
              <Button className="bg-gradient-to-r from-blue-600 to-violet-500 text-white hover:shadow-lg hover:shadow-blue-600/30 text-sm font-semibold px-6 transition-all duration-300">
                Talk to Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-slate-700">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium text-gray-300" onClick={() => { setMobileMenuOpen(false); scrollTop(); }}>
                Home
              </Link>

              {/* Mobile Services group */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-300 py-1"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  data-testid="mobile-services-toggle"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 mt-3 flex flex-col gap-3 border-l border-white/10">
                    {/* Managed Services parent + sub-list */}
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-sm text-gray-200"
                        onClick={() => setMobileManagedOpen(!mobileManagedOpen)}
                        data-testid="mobile-managed-toggle"
                      >
                        <span>Managed Services</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${mobileManagedOpen ? 'rotate-90' : ''}`} />
                      </button>
                      {mobileManagedOpen && (
                        <div className="pl-4 mt-2 flex flex-col gap-2 border-l border-white/10">
                          <Link to="/services/managed-services/oracle-ams" className="text-xs text-gray-400 py-1" onClick={() => setMobileMenuOpen(false)}>
                            Oracle Applications (AMS)
                          </Link>
                          <Link to="/services/managed-services/infrastructure-it-operations" className="text-xs text-gray-400 py-1" onClick={() => setMobileMenuOpen(false)}>
                            Infrastructure & IT Operations
                          </Link>
                          <Link to="/services/managed-services/microsoft-workplace-support" className="text-xs text-gray-400 py-1" onClick={() => setMobileMenuOpen(false)}>
                            Microsoft Workplace & End-User Support
                          </Link>
                        </div>
                      )}
                    </div>
                    <Link to="/capital-projects" className="text-sm text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                      Capital Projects
                    </Link>
                    <Link to="/services/staff-augmentation" className="text-sm text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                      Staff Augmentation
                    </Link>
                    <Link to="/services/business-consulting" className="text-sm text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                      Business Consulting
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/about" className="text-sm font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/resources" className="text-sm font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Resources
              </Link>
              <Link to="/careers" className="text-sm font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Careers
              </Link>
              <Link to="/contact" className="text-sm font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/contact?type=client" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-500 text-white">
                    Talk to Us
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
