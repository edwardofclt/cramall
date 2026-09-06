import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test, vi} from 'vitest';
import {ResourceSorterWidgetConfigSchema} from '../../content/schema';
import ResourceSorter from './ResourceSorter';

const config = {
  items: [
    {id: 'sun', label: 'Sunlight', kind: 'renewable' as const},
    {id: 'coal', label: 'Coal', kind: 'nonrenewable' as const},
    {id: 'lights', label: 'Use less electricity', kind: 'conserve' as const},
  ],
  bins: ['renewable', 'nonrenewable', 'conserve'] as ('renewable' | 'nonrenewable' | 'conserve')[],
};

const reasonedConfig = {
  items: [
    {id: 'sun', label: 'Sunlight', kind: 'renewable' as const, lessonCategory: 'replenished resource'},
    {id: 'coal', label: 'Coal', kind: 'nonrenewable' as const, lessonCategory: 'limited fuel'},
  ],
  bins: ['renewable', 'nonrenewable'] as ('renewable' | 'nonrenewable')[],
  lessonCategory: 'resource origin and replenishment',
  effectChoices: [
    {id: 'replenished', text: 'Replenished through natural processes'},
    {id: 'limited', text: 'Limited supply can run out'},
  ],
  effectAnswers: {sun: 'replenished', coal: 'limited'},
};

test('rejects blank and visually ambiguous resource IDs or labels while requiring every authored bin', () => {
  const invalids = [
    {...config, items: [{...config.items[0], id: '  '}, ...config.items.slice(1)]},
    {...config, items: [{...config.items[0], label: '  '}, ...config.items.slice(1)]},
    {...config, items: [{...config.items[0], id: 'SUN'}, {...config.items[1], id: ' sun '}, config.items[2]]},
    {...config, items: [{...config.items[0], label: 'Solar power'}, {...config.items[1], label: ' solar   power '}, config.items[2]]},
    {...config, bins: ['renewable', 'nonrenewable']},
  ];

  for (const invalid of invalids) expect(ResourceSorterWidgetConfigSchema.safeParse(invalid).success).toBe(false);
  expect(ResourceSorterWidgetConfigSchema.safeParse(config).success).toBe(true);
});

test('uses accurate resource and conservation bin language with an honest authored-category model note', () => {
  render(<ResourceSorter config={config} onEvent={vi.fn()} />);

  expect(screen.getByRole('button', {name: 'Place selected item in Renewable resource'})).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'Place selected item in Nonrenewable resource'})).toBeInTheDocument();
  expect(screen.getByRole('button', {name: 'Place selected item in Conservation action'})).toBeInTheDocument();
  expect(screen.getByText('Use less electricity')).toBeInTheDocument();
  expect(screen.getByText(/authored categories for this activity/i)).toHaveTextContent(/does not examine resources or measure environmental effects/i);
});

test('keeps a wrong placement visible and revisable with bounded feedback', async () => {
  const user = userEvent.setup();
  render(<ResourceSorter config={config} onEvent={vi.fn()} />);

  const sunlight = screen.getByRole('button', {name: 'Select Sunlight'});
  await user.click(sunlight);
  expect(sunlight).toHaveAttribute('aria-pressed', 'true');
  await user.click(screen.getByRole('button', {name: 'Place selected item in Nonrenewable resource'}));
  expect(screen.getByTestId('resource-placement-sun')).toHaveTextContent('Nonrenewable resource');
  expect(screen.getByRole('status')).toHaveTextContent('Sunlight is currently in Nonrenewable resource. Revision needed.');
  expect(screen.getByRole('status')).not.toHaveTextContent(/Coal|Use less electricity/);

  await user.click(sunlight);
  await user.click(screen.getByRole('button', {name: 'Place selected item in Renewable resource'}));
  expect(screen.getByTestId('resource-placement-sun')).toHaveTextContent('Renewable resource');
});

test('names the placed item, current bin, and no-revision verdict for a correct non-final placement', async () => {
  const user = userEvent.setup();
  render(<ResourceSorter config={config} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', {name: 'Select Sunlight'}));
  await user.click(screen.getByRole('button', {name: 'Place selected item in Renewable resource'}));

  expect(screen.getByRole('status')).toHaveTextContent('Sunlight is currently in Renewable resource. No revision needed. Keep sorting the remaining items.');
});

test('keeps the placed-item verdict in the final correct placement feedback', async () => {
  const user = userEvent.setup();
  render(<ResourceSorter config={config} onEvent={vi.fn()} />);

  for (const [label, bin] of [
    ['Sunlight', 'Renewable resource'],
    ['Coal', 'Nonrenewable resource'],
    ['Use less electricity', 'Conservation action'],
  ] as const) {
    await user.click(screen.getByRole('button', {name: `Select ${label}`}));
    await user.click(screen.getByRole('button', {name: `Place selected item in ${bin}`}));
  }

  expect(screen.getByRole('status')).toHaveTextContent('Use less electricity is currently in Conservation action. No revision needed. Every item is in its authored category.');
});

test('emits stable config-order placements and completes once while live state returns to sorting after revision or reset', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<ResourceSorter config={config} onEvent={onEvent} />);

  for (const [label, bin] of [
    ['Sunlight', 'Renewable resource'],
    ['Coal', 'Nonrenewable resource'],
    ['Use less electricity', 'Conservation action'],
  ] as const) {
    await user.click(screen.getByRole('button', {name: `Select ${label}`}));
    if (label === 'Use less electricity') onEvent.mockClear();
    await user.click(screen.getByRole('button', {name: `Place selected item in ${bin}`}));
  }

  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    {type: 'interaction', action: 'place-item'},
    {type: 'change', value: {placements: {sun: 'renewable', coal: 'nonrenewable', lights: 'conserve'}}},
    {type: 'complete', value: {placements: {sun: 'renewable', coal: 'nonrenewable', lights: 'conserve'}}},
  ]);
  expect(screen.getByTestId('widget-resource-sorter')).toHaveAttribute('data-state', 'complete');

  await user.click(screen.getByRole('button', {name: 'Select Coal'}));
  await user.click(screen.getByRole('button', {name: 'Place selected item in Renewable resource'}));
  expect(screen.getByTestId('widget-resource-sorter')).toHaveAttribute('data-state', 'sorting');
  await user.click(screen.getByRole('button', {name: 'Select Coal'}));
  await user.click(screen.getByRole('button', {name: 'Place selected item in Nonrenewable resource'}));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);

  await user.click(screen.getByRole('button', {name: 'Start over'}));
  expect(screen.getByTestId('widget-resource-sorter')).toHaveAttribute('data-state', 'sorting');
});

test('clears the selected item and old placements when the configuration changes', async () => {
  const user = userEvent.setup();
  const {rerender} = render(<ResourceSorter config={config} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', {name: 'Select Sunlight'}));
  await user.click(screen.getByRole('button', {name: 'Place selected item in Renewable resource'}));

  rerender(<ResourceSorter config={{items: [{id: 'wind', label: 'Wind', kind: 'renewable'}, {id: 'gas', label: 'Natural gas', kind: 'nonrenewable'}], bins: ['renewable', 'nonrenewable']}} onEvent={vi.fn()} />);
  expect(screen.getByTestId('resource-placement-wind')).toHaveTextContent('Not sorted yet');
  expect(screen.getByRole('button', {name: 'Place selected item in Renewable resource'})).toBeDisabled();
  expect(screen.queryByTestId('resource-placement-sun')).not.toBeInTheDocument();
});

test('requires revisable lesson use/effect connections after category sorting', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<ResourceSorter config={reasonedConfig} onEvent={onEvent} />);

  expect(screen.getByText(/resource origin and replenishment/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', {name: 'Select Sunlight'}));
  await user.click(screen.getByRole('button', {name: 'Place selected item in Renewable resource'}));
  expect(screen.getByRole('button', {name: 'Connect Sunlight to Replenished through natural processes'})).toBeEnabled();
  await user.click(screen.getByRole('button', {name: 'Connect Sunlight to Limited supply can run out'}));
  expect(screen.getByRole('status')).toHaveTextContent(/revisit the lesson fact/i);
  await user.click(screen.getByRole('button', {name: 'Connect Sunlight to Replenished through natural processes'}));
  await user.click(screen.getByRole('button', {name: 'Select Coal'}));
  await user.click(screen.getByRole('button', {name: 'Place selected item in Nonrenewable resource'}));
  await user.click(screen.getByRole('button', {name: 'Connect Coal to Limited supply can run out'}));
  expect(screen.getByTestId('widget-resource-sorter')).toHaveAttribute('data-state', 'complete');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});
