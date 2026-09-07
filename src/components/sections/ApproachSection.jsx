import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { approachSteps } from '../../data/approachData';
import { Compass, LayoutGrid, Code2, ShieldCheck, Rocket, Sparkles } from 'lucide-react';

const iconMap = {
  Compass,
  LayoutGrid,
  Code2,
  ShieldCheck,
  Rocket,
  Sparkles
};

export function ApproachSection() {
  return (
    <section id="approach" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Methodology"
          title="A Strategic, Engineering-Driven Method to"
          highlightText="Build Future-Ready Solutions"
          description="From initial architectural scoping to continuous telemetry and iterative intelligence, here is how we guarantee delivery excellence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {approachSteps.map((step) => {
            const Icon = iconMap[step.icon] || Compass;
            return (
              <div
                key={step.step}
                className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:border-brand-blue/40 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-brand-blue dark:text-brand-sky group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-display text-slate-300 dark:text-slate-700 group-hover:text-brand-blue/40 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-3 group-hover:text-brand-blue dark:group-hover:text-brand-sky transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
