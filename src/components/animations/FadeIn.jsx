import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { animationConfig } from './animationConfig';

export function FadeIn({
  children,
  duration = animationConfig.durations.normal,
  delay = 0,
  y = 12,
  className = '',
  ...props
}) {
  return (
    <ScrollReveal
      direction={y ? 'up' : 'none'}
      distance={y}
      duration={duration}
      delay={delay}
      className={className}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}
export default FadeIn;
