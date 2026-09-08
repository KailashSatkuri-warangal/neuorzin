import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export function ListLoader({ items = 4, hasAvatar = true, hasAction = true, className = '' }) {
  return (
    <div
      className={`space-y-3 w-full ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: items }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 rounded-2xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            {hasAvatar && (
              <SkeletonLoader type="avatar" className="!w-10 !h-10 !rounded-xl shrink-0" />
            )}
            <div className="space-y-1.5 flex-1 min-w-0">
              <SkeletonLoader type="title" className="!w-1/3 !h-4 !mb-0" />
              <SkeletonLoader type="text" className="!w-2/3 !h-3 !mb-0" />
            </div>
          </div>
          {hasAction && (
            <SkeletonLoader type="badge" className="!w-16 !h-6 !rounded-lg shrink-0" />
          )}
        </div>
      ))}
      <span className="sr-only">Loading list items...</span>
    </div>
  );
}

export default ListLoader;
