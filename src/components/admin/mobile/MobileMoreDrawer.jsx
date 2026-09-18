import { Link } from 'react-router-dom';
import React from 'react';
import {
  X,
  Users,
  CalendarCheck,
  FileText,
  Receipt,
  CreditCard,
  Briefcase,
  UserCheck,
  Megaphone,
  BarChart3,
  FolderLock,
  Bell,
  Sliders,
  ShieldCheck,
  MailCheck,
  MessageSquare,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function MobileMoreDrawer({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  counts = {},
  onLogout
}) {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'Sales & Customer Relationship',
      items: [
        { id: 'customers', label: 'Customers & CRM', icon: Users, count: counts.customers, badgeColor: 'bg-blue-50 text-[#0070ba]' },
        { id: 'followups', label: 'Follow-ups & Activities', icon: CalendarCheck, count: counts.activities, badgeColor: 'bg-amber-50 text-amber-700' },
        { id: 'emails', label: 'Email Transactions', icon: MailCheck, count: counts.emails, badgeColor: 'bg-emerald-50 text-emerald-700' },
        { id: 'whatsapp', label: 'WhatsApp Live Inbox', icon: MessageSquare, count: counts.whatsapp, badgeColor: 'bg-emerald-50 text-emerald-700' },
      ]
    },
    {
      title: 'Finance & Commercials',
      items: [
        { id: 'quotations', label: 'GST Quotations', icon: FileText, count: counts.quotations, badgeColor: 'bg-blue-50 text-[#0070ba]' },
        { id: 'invoices', label: 'Tax Invoices', icon: Receipt, count: counts.invoices, badgeColor: 'bg-emerald-50 text-emerald-700' },
        { id: 'payments', label: 'Payments & Customer Ledger', icon: CreditCard, count: counts.payments, badgeColor: 'bg-purple-50 text-purple-700' },
      ]
    },
    {
      title: 'Agile Delivery & Workforce',
      items: [
        { id: 'projects', label: 'Active Projects', icon: Briefcase, count: counts.projects, badgeColor: 'bg-blue-50 text-[#0070ba]' },
        { id: 'teams', label: 'Engineering Teams', icon: Users, count: counts.teams },
        { id: 'employees', label: 'Employees & Workload', icon: UserCheck, count: counts.employees },
      ]
    },
    {
      title: 'Marketing & Intelligence',
      items: [
        { id: 'marketing', label: 'Ad Campaigns & ROI', icon: Megaphone, count: counts.campaigns, badgeColor: 'bg-rose-50 text-rose-700' },
        { id: 'reports', label: 'Analytics & Executive Reports', icon: BarChart3 },
        { id: 'files', label: 'Digital Vault & Documents', icon: FolderLock },
      ]
    },
    {
      title: 'Administration & Governance',
      items: [
        { id: 'notifications', label: 'Notifications Center', icon: Bell, count: counts.notifications, badgeColor: 'bg-rose-50 text-rose-700' },
        { id: 'audit', label: 'Audit Trail & Compliance', icon: ShieldCheck },
        { id: 'settings', label: 'System Settings & API Keys', icon: Sliders },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        onClick={onClose} 
        className="flex-1" 
        aria-hidden="true" 
      />

      <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-250">
        
        {/* Header Handle */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/images/neuorzin-icon.png"
              alt="NeuOrzin"
              className="w-8 h-8 object-contain rounded-xl shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/assets/img/logo-icon.png";
              }}
            />
            <div>
              <h3 className="text-sm font-black text-slate-900">CRM Modules</h3>
              <p className="text-[10px] text-slate-500">Select any section to navigate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

                {/* Return to Home / Public Website Banner */}
        <div className="p-4 pb-0">
          <Link
            to="/"
            onClick={onClose}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/80 text-[#0070ba] hover:bg-blue-100/60 transition-all font-bold text-xs shadow-xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0070ba] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Home className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900">Return to Main Website</div>
                <div className="text-[10px] text-slate-500">Exit Admin & go to NeuOrzin Home</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#0070ba]">
              <span>Visit</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Scrollable Category List */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {sections.map((sec, i) => (
            <div key={i} className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2">
                {sec.title}
              </div>
              <div className="grid grid-cols-1 gap-1">
                {sec.items.map(item => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#0070ba] text-white shadow-md shadow-blue-500/20'
                          : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 active:bg-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-[#0070ba]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.count !== undefined && item.count > 0 && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            isSelected ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-slate-200 text-slate-700')
                          }`}>
                            {item.count}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* User Account & Logout */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                if (onLogout) onLogout();
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <LogOut className="w-4 h-4" />
                </div>
                <span>Sign Out of Portal</span>
              </div>
              <span className="text-[10px] font-mono text-rose-500">admin@neuorzin.com</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
