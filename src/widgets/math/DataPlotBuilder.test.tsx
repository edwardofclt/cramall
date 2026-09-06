import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { DataPlotBuilderWidgetConfigSchema } from '../../content/schema';
import DataPlotBuilder from './DataPlotBuilder';

describe('DataPlotBuilder', () => {
  test('buttons build two dots and emit exact completion', async () => {
    const onEvent = vi.fn();
    const user = userEvent.setup();
    render(
      <DataPlotBuilder
        config={{ kind: 'dot', prompt: 'Build', categories: ['A'], target: { A: 2 } }}
        onEvent={onEvent}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Increase A' }));
    onEvent.mockClear();
    await user.click(screen.getByRole('button', { name: 'Increase A' }));

    expect(screen.getAllByTestId('dot-A')).toHaveLength(2);
    expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
      { type: 'interaction', action: 'increase-value' },
      { type: 'change', value: { values: { A: 2 } } },
      { type: 'complete', value: { values: { A: 2 } } },
    ]);

    await user.click(screen.getByRole('button', { name: 'Decrease A' }));
    expect(screen.getByTestId('widget-data-plot-builder')).toHaveAttribute('data-state', 'building');
    expect(screen.getByTestId('widget-data-plot-builder')).toHaveAttribute('data-complete', 'no');
    expect(screen.getByRole('status')).toHaveTextContent('Adjust the plot values.');

    await user.click(screen.getByRole('button', { name: 'Increase A' }));
    expect(screen.getByTestId('widget-data-plot-builder')).toHaveAttribute('data-state', 'complete');
    expect(screen.getByTestId('widget-data-plot-builder')).toHaveAttribute('data-complete', 'yes');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  });

  test('an all-zero target is not complete on mount', () => {
    const onEvent = vi.fn();
    render(
      <DataPlotBuilder
        config={{ kind: 'bar', prompt: 'Build', categories: ['A'], target: { A: 0 } }}
        onEvent={onEvent}
      />,
    );

    expect(screen.getByTestId('widget-data-plot-builder')).toHaveAttribute('data-state', 'building');
    expect(onEvent).not.toHaveBeenCalled();
  });

  test('requires target keys to exactly match unique nonempty categories', () => {
    expect(DataPlotBuilderWidgetConfigSchema.safeParse({
      kind: 'bar', prompt: 'Build', categories: ['A', 'A'], target: { A: 1 },
    }).success).toBe(false);
    expect(DataPlotBuilderWidgetConfigSchema.safeParse({
      kind: 'bar', prompt: 'Build', categories: ['A'], target: { A: 1, B: 2 },
    }).success).toBe(false);
    expect(DataPlotBuilderWidgetConfigSchema.safeParse({
      kind: 'bar', prompt: 'Build', categories: ['A', ' '], target: { A: 1, ' ': 2 },
    }).success).toBe(false);
  });

  test('renders a shared-baseline bar plot with category values and an integer scale', () => {
    render(
      <DataPlotBuilder
        config={{ kind: 'bar', prompt: 'Compare votes', categories: ['Cats', 'Dogs'], target: { Cats: 50, Dogs: 2 } }}
        onEvent={vi.fn()}
      />,
    );

    expect(screen.getByRole('img', {
      name: 'Bar plot with a shared zero baseline and integer scale from 0 to 50. Cats: 0. Dogs: 0.',
    })).toBeInTheDocument();
    expect(screen.getByTestId('data-plot-baseline')).toBeInTheDocument();
    expect(screen.getByTestId('bar-Cats')).toHaveAttribute('data-value', '0');
    expect(screen.getByText('Cats: 0')).toBeInTheDocument();
    expect(screen.getByText('50', { selector: '.data-plot-scale-label' })).toBeInTheDocument();
  });

  test('keeps every category in one explicit, horizontally scrollable plot row', () => {
    render(
      <DataPlotBuilder
        config={{
          kind: 'bar',
          prompt: 'Compare votes',
          categories: ['Cats', 'Dogs', 'Birds', 'Fish'],
          target: { Cats: 1, Dogs: 2, Birds: 3, Fish: 4 },
        }}
        onEvent={vi.fn()}
      />,
    );

    expect(screen.getByTestId('data-plot-columns')).toHaveStyle({ gridTemplateColumns: 'repeat(4, minmax(7rem, 1fr))' });
    expect(screen.getByTestId('data-plot-chart')).toHaveStyle({ gridTemplateColumns: '2.5rem minmax(28rem, 1fr)' });
    expect(screen.getByTestId('data-plot-baseline')).toBeInTheDocument();
  });

  test('shows the goal and every source category/count in a semantic table', async () => {
    const onEvent = vi.fn();
    const user = userEvent.setup();
    render(
      <DataPlotBuilder
        config={{
          kind: 'bar',
          prompt: 'Build a pet graph',
          taskPrompt: 'Build the class pet survey bar graph',
          categories: ['dog', 'cat', 'fish'],
          target: { dog: 8, cat: 6, fish: 4 },
          sourceData: { dog: 8, cat: 6, fish: 4 },
        }}
        onEvent={onEvent}
      />,
    );

    expect(screen.getByTestId('widget-task')).toHaveTextContent('Build the class pet survey bar graph');
    const table = screen.getByTestId('data-plot-source-data');
    expect(table.tagName).toBe('TABLE');
    expect(table).toHaveTextContent('dog8');
    expect(table).toHaveTextContent('cat6');
    expect(table).toHaveTextContent('fish4');

    await user.click(screen.getByRole('button', { name: 'Increase dog' }));
    await user.click(screen.getByRole('button', { name: 'Start over' }));
    expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'milestone' });
    expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'retry' });
  });
});
