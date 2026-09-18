import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellRing, 
  Check, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Inbox,
  ArrowRight
} from 'lucide-react';

export default function MobileNotificationsView({
  notifications = [],
  unreadCount = 0,
  onMarkRead,
  onMarkAllRead,
  onClearAll,
  onDelete,
  onNavigateTab
}) {
  const [filter, setFilter] = useState('all'); // all, unread, urgent

  const isNotificationRead = (n) => n.is_read === true || n.is_read === 1 || n.is_read === 't';

  const filteredNotifications = notifications.filter(n => {
    const read = isNotificationRead(n);
    if (filter === 'unread') return !read;
    if (filter === 'urgent') return n.priority === 'urgent' || n.priority === 'high' || n.type?.toLowerCase().includes('sla') || n.title?.toLowerCase().includes('sla');
    return true;
  });

  const urgentCount = notifications.filter(n => n.priority === 'urgent' || n.priority === 'high' || n.type?.toLowerCase().includes('sla') || n.title?.toLowerCase().includes('sla')).length;

  const handleItemClick = (n) => {
    if (!isNotificationRead(n) && onMarkRead) {
      onMarkRead(n.id);
    }
    if (n.action_url && onNavigateTab) {
      const cleanTab = n.action_url.replace(/^#\/?/, '').replace(/^\/admin\/?/, '');
      if (cleanTab) onNavigateTab(cleanTab);
    } else if (n.type?.includes('deal') || n.title?.toLowerCase().includes('deal')) {
      if (onNavigateTab) onNavigateTab('deals');
    } else if (n.type?.includes('invoice') || n.type?.includes('payment') || n.title?.toLowerCase().includes('invoice') || n.title?.toLowerCase().includes('payment')) {
      if (onNavigateTab) onNavigateTab('invoices');
    } else if (n.type?.includes('lead') || n.title?.toLowerCase().includes('lead')) {
      if (onNavigateTab) onNavigateTab('leads');
    } else if (n.type?.includes('project') || n.type?.includes('task')) {
      if (onNavigateTab) onNavigateTab('projects');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0070ba] to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight">System Notifications</h2>
              <p className="text-[11px] text-slate-500">
                {unreadCount} unread &bull; {notifications.length} total events
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-[#0070ba] text-[10px] font-bold flex items-center gap-1 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Read all</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Clear all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl mt-3 text-xs font-bold">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              filter === 'unread' ? 'bg-white text-[#0070ba] shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              filter === 'urgent' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Urgent SLA ({urgentCount})
          </button>
        </div>
      </div>

      {/* Notifications Stream */}
      <div className="space-y-2.5">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-black text-slate-900">All Caught Up!</h3>
              <p className="text-[11px] text-slate-400">
                No {filter !== 'all' ? filter : ''} notifications requiring attention.
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notif) => {
              const isRead = isNotificationRead(notif);
              const isUrgent = notif.priority === 'urgent' || notif.priority === 'high' || notif.type?.toLowerCase().includes('sla') || notif.title?.toLowerCase().includes('sla');
              const isDeal = notif.type?.toLowerCase().includes('deal') || notif.title?.toLowerCase().includes('deal');
              const isFinance = notif.type?.toLowerCase().includes('invoice') || notif.type?.toLowerCase().includes('payment') || notif.title?.toLowerCase().includes('invoice') || notif.title?.toLowerCase().includes('payment');

              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => handleItemClick(notif)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                    !isRead
                      ? isUrgent
                        ? 'bg-rose-50/60 border-rose-200/90 shadow-xs'
                        : 'bg-blue-50/50 border-blue-200/90 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Category Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isUrgent
                        ? 'bg-rose-100 text-rose-600'
                        : isDeal
                        ? 'bg-purple-100 text-purple-600'
                        : isFinance
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-blue-100 text-[#0070ba]'
                    }`}>
                      {isUrgent ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : isDeal ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : isFinance ? (
                        <DollarSign className="w-4 h-4" />
                      ) : (
                        <BellRing className="w-4 h-4" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center gap-1.5">
                        <h4 className={`text-xs font-black truncate ${!isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notif.title}
                        </h4>
                        {!isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#0070ba] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{notif.created_at ? new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="capitalize">{notif.type || 'General'}</span>
                        {isUrgent && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-bold uppercase tracking-wider">
                            Urgent SLA
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      {!isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onMarkRead) onMarkRead(notif.id);
                          }}
                          className="p-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-600 hover:text-emerald-600 shadow-xs cursor-pointer"
                          title="Mark as read"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onDelete) onDelete(notif.id);
                        }}
                        className="p-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-600 hover:text-rose-600 shadow-xs cursor-pointer"
                        title="Dismiss"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
