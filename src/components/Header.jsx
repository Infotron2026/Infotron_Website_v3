import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-[#3B82F6]/20 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-2">
          {/* Logo - proportionally scaled to fit header */}
          <Link to="/" className="flex items-center">
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
              className={`text-sm font-normal transition-colors duration-300 ${
                isActive('/') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown - Fixed hover behavior */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-normal text-gray-300 hover:text-[#3B82F6] transition-colors py-4">
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown with invisible bridge to prevent gap */}
              <div className={`absolute top-full left-0 pt-0 ${servicesOpen ? 'block' : 'hidden'}`}>
                <div className="w-72 bg-slate-800 rounded-lg shadow-xl border border-[#3B82F6]/20 py-2 mt-0">
                  <Link
                    to="/services/managed-services"
                    className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                    onClick={() => setServicesOpen(false)}
                  >
                    <div className="font-semibold text-white text-sm">Managed Services</div>
                    <div className="text-xs text-gray-400 mt-1">Full-stack teams that own delivery</div>
                  </Link>
                  <Link
                    to="/services/staff-augmentation"
                    className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                    onClick={() => setServicesOpen(false)}
                  >
                    <div className="font-semibold text-white text-sm">Staff Augmentation</div>
                    <div className="text-xs text-gray-400 mt-1">Senior engineers in 2 weeks</div>
                  </Link>
                  <Link
                    to="/services/business-consulting"
                    className="block px-6 py-3 hover:bg-[#3B82F6]/10 transition-all"
                    onClick={() => setServicesOpen(false)}
                  >
                    <div className="font-semibold text-white text-sm">Business Consulting</div>
                    <div className="text-xs text-gray-400 mt-1">Former CTOs and VPs of Engineering</div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/capital-projects"
              className={`text-sm font-normal transition-colors duration-300 ${
                isActive('/capital-projects') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              Capital Projects
            </Link>

            <Link
              to="/about"
              className={`text-sm font-normal transition-colors ${
                isActive('/about') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              About
            </Link>

            <Link
              to="/resources"
              className={`text-sm font-normal transition-colors ${
                isActive('/resources') ? 'text-[#3B82F6]' : 'text-gray-300 hover:text-[#3B82F6]'
              }`}
            >
              Resources
            </Link>

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
              <Link to="/" className="text-sm font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <div className="text-sm font-medium text-gray-500 px-2">Services:</div>
              <Link to="/services/managed-services" className="text-sm pl-4 text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Managed Services
              </Link>
              <Link to="/services/staff-augmentation" className="text-sm pl-4 text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Staff Augmentation
              </Link>
              <Link to="/services/business-consulting" className="text-sm pl-4 text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Business Consulting
              </Link>
              <Link to="/capital-projects" className="text-sm font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                Capital Projects
              </Link>
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
