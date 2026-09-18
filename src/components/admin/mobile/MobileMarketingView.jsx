import React from 'react';
import { Megaphone, PlusCircle, TrendingUp, DollarSign, Target } from 'lucide-react';

export default function MobileMarketingView({
  campaigns = [],
  onAddNewCampaign
}) {
  const campaignList = campaigns.length > 0 ? campaigns : [
    { id: 1, name: 'Google Ads — Enterprise AI', channel: 'Google', spend: 45000, leads: 24, won_deals: 4, revenue: 1450000, roi: 32.2 },
    { id: 2, name: 'LinkedIn B2B — Cloud Modernization', channel: 'LinkedIn', spend: 60000, leads: 18, won_deals: 3, revenue: 980000, roi: 16.3 }
  ];

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black text-slate-900">Marketing & ROI</h3>
          <p className="text-[10px] text-slate-500">{campaignList.length} active digital ad campaigns</p>
        </div>
        <button
          onClick={onAddNewCampaign}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0070ba] text-white text-xs font-bold shadow-md cursor-pointer active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Campaign</span>
        </button>
      </div>

      <div className="space-y-3">
        {campaignList.map((c, idx) => (
          <div key={c.id || idx} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">{c.channel || 'Digital Ads'}</span>
                <h4 className="text-sm font-black text-slate-900 mt-0.5">{c.name}</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-black">
                {c.roi || 24.5}x ROI
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl text-[11px] text-center">
              <div>
                <span className="text-slate-400 block text-[10px]">Spend</span>
                <strong className="font-mono text-slate-800">₹{Number(c.spend || 0).toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Leads</span>
                <strong className="font-mono text-slate-800">{c.leads || 0}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Revenue</span>
                <strong className="font-mono text-emerald-700">₹{Number(c.revenue || 0).toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
