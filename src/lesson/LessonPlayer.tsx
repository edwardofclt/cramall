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
import { InlineTutor } from '../tutor/InlineTutor';
import { buildInlineContext, getInlineLesson, type GuideSelection } from '../tutor/inline-context.mjs';

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

function WorkedSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="worked-steps">
      {steps.map((step, index) => (
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
  );
}

function WorkedExample({
  worked,
  showPassage,
  coachingTitle,
}: {
  worked: Lesson['workedExample'];
  showPassage: boolean;
  coachingTitle: string;
}) {
  const passage = showPassage ? worked.passage : undefined;
  if (passage) {
    const passageTitleId = 'worked-passage-title';
    const coachingTitleId = 'worked-coaching-title';
    return (
      <section className="worked-reading-layout" aria-labelledby="worked-example-title">
        <h2 id="worked-example-title" className="worked-reading-title">
          {worked.title}
        </h2>
        <div className="worked-reading-columns">
          <article className="card worked-passage" aria-labelledby={passageTitleId}>
            <div className="worked-passage-header">
              <h3 id={passageTitleId}>{passage.title}</h3>
              <ReadAloudButton text={speechText([passage.title, passage.text])} />
            </div>
            <div
              className="worked-passage-scroll"
              role="region"
              tabIndex={0}
              aria-label={`Passage: ${passage.title}`}
            >
              {passage.text.split(/\n\s*\n/).map((paragraph, index) => (
                <p key={index}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </article>
          <aside className="worked-coaching" aria-labelledby={coachingTitleId} tabIndex={0}>
            <h3 id={coachingTitleId}>{coachingTitle}</h3>
            <WorkedSteps steps={worked.steps} />
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section className="card stack" aria-labelledby="worked-example-title">
      <div className="row" style={{ justifyContent: 'space-between', gap: '0.75rem' }}>
        <h2 id="worked-example-title" style={{ margin: 0 }}>
          {worked.title}
        </h2>
        <ReadAloudButton text={speechText([worked.title, ...worked.steps])} />
      </div>
      <WorkedSteps steps={worked.steps} />
    </section>
  );
}

function Outro({ lesson, subject }: { lesson: Lesson; subject: Subject }) {
  const reflection = subject.id === 'social-studies'
    ? lesson.learnCards.find(card => card.widgetCoach)?.widgetCoach?.reactions.complete.text
    : undefined;
  return (
    <section className="card stack lesson-outro">
      <Character guide={subject.guide} pose="cheer" size={132} />
      <h2 style={{ margin: 0 }}>You learned it all!</h2>
      {reflection && <p style={{ margin: 0 }}>{reflection}</p>}
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
  const manifest = getInlineLesson(lesson.id);
  const inlineLesson = manifest?.stages.some(item => item.key === stage.key) ? manifest : undefined;
  const [guideExpanded, setGuideExpanded] = useState(false);
  const [activitySnapshot, setActivitySnapshot] = useState<{visitId:number; activity:GuideSelection['activity']}>();
  const stageNode = useRef<HTMLDivElement | null>(null);

  const reduced = useReducedMotionPref();
  const showPeek = searchParams.get('peek') === '1' && !peekDismissed;
  const hasWorkedPassage =
    stage.key === 'worked' && (subject.id === 'reading' || subject.id === 'social-studies') && Boolean(lesson.workedExample.passage);

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
  const [widgetCoachStageKey, setWidgetCoachStageKey] = useState(stage.key);
  const [widgetCoachIntroActive, setWidgetCoachIntroActive] = useState(
    'card' in stage && Boolean(stage.card.widgetCoach || stage.card.demo),
  );
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
  if (widgetCoachStageKey !== stage.key) {
    setWidgetCoachStageKey(stage.key);
    setWidgetCoachIntroActive('card' in stage && Boolean(stage.card.widgetCoach || stage.card.demo));
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
  const setWidgetCoachIntroForVisit = useCallback(
    (owner: { key: Stage['key']; id: number }, active: boolean) => {
      // AnimatePresence can leave a previous coached card mounted while another stage enters.
      // Ignore its reset/activation callbacks so it cannot reveal or hide the new stage's Next.
      if (
        activeStageVisit.current.key === owner.key &&
        activeStageVisit.current.id === owner.id
      ) {
        setWidgetCoachIntroActive(active);
      }
    },
    [],
  );
  const focusStage = useCallback((node: HTMLDivElement | null) => {
    stageNode.current = node;
    node?.focus();
  }, []);
  const guideStage = inlineLesson?.stages.find(item => item.key === stage.key);
  const guideActivity = guideStage?.activity;
  const selection: GuideSelection = {lessonId:lesson.id, stageKey:stage.key};
  if (guideActivity?.stateKind && !widgetCoachIntroActive) {
    selection.activity = activitySnapshot?.visitId === stageVisit.id ? activitySnapshot.activity
      : guideActivity.stateKind === 'number' ? {value:0}
      : guideActivity.stateKind === 'theme' ? {theme:null,evidenceIds:[]} : {placements:{}};
  }
  const onWidgetEvent: WidgetEventHandler = event => {
    if (!inlineLesson || !guideActivity || event.type !== 'change' || activeStageVisit.current.id !== stageVisit.id) return;
    const value = event.value;
    let activity: GuideSelection['activity'];
    if (guideActivity.type === 'place-value-builder' && typeof value === 'number') activity = {value};
    else if (guideActivity.type === 'theme-evidence-collector' && typeof value === 'object' && value !== null && 'theme' in value && 'evidenceIds' in value) {
      activity = {theme:value.theme, evidenceIds:value.evidenceIds};
    } else if (guideActivity.stateKind === 'placements' && typeof value === 'object' && value !== null && 'placements' in value) {
      activity = {placements:value.placements};
    } else return;
    try { buildInlineContext({...selection, activity}); } catch { return; }
    setActivitySnapshot({visitId:stageVisit.id, activity});
  };
  const source = guideStage?.source ?? inlineLesson?.source;
  const showInlineSource = source && !hasWorkedPassage && !(guideStage?.source && guideActivity && !widgetCoachIntroActive);
  const animation = reduced
    ? {}
    : { variants: cardVariants, initial: 'initial', animate: 'enter', exit: 'exit' };

  return (
    <div className={inlineLesson ? `guided-lesson-layout${guideExpanded ? ' is-open' : ''}` : undefined}>
    <div
      className="page stack lesson-page"
      data-stage={stage.key}
      data-worked-passage={hasWorkedPassage ? 'true' : undefined}
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

      {showInlineSource && <article className="inline-lesson-source" aria-labelledby="inline-source-title">
        <header><div><span className="inline-guide-eyebrow">Keep the source close</span><h2 id="inline-source-title">{source.title}</h2></div><ReadAloudButton text={source.text} /></header>
        <div className="inline-lesson-passage" role="region" tabIndex={0} aria-label={`Lesson source: ${source.title}`}>
          {source.text.split(/\n\s*\n/).filter(paragraph => paragraph !== source.title).map((paragraph,index) => <p key={index}>{paragraph}</p>)}
        </div>
      </article>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage.key}
          ref={focusStage}
          className="stack lesson-stage"
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
              onWidgetEvent={onWidgetEvent}
              onDialogueAnnouncement={setDialogueAnnouncement}
              onDialogueDone={() => finishCardDialogue(stageVisit)}
              guide={subject.guide}
              stageVisitKey={`${stageVisit.key}@${stageVisit.id}`}
              onWidgetCoachIntroActiveChange={(active) =>
                setWidgetCoachIntroForVisit(stageVisit, active)
              }
            />
          )}
          {stage.key === 'worked' && (
            <WorkedExample worked={lesson.workedExample} showPassage={hasWorkedPassage}
              coachingTitle={subject.id === 'social-studies' ? 'How to use the evidence' : 'How to read it'} />
          )}
          {stage.key === 'outro' && <Outro lesson={lesson} subject={subject} />}
        </motion.div>
      </AnimatePresence>

      <nav className="lesson-nav" aria-label="Lesson steps">
        {step > 0 && (
          <button type="button" className="btn" onClick={goBack}>
            <span aria-hidden="true">←&nbsp;</span>Back
          </button>
        )}
        {stage.key !== 'intro' && !cardDialogueActive && !widgetCoachIntroActive && step < last && (
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
    {inlineLesson && <InlineTutor selection={selection} onExpandedChange={setGuideExpanded} onReturnToLesson={() => { stageNode.current?.focus(); stageNode.current?.scrollIntoView({block:'start'}); }} />}
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

  return <LessonStages key={found.lesson.id} subject={found.subject} unit={found.unit} lesson={found.lesson} />;
}
