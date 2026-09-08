import React from 'react';
import { InlineLoader } from './InlineLoader';

export function OverlayLoader({
  loading = false,
  message = 'Processing request...',
  blur = 'backdrop-blur-xs',
  className = '',
  children
}) {
  return (
    <div className="relative w-full">
      {children}

      {loading && (
        <div
          className={`absolute inset-0 z-40 ${blur} bg-white/75 dark:bg-slate-950/75 flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 animate-in fade-in ${className}`}
          role="status"
          aria-busy="true"
          aria-live="assertive"
        >
          <div className="p-4 rounded-2xl bg-white dark:bg-[#111424] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-3 max-w-xs text-center">
            <div className="w-10 h-10 rounded-full bg-[#0070ba]/10 flex items-center justify-center">
              <InlineLoader size="md" color="primary" />
            </div>
            {message && (
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {message}
              </span>
            )}
          </div>
          <span className="sr-only">{message}</span>
        </div>
      )}
    </div>
  );
}

export default OverlayLoader;
