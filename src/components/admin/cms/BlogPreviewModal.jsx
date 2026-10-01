import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, X, CheckCircle2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export function BlogPreviewModal({ blog, isOpen, onClose, onPublish }) {
  if (!isOpen || !blog) return null;

  const imgSrc = blog.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
  const categoryText = blog.category || 'Digital Marketing';
  const dateText = blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : (blog.date || 'March 2026');
  const authorText = blog.author || 'NeuOrzin Editorial';
  const authorRoleText = blog.authorRole || blog.author_role || 'Growth & Marketing Lead';
  const introText = blog.intro || blog.excerpt;
  const sections = Array.isArray(blog.sections) ? blog.sections : [];
  const conclusionText = blog.conclusion;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-4xl bg-white dark:bg-[#0d1222] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Article Preview</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Exact public display rendering
            </span>
          </div>
          <div className="flex items-center gap-2">
            {blog.status !== 'Published' && onPublish && (
              <button
                onClick={() => {
                  onPublish(blog.id || blog.slug);
                  onClose();
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Publish Now</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 text-left">
          {/* Header Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0070ba] dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                {categoryText}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
                {blog.readTime || blog.read_time || '6 min read'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-display leading-tight tracking-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1 border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#0070ba]" /> {dateText}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-[#0070ba]" /> {authorText} ({authorRoleText})
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={imgSrc}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Intro Callout */}
          {introText && (
            <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
              {introText}
            </div>
          )}

          {/* Structured Sections */}
          <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {sections && sections.length > 0 ? (
              sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-slate-800 pb-2">
                    {sec.heading}
                  </h3>
                  
                  {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                      {p}
                    </p>
                  ))}

                  {sec.callout && (
                    <div className="my-4 p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border-l-4 border-[#0070ba] text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                      "{sec.callout}"
                    </div>
                  )}

                  {sec.list && (
                    <ul className="space-y-2.5 pl-1">
                      {sec.list.map((item, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#0070ba] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              blog.content && (
                <div className="space-y-4 whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                  {blog.content}
                </div>
              )
            )}

            {/* Conclusion */}
            {conclusionText && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Key Takeaway
                </h4>
                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-sm sm:text-base">
                  {conclusionText}
                </p>
              </div>
            )}

            {/* Tags */}
            {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="pt-4 flex flex-wrap gap-2">
                {blog.tags.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Preview Mode &bull; Slug: <span className="font-mono text-[#0070ba]">/blog/{blog.slug}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default BlogPreviewModal;
