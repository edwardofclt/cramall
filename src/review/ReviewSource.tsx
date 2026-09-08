import { useId } from 'react';
import type { QuizReference } from '../content/schema';
import { ReadAloudButton } from '../lesson/ReadAloudButton';
import { speechText } from '../lesson/Rich';

/** The source belongs to the current question and stays open throughout feedback. */
export function ReviewSource({ source }: { source: QuizReference }) {
  const titleId = useId();
  return (
    <section className="card stack review-source" role="region" aria-label={`Source: ${source.title}`} tabIndex={0}>
      <header className="review-source-header">
        <div><span className="review-eyebrow">Read the source</span><h3 id={titleId}>{source.title}</h3></div>
        <ReadAloudButton text={speechText([source.title, source.text])} />
      </header>
      <div className="review-source-text">{source.text}</div>
    </section>
  );
}
