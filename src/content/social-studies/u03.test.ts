import { expect, test } from 'vitest';
import { validateLesson, WidgetRefSchema } from '../schema';
import { unit03Lessons } from './u03';

const titles = ["Moving West, Different Experiences", "Land, Laws, and Forced Removal", "New Tools Changed the Land", "Why Regions Disagreed", "When Borders Moved", "Looking West Through Different Eyes"];
const activities = ["history-map", "history-cause-effect", "history-timeline", "history-evidence-board", "history-map", "history-evidence-board"];
const indicators = ['CO', 'CE', 'P', 'CX', 'CC', 'E'];

test('unit 3 preserves the approved six lesson identities and activity allocation', () => {
  expect(unit03Lessons).toHaveLength(6);
  unit03Lessons.forEach((lesson, index) => {
    expect(lesson.id).toBe(`social-studies-u03-l${String(index + 1).padStart(2, '0')}`);
    expect(lesson.title).toBe(titles[index]);
    expect(lesson.indicatorCodes).toEqual([`4.3.${indicators[index]}`]);
    expect(lesson.learnCards[1].widget?.type).toBe(activities[index]);
  });
});

test('unit 3 offers supported review cards, varied questions, and complete coaching', () => {
  for (const lesson of unit03Lessons) {
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(new Set(lesson.quiz.pool.map(q => q.prompt)).size).toBe(13);
    expect(new Set(lesson.quiz.pool.map(q => q.type)).size).toBeGreaterThanOrEqual(2);
    for (const card of lesson.learnCards) {
      expect(lesson.quiz.pool.some(q => q.reviewCardId === card.id)).toBe(true);
    }
    const card = lesson.learnCards[1];
    expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
    expect(card.widgetCoach?.intro.map(line => line.speaker)).toEqual(['guide', 'kid']);
    for (const reaction of ['retry', 'milestone', 'complete'] as const) {
      expect(card.widgetCoach?.reactions[reaction]?.text.length).toBeGreaterThan(35);
    }
  }
});
