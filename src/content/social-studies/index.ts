import type { Lesson } from '../schema';
import { unit01Lessons } from './u01';
import { unit02Lessons } from './u02';
import { unit03Lessons } from './u03';
import { unit04Lessons } from './u04';
import { unit05Lessons } from './u05';

export const lessonsByUnit: Record<string, Lesson[]> = {
  'social-studies-u01': unit01Lessons,
  'social-studies-u02': unit02Lessons,
  'social-studies-u03': unit03Lessons,
  'social-studies-u04': unit04Lessons,
  'social-studies-u05': unit05Lessons,
};
