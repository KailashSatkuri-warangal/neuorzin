import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, CheckCircle2, ArrowRight, Building2, Workflow, GraduationCap, ShieldCheck } from 'lucide-react';
import { CinematicReveal, FadeIn } from '../animations';

export function ClientSpotlightSection({ onOpenBooking }) {
  return (
    <section 
      id="client-spotlight"
      aria-label="Client Case Spotlight"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200/80 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#0070ba]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <CinematicReveal intensity="subtle">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0070ba] text-xs font-bold tracking-wide uppercase shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Success Spotlight &bull; Spectropy</span>
            </div>
          </CinematicReveal>

          <CinematicReveal intensity="medium" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-[1.18]">
              Technology Built Around the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070ba] via-sky-600 to-indigo-600">
                Way You Work
              </span>
            </h2>
          </CinematicReveal>

          <CinematicReveal intensity="subtle" delay={0.2}>
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              How NeuOrzin engineered a purpose-built internal application tailored directly to operational requirements and daily team workflows.
            </p>
          </CinematicReveal>
        </div>

        {/* Bento Grid: 2-Column Desktop / 1-Column Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Primary Executive Endorsement Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <CinematicReveal intensity="medium" delay={0.15} className="h-full">
              <div className="h-full rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-500/5 flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition-all">
                
                {/* Decorative Specular Line */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#0070ba]/40 to-transparent" />

                {/* Big Floating Quote Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#0070ba] to-sky-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mb-6 shrink-0">
                  <Quote className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                </div>

                {/* Main Featured Quote */}
                <div className="space-y-4 flex-1">
                  <blockquote className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 leading-snug font-display tracking-tight">
                    “NEUORZIN understood that our requirement was not simply to build an application, but to create a technology solution that genuinely supports our vision and day-to-day operations.”
                  </blockquote>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                    At <strong className="text-slate-900 font-bold">Spectropy</strong>, we focus on strengthening the academic foundation during the formative years and bridging the critical gap between classroom learning and competitive success.
                  </p>
                </div>

                {/* Executive Citation & Verification Block */}
                <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-center font-black text-base shadow-md shrink-0 ring-2 ring-blue-100">
                      SP
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          CEO, Spectropy
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Client</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Spectropy Education &bull; Academic Excellence Platform
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold font-mono">
                      Custom App Delivery
                    </span>
                  </div>
                </div>

              </div>
            </CinematicReveal>
          </div>

          {/* Right Column: Implementation & Standout Takeaway Bento Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between">
            
            {/* Card 1: Workflow-Centric Implementation */}
            <CinematicReveal intensity="medium" delay={0.25}>
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-lg shadow-blue-500/5 hover:border-slate-300 transition-all space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070ba] flex items-center justify-center shrink-0">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      Workflow-Centric Engineering
                    </h4>
                    <span className="text-[11px] text-[#0070ba] font-bold">
                      Translating Operational Needs
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  NEUORZIN helped us bring this vision into practice by <strong className="text-slate-900 font-bold">designing and implementing our internal application around our specific workflows and operational requirements</strong>. Their team took the time to understand our challenges, translate them into practical technology solutions, and build a system that helps our team work more efficiently.
                </p>
              </div>
            </CinematicReveal>

            {/* Card 2: Highlight Takeaway Callout (Deep Slate/Blue Gradient) */}
            <CinematicReveal intensity="medium" delay={0.35}>
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white p-6 sm:p-7 shadow-xl border border-slate-700/80 relative overflow-hidden group">
                
                {/* Background Glass Flare */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0070ba]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Core Difference</span>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                  “NEUORZIN didn’t just deliver an application. They understood our problem, understood our workflow, and built a solution around the way we work.”
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-sky-300 font-semibold font-display">
                    — CEO, Spectropy
                  </span>
                  {onOpenBooking && (
                    <button
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-sky-300 transition-colors cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Build Your Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </CinematicReveal>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ClientSpotlightSection;
