import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, Database, Bot, Cloud, Cpu, TrendingUp, 
  ArrowLeft, CheckCircle2, Clock, ShieldCheck, 
  Terminal, Sparkles, ArrowRight, Download, Calendar,
  ExternalLink, BarChart3, Zap
} from 'lucide-react';
import { detailedServices } from '../data/servicesDetailedData';

const iconMap = {
  Layers, Database, Bot, Cloud, Cpu, TrendingUp
};

export function ServiceDetailPage({ onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = detailedServices.find(s => s.id === id || s.slug === id) || detailedServices[0];
  const Icon = iconMap[service.icon] || TrendingUp;

  const features = service.features || [];
  const phases = service.phases || [];
  const techStack = service.techStack || [];
  const deliverables = service.deliverables || [];

  return (
    <div className="pt-24 sm:pt-28 pb-20 overflow-hidden bg-slate-50/50 dark:bg-[#070913]">
      {/* Breadcrumb & Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-6 sm:mb-8">
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0070ba] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </button>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md bg-[#0070ba]"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0070ba] dark:text-cyan-400 border border-blue-200 dark:border-blue-900 uppercase">
                  {service.category}
                </span>
                {service.subtitle && (
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    • {service.subtitle}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight font-display">
                {service.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#0070ba] dark:text-cyan-400">
                {service.tagline}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0070ba]/20 hover:shadow-xl hover:shadow-[#0070ba]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> For Enquiries
                </button>
                {service.heroMetric && (
                  <div className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    Proven ROI: <span className="text-[#0070ba] dark:text-cyan-400 font-extrabold">{service.heroMetric}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 relative group">
                <img
                  src={service.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"}
                  alt={service.title}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[11px] font-bold self-start mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Live Architecture Blueprint</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{service.tagline}</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Architectural Features */}
      {features.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070ba] dark:text-cyan-400">Core Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">
              Architectural Features & Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 hover:border-[#0070ba]/40 transition-all shadow-xs hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0070ba] dark:text-cyan-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 font-display">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Step-by-Step Implementation Lifecycle */}
      {phases.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070ba] dark:text-cyan-400">Implementation Blueprint</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">
              The 4-Phase Delivery Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {phases.map((phase, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#0070ba] dark:text-cyan-400 font-mono">
                      {phase.step}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {phase.duration}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5">{phase.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack & Deliverables */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 font-display">
                <Terminal className="w-5 h-5 text-[#0070ba]" /> Standard Technology Stack
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                Every technology is carefully selected for high throughput, pipeline velocity, maintainability, and measurable ROI.
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables Checklist */}
          {deliverables.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 font-display">
                <ShieldCheck className="w-5 h-5 text-[#0070ba]" /> Guaranteed Deliverables
              </h3>
              <ul className="space-y-2.5">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#0070ba] dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-[#0a1b3d] to-slate-900 border border-blue-800/60 text-white text-center shadow-xl">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2 font-display">
            Deploy a Dedicated {service.title} Pod
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
            Get an experienced squad of Principal Growth Engineers and MarTech Architects assigned to your roadmap within 5 business days.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-cyan-500/25 hover:opacity-95 transition-all cursor-pointer"
          >
            For Enquiries
          </button>
        </div>
      </section>
    </div>
  );
}

export default ServiceDetailPage;
