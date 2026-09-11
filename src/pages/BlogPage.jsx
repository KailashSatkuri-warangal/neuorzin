import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { 
  Calendar, User, ArrowRight, Search, Sparkles, TrendingUp
} from 'lucide-react';
import { 
  CinematicReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../components/animations';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function BlogPage({ onSelectArticle, onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    return searchQuery === '' 
      ? true 
      : post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
  });

  return (
    <div className="pt-20 sm:pt-24 overflow-hidden bg-slate-50/50 dark:bg-[#070913]">
      {/* Page Breadcrumb Header */}
      <div className="py-12 sm:py-20 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Marketing & Growth Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Digital Marketing <strong className="text-[#0070ba] dark:text-cyan-400">Insights</strong>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Real-world performance marketing teardowns, organic pipeline strategies, and revenue attribution engineering.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba] dark:text-cyan-400">Digital Marketing Blog</span>
          </div>
        </div>
      </div>

      {/* Main Articles Container */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Bar: Title & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Showing {filteredPosts.length} Strategic Guides
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search marketing guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0070ba] shadow-xs"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No articles found matching "{searchQuery}".
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <div
                  onClick={() => onSelectArticle && onSelectArticle(post)}
                  className="group rounded-3xl bg-white dark:bg-[#0d1222] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-[#0070ba]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
                >
                  <div>
                    {/* Real Photography Image Header */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                      />
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-[#0070ba] shadow-sm">
                          {post.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#0070ba]/90 text-white backdrop-blur-md text-[10px] font-bold">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Article Body */}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#0070ba]" /> {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <User className="w-3.5 h-3.5 text-[#0070ba]" /> {post.author}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-[#0070ba] transition-colors leading-snug font-display mb-3">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Tag Chips */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {post.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Read Article Action Footer */}
                  <div className="px-6 sm:px-8 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-xs font-semibold text-slate-400">
                        {post.authorRole}
                      </span>
                      <span className="text-xs font-bold text-[#0070ba] group-hover:text-[#005c99] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Read Full Guide <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </section>

      <QuickContactBanner onOpenBooking={onOpenBooking} />
    </div>
  );
}

export default BlogPage;
