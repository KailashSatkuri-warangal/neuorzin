import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, RefreshCw, Home, Globe } from 'lucide-react';

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
      case 'notifications': return 'Notifications';
      default: return 'NeuOrzin CRM';
    }
  };

  return (
    <header className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 py-2.5 flex items-center justify-between shadow-xs">
      {/* Left: Menu trigger & Branding */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
          className="w-8 h-8 rounded-xl bg-slate-100/90 active:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
        </button>

        <Link to="/" title="Go to Website Home" className="flex items-center gap-1.5 min-w-0 group">
          <img
            src="/assets/images/neuorzin-icon.png"
            alt="NeuOrzin"
            className="w-7 h-7 object-contain rounded-lg shrink-0 group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/img/logo-icon.png";
            }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-xs font-black text-slate-900 truncate font-display">
                {getTabTitle(activeTab)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[8.5px] text-slate-500 mt-0.5">
              <span className={`inline-flex items-center gap-1 font-semibold ${isBackendOnline ? 'text-emerald-600' : 'text-amber-600'}`}>
                <span className={`w-1 h-1 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {isBackendOnline ? 'Live' : 'Local'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 font-mono">v2.0</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Right: Return to Website Home, Search, Notifications, Profile */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Return to Home / Public Website */}
        <Link
          to="/"
          title="Return to Main Website Home"
          aria-label="Return to Home"
          className="px-2 py-1.5 rounded-xl bg-blue-50/90 hover:bg-blue-100 active:bg-blue-200 text-[#0070ba] flex items-center gap-1 text-[10px] font-bold transition-all shadow-xs cursor-pointer group"
        >
          <Home className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden xs:inline">Home</span>
        </Link>

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh Data"
            className="w-8 h-8 rounded-xl bg-slate-100/80 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0070ba]' : ''}`} />
          </button>
        )}

        <button
          onClick={onOpenSearch}
          aria-label="Global Search"
          className="w-8 h-8 rounded-xl bg-slate-100/80 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenNotifications}
          aria-label="Open Notifications"
          className="relative w-8 h-8 rounded-xl bg-slate-100/80 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5" />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-rose-500 text-white text-[7.5px] font-black flex items-center justify-center leading-none ring-1.5 ring-white animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenProfile}
          aria-label="Admin Profile"
          className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0070ba] to-indigo-600 text-white font-bold text-[11px] flex items-center justify-center ml-0.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
        >
          SA
        </button>
      </div>
    </header>
  );
}
