import React from 'react';
import { Link } from 'react-router-dom';
import { approachSteps, approachPhases } from '../data/approachData';
import { 
  Compass, LayoutGrid, Code2, ShieldCheck, Rocket, Sparkles, 
  ArrowRight, CheckCircle2, Calendar, Layers, Terminal, Zap
} from 'lucide-react';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

const iconMap = {
  Compass,
  LayoutGrid,
  Code2,
  ShieldCheck,
  Rocket,
  Sparkles
};

export function ApproachPage({ onOpenBooking }) {
  return (
    <div className="pt-20 sm:pt-24 overflow-hidden bg-slate-50/50 dark:bg-[#070913]">
      {/* Page Breadcrumb Header */}
      <div className="py-12 sm:py-20 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Our <strong className="text-[#0070ba] dark:text-cyan-400">Approach</strong>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            A Strategic, Engineering-Driven Method to Build Future-Ready Solutions from Scoping to Infinite Scale.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba] dark:text-cyan-400">Our Approach</span>
          </div>
        </div>
      </div>

      {/* Hero Showcase Card with Illustration */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-12 rounded-3xl bg-[#11141c] text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0070ba]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-5 flex justify-center">
              <img
                src="/assets/img/illustration/7.png"
                alt="NeuOrzin Approach"
                className="w-full max-w-[320px] sm:max-w-[380px] h-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="px-3 py-1 rounded-full bg-blue-950/60 border border-blue-900 text-cyan-400 text-xs font-bold uppercase tracking-wider inline-block">
                Core Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-display leading-tight">
                A Strategic, Engineering-Driven Method to Build Future-Ready Solutions
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We combine architectural rigor with high-velocity sprint execution. Every engagement follows a battle-tested blueprint designed for maximum throughput, zero technical debt, and verifiable ROI.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-cyan-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> Schedule Technical Scoping Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Strategic Pillars Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0070ba] dark:text-cyan-400">The 6 Pillars</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
            End-to-End Strategic Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approachSteps.map((step) => {
            const Icon = iconMap[step.icon] || Compass;
            return (
              <div
                key={step.step}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-[#0070ba]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0070ba] dark:text-cyan-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 group-hover:bg-[#0070ba] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-mono text-slate-300 dark:text-slate-700 group-hover:text-[#0070ba] transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display mb-1 group-hover:text-[#0070ba] transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-[#0070ba] dark:text-cyan-400 block mb-3">
                    {step.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                {step.points && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    {step.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0070ba] dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Phase Delivery Framework */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0070ba] dark:text-cyan-400">Execution Cadence</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
            4-Phase Delivery & SRE Guarantee
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approachPhases.map((phase) => (
            <div
              key={phase.step}
              className="p-6 rounded-3xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black font-mono text-[#0070ba] dark:text-cyan-400 block mb-2">
                  {phase.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {phase.title}
                </h3>
                <span className="text-[11px] font-semibold text-slate-400 block mb-3">
                  {phase.subtitle}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {phase.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0070ba] dark:text-cyan-400 block mb-1">
                  Key Deliverable:
                </span>
                <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                  {phase.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuickContactBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}

export default ApproachPage;
