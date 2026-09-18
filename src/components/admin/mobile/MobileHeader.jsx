import React from 'react';
import { Menu, Search, Bell, RefreshCw } from 'lucide-react';

export default function MobileHeader({
  activeTab,
  onOpenMenu,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 0,
  isBackendOnline = true,
  isRefreshing = false,
  onRefresh
}) {
  const getTabTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Command Center';
      case 'leads': return 'Inbound Leads';
      case 'emails': return 'Email Center';
      case 'deals': return 'Deals Pipeline';
      case 'quotations': return 'GST Quotations';
      case 'invoices': return 'Tax Invoices';
      case 'payments': return 'Payments & Ledger';
      case 'projects': return 'Agile Projects';
      case 'tasks': return 'Sprint Tasks';
      case 'followups': return 'Follow-ups';
      case 'customers': return 'Customers & CRM';
      case 'teams': return 'Engineering Teams';
      case 'employees': return 'Employee Workload';
      case 'marketing': return 'Ad Campaigns ROI';
      case 'whatsapp': return 'WhatsApp Inbox';
      case 'reports': return 'Analytics & Reports';
      case 'files': return 'Digital Vault';
      case 'audit': return 'Audit Logs';
      case 'settings': return 'System Settings';
      default: return 'NeuOrzin CRM';
    }
  };

  return (
    <header className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3.5 py-2.5 flex items-center justify-between shadow-xs">
      {/* Left: Menu trigger & Branding */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
          className="w-9 h-9 rounded-xl bg-slate-100/90 active:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <img
            src="/assets/images/neuorzin-icon.png"
            alt="NeuOrzin"
            className="w-8 h-8 object-contain rounded-xl shrink-0"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/img/logo-icon.png";
            }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-black text-slate-900 truncate font-display">
                {getTabTitle(activeTab)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-0.5">
              <span className={`inline-flex items-center gap-1 font-semibold ${isBackendOnline ? 'text-emerald-600' : 'text-amber-600'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {isBackendOnline ? 'Live Sync' : 'Local'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 font-mono">v2.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Search, Notifications, Refresh */}
      <div className="flex items-center gap-1 shrink-0">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh Data"
            className="w-9 h-9 rounded-xl bg-slate-100/80 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0070ba]' : ''}`} />
          </button>
        )}

        <button
          onClick={onOpenSearch}
          aria-label="Global Search"
          className="w-9 h-9 rounded-xl bg-slate-100/80 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenNotifications}
          aria-label="Open Notifications"
          className="relative w-9 h-9 rounded-xl bg-slate-100/80 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[15px] h-[15px] px-0.5 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center leading-none ring-2 ring-white animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenProfile}
          aria-label="Admin Profile"
          className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0070ba] to-indigo-600 text-white font-bold text-xs flex items-center justify-center ml-0.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
        >
          SA
        </button>
      </div>
    </header>
  );
}
