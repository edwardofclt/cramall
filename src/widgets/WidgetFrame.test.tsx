import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { WidgetCoach } from '../content/schema';
import { WIDGET_TYPES } from '../content/schema';
import { WidgetCoachFrame } from '../lesson/WidgetCoachFrame';
import { WidgetFrame, type WidgetFrameProps } from './WidgetFrame';
import { widgetRegistry, type WidgetEvent, type WidgetEventHandler } from './registry';

afterEach(() => vi.restoreAllMocks());

describe('widgetRegistry', () => {
  test('catalog and lazy registry are identical', () => {
    expect(Object.keys(widgetRegistry).sort()).toEqual([...WIDGET_TYPES].sort());
  });

  test('accepts semantic coaching events for every widget boundary', () => {
    const firstEvent: WidgetEvent<'place-value-builder'> = { type: 'coach', cue: 'retry' };
    const secondEvent: WidgetEvent<'source-credibility-checker'> = {
      type: 'coach',
      cue: 'milestone',
    };
    const firstHandler: WidgetEventHandler<'place-value-builder'> = () => {};
    const secondHandler: WidgetEventHandler<'source-credibility-checker'> = () => {};

    firstHandler(firstEvent);
    secondHandler(secondEvent);
    expect(firstEvent).toEqual({ type: 'coach', cue: 'retry' });
    expect(secondEvent).toEqual({ type: 'coach', cue: 'milestone' });
    expect(firstHandler).toBeTypeOf('function');
    expect(secondHandler).toBeTypeOf('function');

    // @ts-expect-error Coaching cues are intentionally limited to meaningful states.
    const invalidEvent: WidgetEvent<'place-value-builder'> = { type: 'coach', cue: 'idle' };
    expect(invalidEvent).toBeDefined();
  });
});

describe('WidgetFrame', () => {
  test('renders both real pilots', async () => {
    const view = render(
      <WidgetFrame type="place-value-builder" config={{ target: 1 }} onEvent={() => {}} />,
    );
    expect(await screen.findByTestId('widget-place-value-builder')).toBeInTheDocument();

    view.rerender(
      <WidgetFrame
        type="number-line-compare"
        config={{ min: 0, max: 10, a: 2, b: 8 }}
        onEvent={() => {}}
      />,
    );
    expect(await screen.findByTestId('widget-number-line-compare')).toBeInTheDocument();
  });

  test('shows the napping card for an unregistered runtime value', () => {
    const invalid = {
      type: 'not-a-widget',
      config: {},
      onEvent: () => {},
    } as unknown as WidgetFrameProps;
    render(<WidgetFrame {...invalid} />);

    expect(screen.getByTestId('widget-napping')).toHaveTextContent(/experiment is napping/i);
  });

  test('keeps a coached activity usable when a cue has no authored reaction', async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    const coach: WidgetCoach = {
      intro: [
        { speaker: 'guide', text: 'Try the model first.', pose: 'talk' },
        { speaker: 'kid', text: 'I will check the outcome and revise if needed.' },
      ],
      reactions: {
        complete: { text: 'You made a careful classification.', pose: 'cheer' },
      },
    };
    render(
      <WidgetCoachFrame
        type="probability-spinner"
        config={{
          segments: [
            { id: 'red', label: 'Red', weight: 1, color: '#ef4444' },
            { id: 'blue', label: 'Blue', weight: 1, color: '#3b82f6' },
          ],
          trials: 1,
          eventQuestion: { eventLabel: 'red', classification: 'possible' },
          taskPrompt: 'Try one modeled trial, then classify the event.',
        }}
        coach={coach}
        guide="nutty"
        visitKey="missing-reaction"
        onEvent={onEvent}
        onIntroActiveChange={() => {}}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Try it' }));
    const widget = await screen.findByTestId('widget-probability-spinner');

    await user.click(screen.getByRole('button', { name: 'Predict Red' }));
    await user.click(screen.getByRole('button', { name: 'Spin' }));
    await user.click(screen.getByRole('button', { name: 'Certain' }));

    expect(onEvent).toHaveBeenCalledWith({ type: 'coach', cue: 'retry' });
    expect(widget).toBeInTheDocument();
    expect(screen.getByTestId('widget-coach-activity')).not.toHaveAttribute('inert');
    expect(screen.queryByTestId('widget-coach-reaction')).toBeNull();
    expect(screen.getByRole('button', { name: 'Possible' })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: 'Possible' }));
    expect(widget).toHaveAttribute('data-complete', 'yes');
    expect(screen.getByTestId('widget-coach-reaction')).toHaveTextContent(coach.reactions.complete.text);
  });

  test('keeps the lesson Next control available beside the fallback card', async () => {
    const onNext = vi.fn();
    const invalid = {
      type: 'not-a-widget',
      config: {},
      onEvent: () => {},
    } as unknown as WidgetFrameProps;
    render(
      <>
        <WidgetFrame {...invalid} />
        <button type="button" onClick={onNext}>Next lesson step</button>
      </>,
    );

    expect(screen.getByTestId('widget-napping')).toHaveTextContent(/keep going/i);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Next lesson step' }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  test('forwards events to the lesson boundary', async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    render(
      <WidgetFrame
        type="number-line-compare"
        config={{ min: 0, max: 10, a: 2, b: 8 }}
        onEvent={onEvent}
      />,
    );
    await screen.findByTestId('widget-number-line-compare');
    await user.click(screen.getByRole('button', { name: 'less than' }));

    expect(onEvent).toHaveBeenCalledWith({
      type: 'complete',
      value: { a: 2, b: 8, choice: '<' },
    });
  });
});
