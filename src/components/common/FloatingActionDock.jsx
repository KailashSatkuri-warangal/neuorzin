import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Calendar, Search } from 'lucide-react';

export function FloatingActionDock({ onOpenBooking, onOpenSearch }) {
  const { pathname, hash } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Scroll to top on route change (unless hash is present)
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  // Track scroll percentage and show/hide dock
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollProgress = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollPercentage(Math.round(scrollProgress));
      }
      setIsVisible(totalScroll > 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-black/10"
        >
          {/* Quick Book Call Button */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#0070ba] to-[#00c6ff] text-white text-xs font-semibold shadow-md hover:shadow-[#0070ba]/30 transition-all cursor-pointer group"
            title="Book Free Consultation"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Book Studio</span>
          </button>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Quick Search (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Circular Scroll To Top Indicator */}
          <button
            onClick={scrollToTop}
            className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer group"
            title={`Scroll to top (${scrollPercentage}%)`}
            aria-label="Scroll to top"
          >
            <svg className="w-7 h-7 transform -rotate-90 absolute">
              <circle
                cx="14"
                cy="14"
                r="11"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                className="text-slate-200"
              />
              <circle
                cx="14"
                cy="14"
                r="11"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={69.1}
                strokeDashoffset={69.1 - (69.1 * scrollPercentage) / 100}
                className="text-[#0070ba] transition-all duration-75"
              />
            </svg>
            <ArrowUp className="w-3.5 h-3.5 z-10 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default FloatingActionDock;
