import React from 'react';
import { Badge } from './Badge';

export function SectionHeader({
  badge,
  badgeVariant = 'cyan',
  title,
  highlightText,
  description,
  align = 'center',
  className = ''
}) {
  const alignClass = {
    center: 'text-center mx-auto max-w-3xl',
    left: 'text-left max-w-2xl',
    right: 'text-right ml-auto max-w-2xl',
  }[align];

  return (
    <div className={`${alignClass} mb-12 md:mb-16 ${className}`}>
      {badge && (
        <div className="mb-4">
          <Badge variant={badgeVariant} dot>{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-display mb-4">
        {title}{' '}
        {highlightText && (
          <span className="text-gradient-brand">{highlightText}</span>
        )}
      </h2>
      {description && (
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
