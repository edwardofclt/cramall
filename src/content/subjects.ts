import standardsData from './standards/standards.json';
import type { Unit, Subject, SubjectId, GuideId, Lesson } from './schema';
import { lessonsByUnit as mathLessons } from './math';
import { lessonsByUnit as readingLessons } from './reading';
import { lessonsByUnit as scienceLessons } from './science';

type StandardsIndicator = { code: string; text: string; strand: string };
type StandardsUnit = {
  number: number;
  title: string;
  indicatorCodes: string[];
  prerequisiteUnits: number[];
};
type StandardsSubject = {
  document: { title: string; url: string };
  indicators: StandardsIndicator[];
  units: StandardsUnit[];
};
type StandardsData = Record<SubjectId, StandardsSubject>;

const standards = standardsData as StandardsData;

const SUBJECT_ORDER: SubjectId[] = ['math', 'reading', 'science'];

const SUBJECT_META: Record<
  SubjectId,
  { title: string; guide: GuideId; color: string; lessonsByUnit: Record<string, Lesson[]> }
> = {
  math: { title: 'Math', guide: 'nutty', color: '#f59e0b', lessonsByUnit: mathLessons },
  reading: { title: 'Reading', guide: 'winnie', color: '#8b5cf6', lessonsByUnit: readingLessons },
  science: { title: 'Science', guide: 'sandy', color: '#10b981', lessonsByUnit: scienceLessons },
};

function unitId(subjectId: SubjectId, number: number): string {
  return `${subjectId}-u${String(number).padStart(2, '0')}`;
}

function buildUnit(
  subjectId: SubjectId,
  source: StandardsUnit,
  lessonsByUnit: Record<string, Lesson[]>,
): Unit {
  const id = unitId(subjectId, source.number);
  return {
    id,
    subjectId,
    number: source.number,
    title: source.title,
    indicatorCodes: source.indicatorCodes,
    prerequisiteUnitIds: source.prerequisiteUnits.map((n) => unitId(subjectId, n)),
    lessons: lessonsByUnit[id] ?? [],
  };
}

function buildSubject(subjectId: SubjectId): Subject {
  const meta = SUBJECT_META[subjectId];
  const data = standards[subjectId];
  return {
    id: subjectId,
    title: meta.title,
    guide: meta.guide,
    color: meta.color,
    units: data.units.map((u) => buildUnit(subjectId, u, meta.lessonsByUnit)),
  };
}

export const SUBJECTS: Subject[] = SUBJECT_ORDER.map(buildSubject);

export function getSubject(id: SubjectId): Subject {
  const subject = SUBJECTS.find((s) => s.id === id);
  if (!subject) throw new Error(`Unknown subject id: ${id}`);
  return subject;
}

export function findLesson(
  lessonId: string,
): { subject: Subject; unit: Unit; lesson: Lesson } | null {
  for (const subject of SUBJECTS) {
    for (const unit of subject.units) {
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) return { subject, unit, lesson };
    }
  }
  return null;
}

export function allLessons(): Lesson[] {
  return SUBJECTS.flatMap((s) => s.units.flatMap((u) => u.lessons));
}

export function indicatorText(code: string): string | null {
  for (const subjectId of SUBJECT_ORDER) {
    const indicator = standards[subjectId].indicators.find((i) => i.code === code);
    if (indicator) return indicator.text;
  }
  return null;
}
