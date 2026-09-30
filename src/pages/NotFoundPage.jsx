import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Home, ArrowRight, Compass, Search, PhoneCall, Layers, Briefcase, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-[85vh] pt-28 pb-20 flex items-center justify-center px-4 bg-[#f8fafc]">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0070ba] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Compass className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold text-[#0070ba] uppercase tracking-widest px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
            HTTP 404 — Page Not Found
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 mb-3 font-display">
            Looking for something?
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable. Let's get you back on track!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Return to Homepage
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#0070ba]" /> Contact Support
            </Link>
          </div>

          <div className="pt-8 border-t border-slate-100 text-left">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
              Helpful Destinations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link to="/services" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all text-left group">
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#0070ba] flex items-center justify-between">
                  <span>Services</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Engineering & AI</p>
              </Link>
              <Link to="/projects" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all text-left group">
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#0070ba] flex items-center justify-between">
                  <span>Projects</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Case studies</p>
              </Link>
              <Link to="/approach" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all text-left group">
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#0070ba] flex items-center justify-between">
                  <span>Approach</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Our methodology</p>
              </Link>
              <Link to="/insights" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all text-left group">
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#0070ba] flex items-center justify-between">
                  <span>Insights</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Whitepapers & news</p>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default NotFoundPage;
