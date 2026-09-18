import React from 'react';
import {
  Briefcase,
  PlusCircle,
  Clock,
  Calendar,
  Pencil,
  Trash2
} from 'lucide-react';

export default function MobileProjectsView({
  projects = [],
  onAddNewProject,
  onEditProject,
  onDeleteProject,
  getTimelineMetrics
}) {
  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black text-slate-900">Agile Projects</h3>
          <p className="text-[10px] text-slate-500">{projects.length} active software & cloud sprints</p>
        </div>
        <button
          onClick={onAddNewProject}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0070ba] text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map(p => {
          const tm = getTimelineMetrics ? getTimelineMetrics(p.start_date, p.deadline) : null;
          return (
            <div
              key={p.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0070ba]">{p.project_code || `PRJ-${p.id}`}</span>
                  <h4 className="text-sm font-black text-slate-900 mt-0.5">{p.name}</h4>
                  <p className="text-xs text-slate-500">{p.department || 'Engineering'}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    p.health === 'Good' ? 'bg-emerald-50 text-emerald-700' : p.health === 'Delayed' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    ● {p.health || 'Good'}
                  </span>
                  <button
                    onClick={() => onEditProject(p)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(p.id)}
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Start/End Countdown Box */}
              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-600 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{p.start_date ? new Date(p.start_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Kickoff'} - {p.deadline ? new Date(p.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Ongoing'}</span>
                  </span>
                  {tm && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      tm.isOverdue ? 'bg-rose-100 text-rose-700' : tm.diffDays <= 5 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-[#0070ba]'
                    }`}>
                      <Clock className="w-2.5 h-2.5" />
                      <span>{tm.daysLeftText}</span>
                    </span>
                  )}
                </div>
                {tm && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>Sprint Timeline</span>
                      <span>{tm.progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          tm.isOverdue ? 'bg-rose-500' : tm.progressPct > 80 ? 'bg-amber-500' : 'bg-[#0070ba]'
                        }`}
                        style={{ width: `${tm.progressPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Budget & Status */}
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">Budget: <strong className="text-slate-900 font-mono">₹{Number(p.budget || 0).toLocaleString('en-IN')}</strong></span>
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#0070ba] font-bold text-[11px]">{p.status || 'Active'}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
