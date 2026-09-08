import React from 'react';
import { CinematicReveal, MagneticElement } from '../animations';
import { ArrowRight, Sparkles } from 'lucide-react';
import { companyContact } from '../../data/navigationData';

export function QuickContactBanner({ onOpenBooking }) {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070ba]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CinematicReveal intensity="cinematic">
          <div 
            className="p-8 sm:p-14 rounded-3xl bg-cover bg-center border border-slate-800 shadow-2xl relative overflow-hidden"
            style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.75)), url(/assets/img/banner/7.jpg)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ready To Transform Your Architecture?
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-display text-white leading-tight">
                  Easy solutions for all <strong>complex IT problems</strong>, keeping your business secure.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Connect directly with our senior engineering architects in Hyderabad (Phone: {companyContact.phone}) for an in-depth code and infrastructure consultation.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
                <MagneticElement strength={14}>
                  <button
                    onClick={onOpenBooking}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0070ba] to-cyan-500 hover:from-[#005c99] hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticElement>
                <div className="text-[11px] text-slate-400">
                  {companyContact.address}
                </div>
              </div>
            </div>
          </div>
        </CinematicReveal>
      </div>
    </section>
  );
}

export default QuickContactBanner;
