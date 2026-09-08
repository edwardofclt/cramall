import { useState, type CSSProperties } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Subject } from '../content/schema';
import { SUBJECTS } from '../content/subjects';
import { localDateIso } from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';
import { ReviewSession } from './ReviewSession';
import { selectReview } from './selection';
import './review.css';

function SubjectReview({ subject }: { subject: Subject }) {
  const { save } = useProgress();
  const navigate = useNavigate();
  const [items] = useState(() => selectReview(save, subject, localDateIso()));
  return <div className="page stack" style={{ '--accent': subject.color, '--accent-action': subject.actionColor } as CSSProperties}>
    <Link className="link-quiet" to={`/subject/${subject.id}`}>← Leave practice</Link>
    <header className="stack review-header"><span className="unit-chip">{subject.title}</span>
      <h1>Keep it growing</h1><p>A little practice with ideas you have learned before.</p>
    </header>
    {items.length > 0 ? <ReviewSession items={items} guide={subject.guide} title="Mix earlier ideas"
      doneLabel={`Back to ${subject.title}`} onDone={() => navigate(`/subject/${subject.id}`)} />
      : <section className="card stack review-complete">
        <h2>Nothing due today</h2>
        <p>After you pass a lesson, its ideas can return here for practice on a later day.</p>
        <Link className="btn btn-primary" to={`/subject/${subject.id}`}>Back to {subject.title}</Link>
      </section>}
  </div>;
}

export function ReviewScreen() {
  const { subjectId } = useParams();
  const { reviewEpoch } = useProgress();
  const subject = SUBJECTS.find((candidate) => candidate.id === subjectId);
  if (!subject) return <Navigate to="/" replace />;
  return <SubjectReview key={`${subject.id}:${reviewEpoch}`} subject={subject} />;
}
