import React from 'react';
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

  return (
    <nav 
      aria-label="Admin Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-1 py-1.5 pb-[calc(0.45rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_25px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around">
        
        {/* 1. Home / Dashboard */}
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'dashboard'
              ? 'text-[#0070ba]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'dashboard' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0070ba]" />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 font-bold tracking-tight ${activeTab === 'dashboard' ? 'text-[#0070ba]' : 'text-slate-500'}`}>
            Home
          </span>
        </button>

        {/* 2. Leads */}
        <button
          onClick={() => onTabChange('leads')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'leads'
              ? 'text-[#0070ba]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Inbox className={`w-5 h-5 ${activeTab === 'leads' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {leadsCount > 0 && (
              <span className={`absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full text-[8px] font-bold flex items-center justify-center ${
                activeTab === 'leads' ? 'bg-[#0070ba] text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {leadsCount > 99 ? '99+' : leadsCount}
              </span>
            )}
            {activeTab === 'leads' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0070ba]" />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 font-bold tracking-tight ${activeTab === 'leads' ? 'text-[#0070ba]' : 'text-slate-500'}`}>
            Leads
          </span>
        </button>

        {/* 3. Deals */}
        <button
          onClick={() => onTabChange('deals')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'deals'
              ? 'text-[#0070ba]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <TrendingUp className={`w-5 h-5 ${activeTab === 'deals' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {dealsCount > 0 && (
              <span className={`absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full text-[8px] font-bold flex items-center justify-center ${
                activeTab === 'deals' ? 'bg-[#0070ba] text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {dealsCount}
              </span>
            )}
            {activeTab === 'deals' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0070ba]" />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 font-bold tracking-tight ${activeTab === 'deals' ? 'text-[#0070ba]' : 'text-slate-500'}`}>
            Deals
          </span>
        </button>

        {/* 4. Tasks */}
        <button
          onClick={() => onTabChange('tasks')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'tasks'
              ? 'text-[#0070ba]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <CheckSquare className={`w-5 h-5 ${activeTab === 'tasks' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {tasksCount > 0 && (
              <span className={`absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full text-[8px] font-bold flex items-center justify-center ${
                activeTab === 'tasks' ? 'bg-[#0070ba] text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tasksCount}
              </span>
            )}
            {activeTab === 'tasks' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0070ba]" />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 font-bold tracking-tight ${activeTab === 'tasks' ? 'text-[#0070ba]' : 'text-slate-500'}`}>
            Tasks
          </span>
        </button>

        {/* 5. More Sheet */}
        <button
          onClick={onOpenMore}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
            isMoreActive
              ? 'text-[#0070ba]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Grid className={`w-5 h-5 ${isMoreActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {hasAlerts && (
              <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
            {isMoreActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0070ba]" />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 font-bold tracking-tight ${isMoreActive ? 'text-[#0070ba]' : 'text-slate-500'}`}>
            More
          </span>
        </button>

      </div>
    </nav>
  );
}
