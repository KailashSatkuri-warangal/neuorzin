import React from 'react';

export function Badge({
  children,
  variant = 'cyan',
  dot = false,
  className = ''
}) {
  const variants = {
    cyan: 'bg-brand-cyan/10 text-brand-sky border-brand-cyan/25',
    blue: 'bg-brand-blue/15 text-blue-300 border-brand-blue/30',
    purple: 'bg-brand-violet/15 text-brand-purple border-brand-violet/30',
    emerald: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
    amber: 'bg-accent-amber/15 text-amber-300 border-accent-amber/30',
    rose: 'bg-accent-rose/15 text-rose-300 border-accent-rose/30',
  };

  const dotColors = {
    cyan: 'bg-brand-cyan',
    blue: 'bg-brand-blue',
    purple: 'bg-brand-violet',
    emerald: 'bg-accent-emerald',
    amber: 'bg-accent-amber',
    rose: 'bg-accent-rose',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm ${variants[variant] || variants.cyan} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant] || dotColors.cyan}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant] || dotColors.cyan}`} />
        </span>
      )}
      {children}
    </span>
  );
}
