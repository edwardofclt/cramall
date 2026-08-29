import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import type { Question } from '../content/schema';
import { QuestionCard, questionSpeechText } from './QuestionCard';

const choiceQuestion: Question = {
  id: 'math-u01-l01-q01',
  type: 'multiple-choice',
  prompt: 'Which number is greater?',
  choices: [{ id: 'a', text: '1,000' }, { id: 'b', text: '999' }],
  correctChoiceId: 'a',
  explanation: 'One thousand is one more than 999.',
  conceptTag: 'compare',
  reviewCardId: 'math-u01-l01-c1',
};

const sortQuestion: Question = {
  id: 'math-u01-l01-q02',
  type: 'sort',
  prompt: 'Order these least to greatest.',
  items: [{ id: 'one', text: 'One' }, { id: 'two', text: 'Two' }],
  correctOrder: ['one', 'two'],
  explanation: 'One comes before two.',
  conceptTag: 'order',
  reviewCardId: 'math-u01-l01-c1',
};

function renderQuestion(question: Question = choiceQuestion) {
  return render(
    <QuestionCard
      question={question}
      guide="nutty"
      index={0}
      total={10}
      onAnswered={vi.fn()}
      onNext={vi.fn()}
    />,
  );
}

afterEach(() => {
  Reflect.deleteProperty(window, 'speechSynthesis');
  Reflect.deleteProperty(window, 'SpeechSynthesisUtterance');
});

test('question entry focuses the card without adding it to normal tab order', async () => {
  renderQuestion();
  await waitFor(() => expect(screen.getByTestId('quiz-card')).toHaveFocus());
  expect(screen.getByTestId('quiz-card')).toHaveAttribute('tabindex', '-1');
});

test('one persistent polite status announces feedback and every answer shows the explanation', async () => {
  const user = userEvent.setup();
  renderQuestion();
  const status = screen.getByTestId('quiz-feedback-status');
  expect(status).toBeEmptyDOMElement();

  await user.click(screen.getByRole('button', { name: '1,000' }));

  expect(screen.getByTestId('quiz-feedback-status')).toBe(status);
  expect(status).toHaveAttribute('aria-live', 'polite');
  expect(status).toHaveTextContent(/correct/i);
  expect(status).toHaveTextContent(choiceQuestion.explanation);
  expect(screen.getByTestId('quiz-feedback')).toHaveTextContent(choiceQuestion.explanation);
});

test('sort choices expose their selected position in the accessible name', async () => {
  const user = userEvent.setup();
  renderQuestion(sortQuestion);

  const one = screen.getByRole('button', { name: /one.*not selected/i });
  await user.click(one);

  expect(screen.getByRole('button', { name: /one.*position 1/i })).toBeDisabled();
});

test('question speech includes the prompt, complete options, and input instructions', () => {
  expect(questionSpeechText(choiceQuestion)).toMatch(/choose one answer/i);
  expect(questionSpeechText(choiceQuestion)).toContain('1,000');
  expect(questionSpeechText(choiceQuestion)).toContain('999');
  expect(questionSpeechText(sortQuestion)).toMatch(/tap.*in order/i);
  expect(questionSpeechText(sortQuestion)).toContain('One');
  expect(questionSpeechText(sortQuestion)).toContain('Two');
  expect(questionSpeechText({
    ...choiceQuestion,
    type: 'fill-blank',
    acceptedAnswers: ['1000'],
  } as Question)).toMatch(/type your answer/i);
});

test('the read-aloud control speaks the complete question text', async () => {
  const speak = vi.fn();
  class FakeUtterance {
    rate = 1;
    onend: (() => void) | null = null;
    onerror: (() => void) | null = null;
    constructor(public text: string) {}
  }
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true,
    value: { speak, cancel: vi.fn() },
  });
  Object.defineProperty(window, 'SpeechSynthesisUtterance', {
    configurable: true,
    value: FakeUtterance,
  });
  const user = userEvent.setup();
  renderQuestion();

  await user.click(screen.getByRole('button', { name: /read aloud/i }));

  const utterance = speak.mock.calls[0]![0] as FakeUtterance;
  expect(utterance.text).toContain('Which number is greater?');
  expect(utterance.text).toContain('1,000');
  expect(utterance.text).toContain('999');
});
