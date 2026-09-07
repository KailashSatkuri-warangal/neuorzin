import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  onClick,
  href,
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden cursor-pointer tracking-wide";

  const sizeStyles = {
    sm: "text-xs px-4 py-2.5 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5 font-bold",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet text-white shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:scale-[1.02] active:scale-[0.98] border border-white/20",
    secondary: "bg-surface-card hover:bg-surface-elevated text-slate-100 border border-white/10 hover:border-brand-cyan/40 hover:text-white hover:scale-[1.02] active:scale-[0.98]",
    outline: "bg-transparent text-slate-200 border border-white/20 hover:border-brand-cyan hover:bg-brand-cyan/10 hover:text-white hover:scale-[1.02] active:scale-[0.98]",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
    glow: "bg-gradient-to-r from-brand-cyan to-brand-blue text-white shadow-neon-blue hover:scale-[1.02] active:scale-[0.98] border border-white/25",
    aurora: "bg-gradient-to-r from-accent-emerald via-brand-cyan to-brand-violet text-dark-900 font-extrabold shadow-neon-emerald hover:scale-[1.02] active:scale-[0.98]",
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
