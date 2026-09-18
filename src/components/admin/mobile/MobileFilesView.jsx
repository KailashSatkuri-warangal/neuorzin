import React from 'react';
import { FolderLock, FileText, Download, ShieldCheck, HardDrive } from 'lucide-react';

export default function MobileFilesView({
  quotations = [],
  invoices = []
}) {
  const folders = [
    { name: 'GST Tax Invoices', count: invoices.length, icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Commercial Proposals', count: quotations.length, icon: FileText, color: 'text-[#0070ba] bg-blue-50' },
    { name: 'Master Service Agreements', count: 4, icon: ShieldCheck, color: 'text-purple-600 bg-purple-50' },
    { name: 'Architecture Blueprints', count: 6, icon: HardDrive, color: 'text-amber-600 bg-amber-50' }
  ];

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-black text-slate-900">Digital Vault & Documents</h3>
        <p className="text-[10px] text-slate-500">Encrypted compliance and commercial repository</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {folders.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className={`w-10 h-10 rounded-2xl ${f.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">{f.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{f.count} documents</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
