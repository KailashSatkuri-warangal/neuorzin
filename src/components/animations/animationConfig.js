export const animationConfig = {
  durations: {
    instant: 0.15,
    fast: 0.28,
    normal: 0.48,
    slow: 0.72,
    deliberate: 0.9,
    cinematic: 1.1
  },
  stagger: {
    tiny: 0.03,
    fast: 0.06,
    normal: 0.09,
    slow: 0.14,
    cinematic: 0.18
  },
  distance: {
    subtle: 14,
    normal: 28,
    strong: 48,
    cinematic: 70
  },
  easings: {
    smooth: [0.21, 0.47, 0.32, 0.98],
    easeOut: [0.16, 1, 0.3, 1],
    gentle: [0.33, 1, 0.68, 1],
    cinematic: [0.19, 1, 0.22, 1],
    spring: { type: 'spring', damping: 25, stiffness: 120 },
    gentleSpring: { type: 'spring', damping: 30, stiffness: 90 }
  },
  intensities: {
    subtle: {
      distance: 12,
      duration: 0.4,
      blur: 4,
      scale: 0.98,
      rotateX: 1
    },
    medium: {
      distance: 24,
      duration: 0.55,
      blur: 6,
      scale: 0.96,
      rotateX: 3
    },
    strong: {
      distance: 40,
      duration: 0.75,
      blur: 8,
      scale: 0.93,
      rotateX: 5
    },
    cinematic: {
      distance: 60,
      duration: 0.95,
      blur: 12,
      scale: 0.90,
      rotateX: 7
    }
  },
  viewport: {
    once: true,
    amount: 0.15,
    margin: '0px 0px -40px 0px'
  }
};

export default animationConfig;
