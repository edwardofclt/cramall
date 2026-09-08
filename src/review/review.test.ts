import { beforeEach, describe, expect, test } from 'vitest';
import type { Lesson, Subject } from '../content/schema';
import { findLesson, getSubject } from '../content/subjects';
import { lessonStars } from '../progress/logic';
import {
  defaultSave, exportSave, importSave, loadSave, migrateSave, persist,
  recordAttempt, recordReview, type SaveData,
} from '../progress/storage';
import { ReviewRecordSchema, reviewKey, type ReviewAnswer, type ReviewRecord } from './model';
import { dueConceptCount, selectReview } from './selection';

const math = getSubject('math');
const first = findLesson('math-u01-l01')!.lesson;
const second = findLesson('math-u01-l02')!.lesson;
const third = findLesson('math-u02-l01')!.lesson;
const fourth = findLesson('math-u02-l02')!.lesson;
const question = first.quiz.pool[0]!;
const key = reviewKey(first.id, question.conceptTag);

function passed(lesson = first, date = '2026-09-07', save = defaultSave(), missed: string[] = []): SaveData {
  return recordAttempt(save, lesson.id, { date, score: 9, total: 10, missedConceptTags: missed }, 8);
}

function answer(date: string, correct = true, lesson = first): ReviewAnswer {
  const item = lesson.quiz.pool[0]!;
  return { lessonId: lesson.id, conceptTag: item.conceptTag, questionId: item.id, date, correct };
}

function narrowSubject(lessons: Lesson[], oneConcept = true): Subject {
  return {
    ...math,
    units: math.units.filter((unit) => lessons.some((lesson) => lesson.unitId === unit.id)).map((unit) => ({
      ...unit,
      lessons: lessons.filter((lesson) => lesson.unitId === unit.id).map((lesson) => ({
        ...lesson,
        quiz: { ...lesson.quiz, pool: oneConcept
          ? lesson.quiz.pool.filter((item) => item.conceptTag === lesson.quiz.pool[0]!.conceptTag)
          : lesson.quiz.pool },
      })),
    })),
  };
}

const oneConcept = narrowSubject([first]);

beforeEach(() => window.localStorage.clear());

describe('review memory', () => {
  test('legacy saves and their exports retain their shape without a reviews property', () => {
    const save = passed();
    expect(importSave(exportSave(save))).toEqual(save);
    expect(importSave(exportSave(save))).not.toHaveProperty('reviews');
    expect(defaultSave()).not.toHaveProperty('reviews');
  });

  test('review evidence survives export, import and reload without changing earned progress', () => {
    const save = { ...passed(), parentChecked: { [first.id]: true } };
    const snapshot = JSON.parse(JSON.stringify(save));
    const next = recordReview(save, answer('2026-09-08'));
    expect(next.reviews?.[key]).toEqual({ date: '2026-09-08', questionId: question.id, correct: true, level: 1 });
    expect(next.lessons).toEqual(save.lessons);
    expect(next.streak).toEqual(save.streak);
    expect(next.settings).toEqual(save.settings);
    expect(next.parentChecked).toEqual(save.parentChecked);
    expect(lessonStars(next.lessons[first.id])).toBe(2);
    expect(save).toEqual(snapshot);
    expect(importSave(exportSave(next))).toEqual(next);
    expect(persist(next)).toBe(true);
    expect(loadSave()).toEqual(next);
  });

  test('legacy canonicalization retains valid review evidence while repairing old derived progress', () => {
    const save = recordReview(passed(), answer('2026-09-08'));
    const old = JSON.parse(JSON.stringify(save));
    old.lessons[first.id].status = 'in-progress';
    old.lessons[first.id].bestScore = 1;
    old.streak.lastActiveDate = '2026-09-06';
    expect(migrateSave(old)).toEqual(save);
  });

  test.each(['2026-02-30', '2026-2-03', '2026-09-08T00:00:00Z', '1999-12-31', '2101-01-01'])('rejects invalid review date %s', (date) => {
    expect(() => recordReview(passed(), answer(date))).toThrow();
    const save = { ...passed(), reviews: { [key]: { date, questionId: question.id, correct: true, level: 1 } } };
    expect(() => importSave(JSON.stringify(save))).toThrow('invalid save file');
  });

  test.each([
    { level: -1 }, { level: 5 }, { level: 1.5 }, { questionId: '' },
    { correct: 'yes' }, { unexpected: true }, { correct: false, level: 2 },
  ])('rejects malformed review records %j', (change) => {
    const record = { date: '2026-09-08', questionId: question.id, correct: true, level: 1, ...change };
    expect(ReviewRecordSchema.safeParse(record).success).toBe(false);
    expect(() => importSave(JSON.stringify({ ...passed(), reviews: { [key]: record } }))).toThrow('invalid save file');
  });

  test('rejects imported review keys or questions without matching passed catalog concepts', () => {
    const record: ReviewRecord = { date: '2026-09-08', questionId: question.id, correct: true, level: 1 };
    for (const reviews of [
      { 'unknown:place-value': record },
      { [reviewKey(first.id, 'unknown')]: record },
      { [key]: { ...record, questionId: second.quiz.pool[0]!.id } },
    ]) {
      expect(() => importSave(JSON.stringify({ ...passed(), reviews }))).toThrow('invalid save file');
    }
    expect(() => importSave(JSON.stringify({ ...defaultSave(), reviews: { [key]: record } }))).toThrow('invalid save file');
  });

  test('rejects a prototype review key instead of silently discarding the invalid record', () => {
    const save = JSON.parse(exportSave(passed()));
    save.reviews = JSON.parse('{"__proto__":{"date":"2026-09-08","questionId":"math-u01-l01-q01","correct":true,"level":1}}');
    expect(() => importSave(JSON.stringify(save))).toThrow('invalid save file');
  });

  test.each(['2026-09-07', '2026-02-30'])('rejects last-answer dates that are invalid or precede scheduling evidence: %s', (lastAnsweredDate) => {
    const save = { ...passed(), reviews: { [key]: { date: '2026-09-08', questionId: question.id, correct: true, level: 1, lastAnsweredDate } } };
    expect(() => importSave(JSON.stringify(save))).toThrow('invalid save file');
  });

  test('a reset or an unpassed lesson cannot be promoted by an answer from a stale review session', () => {
    const empty = defaultSave();
    expect(recordReview(empty, answer('2026-09-08'))).toBe(empty);
    const learning = recordAttempt(empty, first.id, { date: '2026-09-07', score: 4, total: 10, missedConceptTags: [] }, 8);
    expect(recordReview(learning, answer('2026-09-08'))).toBe(learning);
  });

  test('rejects recording a question under another concept or lesson', () => {
    expect(() => recordReview(passed(), { ...answer('2026-09-08'), conceptTag: 'not-this-concept' })).toThrow();
    expect(() => recordReview(passed(), { ...answer('2026-09-08'), questionId: second.quiz.pool[0]!.id })).toThrow();
  });
});

describe('calendar intervals', () => {
  test('a newly passed concept is due tomorrow, once per concept rather than per question', () => {
    const save = passed();
    expect(dueConceptCount(save, math, '2026-09-07')).toBe(0);
    expect(selectReview(save, math, '2026-09-07')).toEqual([]);
    expect(dueConceptCount(save, math, '2026-09-08')).toBe(3);
  });

  test('initial due date follows the latest calendar-dated attempt even after clock rollback', () => {
    let save = passed();
    save = passed(first, '2026-09-09', save);
    save = passed(first, '2026-09-08', save);
    expect(dueConceptCount(save, oneConcept, '2026-09-09')).toBe(0);
    expect(dueConceptCount(save, oneConcept, '2026-09-10')).toBe(1);
  });

  test('successful delayed reviews move through 3, 7, 14 and 30 day intervals, capped at 30', () => {
    let save = passed();
    for (const [date, level, beforeDue, due] of [
      ['2026-09-08', 1, '2026-09-10', '2026-09-11'],
      ['2026-09-11', 2, '2026-09-17', '2026-09-18'],
      ['2026-09-18', 3, '2026-10-01', '2026-10-02'],
      ['2026-10-02', 4, '2026-10-31', '2026-11-01'],
      ['2026-11-01', 4, '2026-11-30', '2026-12-01'],
    ] as const) {
      save = recordReview(save, answer(date));
      expect(save.reviews?.[key]?.level).toBe(level);
      expect(dueConceptCount(save, oneConcept, beforeDue)).toBe(0);
      expect(dueConceptCount(save, oneConcept, due)).toBe(1);
    }
  });

  test('a miss resets a long interval to the following calendar day', () => {
    let save = recordReview(passed(), answer('2026-09-08'));
    save = recordReview(save, answer('2026-09-11'));
    save = recordReview(save, answer('2026-09-12', false));
    expect(save.reviews?.[key]).toMatchObject({ date: '2026-09-12', correct: false, level: 0 });
    expect(dueConceptCount(save, oneConcept, '2026-09-12')).toBe(0);
    expect(dueConceptCount(save, oneConcept, '2026-09-13')).toBe(1);
  });

  test('success on the initial pass day cannot advance the interval', () => {
    const save = recordReview(passed(), answer('2026-09-07'));
    expect(save.reviews?.[key]?.level).toBe(0);
    expect(dueConceptCount(save, oneConcept, '2026-09-08')).toBe(1);
  });

  test('repeated same-day success cannot advance again', () => {
    const save = recordReview(passed(), answer('2026-09-08'));
    const again = recordReview(save, answer('2026-09-08'));
    expect(again).toEqual(save);
    expect(dueConceptCount(again, oneConcept, '2026-09-11')).toBe(1);
  });

  test('same-day retries after a miss cannot erase the shorter interval', () => {
    let save = recordReview(passed(), answer('2026-09-08', false));
    save = recordReview(save, answer('2026-09-08'));
    expect(save.reviews?.[key]).toMatchObject({ correct: false, level: 0 });
    expect(dueConceptCount(save, oneConcept, '2026-09-09')).toBe(1);
  });

  test('early correct answers neither advance nor indefinitely postpone the due date', () => {
    let save = recordReview(passed(), answer('2026-09-08'));
    save = recordReview(save, answer('2026-09-09'));
    save = recordReview(save, answer('2026-09-10'));
    expect(save.reviews?.[key]).toMatchObject({ date: '2026-09-08', level: 1 });
    expect(dueConceptCount(save, oneConcept, '2026-09-11')).toBe(1);
  });

  test('early successful variants rotate the next question without moving scheduled evidence', () => {
    let save = recordReview(passed(), answer('2026-09-08'));
    save = recordReview(save, { ...answer('2026-09-09'), questionId: 'math-u01-l01-q02' });
    expect(save.reviews?.[key]).toMatchObject({ date: '2026-09-08', questionId: 'math-u01-l01-q02', correct: true, level: 1 });
    expect(selectReview(save, oneConcept, '2026-09-11')[0]?.question.id).toBe('math-u01-l01-q03');
  });

  test('a newer Quick Check miss returns a previously strong concept to review tomorrow', () => {
    let save = recordReview(passed(), answer('2026-09-08'));
    save = recordReview(save, answer('2026-09-11'));
    save = recordAttempt(save, first.id, { date: '2026-09-12', score: 7, total: 10, missedConceptTags: [question.conceptTag] }, 8);
    expect(dueConceptCount(save, oneConcept, '2026-09-12')).toBe(0);
    expect(dueConceptCount(save, oneConcept, '2026-09-13')).toBe(1);
    save = passed(second, '2026-09-01', save);
    expect(selectReview(save, narrowSubject([first, second]), '2026-09-13')[0]?.lesson.id).toBe(first.id);
    save = recordReview(save, answer('2026-09-13'));
    expect(save.reviews?.[key]?.level).toBe(1);
    expect(save.lessons[first.id]?.bestScore).toBe(9);
  });

  test('a later same-day Quick Check miss shortens a thirty-day interval and restores weak priority', () => {
    let save = passed();
    for (const date of ['2026-09-08', '2026-09-11', '2026-09-18', '2026-10-02']) save = recordReview(save, answer(date));
    expect(save.reviews?.[key]?.level).toBe(4);
    const beforeQuiz = save;
    save = recordAttempt(save, first.id, { date: '2026-10-02', score: 9, total: 10, missedConceptTags: [question.conceptTag] }, 8);
    expect(dueConceptCount(save, oneConcept, '2026-10-02')).toBe(0);
    expect(dueConceptCount(save, oneConcept, '2026-10-03')).toBe(1);
    expect(save.reviews?.[key]).toMatchObject({ date: '2026-10-02', correct: false, level: 0 });
    expect(beforeQuiz.reviews?.[key]?.level).toBe(4);
    save = passed(second, '2026-09-01', save);
    expect(selectReview(save, narrowSubject([first, second]), '2026-10-03')[0]?.lesson.id).toBe(first.id);
    expect(importSave(exportSave(save))).toEqual(save);
    save = recordReview(save, answer('2026-10-02'));
    expect(save.reviews?.[key]).toMatchObject({ correct: false, level: 0 });
  });

  test.each([true, false])('clock rollback after early practice cannot overwrite newer observed evidence: correct=%s', (correct) => {
    let save = recordReview(passed(), answer('2026-09-08'));
    save = recordReview(save, { ...answer('2026-09-10'), questionId: 'math-u01-l01-q02' });
    expect(save.reviews?.[key]).toMatchObject({ date: '2026-09-08', lastAnsweredDate: '2026-09-10' });
    const restored = importSave(exportSave(save));
    const backward = recordReview(restored, { ...answer('2026-09-09', correct), questionId: 'math-u01-l01-q03' });
    expect(backward).toBe(restored);
    expect(dueConceptCount(backward, oneConcept, '2026-09-11')).toBe(1);
    expect(selectReview(backward, math, '2026-09-09', second.id).some((item) => item.question.conceptTag === question.conceptTag)).toBe(false);
  });

  test('early success on the same variant still preserves its later observation date', () => {
    let save = recordReview(passed(), answer('2026-09-08'));
    save = recordReview(save, answer('2026-09-10'));
    expect(recordReview(save, answer('2026-09-09', false))).toBe(save);
    expect(save.reviews?.[key]).toMatchObject({ date: '2026-09-08', lastAnsweredDate: '2026-09-10', level: 1 });
  });

  test('a backdated quiz appended after early practice cannot replace the newer review evidence', () => {
    let save = recordReview(passed(), answer('2026-09-08'));
    save = recordReview(save, { ...answer('2026-09-10'), questionId: 'math-u01-l01-q02' });
    const beforeQuiz = save;
    save = recordAttempt(save, first.id, { date: '2026-09-09', score: 7, total: 10, missedConceptTags: [question.conceptTag] }, 8);
    expect(save.reviews).toEqual(beforeQuiz.reviews);
    expect(dueConceptCount(save, oneConcept, '2026-09-10')).toBe(0);
    expect(dueConceptCount(save, oneConcept, '2026-09-11')).toBe(1);
    save = passed(second, '2026-09-01', save);
    expect(selectReview(save, narrowSubject([first, second]), '2026-09-11')[0]?.lesson.id).toBe(second.id);
  });

  test.each([
    { reviews: ['2026-09-08'], quizDate: '2026-09-12', dueDate: '2026-09-13' },
    { reviews: ['2026-09-08', '2026-09-11', '2026-09-18', '2026-10-02'], quizDate: '2026-10-03', dueDate: '2026-10-04' },
  ])('same-day practice retains a newer successful quiz baseline instead of reviving its old review interval: $quizDate', ({ reviews, quizDate, dueDate }) => {
    let save = passed();
    for (const date of reviews) save = recordReview(save, answer(date));
    save = recordAttempt(save, first.id, { date: quizDate, score: 10, total: 10, missedConceptTags: [] }, 8);
    expect(dueConceptCount(save, oneConcept, quizDate)).toBe(0);
    expect(dueConceptCount(save, oneConcept, dueDate)).toBe(1);
    save = recordReview(save, { ...answer(quizDate), questionId: 'math-u01-l01-q02' });
    expect(dueConceptCount(save, oneConcept, quizDate)).toBe(0);
    expect(dueConceptCount(save, oneConcept, dueDate)).toBe(1);
    save = recordReview(save, { ...answer(quizDate), questionId: 'math-u01-l01-q03' });
    expect(save.reviews?.[key]).toMatchObject({ date: quizDate, correct: true, level: 0 });
    expect(dueConceptCount(save, oneConcept, dueDate)).toBe(1);
    expect(importSave(exportSave(save))).toEqual(save);
  });

  test('clock rollback cannot overwrite later evidence or precede the initial quiz', () => {
    const initial = passed();
    expect(recordReview(initial, answer('2026-09-06'))).toBe(initial);
    const save = recordReview(initial, answer('2026-09-08'));
    expect(recordReview(save, answer('2026-09-07', false))).toBe(save);
  });

  test.each([
    ['2026-03-07', '2026-03-08', '2026-03-11'],
    ['2026-10-31', '2026-11-01', '2026-11-04'],
    ['2028-02-28', '2028-02-29', '2028-03-03'],
  ])('calendar arithmetic crosses daylight-saving and leap-day boundaries: %s', (start, review, due) => {
    const save = recordReview(passed(first, start), answer(review));
    expect(dueConceptCount(save, oneConcept, review)).toBe(0);
    expect(dueConceptCount(save, oneConcept, due)).toBe(1);
  });
});

describe('review selection', () => {
  test('standalone review contains due concepts only, while warmup can recall a recent prerequisite', () => {
    const save = passed(second);
    expect(selectReview(save, math, '2026-09-07')).toEqual([]);
    expect(selectReview(save, math, '2026-09-07', third.id)[0]?.lesson.id).toBe(second.id);
  });

  test('warmup starts with the recent related lesson and then spreads older due material', () => {
    const subject = narrowSubject([first, second, third, fourth], false);
    let save = passed(first, '2026-09-01');
    save = passed(second, '2026-09-01', save);
    save = passed(third, '2026-09-07', save);
    const selected = selectReview(save, subject, '2026-09-07', fourth.id);
    expect(selected.map((item) => item.lesson.id)).toEqual([third.id, first.id, second.id]);
    expect(selected.every((item) => item.reason.length > 0)).toBe(true);
  });

  test('same-unit or declared prerequisites take precedence over unrelated recent lessons', () => {
    const target = findLesson('math-u03-l01')!.lesson;
    const subject = narrowSubject([first, second, third, fourth, target]);
    subject.units.find((unit) => unit.id === target.unitId)!.prerequisiteUnitIds = [first.unitId];
    let save = passed(second, '2026-09-07');
    save = passed(fourth, '2026-09-07', save);
    expect(selectReview(save, subject, '2026-09-07', target.id)[0]?.lesson.id).toBe(second.id);
  });

  test('never selects unpassed, current, later-curriculum or cross-subject lessons for a warmup', () => {
    let save = passed(first);
    save = passed(third, '2026-09-07', save);
    save = passed(fourth, '2026-09-07', save);
    save = passed(getSubject('reading').units[0]!.lessons[0]!, '2026-09-07', save);
    const selected = selectReview(save, math, '2026-09-08', third.id, 20);
    expect(selected.every((item) => item.lesson.id === first.id)).toBe(true);
    expect(selected).toHaveLength(3);
    expect(selectReview(save, math, '2026-09-08', first.id)).toEqual([]);
    expect(selectReview(save, math, '2026-09-08', 'missing-lesson')).toEqual([]);
  });

  test('future calendar evidence and invalid current dates do not produce review work', () => {
    const save = passed(first, '2026-09-09');
    expect(selectReview(save, math, '2026-09-08', second.id)).toEqual([]);
    expect(dueConceptCount(save, math, '2026-09-08')).toBe(0);
    expect(selectReview(passed(), math, '2026-02-30')).toEqual([]);
    expect(dueConceptCount(passed(), math, '2026-02-30')).toBe(0);
  });

  test('prioritizes due missed concepts and then overdue material across different lessons', () => {
    const subject = narrowSubject([first, second, third], false);
    let save = passed(first, '2026-09-01');
    save = passed(second, '2026-09-04', save, ['ordering']);
    save = passed(third, '2026-09-05', save);
    const selected = selectReview(save, subject, '2026-09-08');
    expect(selected[0]!.lesson.id).toBe(second.id);
    expect(selected[0]!.question.conceptTag).toBe('ordering');
    expect(selected.map((item) => item.lesson.id)).toEqual([second.id, first.id, third.id]);
  });

  test('a successful delayed review resolves the old quiz miss priority', () => {
    const subject = narrowSubject([first, second]);
    let save = passed(first, '2026-09-07', defaultSave(), [question.conceptTag]);
    save = recordReview(save, answer('2026-09-08'));
    save = passed(second, '2026-09-01', save);
    expect(selectReview(save, subject, '2026-09-11')[0]!.lesson.id).toBe(second.id);
  });

  test('selection is deterministic and never repeats a concept or question within a run', () => {
    const save = passed(second, '2026-09-07', passed());
    const selected = selectReview(save, math, '2026-09-08', undefined, 20);
    expect(selected).toHaveLength(6);
    expect(new Set(selected.map((item) => reviewKey(item.lesson.id, item.question.conceptTag))).size).toBe(6);
    expect(new Set(selected.map((item) => item.question.id)).size).toBe(6);
    expect(selectReview(save, math, '2026-09-08', undefined, 20)).toEqual(selected);
    expect(selectReview(save, math, '2026-09-08', undefined, 0)).toEqual([]);
  });

  test('question variants rotate away from the previously answered question', () => {
    const save = recordReview(passed(), answer('2026-09-08'));
    const selected = selectReview(save, oneConcept, '2026-09-11');
    expect(selected).toHaveLength(1);
    expect(selected[0]!.question.id).toBe('math-u01-l01-q02');
    expect(selected[0]!.lesson.learnCards.some((card) => card.id === selected[0]!.question.reviewCardId)).toBe(true);
  });
});
