import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineLoader } from './InlineLoader';

export function PageLoader({
  loading = true,
  message = 'Initializing NeuOrzin Architecture...',
  children
}) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#070913] text-slate-900 dark:text-white p-6 transition-colors"
          role="status"
          aria-busy="true"
          aria-live="polite"
        >
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#0070ba]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#00c6ff]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Central Logo & Indicator */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <img
                src="/assets/images/neuorzin-logo.png"
                alt="NeuOrzin"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </motion.div>

            {/* Spinner and Status Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <InlineLoader size="sm" color="primary" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {message}
              </span>
            </div>
          </div>
          <span className="sr-only">Page loading...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
