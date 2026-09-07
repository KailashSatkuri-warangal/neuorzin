import React from 'react';
import { Link } from 'react-router-dom';
import { BlogSection } from '../components/sections/BlogSection';
import { QuickContactBanner } from '../components/sections/QuickContactBanner';

export function BlogPage({ onSelectArticle, onShowToast }) {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Page Breadcrumb Header */}
      <div className="py-20 bg-[#f4f7fb] dark:bg-[#080a14] border-b border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
            Blog & <strong className="text-[#0070ba] dark:text-cyan-400">Insights</strong>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#0070ba] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0070ba] dark:text-cyan-400">Blog Standard</span>
          </div>
        </div>
      </div>

      <BlogSection onSelectArticle={onSelectArticle} />
      <QuickContactBanner />
    </div>
  );
}
export default BlogPage;
