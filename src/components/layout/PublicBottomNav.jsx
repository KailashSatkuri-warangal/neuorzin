import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Sparkles, FolderKanban, PhoneCall, Calendar } from 'lucide-react';

export function PublicBottomNav({ onOpenBooking }) {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (href) => {
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: isActive('/')
    },
    {
      label: 'Services',
      href: '/services',
      icon: Sparkles,
      isActive: isActive('/services')
    },
    {
      label: 'Work',
      href: '/projects',
      icon: FolderKanban,
      isActive: isActive('/projects') || isActive('/work')
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: PhoneCall,
      isActive: isActive('/contact') || isActive('/contact-us')
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="lg:hidden fixed bottom-2 left-3 right-3 z-40 max-w-md mx-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Floating Glassmorphic Pill */}
      <div className="relative rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,112,186,0.12),0_4px_16px_rgba(0,0,0,0.06)] p-1.5 overflow-hidden">
        
        {/* Specular glass highlight */}
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

        <div className="grid grid-cols-5 items-center relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;

            return (
              <Link
                key={item.label}
                to={item.href}
                className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors cursor-pointer group select-none"
              >
                {/* Smooth Sliding Glass Pill Indicator */}
                {active && (
                  <motion.div
                    layoutId="publicActiveGlassSlide"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8
                    }}
                    className="absolute inset-0.5 rounded-xl bg-gradient-to-b from-[#0070ba]/12 to-[#0070ba]/5 border border-[#0070ba]/25 shadow-[0_2px_10px_rgba(0,112,186,0.15)] backdrop-blur-md"
                  />
                )}

                <div className="relative z-10 flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 transition-all duration-200 ${
                      active
                        ? 'text-[#0070ba] stroke-[2.5] scale-105'
                        : 'text-slate-400 group-hover:text-slate-600 stroke-2'
                    }`}
                  />
                </div>

                <span
                  className={`relative z-10 text-[10px] mt-0.5 font-bold tracking-tight transition-colors duration-200 ${
                    active
                      ? 'text-[#0070ba]'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  {item.label}
                </span>

                {/* Subtle active glow dot */}
                {active && (
                  <motion.div
                    layoutId="publicActiveGlowDot"
                    className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#0070ba] shadow-[0_0_6px_#0070ba]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* 5. Book Consultation Action CTA */}
          <motion.button
            onClick={onOpenBooking}
            whileTap={{ scale: 0.90 }}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer group"
            aria-label="Book Consultation"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0070ba] to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-active:scale-95 transition-transform">
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-[10px] mt-0.5 font-bold tracking-tight text-[#0070ba]">
              Book
            </span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

export default PublicBottomNav;
