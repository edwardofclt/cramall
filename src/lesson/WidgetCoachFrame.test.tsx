import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { WidgetCoach } from '../content/schema';
import { WidgetCoachFrame } from './WidgetCoachFrame';
import type { WidgetEvent } from '../widgets/registry';

const coach: WidgetCoach = {
  intro: [
    { speaker: 'guide', text: 'A place tells what a digit is worth.', pose: 'talk' },
    { speaker: 'kid', text: 'I will build the number and look for the pattern.' },
  ],
  reactions: {
    strategy: { text: 'Change one place at a time.', pose: 'think' },
    retry: { text: 'Check the model and try a new move.', pose: 'oops' },
    milestone: { text: 'That change gives us a useful clue.', pose: 'talk' },
    complete: { text: 'You used the model to connect place and value!', pose: 'cheer' },
  },
};

afterEach(() => vi.restoreAllMocks());

function renderCoach() {
  const onEvent = vi.fn();
  const onIntroActiveChange = vi.fn();
  const view = render(
    <WidgetCoachFrame
      type="place-value-builder"
      config={{ target: 2 }}
      coach={coach}
      guide="nutty"
      visitKey="card:1@0"
      onEvent={onEvent}
      onIntroActiveChange={onIntroActiveChange}
    />,
  );
  return { ...view, onEvent, onIntroActiveChange };
}

describe('WidgetCoachFrame', () => {
  test('walks through the in-step mini-conversation before enabling the widget', async () => {
    const user = userEvent.setup();
    const { onIntroActiveChange } = renderCoach();

    expect(screen.getByText(coach.intro[0]!.text)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Next' })).toBeVisible();
    expect(screen.getByTestId('widget-coach-activity')).toHaveAttribute('inert');
    expect(screen.getByTestId('character-nutty')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(coach.intro[1]!.text)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Try it' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Try it' }));
    expect(screen.getByTestId('widget-coach-activity')).not.toHaveAttribute('inert');
    await waitFor(() => expect(onIntroActiveChange).toHaveBeenLastCalledWith(true));
  });

  test('forwards widget events and announces each coach cue once, then completion', async () => {
    const user = userEvent.setup();
    const { onEvent } = renderCoach();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Try it' }));
    await screen.findByTestId('widget-place-value-builder');

    const addOnes = screen.getByRole('button', { name: 'Add one to the ones place' });
    await user.click(addOnes);
    expect(onEvent).toHaveBeenCalledWith({ type: 'interaction', action: 'change-place' });
    await user.click(addOnes);

    // The real widget emits completion for the configured target. Completion is presented as
    // a polite, dismissible lesson connection rather than a competing lesson-forward action.
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText(coach.reactions.complete.text)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText(coach.reactions.complete.text)).not.toBeInTheDocument();
  });

  test('resets the conversation when the visit key changes', async () => {
    const user = userEvent.setup();
    const { rerender, onIntroActiveChange } = renderCoach();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Try it' }));
    expect(screen.getByTestId('widget-coach-activity')).not.toHaveAttribute('inert');

    rerender(
      <WidgetCoachFrame
        type="place-value-builder"
        config={{ target: 2 }}
        coach={coach}
        guide="nutty"
        visitKey="card:1@1"
        onEvent={vi.fn()}
        onIntroActiveChange={onIntroActiveChange}
      />,
    );
    expect(screen.getByText(coach.intro[0]!.text)).toBeVisible();
    expect(screen.getByTestId('widget-coach-activity')).toHaveAttribute('inert');
    await waitFor(() => expect(onIntroActiveChange).toHaveBeenLastCalledWith(false));
  });

  test('keeps ordinary widget events unchanged at the boundary type', () => {
    const event: WidgetEvent<'place-value-builder'> = {
      type: 'change',
      value: 2,
    };
    expect(event).toEqual({ type: 'change', value: 2 });
  });
});
