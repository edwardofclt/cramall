import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { Character } from '../characters/Character';
import type { Lesson, Subject } from '../content/schema';
import { lessonStars } from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';
import type { QuizResult } from './engine';

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const CONFETTI_COUNT = 40;

/** `place-value` → `Place Value`, so a concept tag can be read out loud to a 9-year-old. */
export function humanizeTag(tag: string): string {
  return tag
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Precomputed once at module load rather than per render: confetti should look scattered,
 * but it must not reshuffle on every re-render (and must never make a render impure).
 */
const CONFETTI = Array.from({ length: CONFETTI_COUNT }, (_, i) => {
  // Cheap deterministic scatter — golden-ratio strides never line the bits up in a grid.
  const frac = (n: number) => (i * n) % 1;
  return {
    left: Math.round(frac(0.6180339887) * 100),
    delay: Number((frac(0.3819660113) * 0.8).toFixed(3)),
    duration: Number((1.6 + frac(0.7548776662) * 1.4).toFixed(3)),
    rotate: Math.round(frac(0.2360679775) * 720) - 360,
    color: `var(--c-confetti-${(i % 5) + 1})`,
    width: 8 + (i % 3) * 3,
  };
});

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {CONFETTI.map((bit, index) => (
        <motion.div
          key={index}
          className="confetti-bit"
          data-testid="confetti-bit"
          style={{
            left: `${bit.left}%`,
            width: bit.width,
            height: bit.width * 1.6,
            background: bit.color,
          }}
          initial={{ y: '-15vh', opacity: 0, rotate: 0 }}
          animate={{ y: '105vh', opacity: [0, 1, 1, 0], rotate: bit.rotate }}
          transition={{ duration: bit.duration, delay: bit.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function ScoreRing({ score, total, reduced }: { score: number; total: number; reduced: boolean }) {
  const fraction = total === 0 ? 0 : score / total;
  const offset = RING_CIRCUMFERENCE * (1 - fraction);

  return (
    <div className="score-ring-wrap">
      <svg className="score-ring" viewBox="0 0 128 128" width="150" height="150" aria-hidden="true">
        <circle className="score-ring-track" cx="64" cy="64" r={RING_RADIUS} />
        <motion.circle
          className="score-ring-fill"
          cx="64"
          cy="64"
          r={RING_RADIUS}
          transform="rotate(-90 64 64)"
          strokeDasharray={RING_CIRCUMFERENCE}
          // `initial={false}` snaps to the final offset — no sweep for reduced motion.
          initial={reduced ? false : { strokeDashoffset: RING_CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
      <p className="score-ring-value">
        {score}/{total}
      </p>
    </div>
  );
}

export type ResultsProps = {
  lesson: Lesson;
  subject: Subject;
  result: QuizResult;
  /** Starts a brand-new run — a fresh sample, not a replay of these ten questions. */
  onTryAgain: () => void;
};

/**
 * The payoff screen. A pass gets confetti and a cheering guide; anything else gets the
 * same guide, thinking, and a list of *things to look at again* — never a scolding.
 */
export function Results({ lesson, subject, result, onTryAgain }: ResultsProps) {
  const { save } = useProgress();
  const reduced = useReducedMotionPref();

  // Read off the progress the attempt was just written into, so the stars on this screen
  // are the stars the map will show.
  const stars = lessonStars(save.lessons[lesson.id]);
  const passed = result.score >= lesson.quiz.passThreshold;
  const perfect = result.score === result.total;

  const message = perfect
    ? 'Perfect! Every single one. You know this cold.'
    : passed
      ? 'You did it! That is a pass — nice work.'
      : 'So close. Take another look at the bits below, then give it another go.';

  return (
    <div className="stack results" data-testid="quiz-results">
      {passed && !reduced && <Confetti />}

      <section className="card stack results-hero">
        <Character guide={subject.guide} pose={passed ? 'cheer' : 'think'} size={132} />
        <ScoreRing score={result.score} total={result.total} reduced={reduced} />
        <p
          className="results-stars"
          data-testid="lesson-stars"
          data-stars={stars}
          aria-label={`${stars} of 3 stars`}
        >
          <span aria-hidden="true">
            {'★'.repeat(stars)}
            {'☆'.repeat(3 - stars)}
          </span>
        </p>
        <p className="results-message" data-testid="results-message">
          {message}
        </p>
      </section>

      {result.missed.length > 0 ? (
        <section className="stack" aria-labelledby="review-title">
          <h2 id="review-title" className="results-subtitle">
            Things to review
          </h2>
          <ul className="stack review-list">
            {result.missed.map((group) => (
              <li key={group.conceptTag} className="card review-group" data-testid="review-group">
                <div className="review-group-body">
                  <p className="review-group-tag">{humanizeTag(group.conceptTag)}</p>
                  <p className="review-group-count">
                    Missed {group.count} {group.count === 1 ? 'time' : 'times'}
                  </p>
                </div>
                <Link
                  className="btn btn-primary review-link"
                  to={`/lesson/${lesson.id}?card=${group.reviewCardId}`}
                >
                  Review this
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="results-clean">Nothing to review — you got every one. 🌟</p>
      )}

      <div className="results-actions">
        <button type="button" className="btn btn-primary" onClick={onTryAgain}>
          Try again
        </button>
        <Link className="btn" to={`/subject/${subject.id}`}>
          Back to map
        </Link>
      </div>
    </div>
  );
}
