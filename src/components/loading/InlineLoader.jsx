import React from 'react';

export function InlineLoader({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  const colorClasses = {
    primary: 'text-[#0070ba] border-[#0070ba]',
    secondary: 'text-[#00c6ff] border-[#00c6ff]',
    white: 'text-white border-white',
    slate: 'text-slate-500 border-slate-500'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentDotSize = dotSizes[size] || dotSizes.md;
  const currentColor = colorClasses[color] || colorClasses.primary;

  if (variant === 'dots') {
    return (
      <span
        className={`inline-flex items-center gap-1 ${className}`}
        role="status"
        aria-label="Loading..."
        {...props}
      >
        <span className={`${currentDotSize} rounded-full bg-current ${currentColor} animate-[bounce_1.4s_infinite_0ms]`} />
        <span className={`${currentDotSize} rounded-full bg-current ${currentColor} animate-[bounce_1.4s_infinite_200ms]`} />
        <span className={`${currentDotSize} rounded-full bg-current ${currentColor} animate-[bounce_1.4s_infinite_400ms]`} />
        <span className="sr-only">Loading...</span>
      </span>
    );
  }

  if (variant === 'pulse') {
    return (
      <span
        className={`inline-block rounded-full bg-current opacity-75 animate-ping ${currentSize} ${currentColor} ${className}`}
        role="status"
        aria-label="Loading..."
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </span>
    );
  }

  if (variant === 'ring') {
    return (
      <span
        className={`inline-block relative ${currentSize} ${className}`}
        role="status"
        aria-label="Loading..."
        {...props}
      >
        <span className="absolute inset-0 rounded-full border-2 border-current opacity-25" />
        <span className="absolute inset-0 rounded-full border-2 border-current border-t-transparent animate-spin" />
        <span className="sr-only">Loading...</span>
      </span>
    );
  }

  // Default: Spinner
  return (
    <svg
      className={`animate-spin shrink-0 ${currentSize} ${currentColor} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading..."
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default InlineLoader;
