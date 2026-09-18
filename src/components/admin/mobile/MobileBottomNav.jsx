import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Inbox, TrendingUp, CheckSquare, Grid } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  onTabChange,
  onOpenMore,
  leadsCount = 0,
  dealsCount = 0,
  tasksCount = 0,
  hasAlerts = false
}) {
  const isMoreActive = ![
    'dashboard',
    'leads',
    'deals',
    'tasks'
  ].includes(activeTab);

  const tabs = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: LayoutDashboard,
      badge: null,
      isActive: activeTab === 'dashboard',
      onClick: () => onTabChange('dashboard')
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: Inbox,
      badge: leadsCount > 0 ? (leadsCount > 99 ? '99+' : leadsCount) : null,
      badgeType: 'blue',
      isActive: activeTab === 'leads',
      onClick: () => onTabChange('leads')
    },
    {
      id: 'deals',
      label: 'Deals',
      icon: TrendingUp,
      badge: dealsCount > 0 ? dealsCount : null,
      badgeType: 'purple',
      isActive: activeTab === 'deals',
      onClick: () => onTabChange('deals')
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      badge: tasksCount > 0 ? tasksCount : null,
      badgeType: 'emerald',
      isActive: activeTab === 'tasks',
      onClick: () => onTabChange('tasks')
    },
    {
      id: 'more',
      label: 'More',
      icon: Grid,
      badge: hasAlerts ? 'dot' : null,
      badgeType: 'rose',
      isActive: isMoreActive,
      onClick: onOpenMore
    }
  ];

  return (
    <nav
      aria-label="Admin Mobile Navigation Dock"
      className="md:hidden fixed bottom-2 left-3 right-3 z-[60] max-w-md mx-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Floating Glassmorphic Container */}
      <div className="relative rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,112,186,0.12),0_4px_16px_rgba(0,0,0,0.06)] p-1.5 overflow-hidden">
        
        {/* Specular top light reflex */}
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

        <div className="grid grid-cols-5 items-center relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = tab.isActive;

            return (
              <motion.button
                key={tab.id}
                onClick={tab.onClick}
                whileTap={{ scale: 0.90 }}
                className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors cursor-pointer group select-none"
              >
                {/* Smooth Sliding Glass Pill Indicator */}
                {isTabActive && (
                  <motion.div
                    layoutId="adminActiveGlassSlide"
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
                      isTabActive
                        ? 'text-[#0070ba] stroke-[2.5] scale-105'
                        : 'text-slate-400 group-hover:text-slate-600 stroke-2'
                    }`}
                  />

                  {/* Badge Counter / Alert Dot */}
                  {tab.badge === 'dot' ? (
                    <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                  ) : tab.badge ? (
                    <span
                      className={`absolute -top-1.5 -right-3 min-w-[15px] h-[15px] px-1 rounded-full text-[8px] font-black flex items-center justify-center ring-1.5 ring-white transition-transform ${
                        isTabActive
                          ? 'bg-[#0070ba] text-white shadow-xs'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : null}
                </div>

                <span
                  className={`relative z-10 text-[10px] mt-0.5 font-bold tracking-tight transition-colors duration-200 ${
                    isTabActive
                      ? 'text-[#0070ba]'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Subtle active glow dot below text */}
                {isTabActive && (
                  <motion.div
                    layoutId="adminActiveGlowDot"
                    className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#0070ba] shadow-[0_0_6px_#0070ba]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
