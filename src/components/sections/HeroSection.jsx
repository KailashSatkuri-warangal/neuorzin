import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Cpu, Database, Zap } from 'lucide-react';
import { companyContact } from '../../data/navigationData';
import { 
  CinematicReveal, 
  CinematicContainer, 
  WordReveal, 
  FloatingElement, 
  MagneticElement 
} from '../animations';

export function HeroSection({ onOpenBooking }) {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 lg:pb-24 bg-[#f8fafc] overflow-hidden transition-colors">
      {/* Background Atmosphere Layers */}
      <div className="absolute top-6 -left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#0070ba]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-6 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#00c6ff]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column (Scene 01 Layer A) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            <CinematicReveal intensity="subtle" delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0070ba] text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-xs">
                <Zap className="w-3.5 h-3.5" />
                <span>Next-Gen Product Engineering Studio</span>
              </div>
            </CinematicReveal>

            {/* Movie Title Style Word Reveal */}
            <div>
              <WordReveal
                text="We build apps, data platforms, and"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-slate-900 leading-[1.14] font-display"
                wordClassName="text-slate-900"
                delay={0.12}
                stagger={0.04}
              />
              <CinematicReveal intensity="strong" delay={0.25}>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.14] font-display text-transparent bg-clip-text bg-gradient-to-r from-[#0070ba] via-[#0094e8] to-[#00c6ff] mt-1">
                  AI systems for growing startups
                </div>
              </CinematicReveal>
            </div>

            <CinematicReveal intensity="medium" delay={0.35}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                NeuOrzin is a product engineering studio helping startups from idea → MVP → scale using modern web, mobile, data and AI technologies. Engineering Intelligence, Data Power, Cloud Scale & Quantum Innovation.
              </p>
            </CinematicReveal>

            {/* CTAs & Direct Contact (Scene 01 Layer B) */}
            <CinematicReveal intensity="medium" delay={0.45}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <MagneticElement strength={12}>
                  <button
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white font-bold text-sm shadow-lg shadow-[#0070ba]/20 hover:shadow-xl hover:shadow-[#0070ba]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticElement>

                <a
                  href={`tel:${companyContact.rawPhone || companyContact.phone}`}
                  className="inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center text-sm group-hover:bg-[#0070ba] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block leading-none">
                      Direct Helpline
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0070ba] m-0 leading-tight mt-1 transition-colors">
                      {companyContact.phone}
                    </h5>
                  </div>
                </a>
              </div>
            </CinematicReveal>

            {/* Capability Badges */}
            <CinematicReveal intensity="subtle" delay={0.55}>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-slate-200/80">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0070ba] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700">Autonomous AI</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Database className="w-4 h-4 text-[#0070ba] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700">Data Mesh</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Cpu className="w-4 h-4 text-[#0070ba] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700">Quantum Scale</span>
                </div>
              </div>
            </CinematicReveal>
          </div>

          {/* Right Visual Column (Scene 01 Layer C) */}
          <div className="lg:col-span-6 flex justify-center items-center mt-6 lg:mt-0">
            <CinematicReveal intensity="cinematic" delay={0.2} className="w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px]">
              <FloatingElement duration={6} yOffset={10}>
                <img
                  src="/assets/img/illustration/2.png"
                  alt="NeuOrzin Product Engineering"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </FloatingElement>
            </CinematicReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
