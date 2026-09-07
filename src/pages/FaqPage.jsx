import React from 'react';
import { Link } from 'react-router-dom';
import { FaqSection } from '../components/sections/FaqSection';
import { CountUp } from '../components/common/CountUp';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function FaqPage({ onOpenBooking }) {
  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* Page Breadcrumb Header */}
      <div className="py-16 sm:py-20 bg-[#f4f7fb] border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            Frequently Asked <strong className="text-[#0070ba]">Questions</strong>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba]">FAQ</span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-8">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={99.8} decimals={1} suffix="%" duration={2} />
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">Resolution Rate</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={15} suffix=" Min" duration={1.5} />
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </div>

      <FaqSection onOpenBooking={onOpenBooking} />
      <QuickContactBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}
export default FaqPage;
