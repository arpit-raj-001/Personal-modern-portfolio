export const EASE_PREMIUM = [0.22, 1, 0.36, 1];
export const DURATION_FAST = 0.6;
export const DURATION_MEDIUM = 0.9;
export const DURATION_SLOW = 1.2;
export const DURATION_VERY_SLOW = 1.5;

export const TRANSITION_DEFAULT = {
  duration: DURATION_MEDIUM,
  ease: EASE_PREMIUM,
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION_MEDIUM,
      ease: EASE_PREMIUM,
    },
  },
};

export const fadeUpSlow = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_PREMIUM,
    },
  },
};

export const scaleReveal = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_PREMIUM,
    },
  },
};

export const lineReveal = {
  hidden: {
    scaleX: 0,
    originX: 0,
    opacity: 0,
  },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_PREMIUM,
    },
  },
};

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.4, ease: EASE_PREMIUM },
};

export const hoverFade = {
  opacity: 0.7,
  transition: { duration: 0.3, ease: EASE_PREMIUM },
};
