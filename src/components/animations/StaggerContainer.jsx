import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animationConfig } from './animationConfig';

export function StaggerContainer({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.1,
  as = 'div'
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
  distance = 24,
  intensity = 'medium',
  as = 'div'
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;
  const config = animationConfig.intensities[intensity] || animationConfig.intensities.medium;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  let x = 0;
  let y = 0;
  if (direction === 'up') y = distance || config.distance;
  if (direction === 'down') y = -(distance || config.distance);
  if (direction === 'left') x = distance || config.distance;
  if (direction === 'right') x = -(distance || config.distance);

  const variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      scale: config.scale,
      filter: `blur(${config.blur * 0.5}px)`
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: config.duration,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  return (
    <Component variants={variants} className={className}>
      {children}
    </Component>
  );
}
export default StaggerContainer;
