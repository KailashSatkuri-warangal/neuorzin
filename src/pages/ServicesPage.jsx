import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { detailedServices } from '../data/servicesDetailedData';
import { ChevronRight, Layers, Database, Shield, BarChart3, Cloud, Cpu, ArrowRight } from 'lucide-react';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function ServicesPage({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Growth & Marketing', 'Core Engineering', 'Data & Cloud', 'AI & Automation', 'Cloud & Infrastructure', 'Next-Gen Research'];

  const filteredServices = selectedCategory === 'All'
    ? detailedServices
    : detailedServices.filter(s => s.category === selectedCategory);

  return (
    <div className="pt-24 overflow-hidden">
      {/* Page Breadcrumb Header */}
      <div className="py-20 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
            Our <strong className="text-[#0070ba] dark:text-cyan-400">Services</strong>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba] dark:text-cyan-400">Services</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-[#0b0d18] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0070ba] text-white shadow-md shadow-[#0070ba]/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#0070ba] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 hover:border-[#0070ba]/50 transition-all shadow-sm hover:shadow-xl hover:translate-y-[-4px] flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0070ba]/10 dark:bg-cyan-500/10 text-[#0070ba] dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-[#0070ba] group-hover:text-white transition-all">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#0070ba] dark:text-cyan-400 uppercase tracking-wider block mb-1">
                    {srv.category}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    <Link to={`/services/${srv.id}`} className="hover:text-[#0070ba] transition-colors">
                      {srv.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-[#0070ba] transition-colors">
                    View Blueprint
                  </span>
                  <Link
                    to={`/services/${srv.id}`}
                    className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center group-hover:bg-[#0070ba] group-hover:text-white transition-all shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuickContactBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}
export default ServicesPage;
