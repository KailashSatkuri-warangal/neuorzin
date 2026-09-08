import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { animationConfig } from './animationConfig';

export function SlideDown({
  children,
  distance = 28,
  duration = animationConfig.durations.normal,
  delay = 0,
  className = '',
  ...props
}) {
  return (
    <ScrollReveal
      direction="down"
      distance={distance}
      duration={duration}
      delay={delay}
      className={className}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}
export default SlideDown;
