import React from 'react';
import { Link } from 'react-router-dom';
import { TeamSection } from '../components/sections/TeamSection';
import { FunFactorSection } from '../components/sections/FunFactorSection';
import { CountUp } from '../components/common/CountUp';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function CareersPage({ onShowToast }) {
  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* Page Breadcrumb Header */}
      <div className="py-16 sm:py-20 bg-[#f4f7fb] border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            Join Our <strong className="text-[#0070ba]">Team</strong>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba]">Careers & Team</span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={4.9} decimals={1} suffix="/5" duration={2} />
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">Glassdoor Rating</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={100} suffix="%" duration={1.8} />
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">Remote Flexibility</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 col-span-2 sm:col-span-1">
              <div className="text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={450} suffix="+" duration={2.2} />
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">Engineers Worldwide</div>
            </div>
          </div>
        </div>
      </div>

      <TeamSection />
      <FunFactorSection />
      <QuickContactBanner />
    </div>
  );
}
export default CareersPage;
