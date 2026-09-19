import { describe, expect, test } from 'vitest';
import { validateLesson } from '../schema';
import { unit04Lessons } from './u04';

describe('Social Studies Unit 4 authored curriculum', () => {
  test('provides each approved Civil War indicator with a complete, reviewable lesson', () => {
    expect(unit04Lessons.map(({ title }) => title)).toEqual([
      'Slavery and the Road to War', 'How War Plans Affected People',
      'People Worked for Freedom', 'South Carolinians During the War',
      'How the War Changed Life', 'Evidence from a Divided Nation',
    ]);
    expect(unit04Lessons.map(({ indicatorCodes }) => indicatorCodes)).toEqual([
      ['4.4.CO'], ['4.4.CE'], ['4.4.P'], ['4.4.CX'], ['4.4.CC'], ['4.4.E'],
    ]);
    expect(unit04Lessons.map((lesson) => lesson.learnCards[1]?.widget?.type)).toEqual([
      'history-evidence-board', 'history-cause-effect', 'history-timeline',
      'history-evidence-board', 'history-timeline', 'history-evidence-board',
    ]);
    for (const [index, lesson] of unit04Lessons.entries()) {
      expect(lesson.id).toBe(`social-studies-u04-l0${index + 1}`);
      expect(validateLesson(lesson)).toEqual([]);
      expect(lesson.learnCards).toHaveLength(3);
      expect(lesson.quiz.pool).toHaveLength(13);
      expect(new Set(lesson.quiz.pool.map(({ prompt }) => prompt)).size).toBe(13);
      expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);
      expect(lesson.quiz.reference?.text.length).toBeGreaterThan(500);
      expect(lesson.workedExample.steps.length).toBeGreaterThanOrEqual(3);
      const coach = lesson.learnCards[1]?.widgetCoach;
      expect(coach?.intro.map(({ speaker }) => speaker)).toEqual(['guide', 'kid']);
      expect(coach?.reactions.retry?.text).toBeTruthy();
      expect(coach?.reactions.milestone?.text).toBeTruthy();
      expect(coach?.reactions.complete.text).toBeTruthy();
      for (const card of lesson.learnCards) {
        expect(lesson.quiz.pool.some(({ reviewCardId }) => reviewCardId === card.id)).toBe(true);
        expect(card.blocks.find(({ kind }) => kind === 'text')?.text.split(/\s+/).length).toBeGreaterThanOrEqual(55);
      }
    }
  });
});
