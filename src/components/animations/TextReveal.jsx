import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animationConfig } from './animationConfig';

export function TextReveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  intensity = 'medium',
  once = true
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;
  const config = animationConfig.intensities[intensity] || animationConfig.intensities.medium;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    hidden: {
      opacity: 0,
      y: config.distance,
      filter: `blur(${config.blur}px)`
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: config.duration,
        delay,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function WordReveal({
  text = '',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.05,
  as = 'h2',
  once = true
}) {
  const prefersReducedMotion = useReducedMotion();
  const words = typeof text === 'string' ? text.split(' ') : [];
  const Component = motion[as] || motion.h2;

  if (prefersReducedMotion || !words.length) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(6px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      className={`inline-block flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
          <motion.span variants={wordVariants} className={`inline-block ${wordClassName}`}>
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

export function CharacterReveal({
  text = '',
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.02,
  as = 'span',
  once = true
}) {
  const prefersReducedMotion = useReducedMotion();
  const chars = typeof text === 'string' ? text.split('') : [];
  const Component = motion[as] || motion.span;

  if (prefersReducedMotion || !chars.length) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: animationConfig.easings.cinematic
      }
    }
  };

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      className={`inline-block ${className}`}
    >
      {chars.map((ch, idx) => (
        <motion.span
          key={idx}
          variants={charVariants}
          className={`inline-block ${charClassName}`}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </Component>
  );
}
export default TextReveal;
