import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { GuideId } from '../content/schema';
import { localDateIso } from '../progress/logic';
import { useProgress } from '../progress/ProgressContext';
import { gradeAnswer, type Answer } from '../quiz/engine';
import { QuestionCard } from '../quiz/QuestionCard';
import type { ReviewItem } from './selection';
import { ReviewSource } from './ReviewSource';
import './review.css';

export type ReviewSessionProps = {
  items: readonly ReviewItem[];
  guide: GuideId;
  onDone: () => void;
  title?: string;
  doneLabel?: string;
};

/** A run snapshots its questions once. Provider writes never change the active task. */
export function ReviewSession({
  items,
  guide,
  onDone,
  title = 'Warm up your memory',
  doneLabel = 'Continue to lesson',
}: ReviewSessionProps) {
  const { recordReview, reviewEpoch } = useProgress();
  const [run] = useState(() => ({ items: [...items], epoch: reviewEpoch, record: recordReview }));
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const indexRef = useRef(0);
  const answered = useRef(new Set<number>());
  const continued = useRef(false);
  const mounted = useRef(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const epochRef = useRef(reviewEpoch);
  epochRef.current = reviewEpoch;
  const complete = index === run.items.length;
  const invalidated = run.epoch !== reviewEpoch;

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => { heading.current?.focus(); }, [index, invalidated]);

  function handleAnswered(answer: Answer) {
    if (!mounted.current || epochRef.current !== run.epoch || indexRef.current !== index || answered.current.has(index)) return;
    const item = run.items[index];
    if (!item) return;
    answered.current.add(index);
    const outcome = gradeAnswer(item.question, answer);
    setCorrect(outcome);
    run.record({
      lessonId: item.lesson.id,
      conceptTag: item.question.conceptTag,
      questionId: item.question.id,
      date: localDateIso(),
      correct: outcome,
    });
  }

  function handleNext() {
    if (!mounted.current || epochRef.current !== run.epoch || indexRef.current !== index || !answered.current.has(index)) return;
    indexRef.current = index + 1;
    setIndex(index + 1);
    setCorrect(null);
  }

  function finish() {
    if (!mounted.current || continued.current) return;
    continued.current = true;
    onDone();
  }

  if (invalidated) {
    return <section className="card stack review-complete">
      <h2 ref={heading} tabIndex={-1}>Your progress changed</h2>
      <p>This practice has ended. Continue with your updated progress.</p>
      <button className="btn btn-primary" onClick={finish}>{doneLabel}</button>
    </section>;
  }

  if (complete) {
    return <section className="card stack review-complete">
      <h2 ref={heading} tabIndex={-1}>Memory practice complete</h2>
      <p>You revisited {run.items.length} {run.items.length === 1 ? 'idea' : 'ideas'} from earlier lessons.</p>
      <p>Use the explanations to help you recall these ideas next time.</p>
      <button className="btn btn-primary" onClick={finish}>{doneLabel}</button>
    </section>;
  }

  const item = run.items[index]!;
  const sourceCard = item.lesson.learnCards.find((card) => card.id === item.question.reviewCardId);
  const reviewParams = new URLSearchParams({ step: `card:${item.question.reviewCardId}` });
  return <section className="stack review-session" aria-label={title}>
    <header className="stack review-header">
      <span className="review-eyebrow">Earlier ideas · {index + 1} of {run.items.length}</span>
      <h2 ref={heading} tabIndex={-1}>{title}</h2>
      <p>From <strong>{item.lesson.title}</strong> · {item.reason}</p>
    </header>
    <div className="stack" key={item.question.id}>
      {item.lesson.quiz.reference && <ReviewSource source={item.lesson.quiz.reference} />}
      <QuestionCard question={item.question} guide={guide} index={index} total={run.items.length}
        onAnswered={handleAnswered} onNext={handleNext}
        nextLabel={index === run.items.length - 1 ? 'Finish practice' : 'Next'} />
      {correct === false && <aside className="card review-revisit">
        <p>Want to see the idea again?</p>
        <Link className="btn" to={`/lesson/${item.lesson.id}?${reviewParams}`} target="_blank" rel="noopener noreferrer">
          Revisit {sourceCard?.title ?? item.lesson.title} <span className="review-link-note">(opens in a new tab)</span>
        </Link>
      </aside>}
    </div>
  </section>;
}
