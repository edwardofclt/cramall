import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { ProbabilitySpinnerWidgetConfigSchema } from '../../content/schema';
import ProbabilitySpinner, { spin, weightedGeometry } from './ProbabilitySpinner';

const motionPreference = { reduced: false };

vi.mock('../../app/useReducedMotionPref', () => ({
  useReducedMotionPref: () => motionPreference.reduced,
}));

afterEach(() => {
  motionPreference.reduced = false;
  vi.restoreAllMocks();
});

describe('ProbabilitySpinner', () => {
  test('rotates the selected weighted segment midpoint to the fixed top pointer and resets to zero', async () => {
    expect(weightedGeometry([{ id: 'a', weight: 1 }, { id: 'b', weight: 3 }], 'b')).toMatchObject({
      selectedMidpoint: 135,
      finalRotation: 135,
    });
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const user = userEvent.setup();
    render(<ProbabilitySpinner config={{ segments: [{ id: 'a', label: 'A', weight: 1 }, { id: 'b', label: 'B', weight: 3 }] }} onEvent={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Spin' }));
    expect(screen.getByTestId('spinner-rotating-group')).toHaveAttribute('data-final-rotation', '135');
    expect(screen.getByTestId('spinner-rotating-group')).toHaveStyle({ transform: 'rotate(855deg)' });
    expect(screen.getByTestId('spinner-pointer').parentElement).not.toBe(screen.getByTestId('spinner-rotating-group'));
    await user.click(screen.getByRole('button', { name: 'Start over' }));
    expect(screen.getByTestId('spinner-rotating-group')).toHaveAttribute('data-final-rotation', '0');
  });

  test('spins only on click and emits deterministic cumulative result', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const onEvent = vi.fn();
    const user = userEvent.setup();
    render(
      <ProbabilitySpinner
        config={{
          segments: [{ id: 'a', label: 'A', weight: 1 }, { id: 'b', label: 'B', weight: 3 }],
          trials: 1,
          targetOutcomeId: 'b',
        }}
        onEvent={onEvent}
      />,
    );

    expect(onEvent).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Spin' }));

    expect(screen.getByRole('status')).toHaveTextContent('B');
    expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
      { type: 'interaction', action: 'spin' },
      { type: 'change', value: { outcomeId: 'b', counts: { a: 0, b: 1 } } },
      { type: 'complete', value: { outcomeId: 'b', counts: { a: 0, b: 1 } } },
    ]);

    await user.click(screen.getByRole('button', { name: 'Spin' }));
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  });

  test('weighted helper accepts injected rng', () => {
    expect(spin([{ id: 'a', weight: 1 }, { id: 'b', weight: 3 }], () => 0.9)).toBe('b');
  });

  test('rejects an empty segment list and nonpositive weights', () => {
    expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({ segments: [] }).success).toBe(false);
    expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({
      segments: [{ id: 'a', label: 'A', weight: 0 }, { id: 'b', label: 'B', weight: 1 }],
    }).success).toBe(false);
  });

  test('rejects overflowing aggregate weights while preserving a finite boundary total', () => {
    expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({
      segments: [
        { id: 'a', label: 'A', weight: Number.MAX_VALUE },
        { id: 'b', label: 'B', weight: Number.MAX_VALUE },
      ],
    }).success).toBe(false);
    expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({
      segments: [
        { id: 'a', label: 'A', weight: Number.MAX_VALUE / 2 },
        { id: 'b', label: 'B', weight: Number.MAX_VALUE / 2 },
      ],
    }).success).toBe(true);
  });

  test('renders weighted, labelled segment areas and a frequency table', () => {
    render(
      <ProbabilitySpinner
        config={{ segments: [{ id: 'a', label: 'A', weight: 1 }, { id: 'b', label: 'B', weight: 3 }] }}
        onEvent={vi.fn()}
      />,
    );

    expect(screen.getByTestId('spinner-wheel')).toHaveAttribute(
      'aria-label',
      'Spinner model: A has 1 of 4 equal parts; B has 3 of 4 equal parts.',
    );
    expect(screen.getAllByTestId('spinner-segment')).toHaveLength(2);
    expect(screen.getByText('A — 1 part')).toBeInTheDocument();
    expect(screen.getByText('B — 3 parts')).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Cumulative spin frequencies' })).toBeInTheDocument();
  });

  test('suppresses rotation under reduced motion while keeping outcome immediate', async () => {
    motionPreference.reduced = true;
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const user = userEvent.setup();
    render(
      <ProbabilitySpinner
        config={{ segments: [{ id: 'a', label: 'A', weight: 1 }, { id: 'b', label: 'B', weight: 3 }] }}
        onEvent={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Spin' }));

    expect(screen.getByTestId('widget-probability-spinner')).toHaveAttribute('data-motion', 'off');
    expect(screen.getByTestId('spinner-wheel')).toHaveAttribute('data-spinning', 'false');
    expect(screen.getByTestId('spinner-rotating-group')).toHaveAttribute('data-final-rotation', '135');
    expect(screen.getByTestId('spinner-rotating-group')).toHaveStyle({ transform: 'rotate(135deg)' });
    expect(screen.getByRole('status')).toHaveTextContent('B');
  });
});
