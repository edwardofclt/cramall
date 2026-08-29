import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { WIDGET_TYPES } from '../content/schema';
import { WidgetFrame } from './WidgetFrame';
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
    const registered = Object.keys(widgetRegistry);
    for (const type of WIDGET_TYPES) {
      expect(registered).toContain(type);
    }
  });
});

describe('WidgetFrame', () => {
  test('renders the registered widget for a known type', async () => {
    render(<WidgetFrame type="number-line-compare" config={{}} />);

    expect(await screen.findByTestId('widget-placeholder')).toBeInTheDocument();
  });

  test('shows the napping card when the widget throws', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<WidgetFrame type="place-value-builder" config={{}} />);

    expect(await screen.findByText(/this experiment is napping/i)).toBeInTheDocument();
    expect(errorSpy).toHaveBeenCalled();
  });

  test('shows the napping card for a widget type nobody registered', () => {
    render(<WidgetFrame type="not-a-widget" config={{}} />);

    expect(screen.getByText(/this experiment is napping/i)).toBeInTheDocument();
  });
});
