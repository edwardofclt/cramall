import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { WidgetCoach } from '../content/schema';
import { WidgetCoachFrame } from './WidgetCoachFrame';
import type { WidgetEvent } from '../widgets/registry';

vi.mock('../widgets/WidgetFrame', () => ({
  WidgetFrame: ({ onEvent }: { onEvent: (event: WidgetEvent) => void }) => (
    <div data-testid="widget-place-value-builder">
      <button type="button" onClick={() => onEvent({ type: 'coach', cue: 'strategy' })}>Emit strategy</button>
      <button type="button" onClick={() => onEvent({ type: 'coach', cue: 'retry' })}>Emit retry</button>
      <button type="button" onClick={() => onEvent({ type: 'coach', cue: 'milestone' })}>Emit milestone</button>
      <button type="button" onClick={() => onEvent({ type: 'complete', value: 2 })}>Emit complete</button>
      <button type="button" onClick={() => onEvent({ type: 'change', value: 1 })}>Emit ordinary event</button>
    </div>
  ),
}));

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
    expect(screen.getByTestId('widget-coach-activity')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('widget-coach-activity').querySelector('button')).toBeInTheDocument();
    expect(screen.getByTestId('character-nutty')).toBeInTheDocument();
    const introLive = screen.getByTestId('widget-coach-intro-live');
    expect(introLive).toHaveAttribute('aria-live', 'polite');
    expect(introLive).toHaveTextContent(coach.intro[0]!.text);
    expect(introLive.querySelector('button')).toBeNull();
    expect(introLive.querySelector('svg')).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(coach.intro[1]!.text)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Try it' })).toBeVisible();
    expect(introLive).toHaveTextContent(coach.intro[1]!.text);

    const tryIt = screen.getByRole('button', { name: 'Try it' });
    tryIt.focus();
    await user.click(screen.getByRole('button', { name: 'Try it' }));
    expect(screen.getByTestId('widget-coach-activity')).not.toHaveAttribute('inert');
    expect(document.activeElement).toBe(tryIt);
    await waitFor(() => expect(onIntroActiveChange).toHaveBeenLastCalledWith(true));
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Emit strategy' }));
  });

  test('forwards widget events and announces each coach cue once, replacing the message', async () => {
    const user = userEvent.setup();
    const { onEvent } = renderCoach();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Try it' }));
    await screen.findByTestId('widget-place-value-builder');

    await user.click(screen.getByRole('button', { name: 'Emit ordinary event' }));
    expect(onEvent).toHaveBeenCalledWith({ type: 'change', value: 1 });
    await user.click(screen.getByRole('button', { name: 'Emit strategy' }));
    expect(screen.getByText(coach.reactions.strategy!.text)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Emit strategy' }));
    expect(screen.getAllByText(coach.reactions.strategy!.text)).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: 'Emit retry' }));
    expect(screen.getByText(coach.reactions.retry!.text)).toBeVisible();
    expect(screen.queryByText(coach.reactions.strategy!.text)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Emit milestone' }));
    expect(screen.getByText(coach.reactions.milestone!.text)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Emit complete' }));
    await user.click(screen.getByRole('button', { name: 'Emit complete' }));
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText(coach.reactions.complete.text)).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(coach.reactions.complete.text);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeEnabled();
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
