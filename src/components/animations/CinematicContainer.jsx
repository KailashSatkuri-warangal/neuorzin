import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animationConfig } from './animationConfig';

export function CinematicContainer({
  children,
  className = '',
  intensity = 'cinematic',
  delay = 0,
  staggerChildren = 0.08,
  as = 'div',
  once = true,
  amount = 0.1
}) {
  const prefersReducedMotion = useReducedMotion();
  const config = animationConfig.intensities[intensity] || animationConfig.intensities.cinematic;
  const Component = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: config.scale,
      y: config.distance * 0.5,
      filter: `blur(${config.blur * 0.5}px)`
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: config.duration,
        delay,
        ease: animationConfig.easings.cinematic,
        staggerChildren,
        delayChildren: delay + 0.1
      }
    }
  };

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </Component>
  );
}
export default CinematicContainer;
