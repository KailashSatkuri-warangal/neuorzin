import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { projectsData } from '../../data/projectsData';
import { Button } from '../common/Button';
import { Eye } from 'lucide-react';

export function ProjectsSection({ onSelectProject }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Product Engineering & Design', 'AI & Data Platform', 'Growth & Automation'];

  const filtered = filter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Featured Works"
          title="Our Selected"
          highlightText="Projects & Case Studies"
          description="View the full case study of our recent featured and awesome works that we created for our scaling clients."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30'
                  : 'bg-white dark:bg-surface-card hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-surface-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => { e.target.src = project.fallbackImage; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider text-white bg-dark-900/85 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-xs text-slate-500 font-medium">{project.date}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-1 mb-2 group-hover:text-brand-blue dark:group-hover:text-brand-sky transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200 dark:border-white/10 mb-4">
                    {project.metrics?.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-black text-brand-blue dark:text-brand-sky font-display">{m.value}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  icon={Eye}
                  onClick={() => onSelectProject(project)}
                >
                  View Case Study
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
