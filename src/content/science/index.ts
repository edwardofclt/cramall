import type { Lesson } from '../schema';
import { unit01Lessons } from './u01';

export const lessonsByUnit: Record<string, Lesson[]> = {
  'science-u01': unit01Lessons,
};
