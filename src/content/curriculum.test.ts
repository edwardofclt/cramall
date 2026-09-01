// src/content/curriculum.test.ts
import { describe, expect, test } from 'vitest';
import standardsData from './standards/standards.json';
import { PLANNED_LESSONS, READING_OE_CODES } from './curriculum';
import { StandardsDataSchema } from './standards/schema';

describe('full-year curriculum contract', () => {
  test('freezes 89 unique lessons across 31 exact units', () => {
    expect(PLANNED_LESSONS).toHaveLength(89);
    expect(new Set(PLANNED_LESSONS.map(({ id }) => id)).size).toBe(89);
    expect(new Set(PLANNED_LESSONS.map(({ unitId }) => unitId)).size).toBe(31);
    expect(PLANNED_LESSONS.filter(({ id }) => id.startsWith('math-'))).toHaveLength(33);
    expect(PLANNED_LESSONS.filter(({ id }) => id.startsWith('reading-'))).toHaveLength(24);
    expect(PLANNED_LESSONS.filter(({ id }) => id.startsWith('science-'))).toHaveLength(32);
  });

  test('derives the exact Reading OE source of truth from validated standards', () => {
    const standards = StandardsDataSchema.parse(standardsData);
    expect(READING_OE_CODES).toEqual(
      standards.reading.crossCuttingExpectations.map(({ code }) => code),
    );
    expect(READING_OE_CODES).toEqual([
      'ELA.4.OE.1', 'ELA.4.OE.2', 'ELA.4.OE.3',
      'ELA.4.OE.4', 'ELA.4.OE.5', 'ELA.4.OE.6',
    ]);
  });

  test('uses canonical IDs and keeps each lesson inside its unit', () => {
    for (const lesson of PLANNED_LESSONS) {
      expect(lesson.id).toMatch(/^(math|reading|science)-u\d{2}-l\d{2}$/);
      expect(lesson.unitId).toBe(lesson.id.slice(0, lesson.id.lastIndexOf('-l')));
      expect(lesson.title.length).toBeGreaterThan(0);
      expect(lesson.indicatorCodes.length).toBeGreaterThan(0);
      expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
    }
  });
});
