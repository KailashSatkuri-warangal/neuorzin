import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animationConfig } from './animationConfig';

export function CinematicReveal({
  children,
  className = '',
  intensity = 'medium',
  direction = 'up',
  delay = 0,
  as = 'div',
  perspective = 1000,
  once = true,
  amount = 0.15
}) {
  const prefersReducedMotion = useReducedMotion();
  const config = animationConfig.intensities[intensity] || animationConfig.intensities.medium;
  const Component = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  let x = 0;
  let y = 0;
  let rotateX = 0;
  let rotateY = 0;

  if (direction === 'up') {
    y = config.distance;
    rotateX = config.rotateX;
  } else if (direction === 'down') {
    y = -config.distance;
    rotateX = -config.rotateX;
  } else if (direction === 'left') {
    x = config.distance;
    rotateY = -config.rotateX;
  } else if (direction === 'right') {
    x = -config.distance;
    rotateY = config.rotateX;
  }

  const variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      scale: config.scale,
      filter: `blur(${config.blur}px)`,
      rotateX,
      rotateY
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: config.duration,
        delay,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  return (
    <Component
      style={{ perspective: `${perspective}px`, transformStyle: 'preserve-3d' }}
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
export default CinematicReveal;
