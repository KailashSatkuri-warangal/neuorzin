import React, { useState } from 'react';
import {
  CheckSquare,
  PlusCircle,
  Play,
  Pause,
  Clock,
  Pencil,
  Trash2,
  RotateCcw
} from 'lucide-react';

export default function MobileTasksView({
  tasks = [],
  activeTimerTask,
  formatSeconds,
  onStartTimer,
  onPauseResumeTimer,
  onStopTimerAndLog,
  onResetTimer,
  onQuickAddTodo,
  onAddNewTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  getTimelineMetrics
}) {
  const [quickInput, setQuickInput] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'In Progress') return t.status === 'In Progress';
    if (filter === 'Completed') return t.status === 'Completed';
    return t.status === filter;
  });

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onQuickAddTodo(quickInput.trim());
    setQuickInput('');
  };

  return (
    <div className="space-y-4 pb-20 md:hidden animate-in fade-in duration-150">
      
      {/* Mobile Live Sprint Stopwatch Widget */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a2540] to-slate-900 rounded-3xl p-4 text-white shadow-lg space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl border border-white/15">
              <Clock className={`w-6 h-6 ${activeTimerTask?.isRunning ? 'text-emerald-400 animate-pulse' : 'text-blue-300'}`} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-200">
                {activeTimerTask ? 'Active Daily Work Timer' : 'Daily Works Stopwatch'}
              </div>
              <div className="text-xl font-black font-mono mt-0.5">
                {formatSeconds ? formatSeconds(activeTimerTask?.seconds || 0) : '00:00:00'}
              </div>
            </div>
          </div>

          {activeTimerTask && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onPauseResumeTimer}
                className={`p-2 rounded-xl text-white font-bold cursor-pointer ${
                  activeTimerTask.isRunning ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              >
                {activeTimerTask.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={onStopTimerAndLog}
                className="px-2.5 py-2 rounded-xl bg-purple-600 text-white font-bold text-[11px] cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={onResetTimer}
                className="p-2 rounded-xl bg-white/10 text-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {activeTimerTask && (
          <div className="text-[11px] text-slate-300 font-medium truncate px-1">
            Task: {activeTimerTask.title}
          </div>
        )}

        {/* Quick Add Daily Task Input */}
        <form onSubmit={handleQuickSubmit} className="pt-2 border-t border-white/10 flex gap-2">
          <input
            type="text"
            placeholder="⚡ Quick Add Daily Work & Start Timer..."
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/20"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-xl bg-[#0070ba] text-white text-xs font-bold shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Filter Tabs & Header */}
      <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Backlog ({tasks.length})</h3>
          <button
            onClick={onAddNewTask}
            className="text-xs font-bold text-[#0070ba] flex items-center gap-1 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {['All', 'Todo', 'In Progress', 'In Review', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === st ? 'bg-[#0070ba] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {filteredTasks.map(t => (
          <div key={t.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0070ba]">{t.task_code || `TSK-${t.id}`}</span>
                <h4 className="text-sm font-black text-slate-900 mt-0.5">{t.title}</h4>
                <p className="text-xs text-slate-500">{t.department || 'Engineering'}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                t.priority === 'Critical' || t.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-[#0070ba]'
              }`}>
                {t.priority || 'High'}
              </span>
            </div>

            {/* Hours & Status Changer */}
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-xs">
              <div className="font-mono text-slate-700">
                <strong>{t.logged_hours || 0}h</strong> / {t.estimated_hours || 0}h Logged
              </div>
              <select
                value={t.status || 'Todo'}
                onChange={(e) => onStatusChange(t.id, e.target.value)}
                className="px-2 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Quick Actions & Stopwatch trigger */}
            <div className="pt-1 flex justify-between items-center">
              <button
                onClick={() => onStartTimer(t)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  activeTimerTask?.id === t.id && activeTimerTask.isRunning
                    ? 'bg-amber-500 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {activeTimerTask?.id === t.id && activeTimerTask.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{activeTimerTask?.id === t.id && activeTimerTask.isRunning ? 'Timing...' : 'Start Timer'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditTask(t)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteTask(t.id)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
