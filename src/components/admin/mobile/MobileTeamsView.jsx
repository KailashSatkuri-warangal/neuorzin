import React from 'react';
import { Users, UserCheck, ShieldCheck, Briefcase } from 'lucide-react';

export default function MobileTeamsView({
  teams = [
    { name: 'Core Architecture & AI', manager: 'Siddharth Rao', members: 6, active_sprints: 3, load: 85 },
    { name: 'Frontend & UX Engineering', manager: 'Karthik Varma', members: 4, active_sprints: 2, load: 60 },
    { name: 'Cloud, DevOps & Security', manager: 'Arun Kumar', members: 5, active_sprints: 4, load: 90 }
  ],
  employees = [
    { name: 'Rahul Sharma', role: 'Staff AI Engineer', department: 'Engineering', workload: 80 },
    { name: 'Karthik Varma', role: 'Lead Frontend Architect', department: 'UI/UX', workload: 60 },
    { name: 'Arun Kumar', role: 'DevOps & SRE Lead', department: 'Cloud Infrastructure', workload: 90 },
    { name: 'Pooja Reddy', role: 'Solutions Architect', department: 'Commercial Sales', workload: 75 }
  ]
}) {
  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      
      {/* Teams Overview */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900">Engineering Teams</h3>
        
        <div className="space-y-3">
          {teams.map((t, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-black text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-500">Manager: {t.manager} • {t.members} Members</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#0070ba] bg-blue-50 px-2 py-0.5 rounded-lg">
                  {t.load}% Capacity
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${t.load > 85 ? 'bg-amber-500' : 'bg-[#0070ba]'}`}
                  style={{ width: `${t.load}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Workload */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900">Employee Workload Index</h3>
        
        <div className="space-y-2.5">
          {employees.map((emp, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0070ba] to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {emp.name[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{emp.name}</div>
                  <div className="text-[10px] text-slate-500">{emp.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-black text-slate-900">{emp.workload}%</div>
                <div className="text-[9px] text-slate-400 font-bold">Assigned</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
