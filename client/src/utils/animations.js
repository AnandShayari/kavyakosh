// Animation variants for common transitions
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6 },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: 'easeInOut',
    },
  },
};

export const pulse = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      repeat: Infinity,
      duration: 2,
    },
  },
};

export const shimmer = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      repeat: Infinity,
      duration: 2,
    },
  },
};

// Typing animation for AI responses
export const typingAnimation = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  child: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
};
