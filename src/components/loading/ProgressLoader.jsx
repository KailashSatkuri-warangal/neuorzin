import React from 'react';

export function ProgressLoader({
  value,
  max = 100,
  indeterminate = false,
  height = 'h-1.5',
  color = 'bg-gradient-to-r from-[#0070ba] to-[#00c6ff]',
  className = '',
  showLabel = false,
  ...props
}) {
  const percentage = typeof value === 'number' ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={`w-full ${height} bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(percentage)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {indeterminate ? (
          <div className={`h-full ${color} w-1/3 rounded-full animate-[progress-indeterminate_1.5s_infinite_linear]`} />
        ) : (
          <div
            className={`h-full ${color} rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}

export default ProgressLoader;
