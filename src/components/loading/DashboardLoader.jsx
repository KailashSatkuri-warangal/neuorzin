import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';
import { CardLoader } from './CardLoader';
import { TableLoader } from './TableLoader';

export function DashboardLoader({ className = '' }) {
  return (
    <div
      className={`space-y-6 w-full ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <CardLoader variant="stat" count={4} />
      </div>

      {/* Main Charts & Analytics Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <SkeletonLoader type="title" className="!w-48 !h-5 !mb-0" />
            <SkeletonLoader type="badge" className="!w-24 !h-6" />
          </div>
          <SkeletonLoader type="card" className="!h-64 !w-full" />
        </div>

        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <SkeletonLoader type="title" className="!w-36 !h-5" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2.5">
                  <SkeletonLoader type="avatar" className="!w-7 !h-7 !rounded-lg" />
                  <SkeletonLoader type="text" className="!w-20 !h-3 !mb-0" />
                </div>
                <SkeletonLoader type="badge" className="!w-12 !h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <TableLoader rows={4} columns={4} />
      <span className="sr-only">Loading dashboard analytics...</span>
    </div>
  );
}

export default DashboardLoader;
