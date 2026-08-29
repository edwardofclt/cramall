import { expect, test } from 'vitest';
import type { Lesson, Subject, Unit } from '../content/schema';
import type { LessonProgress, SaveData } from './storage';
import { defaultSave, recordAttempt } from './storage';
import {
  isLessonPassed,
  isLessonReady,
  isUnitComplete,
  isUnitReady,
  effectiveStreak,
  lessonStars,
  subjectCompletion,
  upNext,
} from './logic';

/** Minimal valid-shaped Lesson fixture. 13-question pools are not required for these logic tests. */
function makeLesson(id: string, unitId: string): Lesson {
  return {
    id,
    unitId,
    title: `Lesson ${id}`,
    indicatorCodes: ['4.NR.1.1'],
    intro: [{ speaker: 'nutty', text: 'Hi!' }],
    learnCards: [{ id: `${id}-c1`, title: 'Card', blocks: [{ kind: 'text', text: 'Learn.' }] }],
    workedExample: { title: 'Try it', steps: ['Step one.'] },
    quiz: { passThreshold: 8, pool: [] },
  };
}

function makeUnit(over: Partial<Unit> & { id: string; number: number }): Unit {
  return {
    id: over.id,
    subjectId: 'math',
    number: over.number,
    title: `Unit ${over.number}`,
    indicatorCodes: ['4.NR.1.1'],
    prerequisiteUnitIds: over.prerequisiteUnitIds ?? [],
    lessons: over.lessons ?? [],
  };
}

/** Fixture subject: 2 units x 2 lessons, unit 2 requires unit 1. */
function makeSubject(): Subject {
  const u1l1 = makeLesson('u1-l1', 'u1');
  const u1l2 = makeLesson('u1-l2', 'u1');
  const u2l1 = makeLesson('u2-l1', 'u2');
  const u2l2 = makeLesson('u2-l2', 'u2');
  const unit1 = makeUnit({ id: 'u1', number: 1, lessons: [u1l1, u1l2] });
  const unit2 = makeUnit({ id: 'u2', number: 2, lessons: [u2l1, u2l2], prerequisiteUnitIds: ['u1'] });
  return {
    id: 'math', title: 'Math', guide: 'nutty', color: '#000', actionColor: '#000', units: [unit1, unit2],
  };
}

function passLesson(save: SaveData, lessonId: string, score = 10): SaveData {
  return recordAttempt(
    save,
    lessonId,
    { date: '2026-01-01', score, total: 10, missedConceptTags: [] },
    8,
  );
}

// --- lessonStars boundaries ---

test('lessonStars: undefined progress -> 0', () => {
  expect(lessonStars(undefined)).toBe(0);
});

test('lessonStars: bestScore 7 (below threshold) -> 0', () => {
  const p: LessonProgress = { status: 'in-progress', bestScore: 7, attempts: [] };
  expect(lessonStars(p)).toBe(0);
});

test('lessonStars: bestScore 8 -> 1', () => {
  const p: LessonProgress = { status: 'passed', bestScore: 8, attempts: [] };
  expect(lessonStars(p)).toBe(1);
});

test('lessonStars: bestScore 9 -> 2', () => {
  const p: LessonProgress = { status: 'passed', bestScore: 9, attempts: [] };
  expect(lessonStars(p)).toBe(2);
});

test('lessonStars: bestScore 10 -> 3', () => {
  const p: LessonProgress = { status: 'passed', bestScore: 10, attempts: [] };
  expect(lessonStars(p)).toBe(3);
});

// --- isLessonPassed ---

test('isLessonPassed: false for a lesson with no progress', () => {
  const save = defaultSave();
  expect(isLessonPassed(save, 'u1-l1')).toBe(false);
});

test('isLessonPassed: true once the lesson status is passed', () => {
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  expect(isLessonPassed(save, 'u1-l1')).toBe(true);
});

// --- fresh save: readiness and upNext ---

test('fresh save: u1-l1 is ready (first lesson of first unit, no prereqs)', () => {
  const subject = makeSubject();
  const save = defaultSave();
  const unit1 = subject.units[0]!;
  const l1 = unit1.lessons[0]!;
  expect(isLessonReady(save, subject, l1)).toBe(true);
});

test('fresh save: u1-l2 is not ready (previous lesson not passed)', () => {
  const subject = makeSubject();
  const save = defaultSave();
  const unit1 = subject.units[0]!;
  const l2 = unit1.lessons[1]!;
  expect(isLessonReady(save, subject, l2)).toBe(false);
});

test('fresh save: upNext is u1-l1', () => {
  const subject = makeSubject();
  const save = defaultSave();
  const next = upNext(save, subject);
  expect(next?.id).toBe('u1-l1');
});

// --- after passing l1: l2 becomes ready ---

test('after passing u1-l1: u1-l2 becomes ready', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  const unit1 = subject.units[0]!;
  const l2 = unit1.lessons[1]!;
  expect(isLessonReady(save, subject, l2)).toBe(true);
});

test('after passing u1-l1: upNext is u1-l2', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  const next = upNext(save, subject);
  expect(next?.id).toBe('u1-l2');
});

// --- after passing both u1 lessons: unit complete, u2-l1 ready and is upNext ---

test('after passing both u1 lessons: unit 1 is complete', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  save = passLesson(save, 'u1-l2');
  const unit1 = subject.units[0]!;
  expect(isUnitComplete(save, unit1)).toBe(true);
});

test('after passing both u1 lessons: unit 2 is ready', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  save = passLesson(save, 'u1-l2');
  const unit2 = subject.units[1]!;
  expect(isUnitReady(save, subject, unit2)).toBe(true);
});

test('after passing both u1 lessons: u2-l1 is ready', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  save = passLesson(save, 'u1-l2');
  const unit2 = subject.units[1]!;
  const l1 = unit2.lessons[0]!;
  expect(isLessonReady(save, subject, l1)).toBe(true);
});

test('after passing both u1 lessons: upNext is u2-l1', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  save = passLesson(save, 'u1-l2');
  const next = upNext(save, subject);
  expect(next?.id).toBe('u2-l1');
});

// --- all passed: upNext null, subjectCompletion counts ---

test('all lessons passed: upNext is null', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  save = passLesson(save, 'u1-l2');
  save = passLesson(save, 'u2-l1');
  save = passLesson(save, 'u2-l2');
  expect(upNext(save, subject)).toBeNull();
});

test('subjectCompletion: 0 passed of 4 total on a fresh save', () => {
  const subject = makeSubject();
  const save = defaultSave();
  expect(subjectCompletion(save, subject)).toEqual({ passed: 0, total: 4 });
});

test('subjectCompletion: counts passed lessons across all units', () => {
  const subject = makeSubject();
  let save = defaultSave();
  save = passLesson(save, 'u1-l1');
  save = passLesson(save, 'u1-l2');
  expect(subjectCompletion(save, subject)).toEqual({ passed: 2, total: 4 });
});

// --- empty-lesson prereq unit treated as complete (does not block play) ---

test('a prerequisite unit with zero lessons is treated as complete and does not block readiness', () => {
  const emptyUnit = makeUnit({ id: 'u0', number: 0, lessons: [] });
  const blockedUnit = makeUnit({ id: 'u1', number: 1, lessons: [makeLesson('u1-l1', 'u1')], prerequisiteUnitIds: ['u0'] });
  const subject: Subject = {
    id: 'math', title: 'Math', guide: 'nutty', color: '#000', actionColor: '#000', units: [emptyUnit, blockedUnit],
  };
  const save = defaultSave();
  expect(isUnitReady(save, subject, blockedUnit)).toBe(true);
  expect(isLessonReady(save, subject, blockedUnit.lessons[0]!)).toBe(true);
});

test('a unit with zero lessons is itself NOT complete', () => {
  const emptyUnit = makeUnit({ id: 'u0', number: 0, lessons: [] });
  const save = defaultSave();
  expect(isUnitComplete(save, emptyUnit)).toBe(false);
});

// --- lesson whose unitId resolves to a real unit but is absent from that unit's lessons array ---

test('isLessonReady is false (fails closed) for a lesson missing from its resolved unit', () => {
  const subject = makeSubject();
  const save = defaultSave();
  const orphan = makeLesson('u1-orphan', 'u1'); // unitId points at a real unit, but is not in unit1.lessons
  expect(isLessonReady(save, subject, orphan)).toBe(false);
});

// --- empty subject (no units) ---

test('a subject with no units: upNext is null and subjectCompletion is {passed: 0, total: 0}', () => {
  const subject: Subject = {
    id: 'math', title: 'Math', guide: 'nutty', color: '#000', actionColor: '#000', units: [],
  };
  const save = defaultSave();
  expect(upNext(save, subject)).toBeNull();
  expect(subjectCompletion(save, subject)).toEqual({ passed: 0, total: 0 });
});

describe('effectiveStreak', () => {
  test('keeps the stored streak active on the same day', () => {
    const save = defaultSave();
    save.streak = { lastActiveDate: '2026-08-29', count: 4 };
    expect(effectiveStreak(save, '2026-08-29')).toBe(4);
  });

  test('keeps the stored streak active through yesterday', () => {
    const save = defaultSave();
    save.streak = { lastActiveDate: '2026-08-28', count: 4 };
    expect(effectiveStreak(save, '2026-08-29')).toBe(4);
  });

  test('expires the stored streak after a missed day', () => {
    const save = defaultSave();
    save.streak = { lastActiveDate: '2026-08-27', count: 4 };
    expect(effectiveStreak(save, '2026-08-29')).toBe(0);
  });

  test('returns zero for an empty streak', () => {
    expect(effectiveStreak(defaultSave(), '2026-08-29')).toBe(0);
  });

  test.each(['not-a-date', '2026-02-30', '2026-08-30'])(
    'returns zero for malformed or future last-active date %s',
    (lastActiveDate) => {
      const save = defaultSave();
      save.streak = { lastActiveDate, count: 4 };
      expect(effectiveStreak(save, '2026-08-29')).toBe(0);
    },
  );

  test('returns zero when today itself is malformed', () => {
    const save = defaultSave();
    save.streak = { lastActiveDate: '2026-08-29', count: 4 };
    expect(effectiveStreak(save, 'tomorrow-ish')).toBe(0);
  });
});
