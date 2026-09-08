import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { springy } from '../app/motion';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { Character } from '../characters/Character';
import { SUBJECTS, allLessons } from '../content/subjects';
import { effectiveStreak, lessonStars, localDateIso, subjectCompletion } from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';
import { dueConceptCount } from '../review/selection';
import '../review/review.css';

const MotionLink = motion.create(Link);

export function Home() {
  const { save } = useProgress();
  const reduced = useReducedMotionPref();
  const streak = effectiveStreak(save, localDateIso());
  const totalStars = allLessons().reduce((total, lesson) => total + lessonStars(save.lessons[lesson.id]), 0);

  const hover = reduced ? undefined : { scale: 1.04, y: -4 };
  const tap = reduced ? undefined : { scale: 0.97 };

  return (
    <div className="page stack" style={{ gap: '1.5rem' }}>
      <header>
        <h1 className="home-title">Cram All</h1>
        <p className="home-tagline">Pick a world and let&rsquo;s learn something!</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {streak > 0 ? (
          <span
            className="badge"
            data-testid="streak"
            role="img"
            aria-label={`${streak} day streak`}
          >
            <span aria-hidden="true">🔥&nbsp;</span>
            {streak} day streak
          </span>
        ) : (
          <span className="badge" data-testid="streak">
            <span aria-hidden="true">🔥&nbsp;</span>
            Start your streak today!
          </span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span className="badge" aria-label={`${totalStars} total stars`}>⭐ {totalStars} total stars</span>
      </div>

      <nav className="subject-grid" aria-label="Subjects">
        {SUBJECTS.map((subject) => {
          const { passed, total } = subjectCompletion(save, subject);
          const due = dueConceptCount(save, subject, localDateIso());
          const reviewLabel = `${due} ${due === 1 ? 'idea' : 'ideas'} ready to revisit`;
          return (
            <MotionLink
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="card subject-card"
              style={{
                '--accent': subject.color,
                '--accent-action': subject.actionColor,
              } as CSSProperties}
              aria-label={`${subject.title} — ${passed} of ${total} lessons done${passed > 0 ? ` · ${reviewLabel}` : ''}`}
              whileHover={hover}
              whileTap={tap}
              transition={springy}
            >
              <Character guide={subject.guide} pose="idle" size={120} />
              <span className="subject-card-title">{subject.title}</span>
              <span className="subject-card-progress">
                {passed} / {total} lessons
              </span>
              {passed > 0 && <span className="subject-card-review">Keep it growing · {reviewLabel}</span>}
            </MotionLink>
          );
        })}
      </nav>

      <div className="footer-links">
        <Link className="link-quiet" to="/progress">
          My Progress
        </Link>
        <Link className="link-quiet" to="/parent">
          Parent Corner
        </Link>
      </div>
    </div>
  );
}
