import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Search, Calendar, Menu } from 'lucide-react';
import { navLinks } from '../../data/navigationData';

export function Navbar({ onOpenBooking, onOpenSearch, onOpenOffcanvas }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand Logo & Mobile/Tablet Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            className="lg:hidden p-2 text-slate-800 hover:text-[#0070ba] focus:outline-none cursor-pointer rounded-xl hover:bg-slate-100 transition-colors"
            onClick={onOpenOffcanvas}
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <Link to="/" className="flex items-center focus:outline-none group">
            <img
              src="/assets/images/neuorzin-logo.png"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              alt="NeuOrzin"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Visible on Laptop / Desktop >= 1024px) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
          {navLinks.map((item) => {
            const isActive = item.href === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.href);

            const isOpen = activeDropdown === item.name;

            if (item.hasDropdown) {
              const isServices = item.name.toLowerCase() === 'services';

              return (
                <div
                  key={item.name}
                  className="relative py-3 group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1.5 px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                      isActive || isOpen
                        ? 'text-[#0070ba]'
                        : 'text-slate-800 hover:text-[#0070ba]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#0070ba]' : 'opacity-60 group-hover:opacity-100'
                      }`} 
                    />
                  </Link>

                  {/* Dropdown Panels */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className={`absolute top-full bg-white border border-slate-200 shadow-2xl rounded-2xl z-50 ${
                          isServices 
                            ? 'left-1/2 -translate-x-1/2 w-[680px] xl:w-[750px] max-w-[90vw] p-4 sm:p-5 grid grid-cols-2 gap-3 sm:gap-4' 
                            : 'left-0 w-64 sm:w-72 p-2.5 space-y-1'
                        }`}
                      >
                        {isServices ? (
                          // Multi-Pillar Services Layout
                          item.dropdownItems.map((group, gIdx) => (
                            <div key={gIdx} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100/80">
                              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200/60">
                                <span className="text-[11px] font-black uppercase tracking-wider text-[#0070ba]">
                                  {group.category}
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-[#0070ba]">
                                  Pillar {gIdx + 1}
                                </span>
                              </div>
                              <div className="space-y-1">
                                {group.items.map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    to={sub.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-start justify-between p-2 rounded-lg hover:bg-white hover:shadow-xs text-slate-700 hover:text-[#0070ba] transition-all group/item"
                                  >
                                    <div>
                                      <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#0070ba] transition-colors leading-snug">
                                        {sub.title}
                                      </div>
                                      {sub.desc && (
                                        <div className="text-[10px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                                          {sub.desc}
                                        </div>
                                      )}
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#0070ba] shrink-0 mt-0.5" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          // Standard Dropdown Layout for Resources / Company
                          item.dropdownItems.map((group) =>
                            group.items.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                to={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 hover:text-[#0070ba] text-slate-700 transition-all group/item"
                              >
                                <div>
                                  <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#0070ba] transition-colors">
                                    {sub.title}
                                  </div>
                                  {sub.desc && (
                                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                                      {sub.desc}
                                    </div>
                                  )}
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#0070ba] shrink-0" />
                              </Link>
                            ))
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#0070ba]'
                    : 'text-slate-800 hover:text-[#0070ba]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Attributes: Book Appointment CTA + Search Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Responsive Book Appointment CTA */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#0070ba] to-[#00a8ff] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-[#0070ba]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline sm:inline">Book Appointment</span>
            <span className="xs:hidden sm:hidden">Book</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:p-2.5 rounded-full text-slate-800 hover:text-[#0070ba] hover:bg-slate-100 transition-all cursor-pointer"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
