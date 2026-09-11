import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { industriesData } from '../data/industriesData';
import { 
  Building2, 
  Cpu, 
  ShoppingBag, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Factory,
  GraduationCap,
  Package,
  Building
} from 'lucide-react';

export function IndustriesPage({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(industriesData[0].id);

  const iconMap = {
    Building: Building,
    Building2: Building2,
    HeartPulse: Cpu,
    ShoppingBag: ShoppingBag,
    Factory: Factory,
    GraduationCap: GraduationCap,
    Package: Package,
    Bot: Layers,
    Shield: ShieldCheck
  };

  const activeIndustry = industriesData.find(i => i.id === activeTab) || industriesData[0];
  const Icon = iconMap[activeIndustry.icon] || Building2;

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-[#080a14] text-slate-900 dark:text-white transition-colors duration-200">
      
      {/* Hero / Header Section */}
      <section className="py-12 sm:py-20 bg-[#f4f7fb] dark:bg-[#0c0e1a] border-b border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0070ba]/10 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 border border-[#0070ba]/20">
            Sector-Specific Engineering
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Industries <strong className="text-[#0070ba] dark:text-cyan-400">We Serve</strong>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Tailored digital platforms, IoT telemetry, and growth ecosystems engineered for high-concurrency industry leaders.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba] dark:text-cyan-400">Industries</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Matrix Section */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          
          {/* Industry Tab Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-slate-200/70 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 max-w-4xl mx-auto shadow-inner">
            {industriesData.map((ind) => {
              const isActive = activeTab === ind.id;
              const TabIcon = iconMap[ind.icon] || Building2;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0070ba] text-white shadow-lg shadow-[#0070ba]/25 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 shadow-xs'
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span>{ind.title.split('&')[0].split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Deep-Dive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 bg-gradient-to-br from-slate-900 via-[#0a152e] to-[#040914] text-white border border-slate-800 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start relative z-10">
                
                {/* Left Col: Details */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-400 block">{activeIndustry.number}</span>
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-display text-white">{activeIndustry.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {activeIndustry.description}
                  </p>

                  <div className="space-y-2.5 pt-1 sm:pt-2">
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">Architectural Capabilities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {activeIndustry.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={onOpenBooking}
                      className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#0070ba] to-cyan-500 hover:from-[#005c99] hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>For Enquiries</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-cyan-300 px-3.5 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-center sm:text-left">
                      {activeIndustry.metrics}
                    </span>
                  </div>
                </div>

                {/* Right Col: Technology Stack & Standards */}
                <div className="lg:col-span-5 space-y-4 w-full">
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5 sm:space-y-3">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block">Core Technologies</span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {activeIndustry.technologies.map((t, idx) => (
                        <span key={idx} className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-900/90 text-cyan-300 text-xs font-mono border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block">Industry Standards</span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {activeIndustry.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs border border-slate-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Compliance Frameworks Matrix */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 sm:pb-20">
        <div className="p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">Compliance by Design</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-1.5 sm:mt-2 font-display">
              Certified Security & Regulatory Readiness
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Every system adheres to international privacy, auditability, and cybersecurity frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[
              { title: 'SOC2 Type II', desc: 'Continuous automated compliance telemetry & access control' },
              { title: 'ISO 27001 & 9001', desc: 'Enterprise quality & information security management controls' },
              { title: 'PCI-DSS Level 1', desc: 'Tokenized transaction gateways & cryptographic HSM integration' },
              { title: 'GDPR / CCPA', desc: 'Automated data residency controls & self-serve deletion APIs' },
            ].map((comp, idx) => (
              <div 
                key={idx} 
                className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-center text-center justify-start hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white mb-1 font-display">{comp.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default IndustriesPage;
