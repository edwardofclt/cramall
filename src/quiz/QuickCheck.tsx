import { useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { cardVariants, springy } from '../app/motion';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { Character } from '../characters/Character';
import type { Lesson, Subject } from '../content/schema';
import { findLesson } from '../content/subjects';
import { useProgress } from '../progress/ProgressContext';
import { buildResult, sampleQuiz, shuffleChoices, type Answer, type QuizResult } from './engine';
import { QuestionCard } from './QuestionCard';
import { Results } from './Results';

export const QUIZ_LENGTH = 10;

/** Local yyyy-mm-dd — a quiz finished at 9pm belongs to *that* day, not tomorrow in UTC. */
function todayIso(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function QuizNotFound() {
  return (
    <div className="page stack">
      <h1>Quick Check not found</h1>
      <p>That quiz isn&apos;t here — maybe the link is old. Let&apos;s go pick another lesson!</p>
      <div>
        <Link className="btn btn-primary" to="/">
          Back home
        </Link>
      </div>
    </div>
  );
}

/** A lesson whose author has not written ten questions yet still has to land softly. */
function QuizNotReady({ lesson, subject }: { lesson: Lesson; subject: Subject }) {
  return (
    <div
      className="page stack"
      style={{ '--accent': subject.color, '--accent-action': subject.actionColor } as CSSProperties}
    >
      <Link className="link-quiet" to={`/lesson/${lesson.id}`}>
        ← Back to the lesson
      </Link>
      <section className="card stack quiz-notready">
        <Character guide={subject.guide} pose="think" size={120} />
        <h1 style={{ margin: 0 }}>Quiz not ready yet</h1>
        <p style={{ margin: 0 }}>
          We&apos;re still writing questions for this one. Go read the lesson — the Quick Check
          will be waiting soon!
        </p>
        <Link className="btn btn-primary" to={`/lesson/${lesson.id}`}>
          Back to the lesson
        </Link>
      </section>
    </div>
  );
}

function QuizProgressBar({
  answered,
  reduced,
}: {
  answered: number;
  reduced: boolean;
}) {
  return (
    <div
      className="quiz-progress"
      role="progressbar"
      aria-label="Quick Check progress"
      aria-valuemin={0}
      aria-valuemax={QUIZ_LENGTH}
      aria-valuenow={answered}
      aria-valuetext={`${answered} of ${QUIZ_LENGTH} questions answered`}
    >
      <motion.div
        className="quiz-progress-fill"
        initial={false}
        animate={{ width: `${(answered / QUIZ_LENGTH) * 100}%` }}
        transition={reduced ? { duration: 0 } : springy}
      />
    </div>
  );
}

function QuizReferencePanel({ reference }: { reference: NonNullable<Lesson['quiz']['reference']> }) {
  const headingId = `quiz-reference-${reference.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <aside className="card quiz-reference" aria-labelledby={headingId} tabIndex={0}>
      <h2 id={headingId} className="quiz-reference-title">{reference.title}</h2>
      <p className="quiz-reference-text">{reference.text}</p>
    </aside>
  );
}

type RunProps = {
  lesson: Lesson;
  subject: Subject;
  rng: () => number;
  previousQuestionIds: readonly string[];
  onTryAgain: (questionIds: string[]) => void;
};

/**
 * One attempt: ten questions sampled once, answered one at a time, then the results.
 * Everything about the attempt lives in here, so "try again" is a remount and nothing else.
 */
function QuizRun({ lesson, subject, rng, previousQuestionIds, onTryAgain }: RunProps) {
  const { recordAttempt } = useProgress();
  const reduced = useReducedMotionPref();

  // Sampled and shuffled exactly once, in a state initialiser: re-running it on a render
  // would swap the question out from under a kid who is mid-answer.
  const [questions] = useState(() =>
    sampleQuiz(lesson.quiz.pool, QUIZ_LENGTH, rng, previousQuestionIds)
      .map((question) => shuffleChoices(question, rng)),
  );
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const recorded = useRef(false);

  // Mirrors `index` for handlers that are no longer the current one. `AnimatePresence`
  // keeps the outgoing card mounted for the length of its exit, still holding the focused
  // Next button bound to the *previous* index — so a key-repeat or a double-tap can call
  // an `onNext` that render already moved on from.
  const indexRef = useRef(index);
  indexRef.current = index;

  function finish(finalAnswers: Answer[]) {
    const built = buildResult(questions, finalAnswers);
    // One attempt per run, guarded by a ref rather than an effect dependency: re-renders
    // (a settings change, a parent update) must never append a second attempt.
    if (!recorded.current) {
      recorded.current = true;
      recordAttempt(
        lesson.id,
        {
          date: todayIso(),
          score: built.score,
          total: built.total,
          // Storage wants one tag per missed *question*, so a triple miss counts triple.
          missedConceptTags: built.missed.flatMap((group) =>
            Array<string>(group.count).fill(group.conceptTag),
          ),
        },
        lesson.quiz.passThreshold,
      );
    }
    // Batched with recordAttempt, so the results screen's first render already sees the
    // progress it just wrote (and shows the right stars immediately).
    setResult(built);
  }

  function handleNext() {
    // Two guards, for the two ways this fires twice. The ref stops a *stale* Next (the
    // outgoing card's, bound to an older index): unguarded it skipped a question, which
    // knocked every later answer out of alignment with the question it graded, and on the
    // second-to-last question walked `index` off the end of the array into a blank screen.
    if (indexRef.current !== index) return;
    if (index + 1 >= questions.length) {
      // Two taps in one tick both pass the ref check; `recorded` keeps it to one attempt
      // and re-setting the same result is a no-op.
      finish(answers);
      return;
    }
    // ...and the functional updater stops the same-tick repeat, which the ref cannot see
    // because it only catches up on the next render.
    setIndex((current) =>
      current === index ? Math.min(current + 1, questions.length - 1) : current,
    );
  }

  const animation = reduced
    ? {}
    : { variants: cardVariants, initial: 'initial', animate: 'enter', exit: 'exit' };
  const question = questions[index]!;

  return (
    <div
      className="page stack quiz-page"
      style={{ '--accent': subject.color, '--accent-action': subject.actionColor } as CSSProperties}
    >
      <div className="quiz-topbar">
        <Link className="link-quiet" to={`/lesson/${lesson.id}`}>
          ← Back to the lesson
        </Link>
        <span className="badge badge-small quiz-count">
          {result ? 'All done!' : `${index + 1} of ${QUIZ_LENGTH}`}
        </span>
      </div>

      <header className="stack quiz-header">
        <span className="unit-chip quiz-chip">Quick Check</span>
        <h1 className="quiz-lesson-title">{lesson.title}</h1>
      </header>

      <QuizProgressBar answered={answers.length} reduced={reduced} />

      {result ? (
          <motion.div key="results" className="stack" {...animation}>
            <Results
              lesson={lesson}
              subject={subject}
              result={result}
              onTryAgain={() => onTryAgain(questions.map(({ id }) => id))}
            />
          </motion.div>
        ) : (
          <div className={lesson.quiz.reference ? 'quiz-question-layout' : undefined}>
            {lesson.quiz.reference && <QuizReferencePanel reference={lesson.quiz.reference} />}
            {/* `mode="wait"` keeps exactly one card on screen: the old one leaves before the
                next arrives, so nothing overlaps mid-transition. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`q${index}`} className="stack" {...animation}>
                <QuestionCard
                  question={question}
                  guide={subject.guide}
                  index={index}
                  total={questions.length}
                  onAnswered={(answer) => setAnswers((current) => [...current, answer])}
                  onNext={handleNext}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
    </div>
  );
}

/** Holds the attempt counter so "Try again" remounts the run with a fresh sample. */
function QuizAttempts({
  lesson,
  subject,
  rng,
}: Omit<RunProps, 'onTryAgain' | 'previousQuestionIds'>) {
  const [attempt, setAttempt] = useState({ number: 0, previousQuestionIds: [] as string[] });
  return (
    <QuizRun
      key={attempt.number}
      lesson={lesson}
      subject={subject}
      rng={rng}
      previousQuestionIds={attempt.previousQuestionIds}
      onTryAgain={(previousQuestionIds) => setAttempt((current) => ({
        number: current.number + 1,
        previousQuestionIds,
      }))}
    />
  );
}

export type QuickCheckProps = {
  /** Injectable randomness — tests pass a seeded generator; the app uses Math.random. */
  rng?: () => number;
};

/** Route component for `/lesson/:lessonId/quiz`. */
export function QuickCheck({ rng = Math.random }: QuickCheckProps) {
  const { lessonId } = useParams();
  const found = lessonId ? findLesson(lessonId) : null;

  if (!found) return <QuizNotFound />;
  if (found.lesson.quiz.pool.length < QUIZ_LENGTH) {
    return <QuizNotReady lesson={found.lesson} subject={found.subject} />;
  }

  // Keyed by lesson so walking from one lesson's quiz straight to another's starts clean.
  return (
    <QuizAttempts
      key={found.lesson.id}
      lesson={found.lesson}
      subject={found.subject}
      rng={rng}
    />
  );
}
