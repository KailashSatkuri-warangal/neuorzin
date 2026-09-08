import React from 'react';

export function SkeletonLoader({
  type = 'text',
  animation = 'shimmer',
  width,
  height,
  className = '',
  count = 1,
  rounded = 'rounded-md',
  ...props
}) {
  const getAnimationClass = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'wave':
        return 'animate-wave';
      case 'none':
        return '';
      case 'shimmer':
      default:
        return 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/10 before:to-transparent';
    }
  };

  const getTypeClasses = () => {
    switch (type) {
      case 'title':
        return 'h-7 sm:h-8 w-3/4 mb-3';
      case 'heading':
        return 'h-10 sm:h-12 w-4/5 mb-4';
      case 'avatar':
        return 'w-12 h-12 rounded-full shrink-0';
      case 'avatar-lg':
        return 'w-20 h-20 rounded-full shrink-0';
      case 'image':
        return 'w-full h-48 sm:h-56 rounded-2xl';
      case 'button':
        return 'h-11 w-32 rounded-xl';
      case 'badge':
        return 'h-5 w-16 rounded-full';
      case 'pill':
        return 'h-6 w-24 rounded-full';
      case 'card':
        return 'w-full h-64 rounded-3xl';
      case 'text':
      default:
        return 'h-4 w-full mb-2 last:mb-0';
    }
  };

  const baseClasses = 'bg-slate-200/80 dark:bg-slate-800/80 transition-colors';
  const animationClass = getAnimationClass();
  const typeClass = getTypeClasses();

  const style = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {})
  };

  if (count > 1) {
    return (
      <div className="space-y-2 w-full" role="status" aria-busy="true" aria-live="polite">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            style={style}
            className={`${baseClasses} ${animationClass} ${typeClass} ${rounded} ${className}`}
            {...props}
          />
        ))}
        <span className="sr-only">Loading content...</span>
      </div>
    );
  }

  return (
    <div
      style={style}
      className={`${baseClasses} ${animationClass} ${typeClass} ${rounded} ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonLoader;
