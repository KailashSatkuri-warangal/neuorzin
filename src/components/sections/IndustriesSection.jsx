import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { industriesData } from '../../data/industriesData';
import { Building, HeartPulse, ShoppingBag, Bot, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

const iconMap = {
  Building,
  HeartPulse,
  ShoppingBag,
  Bot,
  Shield
};

export function IndustriesSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(industriesData[0].id);
  const activeIndustry = industriesData.find((i) => i.id === activeTab) || industriesData[0];

  return (
    <section id="industries" className="py-24 relative bg-slate-50 dark:bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Domain Engineering"
          badgeVariant="purple"
          title="Engineered for"
          highlightText="Regulated & High-Growth Sectors"
          description="Tailored digital architectures with built-in compliance, high throughput, and industry-specific intelligence."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Industry Selection Column */}
          <div className="lg:col-span-4 space-y-3">
            {industriesData.map((ind) => {
              const Icon = iconMap[ind.icon] || Building;
              const isActive = activeTab === ind.id;

              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-card border-brand-purple/60 shadow-lg shadow-brand-purple/10'
                      : 'bg-white/60 dark:bg-card/40 border-slate-200 dark:border-border hover:border-slate-300 dark:hover:border-border/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-brand-purple text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold font-display ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {ind.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{ind.subtitle}</p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-brand-purple translate-x-1' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Industry Detail Card */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-8 sm:p-10 shadow-xl transition-all">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                    {activeIndustry.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-brand-purple mt-1">
                    {activeIndustry.subtitle}
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan dark:text-cyan-400 text-xs font-mono font-bold">
                  {activeIndustry.metrics}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
                {activeIndustry.description}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Core Engineering Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeIndustry.points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Applied Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {activeIndustry.technologies.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need tailored enterprise specs?</span>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-bold text-xs shadow-md hover:opacity-95 transition-all"
                >
                  Schedule Industry Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default IndustriesSection;
