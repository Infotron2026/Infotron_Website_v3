import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-[#3B82F6]/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_ba897003-eeca-4b0e-8e12-dd77cec76f35/artifacts/mcntdahb_INFOTRON%20Gradient%20Logo%20cropped.png" 
              alt="Infotron Solutions" 
              className="h-16 w-auto object-contain mb-4"
              data-testid="footer-logo"
            />
            <p className="text-gray-400 mb-6">
              Delivering enterprise IT services, elite talent, and strategic consulting to global organizations.
            </p>
            <a
              href="https://www.linkedin.com/company/infotronsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#3B82F6] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              Follow us on LinkedIn
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#3B82F6]">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/managed-services" className="text-gray-400 hover:text-white transition-colors">
                  Managed Services
                </Link>
              </li>
              <li>
                <Link to="/services/staff-augmentation" className="text-gray-400 hover:text-white transition-colors">
                  Staff Augmentation
                </Link>
              </li>
              <li>
                <Link to="/services/business-consulting" className="text-gray-400 hover:text-white transition-colors">
                  Business Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#3B82F6]">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#3B82F6]">Get in Touch</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3B82F6]" />
                <a href="mailto:contact@infotronsolutions.com" className="hover:text-white transition-colors">
                  contact@infotronsolutions.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3B82F6]" />
                <a href="tel:+17753059399" className="hover:text-white transition-colors">
                  +1 (775) 305 9399
                </a>
              </li>
              <li className="pt-4">
                <Link to="/contact?type=client">
                  <button className="bg-gradient-to-r from-blue-600 to-violet-500 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
                    Schedule Consultation
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Offices */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <h4 className="text-sm font-semibold text-[#3B82F6] mb-6 uppercase tracking-wider">Global Offices</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#3B82F6] mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-white">USA</span><br />
                3225 McLeod Dr. Ste 100<br />
                Las Vegas, NV 89121
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#3B82F6] mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-white">USA</span><br />
                27125 Sierra Hwy, Ste 325<br />
                Santa Clarita, CA 91351
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-white">CANADA</span><br />
                357 Bay Street<br />
                Toronto, ON M5H 4A6
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#3B82F6] mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-white">INDIA</span><br />
                C-20, G Block, Bandra Kurla Complex<br />
                Mumbai, MH 400051
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Infotron Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-[#3B82F6] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-[#3B82F6] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
