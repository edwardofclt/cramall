import type { Lesson, Question, Subject } from '../content/schema';
import { mathConnections } from './connection-content/math';
import { readingConnections } from './connection-content/reading';
import { scienceConnections } from './connection-content/science';

export type UnitConnection = {
  unitId: string;
  foundation: string;
  question: Question;
  source?: { title: string; text: string };
};

/** New practice questions: these are deliberately outside the lessons' Quick Check pools. */
export const connections: UnitConnection[] = [
  ...mathConnections,
  ...readingConnections,
  ...scienceConnections,
];

export function connectionForLesson(subject: Subject, lesson: Lesson): UnitConnection | undefined {
  const unit = subject.units.find(candidate => candidate.id === lesson.unitId);
  const terminal = unit?.lessons[unit.lessons.length - 1];
  if (!unit || terminal?.id !== lesson.id) return undefined;
  return connections.find(connection => connection.unitId === unit.id);
}
