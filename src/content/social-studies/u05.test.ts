import { describe, expect, test } from 'vitest';
import { validateLesson } from '../schema';
import { unit05Lessons } from './u05';

describe('Social Studies Unit 5 authored curriculum', () => {
  test('provides each approved Reconstruction indicator with a complete, reviewable lesson', () => {
    expect(unit05Lessons.map(({ title }) => title)).toEqual([
      'People Rebuilding Communities', 'Three Changes to the Constitution',
      'A Turning Point After War', 'Rebuilding South Carolina',
      'New Rights, Unfair Barriers', 'What Reconstruction Changed',
    ]);
    expect(unit05Lessons.map(({ indicatorCodes }) => indicatorCodes)).toEqual([
      ['4.5.CO'], ['4.5.CE'], ['4.5.P'], ['4.5.CX'], ['4.5.CC'], ['4.5.E'],
    ]);
    expect(unit05Lessons.map((lesson) => lesson.learnCards[1]?.widget?.type)).toEqual([
      'history-evidence-board', 'history-cause-effect', 'history-timeline',
      'history-map', 'history-timeline', 'history-evidence-board',
    ]);
    for (const [index, lesson] of unit05Lessons.entries()) {
      expect(lesson.id).toBe(`social-studies-u05-l0${index + 1}`);
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
