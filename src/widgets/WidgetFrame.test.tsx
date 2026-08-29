import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { WIDGET_TYPES } from '../content/schema';
import { WidgetFrame, type WidgetFrameProps } from './WidgetFrame';
import { widgetRegistry } from './registry';

// The registry's lazy import of this module now resolves to a widget that throws on
// render, which is exactly what the frame's error boundary has to survive.
vi.mock('./math/PlaceValueBuilder', () => ({
  default: function BoomWidget() {
    throw new Error('widget exploded');
  },
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('widgetRegistry', () => {
  test('covers every widget type the content schema allows', () => {
    const registered = Object.keys(widgetRegistry).sort();
    expect(registered).toEqual([...WIDGET_TYPES].sort());
  });
});

describe('WidgetFrame', () => {
  test('renders the registered widget for a known type', async () => {
    render(
      <WidgetFrame
        type="number-line-compare"
        config={{ min: 0, max: 100, a: 25, b: 52 }}
        onEvent={() => {}}
      />,
    );

    expect(await screen.findByTestId('widget-number-line-compare')).toBeInTheDocument();
  });

  test('shows the napping card when the widget throws', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<WidgetFrame type="place-value-builder" config={{}} onEvent={() => {}} />);

    expect(await screen.findByText(/this experiment is napping/i)).toBeInTheDocument();
    expect(errorSpy).toHaveBeenCalled();
  });

  test("a crashed widget does not poison the next card's widget", async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { rerender } = render(<WidgetFrame type="place-value-builder" config={{}} onEvent={() => {}} />);
    await screen.findByText(/this experiment is napping/i);

    // Same frame, next card's widget: the failed boundary must not stick around.
    rerender(
      <WidgetFrame
        type="number-line-compare"
        config={{ min: 0, max: 100, a: 25, b: 52 }}
        onEvent={() => {}}
      />,
    );

    expect(await screen.findByTestId('widget-number-line-compare')).toBeInTheDocument();
    expect(screen.queryByText(/this experiment is napping/i)).toBeNull();
  });

  test('shows the napping card for a widget type nobody registered', () => {
    const invalid = {
      type: 'not-a-widget',
      config: {},
      onEvent: () => {},
    } as unknown as WidgetFrameProps;
    render(<WidgetFrame {...invalid} />);

    expect(screen.getByText(/this experiment is napping/i)).toBeInTheDocument();
  });

  test('forwards widget events to the lesson boundary', async () => {
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
