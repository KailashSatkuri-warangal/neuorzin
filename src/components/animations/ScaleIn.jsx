import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { animationConfig } from './animationConfig';

export function ScaleIn({
  children,
  scale = 0.95,
  duration = animationConfig.durations.normal,
  delay = 0,
  className = '',
  ...props
}) {
  return (
    <ScrollReveal
      direction="none"
      scale={scale}
      duration={duration}
      delay={delay}
      className={className}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}
export default ScaleIn;
