import { useReducedMotion } from 'framer-motion';

export function useReducedMotionPref(): boolean {
  return useReducedMotion() ?? false;
}
