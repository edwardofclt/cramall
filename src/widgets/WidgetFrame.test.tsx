import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { WIDGET_TYPES } from '../content/schema';
import { WidgetFrame, type WidgetFrameProps } from './WidgetFrame';
import { widgetRegistry } from './registry';

afterEach(() => vi.restoreAllMocks());

describe('widgetRegistry', () => {
  test('covers every widget type the content schema allows', () => {
    expect(Object.keys(widgetRegistry).sort()).toEqual([...WIDGET_TYPES].sort());
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
