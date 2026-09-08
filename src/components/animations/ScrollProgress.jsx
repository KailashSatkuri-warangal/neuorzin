import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress({
  className = '',
  color = 'bg-gradient-to-r from-[#0070ba] via-[#0094e8] to-[#00c6ff]',
  height = 'h-[3px]',
  ...props
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed top-0 left-0 right-0 z-[9999] origin-left ${height} ${color} ${className}`}
      {...props}
    />
  );
}
export default ScrollProgress;
