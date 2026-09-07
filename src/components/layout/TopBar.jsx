import React from 'react';
import { MapPin, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { companyContact } from '../../data/navigationData';

export function TopBar() {
  return (
    <div className="hidden lg:block bg-[#0070ba] dark:bg-[#005a96] text-white text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-200" />
            <span>HITEC City Tech Park, Phase 2, Hyderabad, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-cyan-200" />
            <a href="mailto:info@neuorzin.com" className="hover:underline">info@neuorzin.com</a>
          </div>
        </div>

        {/* Right Info & Socials */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-cyan-100">
            <Clock className="w-3.5 h-3.5" />
            <span>Office Hours: 9:00 AM – 7:00 PM IST</span>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            {companyContact.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                title={s.name}
              >
                {s.name === 'Facebook' && <Facebook className="w-3.5 h-3.5" />}
                {s.name === 'Twitter' && <Twitter className="w-3.5 h-3.5" />}
                {s.name === 'LinkedIn' && <Linkedin className="w-3.5 h-3.5" />}
                {s.name === 'Instagram' && <Instagram className="w-3.5 h-3.5" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TopBar;
