import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { crmApi } from '../data/crmApi';
import { 
  Calendar, User, ArrowRight, Search, Sparkles, TrendingUp, Loader2, BookOpen
} from 'lucide-react';
import { 
  CinematicReveal, 
  StaggerContainer, 
  StaggerItem 
} from '../components/animations';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function BlogPage({ onSelectArticle, onOpenBooking }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch live published blogs dynamically from database
  useEffect(() => {
    let isMounted = true;
    async function loadPublishedBlogs() {
      setIsLoading(true);
      try {
        const live = await crmApi.getBlogs({ status: 'Published' });
        if (isMounted) {
          if (Array.isArray(live) && live.length > 0) {
            const publishedOnly = live.filter(b => b.status === 'Published');
            const formatted = publishedOnly.map(b => ({
              ...b,
              id: b.id || b.slug,
              slug: b.slug || b.id,
              readTime: b.read_time || b.readTime || '5 min read',
              authorRole: b.author_role || b.authorRole || 'Growth & Marketing Lead',
              date: b.published_at ? new Date(b.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently Published',
              image: b.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
              tags: Array.isArray(b.tags) ? b.tags : []
            }));
            setPosts(formatted);
          } else {
            setPosts([]);
          }
        }
      } catch (err) {
        if (isMounted) setPosts([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadPublishedBlogs();
    return () => { isMounted = false; };
  }, []);

  const filteredPosts = posts.filter((post) => {
    return searchQuery === '' 
      ? true 
      : (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#0070ba] mb-3" />
            <p className="text-sm font-medium">Loading published articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500 max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              {searchQuery ? 'No matching articles found' : 'No articles published yet'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {searchQuery ? `We could not find any articles matching "${searchQuery}". Try a different keyword.` : 'New strategic insights will appear here once published from the Admin CMS.'}
            </p>
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
