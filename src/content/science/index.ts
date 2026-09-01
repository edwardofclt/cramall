import type { Lesson } from '../schema';
import { unit01Lessons } from './u01';
import { unit02Lessons } from './u02';
import { unit03Lessons } from './u03';
import { unit04Lessons } from './u04';
import { unit05Lessons } from './u05';
import { unit06Lessons } from './u06';
import { unit07Lessons } from './u07';
import { unit08Lessons } from './u08';

export const lessonsByUnit: Record<string, Lesson[]> = {
  'science-u01': unit01Lessons,
  'science-u02': unit02Lessons,
  'science-u03': unit03Lessons,
  'science-u04': unit04Lessons,
  'science-u05': unit05Lessons,
  'science-u06': unit06Lessons,
  'science-u07': unit07Lessons,
  'science-u08': unit08Lessons,
};
