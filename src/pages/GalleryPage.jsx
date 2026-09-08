import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryData } from '../data/galleryData';
import { 
  LayoutGrid, 
  Sparkles, 
  Maximize2, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Server, 
  X, 
  ArrowRight 
} from 'lucide-react';
import { 
  CinematicReveal, 
  CinematicContainer, 
  WordReveal, 
  StaggerContainer, 
  StaggerItem, 
  ImageReveal, 
  FloatingElement 
} from '../components/animations';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function GalleryPage({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeItem, setActiveItem] = useState(null);

  const categories = [
    'All',
    'Architecture Topologies',
    'Command Centers',
    'Quantum Labs',
    'Enterprise Dashboards',
    'Cloud Operations',
    'Engineering HQ'
  ];

  const filteredItems = galleryData.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* Cinematic Header */}
      <section className="relative py-20 sm:py-28 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#0070ba]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CinematicReveal intensity="subtle" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-[#0070ba] dark:text-cyan-400 mb-6 uppercase tracking-widest">
              <LayoutGrid className="w-3.5 h-3.5" />
              Visual Architecture Showcase & Media Labs
            </div>
          </CinematicReveal>

          <WordReveal
            text="Systems & Architecture Gallery"
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight justify-center"
            wordClassName="text-slate-900 dark:text-white"
          />

          <CinematicReveal intensity="medium" delay={0.15}>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore high-fidelity visual architectures, mission control telemetry, cryogenic quantum simulation environments, and client deployments engineered by NeuOrzin.
            </p>
          </CinematicReveal>

          <CinematicReveal intensity="subtle" delay={0.2}>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-8 uppercase tracking-wider">
              <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0070ba] dark:text-cyan-400">Media & Systems Gallery</span>
            </div>
          </CinematicReveal>
        </div>
      </section>

      {/* Filter Tabs & Gallery Grid */}
      <section className="py-20 bg-white dark:bg-[#080a14] transition-colors min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0070ba] text-white shadow-md shadow-[#0070ba]/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Visual Masonry Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <StaggerItem key={item.id}>
                <div
                  onClick={() => setActiveItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {/* Image Container with Cinematic Zoom */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Top Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-400 text-[11px] font-bold uppercase tracking-wider border border-cyan-500/30">
                        {item.category}
                      </span>
                    </div>

                    {/* Expand Icon */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 text-white backdrop-blur-sm">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-base font-extrabold text-white font-display leading-tight mb-1 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                      <div className="mt-2 text-[10px] text-cyan-400 font-mono font-semibold">
                        {item.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* Lightbox / System Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden text-white">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
              <div className="lg:col-span-7 bg-black flex items-center justify-center relative min-h-[320px]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover max-h-[500px]"
                />
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/30 mb-3 inline-block">
                    {activeItem.category}
                  </span>
                  <h3 className="text-2xl font-extrabold font-display leading-tight text-white mb-3">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {activeItem.caption}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">Performance Telemetry</div>
                    <div className="text-xs font-mono text-slate-200">{activeItem.metrics}</div>
                    <div className="text-[11px] text-slate-400">Deployed Industry: {activeItem.clientIndustry}</div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Architectural Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.techStack.map((tech, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      if (onOpenBooking) onOpenBooking();
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0070ba] to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    Deploy Similar System Architecture
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <QuickContactBanner />
    </div>
  );
}
export default GalleryPage;
