import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, Database, Bot, Cloud, Cpu, TrendingUp, 
  ArrowLeft, CheckCircle2, Clock, ShieldCheck, 
  Terminal, Sparkles, ArrowRight, Download, Calendar
} from 'lucide-react';
import { detailedServices } from '../data/servicesDetailedData';

const iconMap = {
  Layers, Database, Bot, Cloud, Cpu, TrendingUp
};

export function ServiceDetailPage({ onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = detailedServices.find(s => s.id === id) || detailedServices[0];
  const Icon = iconMap[service.icon] || Layers;

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Breadcrumb & Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-purple transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </button>
      </div>

      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: service.accentColor }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                {service.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg font-semibold text-brand-blue dark:text-cyan-400 mb-4">
              {service.tagline}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold text-sm shadow-lg hover:shadow-brand-purple/25 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Schedule Technical Scope Call
              </button>
              <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                Proven ROI: <span className="text-brand-purple font-extrabold">{service.heroMetric}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Features */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Architectural Capabilities & Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border hover:border-brand-purple/40 transition-all shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-purple/10 text-brand-purple shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Implementation Lifecycle */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Implementation Blueprint</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2">
            The 4-Phase Delivery Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.phases.map((phase, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue font-mono">
                    {phase.step}
                  </span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {phase.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{phase.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack & Deliverables */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <div className="p-8 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-md">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-brand-purple" /> Standard Technology Stack
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Every technology is carefully selected for high throughput, maintainability, and zero technical debt.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {service.techStack.map((tech, idx) => (
                <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="p-8 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-md">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-cyan" /> Guaranteed Deliverables
            </h3>
            <ul className="space-y-3">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-brand-purple/20 via-brand-blue/20 to-brand-cyan/20 border border-brand-purple/30 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Deploy a Dedicated {service.title} Pod
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
            Get an experienced squad of Principal Architects and Staff Engineers assigned to your roadmap within 5 business days.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-bold text-sm shadow-xl hover:shadow-brand-purple/30 hover:opacity-95 transition-all"
          >
            Start Your Engagement Now
          </button>
        </div>
      </section>
    </div>
  );
}
export default ServiceDetailPage;
