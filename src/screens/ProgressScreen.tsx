import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { SUBJECTS, allLessons } from '../content/subjects';
import {
  effectiveStreak,
  isUnitComplete,
  lessonStars,
  localDateIso,
  subjectCompletion,
} from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';

type Badge = { id: string; label: string; earned: boolean };

function ProgressBar({
  title,
  passed,
  total,
  color,
  actionColor,
}: {
  title: string;
  passed: number;
  total: number;
  color: string;
  actionColor: string;
}) {
  const reduced = useReducedMotionPref();
  const percent = total === 0 ? 0 : (passed / total) * 100;

  return (
    <section
      className="card progress-subject"
      style={{ '--accent': color, '--accent-action': actionColor } as React.CSSProperties}
    >
      <div className="row progress-subject-heading">
        <h2>{title}</h2>
        <span>{passed} / {total} lessons</span>
      </div>
      {total === 0 ? (
        <p className="progress-empty">No authored lessons yet.</p>
      ) : (
        <div
          className="progress-track"
          role="progressbar"
          aria-label={`${title} completion`}
          aria-valuemin={0}
          aria-valuenow={passed}
          aria-valuemax={total}
        >
          <motion.div
            className="progress-fill"
            initial={reduced ? false : { width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
          />
        </div>
      )}
    </section>
  );
}

export function ProgressScreen() {
  const { save } = useProgress();
  const lessons = allLessons();
  const streak = effectiveStreak(save, localDateIso());
  const totalStars = lessons.reduce((total, lesson) => total + lessonStars(save.lessons[lesson.id]), 0);
  const badges: Badge[] = [
    { id: 'first-pass', label: 'First pass', earned: lessons.some((lesson) => save.lessons[lesson.id]?.status === 'passed') },
    { id: 'perfect-10', label: 'Perfect 10', earned: lessons.some((lesson) => save.lessons[lesson.id]?.bestScore === 10) },
    {
      id: 'unit-complete',
      label: 'Unit complete',
      earned: SUBJECTS.some((subject) => subject.units.some((unit) => isUnitComplete(save, unit))),
    },
    { id: 'streak-3', label: '3-day streak', earned: streak >= 3 },
    { id: 'streak-7', label: '7-day streak', earned: streak >= 7 },
  ];

  return (
    <div className="page stack">
      <header className="progress-header">
        <h1>My Progress</h1>
        <p className="progress-stars" aria-label={`${totalStars} total stars`}>⭐ {totalStars} total stars</p>
        <p className="progress-streak">🔥 {streak} day streak</p>
      </header>

      <div className="stack">
        {SUBJECTS.map((subject) => {
          const { passed, total } = subjectCompletion(save, subject);
          return (
            <ProgressBar
              key={subject.id}
              title={subject.title}
              passed={passed}
              total={total}
              color={subject.color}
              actionColor={subject.actionColor}
            />
          );
        })}
      </div>

      <section className="card stack" aria-labelledby="badges-heading">
        <h2 id="badges-heading">Badges</h2>
        <div className="badge-row">
          {badges.map((badge) => (
            <span
              key={badge.id}
              className="achievement-badge"
              data-testid={`badge-${badge.id}`}
              data-state={badge.earned ? 'earned' : 'locked'}
              aria-label={`${badge.label}: ${badge.earned ? 'earned' : 'locked'}`}
            >
              {badge.earned ? '★' : '🔒'} {badge.label}
            </span>
          ))}
        </div>
      </section>

      <div><Link className="link-quiet" to="/">Back home</Link></div>
    </div>
  );
}
