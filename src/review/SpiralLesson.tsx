import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Lesson, Subject } from '../content/schema';
import { findLesson } from '../content/subjects';
import { LessonPlayer } from '../lesson/LessonPlayer';
import { localDateIso } from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';
import { gradeAnswer } from '../quiz/engine';
import { QuestionCard } from '../quiz/QuestionCard';
import { connectionForLesson, type UnitConnection } from './connections';
import { ReviewSession } from './ReviewSession';
import { ReviewSource } from './ReviewSource';
import { selectReview } from './selection';
import './review.css';

/** An authored application is practice in the current lesson, not old-review evidence. */
function ConnectPractice({ connection, lesson, subject, onDone }: {
  connection: UnitConnection;
  lesson: Lesson;
  subject: Subject;
  onDone: () => void;
}) {
  const answered = useRef(false);
  const finished = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const [missed, setMissed] = useState(false);
  useEffect(() => { heading.current?.focus(); }, []);
  const sourceCard = lesson.learnCards.find((card) => card.id === connection.question.reviewCardId);
  const reviewParams = new URLSearchParams({ step: `card:${connection.question.reviewCardId}` });
  return <section className="stack review-session" aria-label="Connect it">
    <header className="stack review-header">
      <span className="review-eyebrow">Put your ideas together</span>
      <h2 ref={heading} tabIndex={-1}>Connect it</h2>
      <p className="review-connection-foundation">{connection.foundation}</p>
    </header>
    {connection.source && <ReviewSource source={connection.source} />}
    <QuestionCard question={connection.question} guide={subject.guide} index={0} total={1}
      onAnswered={(answer) => {
        if (answered.current) return;
        answered.current = true;
        setMissed(!gradeAnswer(connection.question, answer));
      }}
      onNext={() => {
        if (!answered.current || finished.current) return;
        finished.current = true;
        onDone();
      }} nextLabel="Continue lesson" />
    {missed && <aside className="card review-revisit">
      <p>Want to see the idea again?</p>
      <Link className="btn" to={`/lesson/${lesson.id}?${reviewParams}`} target="_blank" rel="noopener noreferrer">
        Revisit {sourceCard?.title ?? lesson.title} <span className="review-link-note">(opens in a new tab)</span>
      </Link>
    </aside>}
  </section>;
}

function SpiralLessonRun({ subject, lesson }: { subject: Subject; lesson: Lesson }) {
  const { save } = useProgress();
  // Keep these choices and the stage list fixed as review answers change the save.
  const [items] = useState(() => selectReview(save, subject, localDateIso(), lesson.id));
  const connection = connectionForLesson(subject, lesson);
  const review = useMemo(() => ({
    recall: items.length > 0
      ? (onDone: () => void) => <ReviewSession items={items} guide={subject.guide} onDone={onDone} />
      : undefined,
    connect: connection
      ? (onDone: () => void) => <ConnectPractice connection={connection} lesson={lesson} subject={subject} onDone={onDone} />
      : undefined,
  }), [items, connection, lesson, subject]);
  return <LessonPlayer review={review} />;
}

/** Curriculum-aware route wrapper; the generic lesson player needs no save provider. */
export function SpiralLesson() {
  const { lessonId } = useParams();
  const { reviewEpoch } = useProgress();
  const found = lessonId ? findLesson(lessonId) : null;
  if (!found) return <LessonPlayer />;
  return <SpiralLessonRun key={`${found.lesson.id}:${reviewEpoch}`} lesson={found.lesson} subject={found.subject} />;
}
