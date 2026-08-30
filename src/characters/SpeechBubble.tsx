import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { popVariants } from '../app/motion';
import { useReducedMotionPref } from '../app/useReducedMotionPref';

export type SpeechBubbleProps = {
  children: ReactNode;
  /** Which side the bubble's little tail sits on. */
  align?: 'left' | 'right' | 'center';
  className?: string;
  style?: CSSProperties;
};

export function SpeechBubble({ children, align = 'left', className, style }: SpeechBubbleProps) {
  const reduced = useReducedMotionPref();
  const classes = ['speech-bubble', `speech-bubble-${align}`, className].filter(Boolean).join(' ');
  return (
    <motion.div
      className={classes}
      variants={popVariants}
      initial={reduced ? false : 'initial'}
      animate="enter"
      style={{
        transformOrigin:
          align === 'right' ? 'bottom right' : align === 'center' ? 'bottom center' : 'bottom left',
        maxWidth: '34ch',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
