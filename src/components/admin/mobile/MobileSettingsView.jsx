import React from 'react';
import { Sliders, ShieldCheck, Database, Key, CheckCircle2 } from 'lucide-react';

export default function MobileSettingsView({
  systemSettings = {},
  isBackendOnline = true
}) {
  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-black text-slate-900">System Governance</h3>
        <p className="text-[10px] text-slate-500">Security parameters & runtime environment</p>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3 text-xs">
        <div className="flex justify-between items-center p-2.5 rounded-2xl bg-slate-50">
          <span className="font-bold text-slate-700">Database Engine</span>
          <span className="font-mono text-emerald-700 font-bold">PostgreSQL Enterprise</span>
        </div>

        <div className="flex justify-between items-center p-2.5 rounded-2xl bg-slate-50">
          <span className="font-bold text-slate-700">JWT Token Security</span>
          <span className="font-mono text-[#0070ba] font-bold">HS256 (Signed)</span>
        </div>

        <div className="flex justify-between items-center p-2.5 rounded-2xl bg-slate-50">
          <span className="font-bold text-slate-700">Auto SLA Discovery Engine</span>
          <span className="font-bold text-emerald-700">Active (2h Window)</span>
        </div>

        <div className="flex justify-between items-center p-2.5 rounded-2xl bg-slate-50">
          <span className="font-bold text-slate-700">WhatsApp Cloud Webhook</span>
          <span className="font-bold text-emerald-700">Connected</span>
        </div>
      </div>
    </div>
  );
}
