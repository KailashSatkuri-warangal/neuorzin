import React, { useState } from 'react';
import {
  TrendingUp,
  PlusCircle,
  Calendar,
  Pencil,
  Trash2
} from 'lucide-react';

export default function MobileDealsView({
  deals = [],
  onAddNewDeal,
  onEditDeal,
  onDeleteDeal,
  onStageChange
}) {
  const [selectedStage, setSelectedStage] = useState('All');

  const stages = ['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  const filteredDeals = deals.filter(d => {
    const matchesStage = selectedStage === 'All' || d.stage === selectedStage;
    return matchesStage;
  });

  const totalPipelineValue = deals.reduce((acc, d) => acc + (parseFloat(d.value) || 0), 0);

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      
      {/* Deals Header Banner */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-[#0070ba] rounded-3xl p-5 text-white shadow-md space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-200">Deals Pipeline</span>
            <h3 className="text-xl font-black font-display mt-0.5">₹{(totalPipelineValue / 100000).toFixed(2)} Lakhs</h3>
            <p className="text-[11px] text-purple-200">{deals.length} active enterprise commercial opportunities</p>
          </div>
          <button
            onClick={onAddNewDeal}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white text-purple-900 text-xs font-bold shadow-md cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      {/* Stage Pills */}
      <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
          Pipeline Stages
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          <button
            onClick={() => setSelectedStage('All')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedStage === 'All'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            All ({deals.length})
          </button>
          {stages.map(st => {
            const count = deals.filter(d => d.stage === st).length;
            return (
              <button
                key={st}
                onClick={() => setSelectedStage(st)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedStage === st
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Deals Cards */}
      <div className="space-y-3">
        {filteredDeals.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
            <TrendingUp className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <div className="text-xs font-bold text-slate-700">No deals found in this stage</div>
          </div>
        ) : (
          filteredDeals.map(d => (
            <div
              key={d.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-700">{d.deal_code || `DEAL-${d.id}`}</span>
                  <h4 className="text-sm font-black text-slate-900 mt-0.5">{d.title}</h4>
                  <p className="text-xs text-slate-500">{d.customer_name || 'Client Partner'}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditDeal(d)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteDeal(d.id)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Value & Stage changer */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Deal Value</div>
                  <div className="text-base font-black text-slate-900 font-mono">
                    ₹{Number(d.value || 0).toLocaleString('en-IN')}
                  </div>
                </div>

                <div>
                  <select
                    value={d.stage || 'Discovery'}
                    onChange={(e) => onStageChange(d.id, e.target.value)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-purple-700 focus:outline-none shadow-xs"
                  >
                    {stages.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expected close */}
              <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Close: {d.expected_close_date ? new Date(d.expected_close_date).toLocaleDateString('en-IN') : 'Q4 2026'}</span>
                </span>
                <span className="font-bold text-emerald-600">
                  {d.probability || 80}% Probability
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
