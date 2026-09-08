import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export function ModalLoader({ className = '' }) {
  return (
    <div
      className={`p-6 sm:p-8 space-y-6 bg-white dark:bg-[#111424] rounded-3xl ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5 w-2/3">
          <SkeletonLoader type="title" className="!w-3/4 !h-6 !mb-0" />
          <SkeletonLoader type="text" className="!w-1/2 !h-3 !mb-0" />
        </div>
        <SkeletonLoader type="avatar" className="!w-8 !h-8 !rounded-xl" />
      </div>

      {/* Form Skeletons */}
      <div className="space-y-4">
        <div>
          <SkeletonLoader type="badge" className="!w-20 !h-3 !mb-2" />
          <SkeletonLoader type="button" className="!w-full !h-12 !rounded-xl" />
        </div>
        <div>
          <SkeletonLoader type="badge" className="!w-24 !h-3 !mb-2" />
          <SkeletonLoader type="button" className="!w-full !h-12 !rounded-xl" />
        </div>
        <div>
          <SkeletonLoader type="badge" className="!w-28 !h-3 !mb-2" />
          <SkeletonLoader type="card" className="!w-full !h-24 !rounded-xl" />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
        <SkeletonLoader type="button" className="!w-24 !h-10" />
        <SkeletonLoader type="button" className="!w-32 !h-10" />
      </div>
      <span className="sr-only">Loading modal form...</span>
    </div>
  );
}

export default ModalLoader;
