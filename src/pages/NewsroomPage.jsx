import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsroomData, mediaKitAssets } from '../data/newsroomData';
import { companyContact } from '../data/navigationData';
import { 
  Newspaper, 
  Download, 
  Share2, 
  Calendar, 
  MapPin, 
  ArrowUpRight, 
  Mail, 
  Phone, 
  FileText, 
  Sparkles, 
  X, 
  ExternalLink 
} from 'lucide-react';
import { 
  CinematicReveal, 
  CinematicContainer, 
  WordReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../components/animations';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function NewsroomPage({ onShowToast }) {
  const [activeRelease, setActiveRelease] = useState(null);
  const [filterType, setFilterType] = useState('All');

  const releaseTypes = ['All', 'Press Release', 'Partnership Announcement', 'Company Milestone', 'Industry Recognition'];

  const filteredNews = newsroomData.filter(
    (item) => filterType === 'All' || item.releaseType === filterType
  );

  const handleDownloadAsset = (title) => {
    if (onShowToast) {
      onShowToast(`Downloading media asset: ${title}`, 'info');
    }
  };

  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* Cinematic Header */}
      <section className="relative py-20 sm:py-28 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CinematicReveal intensity="subtle" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-[#0070ba] dark:text-cyan-400 mb-6 uppercase tracking-widest">
              <Newspaper className="w-3.5 h-3.5" />
              Official Press Room & Media Center
            </div>
          </CinematicReveal>

          <WordReveal
            text="Newsroom & Press Releases"
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight justify-center"
            wordClassName="text-slate-900 dark:text-white"
          />

          <CinematicReveal intensity="medium" delay={0.15}>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Official press announcements, corporate milestones, leadership statements, and downloadable media resources from NeuOrzin.
            </p>
          </CinematicReveal>

          <CinematicReveal intensity="subtle" delay={0.2}>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-8 uppercase tracking-wider">
              <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0070ba] dark:text-cyan-400">Newsroom & Media</span>
            </div>
          </CinematicReveal>
        </div>
      </section>

      {/* Main Press Releases Section */}
      <section className="py-20 bg-white dark:bg-[#080a14] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Press Releases */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                  {releaseTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        filterType === type
                          ? 'bg-[#0070ba] text-white shadow'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <StaggerContainer className="space-y-6">
                {filteredNews.map((news) => (
                  <StaggerItem key={news.id}>
                    <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-[#0070ba] dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#0070ba]/10 text-[#0070ba] dark:text-cyan-400 font-bold uppercase tracking-wider">
                          {news.releaseType}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{news.date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{news.location}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display group-hover:text-[#0070ba] dark:group-hover:text-cyan-400 transition-colors mb-3 leading-snug">
                        {news.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                        {news.pressSummary}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800">
                        <div className="flex flex-wrap gap-1.5">
                          {news.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold border border-slate-200 dark:border-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setActiveRelease(news)}
                          className="text-xs font-bold text-[#0070ba] dark:text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          Read Full Release <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Right Column: Media Kit & Press Inquiries */}
            <div className="lg:col-span-4 space-y-8">
              {/* Media Kit Assets */}
              <div className="p-6 rounded-2xl bg-[#f4f7fb] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-[#0070ba] dark:text-cyan-400" />
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                    Official Media Kit (2026)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                  Download approved brand assets, vector logos, and executive biographies for press and media publication.
                </p>

                <div className="space-y-3">
                  {mediaKitAssets.map((asset, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 hover:border-[#0070ba] transition-colors"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{asset.title}</h4>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {asset.type} • {asset.size}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadAsset(asset.title)}
                        aria-label={`Download ${asset.title}`}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-[#0070ba] hover:text-white transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Press Contact Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0070ba] to-[#004e82] text-white shadow-xl">
                <h3 className="text-lg font-extrabold font-display mb-2">Media & Press Inquiries</h3>
                <p className="text-xs text-blue-100 mb-6 leading-relaxed">
                  For press briefings, executive interviews, and editorial inquiries, reach out to our corporate communications desk.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-300" />
                    <span>press@neuorzin.com / info@neuorzin.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-cyan-300" />
                    <span>+91 77940 45500 (77940 45500)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-cyan-300" />
                    <span>Visit Office: Hyderabad, India</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Press Release Reader Modal */}
      {activeRelease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950/60">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-[#0070ba]/10 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  {activeRelease.releaseType}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  {activeRelease.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                  <span>{activeRelease.date}</span>
                  <span>•</span>
                  <span>{activeRelease.location}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveRelease(null)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeRelease.fullRelease }}
            />

            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs text-slate-500">Corporate Communications Desk</span>
              <button
                onClick={() => setActiveRelease(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
              >
                Close Release
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickContactBanner />
    </div>
  );
}
export default NewsroomPage;
