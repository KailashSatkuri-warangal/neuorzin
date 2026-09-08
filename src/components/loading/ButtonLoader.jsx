import React from 'react';
import { InlineLoader } from './InlineLoader';

export function ButtonLoader({
  loading = false,
  loadingText,
  children,
  className = '',
  disabled = false,
  spinnerVariant = 'spinner',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`relative transition-all duration-200 cursor-pointer disabled:cursor-not-allowed ${className}`}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <InlineLoader variant={spinnerVariant} size="sm" color="white" />
          {loadingText ? (
            <span>{loadingText}</span>
          ) : (
            <span className="opacity-90">{children}</span>
          )}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default ButtonLoader;
