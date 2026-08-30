import { Variants, Transition } from 'framer-motion';

// Authentic GNOME Shell 46 snappy spring physics (stiffness: 400, damping: 17 for dock / stiffness: 300, damping: 24 for windows)
export const dockSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 17,
  mass: 0.8,
};

export const windowSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
  mass: 0.8,
};

export const gnomeFastSpring: Transition = {
  type: 'spring',
  stiffness: 450,
  damping: 26,
};

export const gnomeSmoothEase: Transition = {
  duration: 0.25,
  ease: [0.4, 0, 0.2, 1],
};

export const springPhysics: Transition = windowSpring;
export const springBouncy: Transition = dockSpring;
export const springSmooth: Transition = gnomeSmoothEase;

// 1. Dock Magnification & Launch Squash-Stretch Bounce
export const dockLaunchBounce = {
  scaleY: [1, 0.85, 1.12, 1],
  scaleX: [1, 1.12, 0.92, 1],
  transition: { duration: 0.4, ease: 'easeInOut' },
};

export const dockIndicatorVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 20 },
  },
};

// 2. Window Spawn from exact Screen Coordinates of Icon & Close to Origin
export const windowSpawnVariants: Variants = {
  initial: (origin?: { x: number; y: number }) => ({
    scale: 0.25,
    opacity: 0,
    transformOrigin: origin ? `${origin.x}px ${origin.y}px` : 'center center',
  }),
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      mass: 0.8,
    },
  },
  exit: (origin?: { x: number; y: number }) => ({
    scale: 0.25,
    opacity: 0,
    transformOrigin: origin ? `${origin.x}px ${origin.y}px` : 'center center',
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// 3. Mobile Window Slide-Up-Fade
export const mobileWindowVariants: Variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 26,
    },
  },
  exit: {
    y: 40,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// 4. Window Shake on Error (Tactile Terminal & Command Feedback)
export const windowShakeAnimation = {
  x: [0, -6, 6, -4, 4, 0],
  transition: { duration: 0.3, ease: 'easeInOut' },
};

// 5. Dropdown & Popover Transitions
export const dropdownMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
};

// 6. Right-Click Desktop Context Menu
export const contextMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    transformOrigin: 'top left',
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 480,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.1 },
  },
};

// 7. Terminal Output Staggered Slide-In
export const terminalLineVariants: Variants = {
  hidden: { opacity: 0, y: 3 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};
