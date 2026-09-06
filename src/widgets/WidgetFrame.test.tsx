import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { WIDGET_TYPES } from '../content/schema';
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
