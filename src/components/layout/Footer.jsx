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
    <footer className="bg-dark text-light relative bg-[#040d43] text-white pt-20 pb-12 overflow-hidden border-t border-slate-800">
      <div className="fixed-shape absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <img src="/assets/img/map.svg" alt="Shape" className="w-full max-w-5xl h-auto" />
      </div>
      <div className="container relative z-10">
        <div className="f-items default-padding">
          <div className="row">
            <div className="col-lg-4 col-md-6 item mb-6">
              <div className="f-item about space-y-4">
                <Link to="/">
                  <img src="/assets/images/neuorzin-logo-white.png" alt="Logo" className="h-8 w-auto object-contain" />
                </Link>
                <p className="text-slate-300 text-xs leading-relaxed max-w-xs">
                  NeuOrzin delivers enterprise-grade software engineering, sovereign AI agent networks, and high-performance cloud architectures.
                </p>
                <form onSubmit={handleSubscribe} className="relative max-w-xs">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control w-full pl-4 pr-12 py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#0070ba]"
                  />
                  <button type="submit" className="absolute right-1 top-1 bottom-1 w-9 h-9 rounded-full bg-[#0070ba] text-white flex items-center justify-center cursor-pointer">
                    <i className="fa fa-paper-plane text-xs"></i>
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 item mb-6">
              <div className="f-item link">
                <h4 className="widget-title text-sm font-bold uppercase tracking-wider text-white mb-4">Company</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li><Link to="/about" className="hover:text-[#0070ba]">About Us</Link></li>
                  <li><Link to="/approach" className="hover:text-[#0070ba]">Our Approach</Link></li>
                  <li><Link to="/careers" className="hover:text-[#0070ba]">Meet Our Team</Link></li>
                  <li><Link to="/journal" className="hover:text-[#0070ba]">Insights & News</Link></li>
                  <li><Link to="/projects" className="hover:text-[#0070ba]">Case Studies</Link></li>
                  <li><Link to="/contact" className="hover:text-[#0070ba]">Contact Us</Link></li>
                  <li><Link to="/faq" className="hover:text-[#0070ba]">FAQ</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 item mb-6">
              <div className="f-item link">
                <h4 className="widget-title text-sm font-bold uppercase tracking-wider text-white mb-4">Core Pillars</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li><Link to="/services/intelligent-autonomous-systems" className="hover:text-[#0070ba]">Product Intelligence</Link></li>
                  <li><Link to="/services/enterprise-data-operations" className="hover:text-[#0070ba]">Data & AI</Link></li>
                  <li><Link to="/services/cloud-performance-management" className="hover:text-[#0070ba]">Cloud Platform</Link></li>
                  <li><Link to="/services/quantum-enhanced-machine-learning" className="hover:text-[#0070ba]">Quantum Computing</Link></li>
                  <li><Link to="/services/cloud-cost-intelligence" className="hover:text-[#0070ba]">Cloud FinOps</Link></li>
                  <li><Link to="/services/ai-driven-quality-automation" className="hover:text-[#0070ba]">QA Automation</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 item mb-6">
              <div className="f-item">
                <h4 className="widget-title text-sm font-bold uppercase tracking-wider text-white mb-4">Contact Info</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-map-marker-alt text-[#0070ba] mt-0.5"></i>
                    <span>Visit Office: Hyderabad, India</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-envelope-open text-[#0070ba]"></i>
                    <a href="mailto:info@neuorzin.com" className="hover:text-[#0070ba]">info@neuorzin.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-phone text-[#0070ba]"></i>
                    <a href="tel:+917794045500" className="hover:text-[#0070ba]">77940 45500</a>
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
          </div>
        </div>

        <div className="footer-bottom pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>© 2026 NeuOrzin. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
