import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animationConfig } from './animationConfig';

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  intensity = 'medium',
  distance,
  duration,
  delay = 0,
  scale,
  blur,
  easing = 'cinematic',
  once = true,
  amount = 0.15,
  as = 'div'
}) {
  const prefersReducedMotion = useReducedMotion();
  const config = animationConfig.intensities[intensity] || animationConfig.intensities.medium;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const actualDistance = distance !== undefined ? distance : config.distance;
  const actualDuration = duration !== undefined ? duration : config.duration;
  const actualScale = scale !== undefined ? scale : config.scale;
  const actualBlur = blur !== undefined ? blur : config.blur;
  const actualEase = animationConfig.easings[easing] || animationConfig.easings.cinematic;

  let x = 0;
  let y = 0;

  switch (direction) {
    case 'up':
      y = actualDistance;
      break;
    case 'down':
      y = -actualDistance;
      break;
    case 'left':
      x = actualDistance;
      break;
    case 'right':
      x = -actualDistance;
      break;
    case 'none':
    default:
      break;
  }

  const variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      scale: actualScale,
      filter: actualBlur > 0 ? `blur(${actualBlur}px)` : 'none'
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: actualDuration,
        delay,
        ease: actualEase
      }
    }
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: animationConfig.viewport.margin }}
      className={className}
    >
      {children}
    </Component>
  );
}
export default ScrollReveal;
