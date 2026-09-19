import { Link } from 'react-router-dom';
import type { Subject } from '../content/schema';
import { localDateIso } from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';
import { dueConceptCount } from './selection';
import './review.css';

export function ReviewInvitation({ subject }: { subject: Subject }) {
  const { save } = useProgress();
  const due = dueConceptCount(save, subject, localDateIso());
  return <section className="card stack review-invitation" role="region" aria-label="Keep it growing">
    <h2>Keep it growing</h2>
    <p>{due > 0 ? `${due} ${due === 1 ? 'idea is' : 'ideas are'} ready to revisit.` : 'No ideas are due today. Come back after a lesson has had time to settle.'}</p>
    <p>Try up to three questions from earlier lessons to practice remembering.</p>
    <Link className="btn btn-primary" to={`/subject/${subject.id}/review`}>Review earlier ideas</Link>
  </section>;
}
