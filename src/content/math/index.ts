import type { Lesson } from '../schema';
import { unit01Lessons } from './u01';
import { unit02Lessons } from './u02';
import { unit03Lessons } from './u03';
import { unit04Lessons } from './u04';
import { unit05Lessons } from './u05';
import { unit06Lessons } from './u06';
import { unit07Lessons } from './u07';
import { unit08Lessons } from './u08';
import { unit09Lessons } from './u09';
import { unit10Lessons } from './u10';
import { unit11Lessons } from './u11';
import { unit12Lessons } from './u12';

export const lessonsByUnit: Record<string, Lesson[]> = {
  'math-u01': unit01Lessons,
  'math-u02': unit02Lessons,
  'math-u03': unit03Lessons,
  'math-u04': unit04Lessons,
  'math-u05': unit05Lessons,
  'math-u06': unit06Lessons,
  'math-u07': unit07Lessons,
  'math-u08': unit08Lessons,
  'math-u09': unit09Lessons,
  'math-u10': unit10Lessons,
  'math-u11': unit11Lessons,
  'math-u12': unit12Lessons,
};
