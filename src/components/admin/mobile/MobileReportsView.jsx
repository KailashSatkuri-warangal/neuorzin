import React from 'react';
import { BarChart3, TrendingUp, Download, PieChart, ShieldCheck } from 'lucide-react';

export default function MobileReportsView({
  downloadCsv,
  leads = [],
  deals = [],
  invoices = []
}) {
  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-black text-slate-900">Executive Analytics</h3>
        <p className="text-[10px] text-slate-500">Commercial reports and audit exports</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Avg. Deal Size</span>
          <div className="text-lg font-black text-slate-900 font-mono">₹8.4 Lakhs</div>
          <span className="text-[9px] text-emerald-600 font-bold">+14.2% YoY</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Cash Flow Run</span>
          <div className="text-lg font-black text-emerald-700 font-mono">₹76.4 Lakhs</div>
          <span className="text-[9px] text-emerald-600 font-bold">100% Reconciled</span>
        </div>
      </div>

      {/* Export Reports Buttons */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Export Datasets</div>
        <button
          onClick={() => downloadCsv && downloadCsv('NeuOrzin_Leads_Report.csv', leads, [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }])}
          className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-between cursor-pointer"
        >
          <span>Leads & Conversion Ledger</span>
          <Download className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button
          onClick={() => downloadCsv && downloadCsv('NeuOrzin_Invoices_Report.csv', invoices, [{ key: 'invoice_number', header: 'Invoice' }, { key: 'total_amount', header: 'Total' }])}
          className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-between cursor-pointer"
        >
          <span>GST Tax Invoices & Receivables</span>
          <Download className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
