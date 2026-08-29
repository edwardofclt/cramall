import type { Lesson, Subject, Unit } from '../content/schema';
import type { LessonProgress, SaveData } from './storage';

export function isLessonPassed(save: SaveData, lessonId: string): boolean {
  return save.lessons[lessonId]?.status === 'passed';
}

export function lessonStars(p: LessonProgress | undefined): 0 | 1 | 2 | 3 {
  if (!p || p.bestScore < 8) return 0;
  if (p.bestScore === 8) return 1;
  if (p.bestScore === 9) return 2;
  return 3;
}

export function isUnitComplete(save: SaveData, unit: Unit): boolean {
  return unit.lessons.length > 0 && unit.lessons.every((lesson) => isLessonPassed(save, lesson.id));
}

export function isUnitReady(save: SaveData, subject: Subject, unit: Unit): boolean {
  return unit.prerequisiteUnitIds.every((prereqId) => {
    const prereqUnit = subject.units.find((u) => u.id === prereqId);
    // Unresolved or unauthored prerequisites never block play: a prereq id that doesn't
    // resolve to a unit in this subject, or a unit with no lessons yet, is fail-open by design.
    if (!prereqUnit) return true;
    if (prereqUnit.lessons.length === 0) return true;
    return isUnitComplete(save, prereqUnit);
  });
}

export function isLessonReady(save: SaveData, subject: Subject, lesson: Lesson): boolean {
  const unit = subject.units.find((u) => u.id === lesson.unitId);
  if (!unit) return false;
  if (!isUnitReady(save, subject, unit)) return false;
  const index = unit.lessons.findIndex((l) => l.id === lesson.id);
  if (index === -1) return false;
  if (index === 0) return true;
  const previousLesson = unit.lessons[index - 1]!;
  return isLessonPassed(save, previousLesson.id);
}

export function upNext(save: SaveData, subject: Subject): Lesson | null {
  for (const unit of subject.units) {
    for (const lesson of unit.lessons) {
      if (isLessonReady(save, subject, lesson) && !isLessonPassed(save, lesson.id)) {
        return lesson;
      }
    }
  }
  return null;
}

export function subjectCompletion(save: SaveData, subject: Subject): { passed: number; total: number } {
  let passed = 0;
  let total = 0;
  for (const unit of subject.units) {
    for (const lesson of unit.lessons) {
      total += 1;
      if (isLessonPassed(save, lesson.id)) passed += 1;
    }
  }
  return { passed, total };
}
