import { describe, expect, test } from 'vitest';
import { SUBJECTS, standards } from '../subjects';
import { SubjectIdSchema, GuideIdSchema, LessonIdSchema, validateLesson } from '../schema';
import source from '../../../docs/research/sc-grade4-standards.json';

const expectedCodes = Array.from({ length: 5 }, (_, i) => ['CO', 'CE', 'P', 'CX', 'CC', 'E'].map(skill => `4.${i + 1}.${skill}`)).flat();
describe('Social Studies subject integration', () => {
  test('accepts its subject, guide and canonical lesson identity', () => {
    expect(SubjectIdSchema.safeParse('social-studies').success).toBe(true);
    expect(GuideIdSchema.safeParse('pip').success).toBe(true);
    expect(LessonIdSchema.safeParse('social-studies-u01-l01').success).toBe(true);
    expect(LessonIdSchema.safeParse('social-studies-u1-l1').success).toBe(false);
  });
  test('registers Pip and thirty coached lessons in five sequential units', () => {
    const social = SUBJECTS.find(subject => String(subject.id) === 'social-studies');
    expect(social?.guide).toBe('pip');
    expect(social?.units).toHaveLength(5);
    const lessons = social?.units.flatMap(unit => unit.lessons) ?? [];
    expect(lessons).toHaveLength(30);
    expect(lessons.flatMap(lesson => lesson.indicatorCodes)).toEqual(expectedCodes);
    social?.units.forEach((unit, i) => {
      expect(unit.lessons).toHaveLength(6);
      expect(unit.prerequisiteUnitIds).toEqual(i ? [`social-studies-u0${i}`] : []);
    });
    for (const lesson of lessons) {
      expect(validateLesson(lesson), lesson.id).toEqual([]);
      expect(lesson.learnCards).toHaveLength(3);
      expect(lesson.quiz.pool).toHaveLength(13);
      expect(new Set(lesson.quiz.pool.map(q => q.type)).size).toBeGreaterThanOrEqual(2);
      const activityCards = lesson.learnCards.filter(card => card.widget);
      expect(activityCards.length, lesson.id).toBeGreaterThanOrEqual(1);
      for (const card of activityCards) {
        expect(card.widgetCoach?.intro.map(line => line.speaker)).toEqual(['guide', 'kid']);
        expect(card.widgetCoach?.reactions.complete.text.length).toBeGreaterThan(10);
      }
      expect(lesson.quiz.reference?.text).toContain(lesson.learnCards[0]!.blocks[0]!.text);
      expect(new Set(lesson.quiz.pool.map(q => q.reviewCardId))).toEqual(new Set(lesson.learnCards.map(card => card.id)));
    }
  });
  test('retains all thirty official indicator texts through generation', () => {
    const raw = (source.bySubject as Record<string, any>)['social-studies'];
    const generated = (standards as Record<string, any>)['social-studies'];
    expect(raw?.indicators.map((indicator: any) => indicator.code)).toEqual(expectedCodes);
    expect(generated?.indicators).toEqual(raw?.indicators);
    expect(generated?.crossCuttingExpectations).toEqual([]);
    expect(generated?.document.url).toContain('ed.sc.gov');
  });
});
