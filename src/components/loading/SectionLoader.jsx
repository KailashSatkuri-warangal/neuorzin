import React from 'react';
import { InlineLoader } from './InlineLoader';

export function SectionLoader({
  title = 'Loading section...',
  subtitle,
  minHeight = 'min-h-[320px]',
  className = '',
  ...props
}) {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 transition-colors ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0070ba] to-[#00c6ff] p-[2px] shadow-lg shadow-[#0070ba]/20 animate-pulse">
          <div className="w-full h-full bg-white dark:bg-[#0b0d18] rounded-2xl flex items-center justify-center">
            <InlineLoader size="md" color="primary" />
          </div>
        </div>
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display">
        {title}
      </h4>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm text-center">
          {subtitle}
        </p>
      )}
      <span className="sr-only">Loading section content...</span>
    </div>
  );
}

export default SectionLoader;
