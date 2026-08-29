import { describe, expect, test } from 'vitest';
import { CONTENT_REGISTRIES, getSubject } from '../subjects';
import { lessonsByUnit } from './index';

describe('Reading lesson registry', () => {
  test('exposes only Unit 1 and makes both authored lessons visible to the subject map', () => {
    const expectedLessonIds = ['reading-u01-l01', 'reading-u01-l02'];

    expect(Object.keys(lessonsByUnit)).toEqual(['reading-u01']);
    expect(lessonsByUnit['reading-u01']?.map(({ id }) => id)).toEqual(expectedLessonIds);
    expect(Object.keys(CONTENT_REGISTRIES.reading)).toEqual(['reading-u01']);
    expect(
      getSubject('reading').units.find(({ id }) => id === 'reading-u01')?.lessons.map(({ id }) => id),
    ).toEqual(expectedLessonIds);
  });
});
