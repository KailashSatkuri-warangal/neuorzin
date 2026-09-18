import React from 'react';
import { Users, Phone, Mail, MessageSquare, ChevronRight, PlusCircle, Building } from 'lucide-react';

export default function MobileCustomersView({
  customers = [],
  leads = [],
  onSelectCustomer,
  onAddNewCustomer
}) {
  const customerList = customers.length > 0 ? customers : leads.filter(l => l.status === 'Won' || l.status === 'Converted' || l.status === 'Qualified');

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black text-slate-900">Enterprise Customers</h3>
          <p className="text-[10px] text-slate-500">{customerList.length} verified corporate clients</p>
        </div>
        <button
          onClick={onAddNewCustomer}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0070ba] text-white text-xs font-bold shadow-md cursor-pointer active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="space-y-3">
        {customerList.map((c, idx) => (
          <div key={c.id || idx} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0070ba] font-black text-sm flex items-center justify-center">
                  {(c.name || 'C')[0]}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">{c.name}</h4>
                  <p className="text-xs text-slate-500">{c.company || 'Enterprise Partner'}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                Active Client
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl text-[11px]">
              <div>
                <span className="text-slate-400">Total Value:</span>
                <strong className="block text-slate-900 font-mono">₹{Number(c.deal_value || c.total_spent || 500000).toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-slate-400">Account Status:</span>
                <strong className="block text-emerald-700">Verified & Invoiced</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {c.phone && (
                  <a href={`tel:${c.phone}`} className="p-2 rounded-xl bg-slate-100 text-slate-600">
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}
                {c.email && (
                  <a href={`mailto:${c.email}`} className="p-2 rounded-xl bg-slate-100 text-slate-600">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <button
                onClick={() => onSelectCustomer && onSelectCustomer(c)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1"
              >
                <span>Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
