import type { Variants, Transition } from 'framer-motion';

export const springy: Transition = { type: 'spring', stiffness: 400, damping: 28 };

export const pageVariants: Variants = {
  initial: { opacity: 0, x: 40 },
  enter: { opacity: 1, x: 0, transition: springy },
  exit: { opacity: 0, x: -40, transition: { duration: 0.15 } },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1, transition: springy },
  exit: { opacity: 0, y: -24, transition: { duration: 0.15 } },
};

export const popVariants: Variants = {
  initial: { scale: 0 },
  enter: { scale: 1, transition: { type: 'spring', stiffness: 500, damping: 15 } },
};
