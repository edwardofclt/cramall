import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { cardVariants } from '../app/motion';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { Character } from '../characters/Character';
import type { LearnCard as LearnCardData, Lesson, Subject, Unit } from '../content/schema';
import { findLesson } from '../content/subjects';
import { LearnCard } from './LearnCard';
import { ReadAloudButton } from './ReadAloudButton';
import { RichText, speechText } from './Rich';
import type { WidgetEventHandler } from '../widgets/registry';
import { AnnouncingDialogue } from './AnnouncingDialogue';

const ignoreWidgetEvent: WidgetEventHandler = () => {};

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

function findStageIndex(stages: Stage[], step: string | null, cardId: string | null) {
  const requestedKey = step ?? (cardId ? `card:${cardId}` : null);
  const index = requestedKey ? stages.findIndex((stage) => stage.key === requestedKey) : -1;
  return index === -1 ? 0 : index;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const stages = useMemo(() => buildStages(lesson), [lesson]);
  const step = findStageIndex(stages, searchParams.get('step'), searchParams.get('card'));
  const stage = stages[step];
  const [peekDismissed, setPeekDismissed] = useState(false);
  const [dialogueAnnouncement, setDialogueAnnouncement] = useState('');

  const reduced = useReducedMotionPref();
  const showPeek = searchParams.get('peek') === '1' && !peekDismissed;

  const last = stages.length - 1;
  const setStage = useCallback(
    (nextStage: Stage, replace = false) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          next.set('step', nextStage.key);
          next.delete('card');
          return next;
        },
        { replace },
      );
    },
    [setSearchParams],
  );
  const needsCanonicalization = searchParams.get('step') !== stage.key || searchParams.has('card');
  useEffect(() => {
    if (needsCanonicalization) setStage(stage, true);
  }, [needsCanonicalization, setStage, stage]);

  const goNext = useCallback(() => setStage(stages[Math.min(step + 1, last)]!), [last, setStage, stages, step]);
  const goBack = useCallback(() => setStage(stages[Math.max(step - 1, 0)]!), [setStage, stages, step]);

  const [dialogueStageKey, setDialogueStageKey] = useState(stage.key);
  const [cardDialogueDone, setCardDialogueDone] = useState(false);
  const activeStageVisit = useRef({ key: stage.key, id: 0 });
  if (activeStageVisit.current.key !== stage.key) {
    activeStageVisit.current = { key: stage.key, id: activeStageVisit.current.id + 1 };
  }
  const stageVisit = activeStageVisit.current;

  // Each stage visit gets a fresh card dialogue. Adjusting this state while rendering
  // prevents a finished card's stage Next from flashing during a Back revisit.
  if (dialogueStageKey !== stage.key) {
    setDialogueStageKey(stage.key);
    setCardDialogueDone(false);
  }

  const cardDialogueActive =
    'card' in stage && Boolean(stage.card.dialogue?.length) && !cardDialogueDone;
  const finishCardDialogue = useCallback((owner: { key: Stage['key']; id: number }) => {
    // AnimatePresence can leave a previous card mounted while another stage enters.
    // A Back revisit has the same key but a new visit id, so stale callbacks cannot
    // reveal Next for the fresh dialogue.
    if (
      activeStageVisit.current.key === owner.key &&
      activeStageVisit.current.id === owner.id
    ) {
      setCardDialogueDone(true);
    }
  }, []);
  const focusStage = useCallback((node: HTMLDivElement | null) => {
    node?.focus();
  }, []);
  const animation = reduced
    ? {}
    : { variants: cardVariants, initial: 'initial', animate: 'enter', exit: 'exit' };

  return (
    <div
      className="page stack"
      style={{ '--accent': subject.color, '--accent-action': subject.actionColor } as CSSProperties}
    >
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

      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-testid="dialogue-live-region"
      >
        {dialogueAnnouncement}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage.key}
          ref={focusStage}
          className="stack"
          tabIndex={-1}
          data-testid="lesson-stage"
          {...animation}
        >
          {stage.key === 'intro' && (
            <AnnouncingDialogue
              lines={lesson.intro}
              onDone={goNext}
              onAnnouncement={setDialogueAnnouncement}
              size={360}
            />
          )}
          {'card' in stage && (
            <LearnCard
              card={stage.card}
              onWidgetEvent={ignoreWidgetEvent}
              onDialogueAnnouncement={setDialogueAnnouncement}
              onDialogueDone={() => finishCardDialogue(stageVisit)}
            />
          )}
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
        {stage.key !== 'intro' && !cardDialogueActive && step < last && (
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
  const found = lessonId ? findLesson(lessonId) : null;
  if (!found) return <LessonNotFound />;

  return <LessonStages subject={found.subject} unit={found.unit} lesson={found.lesson} />;
}
