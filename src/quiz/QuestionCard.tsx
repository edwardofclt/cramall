import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { Character } from '../characters/Character';
import type { GuideId, Question } from '../content/schema';
import { ReadAloudButton } from '../lesson/ReadAloudButton';
import { speechText } from '../lesson/Rich';
import { gradeAnswer, type Answer } from './engine';

type Submission = { answer: Answer; correct: boolean };
type SubmitFn = (answer: Answer) => void;

export type QuestionCardProps = {
  question: Question;
  /** Guide for this lesson's subject — the face that reacts to the answer. */
  guide: GuideId;
  /** 0-based position in the run. */
  index: number;
  total: number;
  /**
   * Fired once, the moment the answer is locked in. Deliberately does not report
   * correctness: the run keeps the raw answers and `buildResult` grades the lot at the
   * end, so there is exactly one place that decides what counts as right.
   */
  onAnswered: (answer: Answer) => void;
  /** Fired when the kid taps Next after reading the feedback. */
  onNext: () => void;
};

/**
 * One question at a time, Duolingo style: big tap targets, one lock-in, then loud,
 * immediate feedback. The card owns the "has been answered" state, so the parent only
 * has to remount it (a new key per question) to move on.
 */
export function QuestionCard({
  question,
  guide,
  index,
  total,
  onAnswered,
  onNext,
}: QuestionCardProps) {
  const [submitted, setSubmitted] = useState<Submission | null>(null);
  const reduced = useReducedMotionPref();

  const submit: SubmitFn = (answer) => {
    // Belt and braces: every input is disabled after the first answer, but a stray
    // double-fire must never re-grade or double-count the question.
    if (submitted) return;
    setSubmitted({ answer, correct: gradeAnswer(question, answer) });
    onAnswered(answer);
  };

  const tone = submitted ? (submitted.correct ? 'correct' : 'incorrect') : undefined;
  const pose = submitted ? (submitted.correct ? 'cheer' : 'oops') : 'think';
  const isLast = index === total - 1;

  // A miss gives the card a short shake — the "nope, look again" nudge. Reduced motion
  // gets the colour and the words with none of the movement.
  const shaking = submitted !== null && !submitted.correct && !reduced;
  const shake = shaking
    ? { x: [0, -12, 10, -6, 4, 0], transition: { duration: 0.45 } }
    : { x: 0 };

  return (
    <motion.section
      className="card stack quiz-card"
      data-testid="quiz-card"
      data-tone={tone}
      data-shake={shaking ? 'yes' : undefined}
      animate={shake}
    >
      <div className="quiz-prompt-row">
        <Character guide={guide} pose={pose} size={84} />
        <h2 className="quiz-prompt" data-testid="quiz-prompt">
          {question.prompt}
        </h2>
        <ReadAloudButton text={speechText([question.prompt])} />
      </div>

      {(question.type === 'multiple-choice' || question.type === 'true-false') && (
        <ChoiceBody question={question} submitted={submitted} submit={submit} />
      )}
      {question.type === 'fill-blank' && (
        <FillBlankBody question={question} submitted={submitted} submit={submit} />
      )}
      {question.type === 'sort' && (
        <SortBody question={question} submitted={submitted} submit={submit} />
      )}

      {submitted && (
        <div
          className="quiz-feedback"
          data-testid="quiz-feedback"
          data-tone={tone}
          role="status"
        >
          <div className="quiz-feedback-body">
            <p className="quiz-feedback-title">
              {submitted.correct ? 'Nice! ✓' : 'Not quite — here’s the trick:'}
            </p>
            {!submitted.correct && (
              <p className="quiz-feedback-why">{question.explanation}</p>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary quiz-next"
            data-testid="quiz-next"
            // Deliberate: the kid's attention (and a keyboard user's focus) is already
            // here, so Enter carries straight on to the next question.
            autoFocus
            onClick={onNext}
          >
            {isLast ? 'See my score' : 'Next'}
            <span aria-hidden="true">&nbsp;→</span>
          </button>
        </div>
      )}
    </motion.section>
  );
}

type ChoiceQuestion = Extract<Question, { type: 'multiple-choice' | 'true-false' }>;

function ChoiceBody({
  question,
  submitted,
  submit,
}: {
  question: ChoiceQuestion;
  submitted: Submission | null;
  submit: SubmitFn;
}) {
  return (
    <ul className="quiz-choices">
      {question.choices.map((choice) => {
        const chosen = submitted?.answer === choice.id;
        const isRight = choice.id === question.correctChoiceId;
        // After a miss the right answer lights up too — the point is to learn it, not
        // to be left guessing which one it was.
        const state = !submitted
          ? undefined
          : chosen
            ? isRight
              ? 'correct'
              : 'incorrect'
            : isRight
              ? 'reveal'
              : 'muted';

        return (
          <li key={choice.id}>
            <button
              type="button"
              className="btn quiz-choice"
              data-state={state}
              disabled={submitted !== null}
              onClick={() => submit(choice.id)}
            >
              {choice.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function FillBlankBody({
  question,
  submitted,
  submit,
}: {
  question: Extract<Question, { type: 'fill-blank' }>;
  submitted: Submission | null;
  submit: SubmitFn;
}) {
  const [text, setText] = useState('');
  const inputId = useId();
  const locked = submitted !== null;
  const empty = text.trim().length === 0;

  return (
    <form
      className="quiz-fill"
      onSubmit={(event) => {
        // The form is what makes Enter work; without preventDefault jsdom (and a real
        // browser) would try to navigate.
        event.preventDefault();
        if (!locked && !empty) submit(text);
      }}
    >
      <label className="quiz-label" htmlFor={inputId}>
        Your answer
      </label>
      <div className="quiz-fill-row">
        <input
          id={inputId}
          className="quiz-input"
          type="text"
          autoComplete="off"
          value={text}
          disabled={locked}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={locked || empty}>
          Check
        </button>
      </div>
      {submitted && !submitted.correct && (
        <p className="quiz-answer-key">
          The answer we were looking for: <strong>{question.acceptedAnswers[0]}</strong>
        </p>
      )}
    </form>
  );
}

function SortBody({
  question,
  submitted,
  submit,
}: {
  question: Extract<Question, { type: 'sort' }>;
  submitted: Submission | null;
  submit: SubmitFn;
}) {
  const [order, setOrder] = useState<string[]>([]);
  const locked = submitted !== null;
  const complete = order.length === question.items.length;

  return (
    <div className="quiz-sort">
      <p className="quiz-label">Tap them in order</p>
      <ul className="quiz-sort-items">
        {question.items.map((item) => {
          const position = order.indexOf(item.id);
          const picked = position !== -1;
          return (
            <li key={item.id}>
              <button
                type="button"
                className="btn quiz-sort-item"
                data-testid={`sort-item-${item.id}`}
                data-position={picked ? position + 1 : undefined}
                disabled={locked || picked}
                onClick={() => setOrder((current) => [...current, item.id])}
              >
                <span className="quiz-sort-badge" aria-hidden="true">
                  {picked ? position + 1 : ''}
                </span>
                <span>{item.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="quiz-sort-actions">
        <button
          type="button"
          className="quiz-reset"
          disabled={locked || order.length === 0}
          onClick={() => setOrder([])}
        >
          Reset order
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={locked || !complete}
          onClick={() => submit(order)}
        >
          Check
        </button>
      </div>
    </div>
  );
}
