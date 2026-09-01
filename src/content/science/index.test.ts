import { expect, test } from 'vitest';
import { PLANNED_LESSONS } from '../curriculum';
import { lessonsByUnit } from './index';

test('Science registry matches all planned rows in unit order', () => {
  const expected = PLANNED_LESSONS.filter(({ id }) => id.startsWith('science-'));
  expect(Object.keys(lessonsByUnit)).toEqual([...new Set(expected.map(({ unitId }) => unitId))]);
  expect(Object.values(lessonsByUnit).flat().map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(expected.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
});
