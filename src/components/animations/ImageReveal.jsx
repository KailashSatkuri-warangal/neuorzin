import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animationConfig } from './animationConfig';

export function ImageReveal({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  delay = 0,
  direction = 'up',
  once = true,
  children
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        {src ? <img src={src} alt={alt} className={imgClassName} /> : children}
      </div>
    );
  }

  const maskVariants = {
    hidden: {
      clipPath: direction === 'up'
        ? 'inset(100% 0% 0% 0%)'
        : direction === 'down'
        ? 'inset(0% 0% 100% 0%)'
        : direction === 'left'
        ? 'inset(0% 0% 0% 100%)'
        : 'inset(0% 100% 0% 0%)',
      opacity: 0.2
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: {
        duration: 0.9,
        delay,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  const imageVariants = {
    hidden: {
      scale: 1.12,
      filter: 'blur(8px)'
    },
    visible: {
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.1,
        delay: delay + 0.05,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  return (
    <motion.div
      variants={maskVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div variants={imageVariants} className="w-full h-full">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-full object-cover ${imgClassName}`}
          />
        ) : (
          children
        )}
      </motion.div>
    </motion.div>
  );
}

export function MaskReveal({
  children,
  className = '',
  delay = 0,
  direction = 'left',
  once = true
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  let initialClip = 'inset(0% 0% 0% 100%)';
  if (direction === 'right') initialClip = 'inset(0% 100% 0% 0%)';
  if (direction === 'up') initialClip = 'inset(100% 0% 0% 0%)';
  if (direction === 'down') initialClip = 'inset(0% 0% 100% 0%)';

  const variants = {
    hidden: {
      clipPath: initialClip,
      opacity: 0.1
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: {
        duration: 0.85,
        delay,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
export default ImageReveal;
