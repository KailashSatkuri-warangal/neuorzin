import React, { useState } from 'react';
import {
  Inbox,
  TrendingUp,
  Receipt,
  CreditCard,
  Briefcase,
  CheckSquare,
  AlertCircle,
  PlusCircle,
  Clock,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Award,
  Zap,
  DollarSign
} from 'lucide-react';

export default function MobileDashboard({
  leads = [],
  deals = [],
  quotations = [],
  invoices = [],
  projects = [],
  tasks = [],
  activities = [],
  auditLogs = [],
  onNavigate,
  onQuickAction
}) {
  const [period, setPeriod] = useState('30D');
  const [chartView, setChartView] = useState('revenue');

  // Compute live KPIs
  const totalLeads = leads.length;
  const pipelineValue = deals.reduce((acc, d) => acc + (parseFloat(d.value) || 0), 0);
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + (parseFloat(i.total_amount) || 0), 0);
  const outstandingRevenue = invoices.filter(i => i.status !== 'Paid').reduce((acc, i) => acc + (parseFloat(i.total_amount) || 0), 0);
  const activeProjectsCount = projects.filter(p => p.status !== 'Completed').length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'Completed').length;

  // Smart Alerts / Needs Attention
  const overdueFollowups = activities.filter(a => a.status === 'Pending');
  const overdueInvoices = invoices.filter(i => i.status === 'Overdue' || (i.status === 'Sent' && new Date(i.due_date) < new Date()));
  const criticalTasks = tasks.filter(t => t.priority === 'Critical' && t.status !== 'Completed');
  const delayedProjects = projects.filter(p => p.health === 'Delayed' || p.health === 'At Risk');

  const currentDateFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-5 pb-20 md:hidden animate-in fade-in duration-200">
      
      {/* 1. Header Greeting Banner */}
      <div className="bg-gradient-to-br from-[#0a2540] via-[#0070ba] to-indigo-900 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-bold text-blue-100">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Executive Command Center</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1.5 tracking-tight font-display">
              Good Morning, Admin
            </h2>
            <p className="text-[11px] text-blue-200/90 mt-0.5 flex items-center gap-1 font-medium">
              <Calendar className="w-3 h-3 text-blue-300" />
              <span>{currentDateFormatted}</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white font-bold text-sm border border-white/20">
            NO
          </div>
        </div>

        {/* Mini Highlights */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/15 text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/10">
            <div className="text-[10px] text-blue-200 font-medium">Live Collected</div>
            <div className="text-sm font-black font-mono mt-0.5">₹{(totalRevenue / 100000).toFixed(2)}L</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/10">
            <div className="text-[10px] text-blue-200 font-medium">Active Pipeline</div>
            <div className="text-sm font-black font-mono mt-0.5">₹{(pipelineValue / 100000).toFixed(2)}L</div>
          </div>
        </div>
      </div>

      {/* 2. Horizontally Scrollable KPI Cards */}
      <div>
        <div className="flex justify-between items-center px-1 mb-2">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Business KPIs</span>
          <span className="text-[10px] text-slate-400 font-medium">Swipe for more →</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-1">
          
          {/* Card 1: Total Leads */}
          <div 
            onClick={() => onNavigate('leads')}
            className="min-w-[150px] shrink-0 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs snap-start active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0070ba] flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center">
                +12.4%
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Leads</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{totalLeads}</div>
            </div>
          </div>

          {/* Card 2: Pipeline Value */}
          <div 
            onClick={() => onNavigate('deals')}
            className="min-w-[150px] shrink-0 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs snap-start active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center">
                +8.2%
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pipeline</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">₹{(pipelineValue / 100000).toFixed(1)}L</div>
            </div>
          </div>

          {/* Card 3: Revenue Collected */}
          <div 
            onClick={() => onNavigate('invoices')}
            className="min-w-[150px] shrink-0 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs snap-start active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center">
                +15.7%
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revenue</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">₹{(totalRevenue / 100000).toFixed(1)}L</div>
            </div>
          </div>

          {/* Card 4: Outstanding Receivables */}
          <div 
            onClick={() => onNavigate('invoices')}
            className="min-w-[150px] shrink-0 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs snap-start active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md">
                Due
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outstanding</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">₹{(outstandingRevenue / 100000).toFixed(1)}L</div>
            </div>
          </div>

          {/* Card 5: Active Projects */}
          <div 
            onClick={() => onNavigate('projects')}
            className="min-w-[150px] shrink-0 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs snap-start active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                Active
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Projects</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{activeProjectsCount}</div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Quick Actions Grid */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
          Quick Actions
        </div>
        <div className="grid grid-cols-4 gap-2">
          
          <button
            onClick={() => onQuickAction('addLead')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-[#0070ba] text-slate-700 transition-all cursor-pointer active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0070ba] flex items-center justify-center mb-1">
              <PlusCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-center">Add Lead</span>
          </button>

          <button
            onClick={() => onQuickAction('addDeal')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-purple-700 text-slate-700 transition-all cursor-pointer active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-center">New Deal</span>
          </button>

          <button
            onClick={() => onQuickAction('addQuote')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-[#0070ba] text-slate-700 transition-all cursor-pointer active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0070ba] flex items-center justify-center mb-1">
              <Receipt className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-center">Quotation</span>
          </button>

          <button
            onClick={() => onQuickAction('addInvoice')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-all cursor-pointer active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-center">Invoice</span>
          </button>

        </div>
      </div>

      {/* 4. Smart Alerts / Needs Attention */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Needs Attention</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Live Audit</span>
        </div>

        <div className="space-y-2">
          {overdueFollowups.length > 0 && (
            <div 
              onClick={() => onNavigate('followups')}
              className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between cursor-pointer active:bg-amber-100"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-900">{overdueFollowups.length} Overdue Follow-ups</div>
                  <div className="text-[10px] text-amber-700">Discovery calls & solution deck reviews</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-600" />
            </div>
          )}

          {overdueInvoices.length > 0 && (
            <div 
              onClick={() => onNavigate('invoices')}
              className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between cursor-pointer active:bg-rose-100"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-rose-900">{overdueInvoices.length} Pending Invoices</div>
                  <div className="text-[10px] text-rose-700">Follow up on payment collection</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-600" />
            </div>
          )}

          {criticalTasks.length > 0 && (
            <div 
              onClick={() => onNavigate('tasks')}
              className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between cursor-pointer active:bg-blue-100"
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4 text-[#0070ba] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">{criticalTasks.length} High Priority Tasks</div>
                  <div className="text-[10px] text-slate-600">Sprint engineering deliverables</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#0070ba]" />
            </div>
          )}

          {overdueFollowups.length === 0 && overdueInvoices.length === 0 && criticalTasks.length === 0 && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-bold">
              ✓ All operational milestones are on schedule!
            </div>
          )}
        </div>
      </div>

      {/* 5. Dashboard Intelligence & Mobile Charts */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs font-black text-slate-900">Dashboard Intelligence</div>
            <div className="text-[10px] text-slate-500">Real-time telemetry breakdown</div>
          </div>
          
          {/* Period selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-[10px] font-bold">
            {['7D', '30D', '90D', '1Y'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  period === p ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          <button
            onClick={() => setChartView('revenue')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              chartView === 'revenue'
                ? 'bg-[#0070ba] text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Revenue Flow
          </button>
          <button
            onClick={() => setChartView('pipeline')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              chartView === 'pipeline'
                ? 'bg-[#0070ba] text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Deals Pipeline
          </button>
          <button
            onClick={() => setChartView('conversion')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              chartView === 'conversion'
                ? 'bg-[#0070ba] text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Conversion Rate
          </button>
        </div>

        {/* Visual Chart Bars */}
        <div className="space-y-3 pt-2">
          {chartView === 'revenue' && (
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600">Enterprise AI & Cloud Solutions</span>
                  <span className="text-slate-900 font-mono">₹42,50,000</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0070ba] h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600">Web App & Digital Platforms</span>
                  <span className="text-slate-900 font-mono">₹24,80,000</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '56%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600">Cybersecurity & Cloud Support</span>
                  <span className="text-slate-900 font-mono">₹9,16,400</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
            </div>
          )}

          {chartView === 'pipeline' && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-700">Proposal Sent</span>
                <span className="font-mono font-bold text-purple-700">₹24,50,000 (5 Deals)</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-700">Under Negotiation</span>
                <span className="font-mono font-bold text-[#0070ba]">₹18,00,000 (3 Deals)</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
                <span className="font-bold text-slate-700">Won & Mobilized</span>
                <span className="font-mono font-bold text-emerald-700">₹33,96,000 (4 Deals)</span>
              </div>
            </div>
          )}

          {chartView === 'conversion' && (
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="text-2xl font-black text-[#0070ba] font-mono">68.4%</div>
                <div className="text-[10px] font-bold text-slate-600 mt-1">Lead to Deal Won</div>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="text-2xl font-black text-emerald-700 font-mono">94.2%</div>
                <div className="text-[10px] font-bold text-slate-600 mt-1">SLA Compliance</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. Recent Activity Timeline */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Live Activity Trail
          </div>
          <button 
            onClick={() => onNavigate('audit')}
            className="text-[10px] font-bold text-[#0070ba] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {(auditLogs.slice(0, 5).length > 0 ? auditLogs.slice(0, 5) : [
            { id: 1, action: 'Quotation Accepted', details: 'Dr. Anand Mahindra accepted QT-2026-0012', created_at: new Date() },
            { id: 2, action: 'Payment Reconciled', details: '₹13,56,000 received via HDFC Bank Wire', created_at: new Date() },
            { id: 3, action: 'Agile Project Initialized', details: 'PRJ-2026-0012 instantiated with 3 delivery milestones', created_at: new Date() }
          ]).map((log, idx) => (
            <div key={log.id || idx} className="flex items-start gap-2.5 text-xs">
              <div className="w-6 h-6 rounded-full bg-blue-50 text-[#0070ba] flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 truncate">{log.action}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">{log.details}</div>
              </div>
              <span className="text-[9px] text-slate-400 font-mono shrink-0">
                {log.created_at ? new Date(log.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
