import { useId, useState } from 'react';
import type { InlineCheck as InlineCheckData } from '../content/schema';

type Feedback = { correct: boolean; choiceId: string };

/**
 * A teaching-card check is deliberately practice, not assessment. It never reaches the
 * progress store: a miss stays revisable so the learner can use the card material to try
 * again before the scored Quick Check.
 */
export function InlineCheck({ check }: { check: InlineCheckData }) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const headingId = useId();
  const statusId = useId();

  function choose(choiceId: string) {
    if (feedback?.correct) return;
    setFeedback({ correct: choiceId === check.correctChoiceId, choiceId });
  }

  const status = feedback
    ? feedback.correct
      ? `Nice thinking! ${check.explanation}`
      : `Not quite. ${check.explanation} Try another answer.`
    : '';

  return (
    <section className="inline-check" role="group" aria-labelledby={headingId}>
      <div className="inline-check-heading">
        <h3 id={headingId}>Check your thinking</h3>
        <span className="inline-check-unscored">Practice only · not scored</span>
      </div>
      <p className="inline-check-prompt">{check.prompt}</p>
      <ul className="inline-check-choices" aria-describedby={statusId}>
        {check.choices.map((choice) => {
          const state = feedback === null
            ? undefined
            : choice.id === check.correctChoiceId
              ? feedback.correct
                ? 'correct'
                : undefined
              : choice.id === feedback.choiceId
                ? 'incorrect'
                : undefined;
          return (
            <li key={choice.id}>
              <button
                type="button"
                className="btn inline-check-choice"
                data-state={state}
                aria-pressed={feedback?.choiceId === choice.id}
                disabled={feedback?.correct === true}
                onClick={() => choose(choice.id)}
              >
                {choice.text}
              </button>
            </li>
          );
        })}
      </ul>
      <p id={statusId} className="inline-check-feedback" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </section>
  );
}
