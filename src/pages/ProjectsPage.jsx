import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { Plus, ArrowUpRight, Search, CheckCircle2 } from 'lucide-react';
import { CountUp } from '../components/common/CountUp';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function ProjectsPage({ onSelectProject, onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Product Engineering', 'Data Engineering', 'Autonomous AI', 'Cloud Architecture', 'Quantum Innovation'];

  const filteredProjects = projectsData.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* Page Breadcrumb Header */}
      <div className="py-16 sm:py-20 bg-[#f4f7fb] border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            Case <strong className="text-[#0070ba]">Studies</strong>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba]">Case Studies</span>
          </div>

          {/* KPI Highlight Strip with CountUp */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 pt-8 border-t border-slate-200/80">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={45} suffix="+" duration={2} />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">Enterprise Deliveries</div>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={99.9} decimals={1} suffix="%" duration={2.2} />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">SLA Uptime</div>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={12} suffix="+" duration={1.8} />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">Industry Awards</div>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-[#0070ba] font-display">
                <CountUp end={100} suffix="%" duration={2} />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">Client Retention</div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0070ba] text-white shadow-md shadow-[#0070ba]/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-[#0070ba] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-3xl overflow-hidden shadow-md bg-slate-900 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onClick={() => onSelectProject && onSelectProject(project)}
              >
                <div className="aspect-[4/4.5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">{project.stats}</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-[#0070ba] transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
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
export default ProjectsPage;
