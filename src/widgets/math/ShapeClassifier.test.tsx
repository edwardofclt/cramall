import { render, screen, within } from '@testing-library/react';
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
  test('requires all seven unambiguous triangle diagrams and renders their mathematical evidence', () => {
    const triangleConfig = {
      mode: 'classifications' as const,
      shapes: [
        ['equilateral', 'equilateral-triangle', ['triangle', 'equilateral-triangle', 'acute-triangle', 'equiangular-triangle']],
        ['iso-acute', 'isosceles-acute-triangle', ['triangle', 'isosceles-triangle', 'acute-triangle']],
        ['iso-right', 'isosceles-right-triangle', ['triangle', 'isosceles-triangle', 'right-triangle']],
        ['iso-obtuse', 'isosceles-obtuse-triangle', ['triangle', 'isosceles-triangle', 'obtuse-triangle']],
        ['scalene-acute', 'scalene-acute-triangle', ['triangle', 'scalene-triangle', 'acute-triangle']],
        ['scalene-right', 'scalene-right-triangle', ['triangle', 'scalene-triangle', 'right-triangle']],
        ['scalene-obtuse', 'scalene-obtuse-triangle', ['triangle', 'scalene-triangle', 'obtuse-triangle']],
      ].map(([id, diagram, classifications]) => ({ id, label: String(id), diagram, sides: 3, angles: 3, parallelPairs: 0, classifications })),
      bins: ['triangle', 'equilateral-triangle', 'isosceles-triangle', 'scalene-triangle', 'acute-triangle', 'right-triangle', 'obtuse-triangle', 'equiangular-triangle'].map((classification) => ({ id: classification, label: classification, classification })),
    };
    expect(ShapeClassifierWidgetConfigSchema.safeParse(triangleConfig).success).toBe(true);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({ ...triangleConfig, shapes: [{ ...triangleConfig.shapes[0], classifications: ['triangle', 'equilateral-triangle', 'acute-triangle'] }] }).success).toBe(false);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({ ...triangleConfig, shapes: [{ ...triangleConfig.shapes[1], diagram: 'isosceles-triangle' }] }).success).toBe(false);

    const { container } = render(<ShapeClassifier config={triangleConfig as never} onEvent={vi.fn()} />);
    const points = [...container.querySelectorAll('.shape-canonical-diagram polygon')].map((polygon) => polygon.getAttribute('points'));
    expect(new Set(points).size).toBe(7);
    expect(screen.getByRole('img', { name: /equilateral.*three equal-side marks.*acute.*equiangular/i })).toBeInTheDocument();
    expect(screen.getAllByTitle('Right-angle box')).toHaveLength(2);
    expect(container.querySelector('[data-diagram="scalene-obtuse-triangle"] .shape-equal-mark')).toBeNull();
  });

  test('returns live status to sorting after a correct classification or placement is removed', async () => {
    const onEvent = vi.fn(); const user = userEvent.setup();
    const oneShape = {
      mode: 'classifications' as const,
      shapes: [{ id: 'right', label: 'Right scalene', diagram: 'scalene-right-triangle', sides: 3, angles: 3, parallelPairs: 0, classifications: ['triangle', 'scalene-triangle', 'right-triangle'] }],
      bins: [{ id: 'triangle', label: 'Triangle', classification: 'triangle' }, { id: 'scalene', label: 'Scalene', classification: 'scalene-triangle' }, { id: 'right-angle', label: 'Right', classification: 'right-triangle' }],
    };
    render(<ShapeClassifier config={oneShape as never} onEvent={onEvent} />);
    for (const label of ['Triangle', 'Scalene', 'Right']) { await user.click(screen.getByRole('button', { name: 'Select Right scalene' })); await user.click(screen.getByRole('button', { name: `Place selected shape in ${label}` })); }
    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-state', 'complete');
    await user.click(screen.getByRole('button', { name: 'Select Right scalene' })); await user.click(screen.getByRole('button', { name: 'Place selected shape in Right' }));
    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-state', 'sorting');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  });

  test('returns the legacy branch to sorting after replacement and reset without re-emitting complete', async () => {
    const onEvent = vi.fn(); const user = userEvent.setup();
    render(<ShapeClassifier config={config} onEvent={onEvent} />);
    await user.click(screen.getByRole('button', { name: 'Select Triangle' })); await user.click(screen.getByRole('button', { name: 'Place selected shape in 3 sides' }));
    await user.click(screen.getByRole('button', { name: 'Select Square' })); await user.click(screen.getByRole('button', { name: 'Place selected shape in 4 sides' }));
    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-state', 'complete');
    await user.click(screen.getByRole('button', { name: 'Select Square' })); await user.click(screen.getByRole('button', { name: 'Place selected shape in 3 sides' }));
    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-state', 'sorting');
    await user.click(screen.getByRole('button', { name: 'Start over' }));
    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-state', 'sorting');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  });

  test('supports exact multi-bin triangle classifications and correction without changing legacy placements', async () => {
    const onEvent = vi.fn();
    const user = userEvent.setup();
    const hierarchyConfig = {
      mode: 'classifications' as const,
      shapes: [{
        id: 'iso-right', label: 'Isosceles right triangle', diagram: 'isosceles-right-triangle' as const,
        sides: 3, angles: 3, parallelPairs: 0,
        classifications: ['isosceles-triangle', 'right-triangle', 'triangle'] as Array<'isosceles-triangle' | 'right-triangle' | 'triangle'>,
      }],
      bins: [
        { id: 'triangle', label: 'Triangle', classification: 'triangle' as const },
        { id: 'isosceles', label: 'Isosceles triangle', classification: 'isosceles-triangle' as const, parentIds: ['triangle'] },
        { id: 'right', label: 'Right triangle', classification: 'right-triangle' as const, parentIds: ['triangle'] },
      ],
    };

    expect(ShapeClassifierWidgetConfigSchema.safeParse(hierarchyConfig).success).toBe(true);
    render(<ShapeClassifier config={hierarchyConfig} onEvent={onEvent} />);
    expect(screen.getByRole('img', { name: /Isosceles right triangle.*3 sides.*3 angles/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Select Isosceles right triangle' }));
    await user.click(screen.getByRole('button', { name: 'Place selected shape in Triangle' }));
    await user.click(screen.getByRole('button', { name: 'Select Isosceles right triangle' }));
    await user.click(screen.getByRole('button', { name: 'Place selected shape in Isosceles triangle' }));
    await user.click(screen.getByRole('button', { name: 'Select Isosceles right triangle' }));
    onEvent.mockClear();
    await user.click(screen.getByRole('button', { name: 'Place selected shape in Right triangle' }));

    expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-complete', 'yes');
    expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
      { type: 'interaction', action: 'place-shape' },
      { type: 'change', value: { memberships: { 'iso-right': ['triangle', 'isosceles', 'right'] } } },
      { type: 'complete', value: { memberships: { 'iso-right': ['triangle', 'isosceles', 'right'] } } },
    ]);
  });

  test('models square hierarchy memberships and rejects unsupported, cyclic, duplicate, and inconsistent classifications', () => {
    const square = {
      mode: 'classifications' as const,
      shapes: [{ id: 'square', label: 'Square', diagram: 'square' as const, sides: 4, angles: 4, parallelPairs: 2, classifications: ['quadrilateral', 'parallelogram', 'rectangle', 'rhombus', 'square'] }],
      bins: [
        { id: 'quadrilateral', label: 'Quadrilateral', classification: 'quadrilateral' as const },
        { id: 'parallelogram', label: 'Parallelogram', classification: 'parallelogram' as const, parentIds: ['quadrilateral'] },
        { id: 'rectangle', label: 'Rectangle', classification: 'rectangle' as const, parentIds: ['parallelogram'] },
        { id: 'rhombus', label: 'Rhombus', classification: 'rhombus' as const, parentIds: ['parallelogram'] },
        { id: 'square', label: 'Square', classification: 'square' as const, parentIds: ['rectangle', 'rhombus'] },
      ],
    };
    expect(ShapeClassifierWidgetConfigSchema.safeParse(square).success).toBe(true);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({ ...square, shapes: [{ ...square.shapes[0], classifications: ['triangle'] }] }).success).toBe(false);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({ ...square, bins: [{ ...square.bins[0], parentIds: ['square'] }, ...square.bins.slice(1)] }).success).toBe(false);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({ ...square, bins: [...square.bins, { id: 'square-two', label: 'Another square', classification: 'square' }] }).success).toBe(false);
    expect(ShapeClassifierWidgetConfigSchema.safeParse({ ...square, shapes: [{ ...square.shapes[0], sides: 3 }] }).success).toBe(false);
  });

  test('draws distinct honest quadrilateral geometries and two marked parallel pairs where authored', () => {
    const quadrilateralConfig = {
      mode: 'classifications' as const,
      shapes: [
        { id: 'quad', label: 'Quadrilateral', diagram: 'quadrilateral', sides: 4, angles: 4, parallelPairs: 0, classifications: ['quadrilateral'] },
        { id: 'para', label: 'Parallelogram', diagram: 'parallelogram', sides: 4, angles: 4, parallelPairs: 2, classifications: ['quadrilateral', 'parallelogram'] },
        { id: 'rect', label: 'Rectangle', diagram: 'rectangle', sides: 4, angles: 4, parallelPairs: 2, classifications: ['quadrilateral', 'parallelogram', 'rectangle'] },
        { id: 'rhombus', label: 'Rhombus', diagram: 'rhombus', sides: 4, angles: 4, parallelPairs: 2, classifications: ['quadrilateral', 'parallelogram', 'rhombus'] },
        { id: 'square', label: 'Square', diagram: 'square', sides: 4, angles: 4, parallelPairs: 2, classifications: ['quadrilateral', 'parallelogram', 'rectangle', 'rhombus', 'square'] },
      ],
      bins: ['quadrilateral', 'parallelogram', 'rectangle', 'rhombus', 'square'].map((classification) => ({ id: classification, label: classification, classification })),
    };
    expect(ShapeClassifierWidgetConfigSchema.safeParse(quadrilateralConfig).success).toBe(true);
    const { container } = render(<ShapeClassifier config={quadrilateralConfig as never} onEvent={vi.fn()} />);
    const points = [...container.querySelectorAll('.shape-canonical-diagram polygon')].map((polygon) => polygon.getAttribute('points'));
    expect(new Set(points).size).toBe(5);
    expect(container.querySelector('[data-diagram="quadrilateral"] [data-parallel-pair]')).toBeNull();
    expect(container.querySelectorAll('[data-diagram="square"] [data-parallel-pair]')).toHaveLength(2);
    expect(container.querySelector('[data-diagram="rhombus"] polygon')).toHaveAttribute('points', '50,15 80,50 50,85 20,50');
    expect(container.querySelector('[data-diagram="rhombus"] polygon')).not.toHaveAttribute('points', container.querySelector('[data-diagram="square"] polygon')?.getAttribute('points'));
    expect(container.querySelector('[data-diagram="rhombus"] [data-equal-sides="4"]')).toHaveAttribute('data-edge-anchors', 'AB,BC,CD,DA');
    expect(container.querySelector('[data-diagram="rhombus"] .shape-equal-mark path')).toHaveAttribute('d', 'M62 35.5l6-6 M62 64.5l6 6 M32 64.5l6 6 M32 35.5l6-6');
    expect(container.querySelector('[data-diagram="parallelogram"] [data-parallel-pair="one"]')).toHaveAttribute('data-edge-anchors', 'AB,CD');
    expect(container.querySelector('[data-diagram="parallelogram"] [data-parallel-pair="one"] path')).toHaveAttribute('d', 'M47 25l-4-3m4 3l-4 3 M47 75l-4-3m4 3l-4 3');
    expect(container.querySelector('[data-diagram="rectangle"] [data-parallel-pair="two"]')).toHaveAttribute('data-edge-anchors', 'BC,DA');
    expect(container.querySelector('[data-diagram="rectangle"] .shape-right-mark')).toHaveAttribute('d', 'M23 32h8v-8 M69 24h8v8 M77 68h-8v8 M31 76h-8v-8');
    expect(container.querySelector('[data-diagram="square"] [data-parallel-pair="two"]')).toHaveAttribute('data-edge-anchors', 'BC,DA');
    expect(container.querySelector('[data-diagram="square"] .shape-right-mark')).toHaveAttribute('d', 'M28 36h8v-8 M64 28h8v8 M72 64h-8v8 M36 72h-8v-8');
  });

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

  test('uses a neutral property-count schematic for unusual authored counts', () => {
    const unusualConfig = {
      shapes: [
        { id: 'four-three', label: 'Four-three shape', sides: 4, angles: 3, parallelPairs: 0 },
        { id: 'five-four', label: 'Five-four shape', sides: 5, angles: 4, parallelPairs: 1 },
      ],
      bins: [{ id: 'four', label: '4 sides', value: 4 }, { id: 'five', label: '5 sides', value: 5 }],
      rule: 'sides' as const,
    };
    const { container } = render(<ShapeClassifier config={unusualConfig} onEvent={vi.fn()} />);

    const schematic = screen.getByRole('img', {
      name: 'Four-three shape schematic. 4 sides, 3 angles, 0 pairs of parallel sides. Only these listed properties are represented.',
    });
    expect(within(schematic).getByText('4 sides')).toBeInTheDocument();
    expect(within(schematic).getByText('3 angles')).toBeInTheDocument();
    expect(within(schematic).getByText('0 parallel pairs')).toBeInTheDocument();
    expect(container.querySelectorAll('polygon')).toHaveLength(0);
  });
});
