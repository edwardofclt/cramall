import { describe, expect, test } from 'vitest';
import { CONTENT_REGISTRIES, getSubject } from '../subjects';
import { lessonsByUnit } from './index';

describe('Science lesson registry', () => {
  test('exposes only Unit 1 and makes all four authored lessons visible to the subject map', () => {
    const expectedLessonIds = [
      'science-u01-l01',
      'science-u01-l02',
      'science-u01-l03',
      'science-u01-l04',
    ];

    expect(Object.keys(lessonsByUnit)).toEqual(['science-u01']);
    expect(lessonsByUnit['science-u01']?.map(({ id }) => id)).toEqual(expectedLessonIds);
    expect(Object.keys(CONTENT_REGISTRIES.science)).toEqual(['science-u01']);
    expect(
      getSubject('science').units.find(({ id }) => id === 'science-u01')?.lessons.map(({ id }) => id),
    ).toEqual(expectedLessonIds);
  });
});
