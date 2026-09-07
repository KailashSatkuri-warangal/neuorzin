import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Phone, Mail, MapPin, ArrowRight, Calendar, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { companyContact } from '../../data/navigationData';

export function OffcanvasMenu({ isOpen, onClose, onOpenBooking }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white border-l border-slate-200 shadow-2xl h-full flex flex-col justify-between p-6 sm:p-8 z-10 overflow-y-auto text-slate-900">
        <div>
          {/* Header with Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <Link to="/" onClick={onClose} className="focus:outline-none">
              <img
                src="/assets/images/neuorzin-logo.png"
                alt="NeuOrzin"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="py-6 space-y-1.5 border-b border-slate-200">
            {[
              { name: 'Home', href: '/' },
              { name: 'Services & Capabilities', href: '/services' },
              { name: 'About NeuOrzin', href: '/about' },
              { name: 'Industries', href: '/industries' },
              { name: 'Case Studies / Work', href: '/projects' },
              { name: 'Our Approach', href: '/approach' },
              { name: 'Technical Journal', href: '/journal' },
              { name: 'Careers (Hiring)', href: '/careers' },
              { name: 'FAQ', href: '/faq' },
              { name: 'Contact Engineering', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-800 hover:text-[#0070ba] hover:bg-slate-100 transition-all group"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0070ba] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>

          {/* Contact Details */}
          <div className="py-6 space-y-3.5 text-xs text-slate-700">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Direct Contact</h4>
            <a href={`tel:${companyContact.phone}`} className="flex items-center gap-3 hover:text-[#0070ba] transition-colors">
              <Phone className="w-4 h-4 text-[#0070ba] shrink-0" /> 
              <span className="font-semibold">{companyContact.phone}</span>
            </a>
            <a href={`mailto:${companyContact.email}`} className="flex items-center gap-3 hover:text-[#0070ba] transition-colors">
              <Mail className="w-4 h-4 text-[#0070ba] shrink-0" /> 
              <span className="font-semibold">{companyContact.email}</span>
            </a>
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="w-4 h-4 text-[#0070ba] shrink-0" /> 
              <span>{companyContact.address}</span>
            </div>
          </div>
        </div>

        {/* Action Button & Footer */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <button
            onClick={() => {
              onClose();
              if (onOpenBooking) onOpenBooking();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00c6ff] text-white font-bold text-sm shadow-lg hover:shadow-[#0070ba]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" /> Book Consultation
          </button>

          <div className="flex items-center justify-center gap-4 pt-1">
            {companyContact.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                aria-label={s.name}
                title={`Visit NeuOrzin on ${s.name}`}
              >
                {s.name === 'LinkedIn' && <Linkedin className="w-3.5 h-3.5" />}
                {s.name === 'Twitter' && <Twitter className="w-3.5 h-3.5" />}
                {s.name === 'Instagram' && <Instagram className="w-3.5 h-3.5" />}
                {s.name === 'Facebook' && <Facebook className="w-3.5 h-3.5" />}
              </a>
            ))}
          </div>

          <div className="text-center text-[11px] text-slate-500">
            © 2026 NeuOrzin. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
export default OffcanvasMenu;
