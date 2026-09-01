import { expect, test } from 'vitest';
import { PLANNED_LESSONS, READING_OE_CODES } from '../curriculum';
import { lessonsByUnit } from './index';

test('Reading registry matches all planned rows and OE metadata in unit order', () => {
  const expected = PLANNED_LESSONS.filter(({ id }) => id.startsWith('reading-'));
  expect(Object.keys(lessonsByUnit)).toEqual([...new Set(expected.map(({ unitId }) => unitId))]);
  const lessons = Object.values(lessonsByUnit).flat();
  expect(lessons.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(expected.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
  for (const lesson of lessons) {
    expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
    expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
  }
});
