import React, { useState } from 'react';
import { CalendarCheck, Phone, MessageSquare, CheckCircle2, Clock, PlusCircle } from 'lucide-react';

export default function MobileFollowUpsView({
  activities = [],
  onCompleteActivity,
  onAddNewActivity
}) {
  const [filter, setFilter] = useState('TODAY');

  const now = new Date();
  const todayActs = activities.filter(a => a.status === 'Pending');
  const completedActs = activities.filter(a => a.status === 'Completed');

  const displayedList = filter === 'TODAY' ? todayActs : filter === 'COMPLETED' ? completedActs : activities;

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black text-slate-900">Follow-up Engine</h3>
          <p className="text-[10px] text-slate-500">{todayActs.length} discovery calls & milestones due</p>
        </div>
        <button
          onClick={onAddNewActivity}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0070ba] text-white text-xs font-bold shadow-md cursor-pointer active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Action</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-slate-100 p-1 rounded-2xl flex text-xs font-bold">
        {['TODAY', 'ALL ACTIVITIES', 'COMPLETED'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-2 rounded-xl transition-all ${
              filter === tab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Follow-up Cards */}
      <div className="space-y-3">
        {displayedList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
            No follow-ups in this category.
          </div>
        ) : (
          displayedList.map(a => (
            <div key={a.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-bold text-[#0070ba] uppercase tracking-wider">{a.type || 'Discovery Call'}</span>
                  <h4 className="text-sm font-black text-slate-900 mt-0.5">{a.title || a.subject}</h4>
                  <p className="text-xs text-slate-500">{a.customer_name || 'Client Lead'}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  a.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {a.status || 'Pending'}
                </span>
              </div>

              {a.notes && (
                <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600">
                  {a.notes}
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{a.scheduled_at ? new Date(a.scheduled_at).toLocaleString('en-IN') : 'Scheduled Today'}</span>
                </div>

                {a.status !== 'Completed' && (
                  <button
                    onClick={() => onCompleteActivity(a.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
