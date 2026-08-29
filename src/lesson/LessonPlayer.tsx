import { useCallback, useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { cardVariants } from '../app/motion';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { Character } from '../characters/Character';
import { DialoguePlayer } from '../characters/DialoguePlayer';
import type { LearnCard as LearnCardData, Lesson, Subject, Unit } from '../content/schema';
import { findLesson } from '../content/subjects';
import { LearnCard } from './LearnCard';
import { ReadAloudButton } from './ReadAloudButton';
import { RichText, speechText } from './Rich';

type Stage =
  | { key: 'intro' }
  | { key: `card:${string}`; card: LearnCardData }
  | { key: 'worked' }
  | { key: 'outro' };

function buildStages(lesson: Lesson): Stage[] {
  return [
    { key: 'intro' },
    ...lesson.learnCards.map((card): Stage => ({ key: `card:${card.id}`, card })),
    { key: 'worked' },
    { key: 'outro' },
  ];
}

function LessonNotFound() {
  return (
    <div className="page stack">
      <h1>Lesson not found</h1>
      <p>
        That lesson is not here — maybe the link is old. Let&apos;s go pick another one!
      </p>
      <div>
        <Link className="btn btn-primary" to="/">
          Back home
        </Link>
      </div>
    </div>
  );
}

function PeekBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="peek-banner" role="status">
      <span>
        <span aria-hidden="true">👀</span> Not ready yet — this is a sneak peek!
      </span>
      <button
        type="button"
        className="peek-dismiss"
        aria-label="Dismiss sneak peek notice"
        onClick={onDismiss}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}

function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="progress-dots"
      role="group"
      aria-label={`Step ${step + 1} of ${total}`}
      data-testid="progress-dots"
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className="progress-dot"
          data-testid="progress-dot"
          data-state={index === step ? 'current' : index < step ? 'done' : 'todo'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function WorkedExample({ worked }: { worked: Lesson['workedExample'] }) {
  return (
    <section className="card stack" aria-labelledby="worked-example-title">
      <div className="row" style={{ justifyContent: 'space-between', gap: '0.75rem' }}>
        <h2 id="worked-example-title" style={{ margin: 0 }}>
          {worked.title}
        </h2>
        <ReadAloudButton text={speechText([worked.title, ...worked.steps])} />
      </div>
      <ol className="worked-steps">
        {worked.steps.map((step, index) => (
          <li key={index} className="card worked-step" data-testid="worked-step">
            <span className="worked-step-number" aria-hidden="true">
              {index + 1}
            </span>
            <span>
              <RichText text={step} />
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Outro({ lesson, subject }: { lesson: Lesson; subject: Subject }) {
  return (
    <section className="card stack lesson-outro">
      <Character guide={subject.guide} pose="cheer" size={132} />
      <h2 style={{ margin: 0 }}>You learned it all!</h2>
      <p style={{ margin: 0 }}>Ready to show what you know?</p>
      <Link className="btn btn-primary" to={`/lesson/${lesson.id}/quiz`}>
        Start Quick Check <span aria-hidden="true">&nbsp;✓</span>
      </Link>
    </section>
  );
}

function LessonStages({
  subject,
  unit,
  lesson,
}: {
  subject: Subject;
  unit: Unit;
  lesson: Lesson;
}) {
  const [searchParams] = useSearchParams();
  const stages = useMemo(() => buildStages(lesson), [lesson]);

  // `?card=` (used by the results screen's "Review this" links) only picks the opening
  // stage; after that the kid drives. An id nobody recognises just starts at the intro.
  const [step, setStep] = useState(() => {
    const cardId = searchParams.get('card');
    if (!cardId) return 0;
    const found = stages.findIndex((stage) => stage.key === `card:${cardId}`);
    return found === -1 ? 0 : found;
  });
  const [peekDismissed, setPeekDismissed] = useState(false);

  const reduced = useReducedMotionPref();
  const showPeek = searchParams.get('peek') === '1' && !peekDismissed;

  const last = stages.length - 1;
  const goNext = useCallback(() => setStep((s) => Math.min(s + 1, last)), [last]);
  const goBack = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const stage = stages[step] ?? stages[0]!;
  const animation = reduced
    ? {}
    : { variants: cardVariants, initial: 'initial', animate: 'enter', exit: 'exit' };

  return (
    <div className="page stack" style={{ '--accent': subject.color } as CSSProperties}>
      {showPeek && <PeekBanner onDismiss={() => setPeekDismissed(true)} />}

      <Link className="link-quiet" to={`/subject/${subject.id}`}>
        ← Back to {subject.title}
      </Link>

      <header className="stack" style={{ gap: '0.5rem' }}>
        <span className="unit-chip">
          <span className="unit-number">Unit {unit.number}</span>
          <span>{unit.title}</span>
        </span>
        <h1 style={{ margin: 0 }}>{lesson.title}</h1>
        <ProgressDots step={step} total={stages.length} />
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={stage.key} className="stack" {...animation}>
          {stage.key === 'intro' && (
            <DialoguePlayer lines={lesson.intro} onDone={goNext} />
          )}
          {'card' in stage && <LearnCard card={stage.card} />}
          {stage.key === 'worked' && <WorkedExample worked={lesson.workedExample} />}
          {stage.key === 'outro' && <Outro lesson={lesson} subject={subject} />}
        </motion.div>
      </AnimatePresence>

      <nav className="lesson-nav" aria-label="Lesson steps">
        {step > 0 && (
          <button type="button" className="btn" onClick={goBack}>
            <span aria-hidden="true">←&nbsp;</span>Back
          </button>
        )}
        {step < last && (
          <button
            type="button"
            className="btn btn-primary lesson-nav-next"
            aria-label="Next step"
            onClick={goNext}
          >
            Next <span aria-hidden="true">&nbsp;→</span>
          </button>
        )}
      </nav>
    </div>
  );
}

/**
 * The lesson itself: intro dialogue → learn cards → worked example → Quick Check hand-off,
 * one stage at a time with Back/Next.
 */
export function LessonPlayer() {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const found = lessonId ? findLesson(lessonId) : null;
  if (!found) return <LessonNotFound />;

  // Keyed by lesson + deep-linked card so both a different lesson and a *new* "Review
  // this" link restart the stage machine; walking to another card leaves `?card=` alone,
  // so ordinary Back/Next never remounts.
  return (
    <LessonStages
      key={`${found.lesson.id}:${searchParams.get('card') ?? ''}`}
      subject={found.subject}
      unit={found.unit}
      lesson={found.lesson}
    />
  );
}
