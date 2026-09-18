import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 py-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer ${
                item.isActive
                  ? 'text-[#0070ba]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0070ba]" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-bold tracking-tight ${item.isActive ? 'text-[#0070ba]' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* 5. Book Consultation Action CTA */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer group"
          aria-label="Book Consultation"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0070ba] to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-active:scale-95 transition-transform">
            <Calendar className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight text-[#0070ba]">
            Book
          </span>
        </button>
      </div>
    </nav>
  );
}

export default PublicBottomNav;
