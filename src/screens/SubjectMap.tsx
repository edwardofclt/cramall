import type { CSSProperties } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Character } from '../characters/Character';
import type { Lesson, Subject, Unit } from '../content/schema';
import { SUBJECTS } from '../content/subjects';
import { isLessonPassed, isLessonReady, isUnitComplete, lessonStars, subjectCompletion, upNext } from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';
import type { SaveData } from '../progress/storage';

type NodeState = 'passed' | 'start' | 'ready' | 'locked';

const STATE_LABEL: Record<NodeState, string> = {
  passed: 'passed',
  start: 'start here',
  ready: 'ready to play',
  locked: 'not ready yet',
};

function lockedReason(save: SaveData, subject: Subject, lesson: Lesson): string {
  const unit = subject.units.find((candidate) => candidate.id === lesson.unitId);
  if (!unit) return 'finish the previous lesson first';

  const incompletePrerequisite = unit.prerequisiteUnitIds
    .map((id) => subject.units.find((candidate) => candidate.id === id))
    .find((candidate) => candidate && candidate.lessons.length > 0 && !isUnitComplete(save, candidate));
  if (incompletePrerequisite) return `finish ${incompletePrerequisite.title} first`;

  const lessonIndex = unit.lessons.findIndex((candidate) => candidate.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? unit.lessons[lessonIndex - 1] : undefined;
  return previousLesson
    ? `finish ${previousLesson.title} first`
    : 'finish the previous lesson first';
}

function nodeState(
  save: SaveData,
  subject: Subject,
  lesson: Lesson,
  next: Lesson | null,
): NodeState {
  if (isLessonPassed(save, lesson.id)) return 'passed';
  if (next?.id === lesson.id) return 'start';
  return isLessonReady(save, subject, lesson) ? 'ready' : 'locked';
}

function LessonNode({
  save,
  subject,
  lesson,
  index,
  next,
}: {
  save: SaveData;
  subject: Subject;
  lesson: Lesson;
  index: number;
  next: Lesson | null;
}) {
  const state = nodeState(save, subject, lesson, next);
  const stars = state === 'passed' ? lessonStars(save.lessons[lesson.id]) : 0;
  const label =
    state === 'passed'
      ? `passed, ${stars} stars`
      : state === 'locked'
        ? `${lockedReason(save, subject, lesson)} — take a peek`
        : STATE_LABEL[state];
  // Soft lock: a not-ready lesson is still reachable, just flagged as a peek so the
  // lesson player can show its "sneak peek" banner.
  const to = state === 'locked' ? `/lesson/${lesson.id}?peek=1` : `/lesson/${lesson.id}`;

  return (
    <li>
      <Link
        to={to}
        className="lesson-node"
        data-state={state}
        aria-label={`${lesson.title} — ${label}`}
      >
        <span className="lesson-node-circle" aria-hidden="true">
          {state === 'passed' ? '✓' : index + 1}
        </span>
        <span className="lesson-node-body">
          <span className="lesson-node-title">{lesson.title}</span>
          {state === 'passed' && (
            <span className="lesson-node-stars" aria-hidden="true">
              {'★'.repeat(stars)}
              {'☆'.repeat(3 - stars)}
            </span>
          )}
          {state === 'start' && (
            <span className="badge badge-small badge-start" aria-hidden="true">
              START HERE
            </span>
          )}
          {state === 'locked' && (
            <span className="badge badge-small" aria-hidden="true">
              🔒 {lockedReason(save, subject, lesson)}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}

function UnitSection({
  save,
  subject,
  unit,
  next,
}: {
  save: SaveData;
  subject: Subject;
  unit: Unit;
  next: Lesson | null;
}) {
  return (
    <section className="card stack" style={{ gap: '0.5rem' }}>
      <div className="row" style={{ flexWrap: 'wrap' }}>
        <span className="unit-chip">
          <span className="unit-number">Unit {unit.number}</span>
          <span data-testid="unit-title">{unit.title}</span>
        </span>
        {unit.lessons.length === 0 && <span className="badge badge-small">Coming soon ✨</span>}
      </div>

      {unit.lessons.length > 0 && (
        <ul className="lesson-path">
          {unit.lessons.map((lesson, index) => (
            <LessonNode
              key={lesson.id}
              save={save}
              subject={subject}
              lesson={lesson}
              index={index}
              next={next}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export function SubjectMap() {
  const { subjectId } = useParams();
  const { save } = useProgress();

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  if (!subject) return <Navigate to="/" replace />;

  const next = upNext(save, subject);
  const { passed, total } = subjectCompletion(save, subject);

  return (
    <div
      className="page stack"
      style={{
        '--accent': subject.color,
        '--accent-action': subject.actionColor,
      } as CSSProperties}
    >
      <Link className="link-quiet" to="/">
        ← Back to subjects
      </Link>

      <header className="row" style={{ flexWrap: 'wrap' }}>
        <Character guide={subject.guide} pose="idle" size={96} />
        <div>
          <h1 style={{ margin: 0 }}>{subject.title}</h1>
          <p style={{ margin: 0, color: 'var(--c-ink-soft)', fontWeight: 600 }}>
            {passed} / {total} lessons done
          </p>
        </div>
      </header>

      {subject.units.map((unit) => (
        <UnitSection key={unit.id} save={save} subject={subject} unit={unit} next={next} />
      ))}
    </div>
  );
}
