import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Home, ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] pt-32 pb-20 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-2xl relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
            <Terminal className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold text-brand-purple uppercase tracking-widest px-3 py-1 rounded-full bg-brand-purple/10">
            HTTP 404 — Cluster Node Not Found
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-3">
            Coordinate Vector Missing
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">
            The requested route does not exist on the NeuOrzin cluster mesh. It may have been migrated or decommissioned.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-bold text-xs shadow-lg hover:shadow-brand-purple/25 flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Return to Main Platform
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs hover:bg-brand-purple hover:text-white transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" /> Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default NotFoundPage;
