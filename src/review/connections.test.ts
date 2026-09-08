import { describe, expect, test } from 'vitest';
import { normalizeAnswerText } from '../content/answer-normalization';
import { QuestionSchema } from '../content/schema';
import { SUBJECTS } from '../content/subjects';
import { gradeAnswer } from '../quiz/engine';
import { connectionForLesson, connections } from './connections';

const units = SUBJECTS.flatMap(subject => subject.units.map(unit => ({ subject, unit })));

describe('unit connection coverage', () => {
  test('every registered unit has exactly one authored application', () => {
    expect(connections.map(connection => connection.unitId).sort()).toEqual(
      units.map(({ unit }) => unit.id).sort(),
    );
  });

  test.each(units)('$unit.id attaches only after its terminal lesson', ({ subject, unit }) => {
    const terminal = unit.lessons[unit.lessons.length - 1];
    expect(connectionForLesson(subject, terminal)?.unitId).toBe(unit.id);
    for (const earlier of unit.lessons.slice(0, -1)) {
      expect(connectionForLesson(subject, earlier)).toBeUndefined();
    }
    // Resolve curriculum identity, rather than relying on the lesson object's reference.
    expect(connectionForLesson(subject, { ...terminal })?.unitId).toBe(unit.id);
  });

  test('rejects lessons outside the supplied subject and unregistered lessons', () => {
    const math = SUBJECTS.find(subject => subject.id === 'math')!;
    const reading = SUBJECTS.find(subject => subject.id === 'reading')!;
    const readingUnit = reading.units[0];
    expect(connectionForLesson(math, readingUnit.lessons[readingUnit.lessons.length - 1])).toBeUndefined();
    const terminal = math.units[0].lessons[math.units[0].lessons.length - 1];
    expect(connectionForLesson(math, { ...terminal, id: 'math-u01-l99' })).toBeUndefined();
    expect(connectionForLesson({ ...math, units: [] }, terminal)).toBeUndefined();
    expect(connectionForLesson(math, { ...terminal, unitId: 'math-u02' })).toBeUndefined();
  });
});

describe('authored practice contracts', () => {
  test.each(units)('$unit.id owns a valid new question and a taught review target', ({ subject, unit }) => {
    const terminal = unit.lessons[unit.lessons.length - 1];
    const connection = connectionForLesson(subject, terminal);
    expect(connection).toBeDefined();
    if (!connection) return;
    const { question } = connection;
    expect(QuestionSchema.safeParse(question).success).toBe(true);
    expect(question.id.startsWith(`${terminal.id}-q`)).toBe(true);
    expect(terminal.learnCards.some(card => card.id === question.reviewCardId)).toBe(true);
    expect(terminal.quiz.pool.some(existing =>
      existing.conceptTag === question.conceptTag && existing.reviewCardId === question.reviewCardId,
    )).toBe(true);
    expect(connection.foundation.trim().length).toBeGreaterThan(30);
    expect(question.explanation.trim().length).toBeGreaterThan(60);
    expect(terminal.quiz.pool.some(existing => existing.prompt === question.prompt)).toBe(false);
    expect(question.type).toBe('multiple-choice');
    if (question.type !== 'multiple-choice') return;
    expect(question.choices.filter(choice => gradeAnswer(question, choice.id))).toHaveLength(1);
    expect(new Set(question.choices.map(choice => choice.id)).size).toBe(question.choices.length);
    expect(new Set(question.choices.map(choice => normalizeAnswerText(choice.text))).size).toBe(question.choices.length);
  });

  test('question identities never collide with another connection or a Quick Check', () => {
    const ids = [
      ...connections.map(connection => connection.question.id),
      ...units.flatMap(({ unit }) => unit.lessons.flatMap(lesson => lesson.quiz.pool.map(question => question.id))),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });

  test.each(units.filter(({ subject }) => subject.id === 'reading'))(
    '$unit.id carries its own complete source before the question can be rendered',
    ({ subject, unit }) => {
      const connection = connectionForLesson(subject, unit.lessons[unit.lessons.length - 1]);
      expect(connection?.source?.title.trim()).toBeTruthy();
      expect(connection?.source?.text.trim().split(/\s+/).length ?? 0).toBeGreaterThan(25);
    },
  );

  test.each([
    ['math-u02', 41930], // 18,650 + 23,280; nearest-thousand estimate is 42,000.
    ['math-u03', 4], // 24 pots / 6 pots per tray.
    ['math-u04', 72], // 3 equal groups of (20 + 4) flags.
    ['math-u05', 19], // 156 cards / 6 bins - 7 cards taken from each bin.
    ['math-u07', 0.75], // 3 loaves / 4 equal shares.
    ['math-u08', 0.65], // 4/10 + 25/100 meter.
    ['math-u09', 36], // 4 yards × 3 feet per yard × 3 garlands.
    ['math-u10', 24], // (2 yards × 3 feet per yard) × 4 feet.
  ])('%s grades the independently checked numerical result', (unitId, answer) => {
    const question = connections.find(connection => connection.unitId === unitId)?.question;
    expect(question).toBeDefined();
    if (!question || question.type !== 'multiple-choice') return;
    // Numeric choices begin with their result; explanations stay separate.
    const correct = question.choices.find(choice => gradeAnswer(question, choice.id));
    const text = correct?.text.replace(/,/g, '') ?? '';
    const value = text.startsWith('3/4') ? 3 / 4 : Number.parseFloat(text);
    expect(value).toBe(answer);
  });
});
