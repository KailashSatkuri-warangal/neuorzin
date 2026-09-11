import { EMAIL_CONFIG } from '../../data/emailConfig';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { companyContact } from '../../data/navigationData';

export function Footer({ onOpenBooking, onShowToast, theme }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    if (onShowToast) onShowToast(`Subscribed ${email} to NeuOrzin news!`);
    setEmail('');
  };

  return (
    <footer className="relative bg-[#040d43] text-white pt-12 sm:pt-16 pb-8 overflow-hidden border-t border-slate-800">
      <div className="fixed-shape absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <img src="/assets/img/map.svg" alt="Shape" className="w-full max-w-5xl h-auto" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-10">
          
          {/* Col 1: About Brand & Subscribe */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <Link to="/">
              <img src="/assets/images/neuorzin-logo-white.png" alt="NeuOrzin" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              NeuOrzin delivers enterprise-grade software engineering, sovereign AI agent networks, and high-performance cloud architectures.
            </p>
            <form onSubmit={handleSubscribe} className="relative max-w-xs pt-1">
              <input
                type="email"
                required
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#0070ba]"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-2 bottom-1 w-8 h-8 rounded-full bg-[#0070ba] hover:bg-[#005c99] text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Subscribe"
              >
                <i className="fa fa-paper-plane text-[10px]"></i>
              </button>
            </form>
          </div>

          {/* Col 2: Company */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/about" className="hover:text-[#0070ba] transition-colors">About Us</Link></li>
              <li><Link to="/approach" className="hover:text-[#0070ba] transition-colors">Our Approach</Link></li>
              <li><Link to="/careers" className="hover:text-[#0070ba] transition-colors">Meet Our Team</Link></li>
              <li><Link to="/insights" className="hover:text-[#0070ba] transition-colors">Insights</Link></li>
              <li><Link to="/newsroom" className="hover:text-[#0070ba] transition-colors">Newsroom</Link></li>
              <li><Link to="/journal" className="hover:text-[#0070ba] transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#0070ba] transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-[#0070ba] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Col 3: Core Pillars */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">Core Pillars</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/services/intelligent-autonomous-systems" className="hover:text-[#0070ba] transition-colors">Product Intelligence</Link></li>
              <li><Link to="/services/sales-marketing" className="hover:text-[#0070ba] transition-colors">Sales & Marketing Growth</Link></li>
              <li><Link to="/services/crm-revenue-operations" className="hover:text-[#0070ba] transition-colors">CRM & Revenue Operations</Link></li>
              <li><Link to="/services/enterprise-data-operations" className="hover:text-[#0070ba] transition-colors">Data & AI</Link></li>
              <li><Link to="/services/cloud-performance-management" className="hover:text-[#0070ba] transition-colors">Cloud Platform</Link></li>
              <li><Link to="/services/quantum-enhanced-machine-learning" className="hover:text-[#0070ba] transition-colors">Quantum Computing</Link></li>
              <li><Link to="/services/cloud-cost-intelligence" className="hover:text-[#0070ba] transition-colors">Cloud FinOps</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">Contact Info</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-[#0070ba] mt-0.5"></i>
                <span>Visit Office: Hyderabad, India</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope-open text-[#0070ba]"></i>
                <a href={`mailto:${EMAIL_CONFIG.general}`} className="hover:text-[#0070ba] transition-colors">{EMAIL_CONFIG.general}</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-[#0070ba]"></i>
                <a href="tel:+917794045500" className="hover:text-[#0070ba] transition-colors">77940 45500</a>
              </li>
            </ul>

            <div className="social flex items-center gap-2 mt-4">
              {companyContact.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0070ba] text-white flex items-center justify-center text-xs transition-colors"
                  title={s.name}
                  aria-label={s.name}
                >
                  {s.name === 'Facebook' && <i className="fab fa-facebook-f"></i>}
                  {s.name === 'Twitter' && <i className="fab fa-twitter"></i>}
                  {s.name === 'LinkedIn' && <i className="fab fa-linkedin-in"></i>}
                  {s.name === 'Instagram' && <i className="fab fa-instagram"></i>}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>© 2026 NeuOrzin. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
