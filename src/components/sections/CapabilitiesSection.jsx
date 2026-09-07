import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { capabilitiesData } from '../../data/capabilitiesData';
import { Layers, Database, TrendingUp, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Layers,
  Database,
  TrendingUp,
  Bot
};

const domainThemes = {
  'product-engineering': {
    iconBg: 'bg-brand-purple/10 text-brand-purple dark:text-purple-300',
    accentText: 'text-brand-purple dark:text-cyan-400',
    borderHover: 'hover:border-brand-purple/50',
    metricColor: 'text-brand-purple dark:text-cyan-400'
  },
  'data-engineering': {
    iconBg: 'bg-brand-blue/10 text-brand-blue dark:text-blue-300',
    accentText: 'text-brand-blue dark:text-blue-400',
    borderHover: 'hover:border-brand-blue/50',
    metricColor: 'text-brand-blue dark:text-blue-400'
  },
  'sales-marketing': {
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    accentText: 'text-amber-600 dark:text-amber-400',
    borderHover: 'hover:border-amber-500/50',
    metricColor: 'text-amber-600 dark:text-amber-400'
  },
  'ai-automation': {
    iconBg: 'bg-brand-cyan/10 text-brand-cyan dark:text-cyan-300',
    accentText: 'text-brand-cyan dark:text-cyan-300',
    borderHover: 'hover:border-brand-cyan/50',
    metricColor: 'text-brand-cyan dark:text-cyan-300'
  }
};

export function CapabilitiesSection({ onOpenBooking }) {
  return (
    <section id="capabilities" className="py-24 relative bg-slate-100/60 dark:bg-dark-300/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Processing & Core Capabilities"
          badgeVariant="cyan"
          title="Engineered for"
          highlightText="Modern Digital Scale"
          description="Advanced technology services built for modern digital enterprises, scaling startups, and ambitious technology leaders."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilitiesData.map((cap) => {
            const Icon = iconMap[cap.icon] || Layers;
            const theme = domainThemes[cap.id] || domainThemes['product-engineering'];

            return (
              <div
                key={cap.id}
                className={`group rounded-3xl p-8 bg-white dark:bg-card border border-slate-200 dark:border-border transition-all duration-300 shadow-md hover:shadow-xl relative flex flex-col justify-between ${theme.borderHover}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} border border-slate-200 dark:border-border/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black font-display text-slate-400 dark:text-slate-600 group-hover:text-brand-purple transition-colors">
                      {cap.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-2 group-hover:text-brand-purple transition-colors">
                    {cap.title}
                  </h3>
                  <div className={`text-xs font-bold uppercase tracking-wider ${theme.accentText} mb-4`}>
                    {cap.subtitle}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {cap.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {cap.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mb-6">
                    {cap.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${theme.metricColor}`}>
                      {cap.metric}
                    </span>
                    <button
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:text-brand-purple dark:hover:text-brand-cyan transition-colors cursor-pointer"
                    >
                      Consult Specialists <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default CapabilitiesSection;
