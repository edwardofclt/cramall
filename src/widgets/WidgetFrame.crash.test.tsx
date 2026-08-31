import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { WidgetFrame } from './WidgetFrame';

vi.mock('./math/PlaceValueBuilder', () => ({
  default: function ThrowingPilot() {
    throw new Error('widget exploded');
  },
}));

test('keeps the crash fallback and resets the boundary by type', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const view = render(<WidgetFrame type="place-value-builder" config={{}} onEvent={() => {}} />);

  expect(await screen.findByTestId('widget-napping')).toHaveTextContent(/experiment is napping/i);

  view.rerender(
    <WidgetFrame
      type="number-line-compare"
      config={{ min: 0, max: 1, a: 0, b: 1 }}
      onEvent={() => {}}
    />,
  );

  expect(await screen.findByTestId('widget-number-line-compare')).toBeInTheDocument();
  expect(screen.queryByTestId('widget-napping')).toBeNull();
});
