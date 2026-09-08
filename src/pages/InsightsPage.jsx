import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { insightsData } from '../data/insightsData';
import { 
  BookOpen, 
  Search, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  User, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Share2, 
  X 
} from 'lucide-react';
import { 
  CinematicReveal, 
  CinematicContainer, 
  WordReveal, 
  StaggerContainer, 
  StaggerItem, 
  ImageReveal, 
  MagneticElement 
} from '../components/animations';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function InsightsPage({ onShowToast }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInsightModal, setActiveInsightModal] = useState(null);

  const categories = ['All', 'Agentic AI & Swarms', 'Distributed Cloud', 'Quantum Cryptography', 'High-Performance Data Mesh', 'FinOps Telemetry'];

  const filteredInsights = insightsData.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = insightsData[0];

  const handleDownload = (title) => {
    if (onShowToast) {
      onShowToast(`Downloading research paper: "${title.slice(0, 30)}..."`, 'info');
    }
  };

  const handleShare = (title) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) {
        onShowToast(`Research paper link copied to clipboard!`, 'success');
      }
    }
  };

  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* Cinematic Page Header */}
      <section className="relative py-20 sm:py-28 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0070ba]/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CinematicReveal intensity="subtle" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-[#0070ba] dark:text-cyan-400 mb-6 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              NeuOrzin Engineering Research & Monographs
            </div>
          </CinematicReveal>

          <WordReveal
            text="Technical Insights & Research"
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight justify-center"
            wordClassName="text-slate-900 dark:text-white"
          />

          <CinematicReveal intensity="medium" delay={0.15}>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore peer-reviewed architectural monographs, empirical cloud benchmarks, and deep-dive technical papers crafted by our chief scientists and platform architects.
            </p>
          </CinematicReveal>

          <CinematicReveal intensity="subtle" delay={0.2}>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-8 uppercase tracking-wider">
              <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0070ba] dark:text-cyan-400">Insights & Whitepapers</span>
            </div>
          </CinematicReveal>
        </div>
      </section>

      {/* Featured Research Spotlight */}
      {featured && (
        <section className="py-16 bg-white dark:bg-[#0b0f19] border-b border-slate-100 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CinematicReveal intensity="cinematic">
              <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-[#0a152e] to-[#040914] text-white border border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest border border-cyan-500/30 mb-4">
                      Featured Monograph
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight mb-4">
                      {featured.title}
                    </h2>
                    <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                      {featured.abstract}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {featured.keyFindings.map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{finding}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setActiveInsightModal(featured)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0070ba] to-cyan-500 text-white font-bold text-sm shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" /> Read Full Paper
                      </button>
                      <button
                        onClick={() => handleDownload(featured.title)}
                        className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Download PDF Monograph
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
                        <img
                          src={featured.author.avatar}
                          alt={featured.author.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400/60 shadow-md"
                        />
                        <div>
                          <h4 className="text-white font-bold text-sm">{featured.author.name}</h4>
                          <p className="text-xs text-cyan-300">{featured.author.role}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                            <span>{featured.date}</span>
                            <span>•</span>
                            <span>{featured.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Indexed Research Topics</div>
                        <div className="flex flex-wrap gap-1.5">
                          {featured.tags.map((t, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-900/80 text-cyan-300 text-[11px] font-mono border border-slate-700">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CinematicReveal>
          </div>
        </section>
      )}

      {/* Main Filter & Research Catalog */}
      <section className="py-20 bg-slate-50 dark:bg-[#080a14] transition-colors min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#0070ba] text-white shadow-md shadow-[#0070ba]/20'
                      : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#0070ba]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search whitepapers, models, algorithms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0070ba]"
              />
            </div>
          </div>

          {/* Research Grid */}
          {filteredInsights.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInsights.map((paper) => (
                <StaggerItem key={paper.id}>
                  <div className="h-full flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#0070ba]/10 dark:bg-cyan-500/10 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                          {paper.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{paper.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display group-hover:text-[#0070ba] dark:group-hover:text-cyan-400 transition-colors leading-snug mb-3">
                        {paper.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3 mb-6">
                        {paper.abstract}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        {paper.keyFindings.slice(0, 2).map((k, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0070ba] dark:bg-cyan-400 shrink-0 mt-1.5" />
                            <span className="line-clamp-1">{k}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={paper.author.avatar}
                            alt={paper.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{paper.author.name}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{paper.date}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleShare(paper.title)}
                          aria-label="Share paper"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0070ba] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => setActiveInsightModal(paper)}
                        className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#0070ba] hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        Read Research Monograph
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="py-20 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No research monographs match your query</h3>
              <p className="text-xs text-slate-500 mt-2">Try searching for other terms like "Autonomous", "Quantum", "Snowflake", or "FinOps".</p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Paper Reader Modal */}
      {activeInsightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950/60">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#0070ba]/10 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                  {activeInsightModal.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  {activeInsightModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {activeInsightModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveInsightModal(null)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40">
                <h4 className="text-xs font-bold text-cyan-900 dark:text-cyan-300 uppercase tracking-wider mb-2">Executive Abstract</h4>
                <p className="text-xs sm:text-sm text-cyan-950 dark:text-cyan-100">{activeInsightModal.abstract}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Key Empirical Findings</h4>
                <ul className="space-y-2">
                  {activeInsightModal.keyFindings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#0070ba] dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div 
                className="prose dark:prose-invert max-w-none text-xs sm:text-sm"
                dangerouslySetInnerHTML={{ __html: activeInsightModal.content }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeInsightModal.author.avatar}
                  alt={activeInsightModal.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{activeInsightModal.author.name}</div>
                  <div className="text-[10px] text-slate-500">{activeInsightModal.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownload(activeInsightModal.title)}
                  className="px-4 py-2 rounded-xl bg-[#0070ba] text-white font-bold text-xs hover:bg-[#005c99] transition-all flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full Monograph
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <QuickContactBanner />
    </div>
  );
}
export default InsightsPage;
