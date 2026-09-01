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

export const lessonsByUnit: Record<string, Lesson[]> = {
  'reading-u01': unit01Lessons,
  'reading-u02': unit02Lessons,
  'reading-u03': unit03Lessons,
  'reading-u04': unit04Lessons,
  'reading-u05': unit05Lessons,
  'reading-u06': unit06Lessons,
  'reading-u07': unit07Lessons,
  'reading-u08': unit08Lessons,
  'reading-u09': unit09Lessons,
  'reading-u10': unit10Lessons,
  'reading-u11': unit11Lessons,
};
