import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import type { LearnCard as LearnCardData } from '../content/schema';
import { LearnCard } from './LearnCard';

const card: LearnCardData = {
  id: 'math-u01-l01-c1',
  title: 'Compare numbers',
  blocks: [{ kind: 'text', text: 'Compare the leftmost place first.' }],
  check: {
    prompt: 'Which number is greater?',
    choices: [{ id: 'ten', text: '10' }, { id: 'nine', text: '9' }],
    correctChoiceId: 'ten',
    explanation: 'Ten is one more than nine.',
  },
};

function renderCard() {
  return render(
    <LearnCard
      card={card}
      onWidgetEvent={vi.fn()}
      onDialogueAnnouncement={vi.fn()}
    />,
  );
}

test('renders an unscored check after teaching content and gives retryable feedback', async () => {
  const user = userEvent.setup();
  renderCard();

  const check = screen.getByRole('group', { name: /check your thinking/i });
  expect(check).toHaveTextContent('Which number is greater?');
  expect(screen.getByText('Compare the leftmost place first.').compareDocumentPosition(check))
    .toBe(Node.DOCUMENT_POSITION_FOLLOWING);

  await user.click(screen.getByRole('button', { name: '9' }));
  expect(screen.getByRole('status')).toHaveTextContent(/not quite.*try another answer/i);
  expect(screen.getByRole('button', { name: '10' })).toBeEnabled();

  await user.click(screen.getByRole('button', { name: '10' }));
  expect(screen.getByRole('status')).toHaveTextContent(/nice thinking.*ten is one more than nine/i);
});

test('works with keyboard selection and has no UI when a card has no check', async () => {
  const user = userEvent.setup();
  const { rerender } = renderCard();

  await user.tab();
  await user.keyboard('{Enter}');
  expect(screen.getByRole('status')).toHaveTextContent(/nice thinking/i);

  rerender(
    <LearnCard
      card={{ ...card, check: undefined }}
      onWidgetEvent={vi.fn()}
      onDialogueAnnouncement={vi.fn()}
    />,
  );
  expect(screen.queryByRole('group', { name: /check your thinking/i })).toBeNull();
});

test('marks only the selected answer as incorrect while a learner retries', async () => {
  const user = userEvent.setup();
  render(
    <LearnCard
      card={{
        ...card,
        check: {
          ...card.check!,
          choices: [
            { id: 'ten', text: '10' },
            { id: 'nine', text: '9' },
            { id: 'eight', text: '8' },
          ],
        },
      }}
      onWidgetEvent={vi.fn()}
      onDialogueAnnouncement={vi.fn()}
    />,
  );

  await user.click(screen.getByRole('button', { name: '9' }));

  expect(screen.getByRole('button', { name: '9' })).toHaveAttribute('data-state', 'incorrect');
  expect(screen.getByRole('button', { name: '9' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: '8' })).not.toHaveAttribute('data-state');
});
