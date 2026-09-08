import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export function CardLoader({ variant = 'service', count = 1, className = '' }) {
  const renderSingleCard = (key) => {
    if (variant === 'service') {
      return (
        <div
          key={key}
          className={`p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between ${className}`}
          role="status"
          aria-busy="true"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <SkeletonLoader type="avatar" className="!w-12 !h-12 !rounded-2xl" />
              <SkeletonLoader type="badge" className="!w-16 !h-5" />
            </div>
            <SkeletonLoader type="title" className="!w-3/4 !h-6 !mb-3" />
            <SkeletonLoader type="text" count={2} className="!w-full" />
            <SkeletonLoader type="text" className="!w-4/5" />
          </div>
          <div className="pt-6 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <SkeletonLoader type="badge" className="!w-24 !h-4" />
            <SkeletonLoader type="avatar" className="!w-4 !h-4 !rounded-full" />
          </div>
        </div>
      );
    }

    if (variant === 'project') {
      return (
        <div
          key={key}
          className={`rounded-3xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs ${className}`}
          role="status"
          aria-busy="true"
        >
          <SkeletonLoader type="image" className="!h-52 sm:!h-60 !rounded-none" />
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <SkeletonLoader type="badge" className="!w-20" />
              <SkeletonLoader type="badge" className="!w-16" />
            </div>
            <SkeletonLoader type="title" className="!w-4/5 !h-6" />
            <SkeletonLoader type="text" count={2} />
          </div>
        </div>
      );
    }

    if (variant === 'blog') {
      return (
        <div
          key={key}
          className={`rounded-3xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs flex flex-col justify-between ${className}`}
          role="status"
          aria-busy="true"
        >
          <div>
            <SkeletonLoader type="image" className="!h-48 !rounded-none" />
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <SkeletonLoader type="badge" className="!w-20 !h-4" />
                <SkeletonLoader type="badge" className="!w-16 !h-4" />
              </div>
              <SkeletonLoader type="title" className="!w-full !h-6" />
              <SkeletonLoader type="text" count={2} />
            </div>
          </div>
          <div className="p-6 pt-0 flex items-center gap-3">
            <SkeletonLoader type="avatar" className="!w-8 !h-8" />
            <div className="space-y-1 w-1/2">
              <SkeletonLoader type="text" className="!w-full !h-3 !mb-0" />
              <SkeletonLoader type="text" className="!w-2/3 !h-2.5 !mb-0" />
            </div>
          </div>
        </div>
      );
    }

    if (variant === 'team') {
      return (
        <div
          key={key}
          className={`p-6 rounded-3xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 text-center shadow-xs flex flex-col items-center ${className}`}
          role="status"
          aria-busy="true"
        >
          <SkeletonLoader type="avatar-lg" className="!w-28 !h-28 !rounded-3xl !mb-4" />
          <SkeletonLoader type="title" className="!w-32 !h-5 !mb-1.5" />
          <SkeletonLoader type="badge" className="!w-24 !h-4 !mb-4" />
          <div className="flex items-center justify-center gap-2 pt-2">
            <SkeletonLoader type="avatar" className="!w-7 !h-7 !rounded-lg" />
            <SkeletonLoader type="avatar" className="!w-7 !h-7 !rounded-lg" />
            <SkeletonLoader type="avatar" className="!w-7 !h-7 !rounded-lg" />
          </div>
        </div>
      );
    }

    if (variant === 'stat') {
      return (
        <div
          key={key}
          className={`p-6 rounded-2xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 shadow-xs ${className}`}
          role="status"
          aria-busy="true"
        >
          <div className="flex items-center justify-between mb-2">
            <SkeletonLoader type="badge" className="!w-24 !h-4" />
            <SkeletonLoader type="avatar" className="!w-6 !h-6 !rounded-md" />
          </div>
          <SkeletonLoader type="heading" className="!w-28 !h-8 !mb-1" />
          <SkeletonLoader type="text" className="!w-36 !h-3" />
        </div>
      );
    }

    // Default Card
    return (
      <div
        key={key}
        className={`p-6 rounded-2xl bg-white dark:bg-[#111424] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 ${className}`}
        role="status"
        aria-busy="true"
      >
        <SkeletonLoader type="title" className="!w-2/3" />
        <SkeletonLoader type="text" count={3} />
        <SkeletonLoader type="button" className="!w-28 !h-9" />
      </div>
    );
  };

  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, idx) => renderSingleCard(idx))}
      </>
    );
  }

  return renderSingleCard(0);
}

export default CardLoader;
