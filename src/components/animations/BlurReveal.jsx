import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { animationConfig } from './animationConfig';

export function BlurReveal({
  children,
  distance = 16,
  duration = animationConfig.durations.slow,
  delay = 0,
  className = '',
  ...props
}) {
  return (
    <ScrollReveal
      direction="up"
      distance={distance}
      blur={true}
      duration={duration}
      delay={delay}
      className={className}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}
export default BlurReveal;
