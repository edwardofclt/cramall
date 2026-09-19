import { expect, test } from 'vitest';
import { validateLesson, WidgetRefSchema } from '../schema';
import { unit02Lessons } from './u02';

const titles = ["Many People in the Revolution", "Why Colonists Sought Independence", "Building Our Government", "South Carolina and Independence", "Rights and Promises", "Different Views of a New Nation"];
const activities = ["history-evidence-board", "history-cause-effect", "history-timeline", "history-map", "history-evidence-board", "history-evidence-board"];
const indicators = ['CO', 'CE', 'P', 'CX', 'CC', 'E'];

test('unit 2 preserves the approved six lesson identities and activity allocation', () => {
  expect(unit02Lessons).toHaveLength(6);
  unit02Lessons.forEach((lesson, index) => {
    expect(lesson.id).toBe(`social-studies-u02-l${String(index + 1).padStart(2, '0')}`);
    expect(lesson.title).toBe(titles[index]);
    expect(lesson.indicatorCodes).toEqual([`4.2.${indicators[index]}`]);
    expect(lesson.learnCards[1].widget?.type).toBe(activities[index]);
  });
});

test('unit 2 offers supported review cards, varied questions, and complete coaching', () => {
  for (const lesson of unit02Lessons) {
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
