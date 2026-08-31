import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { ShapeClassifierWidgetConfigSchema } from '../../content/schema';
import ShapeClassifier from './ShapeClassifier';

const config = {
  shapes: [
    { id: 'triangle', label: 'Triangle', sides: 3, angles: 3, parallelPairs: 0 },
    { id: 'square', label: 'Square', sides: 4, angles: 4, parallelPairs: 2 },
  ],
  bins: [
    { id: 'three', label: '3 sides', value: 3 },
    { id: 'four', label: '4 sides', value: 4 },
  ],
  rule: 'sides' as const,
};

describe('ShapeClassifier', () => {
  test('retains two correct button placements and completes once', async () => {
    const onEvent = vi.fn();
    const user = userEvent.setup();
    render(<ShapeClassifier config={config} onEvent={onEvent} />);

    await user.click(screen.getByRole('button', { name: 'Select Triangle' }));
    await user.click(screen.getByRole('button', { name: 'Place selected shape in 3 sides' }));
    await user.click(screen.getByRole('button', { name: 'Select Square' }));
    onEvent.mockClear();

    await user.click(screen.getByRole('button', { name: 'Place selected shape in 4 sides' }));

    expect(screen.getByTestId('shape-placement-triangle')).toHaveTextContent('three');
    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-complete', 'yes');
    expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
      { type: 'interaction', action: 'place-shape' },
      { type: 'change', value: { placements: { triangle: 'three', square: 'four' } } },
      { type: 'complete', value: { placements: { triangle: 'three', square: 'four' } } },
    ]);
  });

  test('rejects duplicate bin values and an uncovered rule value', () => {
    expect(ShapeClassifierWidgetConfigSchema.safeParse({
      shapes: config.shapes,
      bins: [{ id: 'a', label: 'A', value: 3 }, { id: 'b', label: 'B', value: 3 }],
      rule: 'sides',
    }).success).toBe(false);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({
      shapes: config.shapes,
      bins: [{ id: 'a', label: 'A', value: 3 }, { id: 'b', label: 'B', value: 5 }],
      rule: 'sides',
    }).success).toBe(false);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({
      ...config,
      shapes: [config.shapes[0], { ...config.shapes[1], label: 'Triangle' }],
    }).success).toBe(false);
  });

  test('shows only authored properties and lets a learner replace a placement', async () => {
    const user = userEvent.setup();
    render(<ShapeClassifier config={config} onEvent={vi.fn()} />);

    expect(screen.getByRole('img', {
      name: 'Triangle schematic. 3 sides, 3 angles, 0 pairs of parallel sides. Only these listed properties are represented.',
    })).toBeInTheDocument();
    expect(screen.getByText('sides', { selector: 'strong' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Select Triangle' }));
    await user.click(screen.getByRole('button', { name: 'Place selected shape in 3 sides' }));
    await user.click(screen.getByRole('button', { name: 'Select Triangle' }));
    await user.click(screen.getByRole('button', { name: 'Place selected shape in 4 sides' }));

    expect(screen.getByText('Placed in: 4 sides')).toBeInTheDocument();
    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-state', 'sorting');
  });
});
