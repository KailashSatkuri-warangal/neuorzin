import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export function TableLoader({ rows = 5, columns = 4, className = '' }) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111424] shadow-xs ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Table Header */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 px-6 py-4 grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIdx) => (
          <SkeletonLoader key={colIdx} type="badge" className="!w-20 !h-4" />
        ))}
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="px-6 py-4 grid gap-4 items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <div key={colIdx} className="flex items-center gap-2">
                {colIdx === 0 ? (
                  <>
                    <SkeletonLoader type="avatar" className="!w-7 !h-7 !rounded-full" />
                    <SkeletonLoader type="text" className="!w-32 !h-3.5 !mb-0" />
                  </>
                ) : colIdx === columns - 1 ? (
                  <SkeletonLoader type="badge" className="!w-16 !h-5 !rounded-full" />
                ) : (
                  <SkeletonLoader type="text" className="!w-24 !h-3.5 !mb-0" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Loading table data...</span>
    </div>
  );
}

export default TableLoader;
