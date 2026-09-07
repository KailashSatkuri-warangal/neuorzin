import React from 'react';
import { Link } from 'react-router-dom';
import { AboutSection } from '../components/sections/AboutSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { WorkProcessSection } from '../components/sections/WorkProcessSection';
import { TeamSection } from '../components/sections/TeamSection';
import { FunFactorSection } from '../components/sections/FunFactorSection';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function AboutPage({ onOpenBooking }) {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Page Breadcrumb Header */}
      <div className="py-20 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
            About <strong className="text-[#0070ba] dark:text-cyan-400">Us</strong>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba] dark:text-cyan-400">About Company</span>
          </div>
        </div>
      </div>

      <AboutSection onOpenBooking={onOpenBooking} />
      <FeaturesSection onOpenBooking={onOpenBooking} />
      <WorkProcessSection />
      <FunFactorSection />
      <TeamSection />
      <QuickContactBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}
export default AboutPage;
