import React, { useState } from 'react';
import { blogPosts } from '../../data/blogData';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { 
  CinematicReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../animations';

export function BlogSection({ onSelectArticle }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCategories = ['All', 'Insights', 'Newsroom', 'Autonomous AI', 'Data Engineering', 'Cloud Platform', 'Quantum Computing'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTab = activeTab === 'All' 
      ? true 
      : activeTab === 'Insights' 
        ? post.section === 'Insights'
        : activeTab === 'Newsroom'
          ? post.section === 'Newsroom'
          : post.category === activeTab || (post.tags && post.tags.includes(activeTab));

    const matchesSearch = searchQuery === '' 
      ? true 
      : post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="blog-area default-padding py-16 sm:py-24 bg-white dark:bg-[#070913] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <CinematicReveal intensity="medium" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Knowledge, Research & Press</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-display leading-tight">
            Insights & Newsroom
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Deep-dive architectural papers, engineering breakthroughs, quantum research, and company press releases from NeuOrzin.
          </p>
        </CinematicReveal>

        {/* Search & Category Filter Tabs */}
        <CinematicReveal intensity="subtle" delay={0.1}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === cat
                      ? 'bg-[#0070ba] text-white shadow-md shadow-[#0070ba]/20'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & press..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0070ba]"
              />
            </div>
          </div>
        </CinematicReveal>

        {/* Article Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No articles found matching your criteria.
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <div
                  onClick={() => onSelectArticle && onSelectArticle(post)}
                  className="group rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0070ba]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs text-[10px] font-bold text-[#0070ba] shadow-xs">
                          {post.section}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#0070ba]/90 text-white backdrop-blur-xs text-[10px] font-bold shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Article Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#0070ba]" /> {post.date}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#0070ba] transition-colors mb-2.5 font-display">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Tag Bar */}
                  <div className="px-6 pb-6 pt-0">
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{post.author}</span>
                      </div>
                      <span className="text-xs font-bold text-[#0070ba] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </div>
    </div>
  );
}

export default BlogSection;
