import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test, vi} from 'vitest';
import {HazardSolutionDesignerWidgetConfigSchema} from '../../content/schema';
import HazardSolutionDesigner from './HazardSolutionDesigner';

const config = {
  hazard: 'Flood',
  solutions: [
    {id: 'wall', label: 'Seawall', effectiveness: 'good' as const},
    {id: 'leave', label: 'Evacuate', effectiveness: 'good' as const},
    {id: 'sandbags', label: 'Sandbags', effectiveness: 'partial' as const},
    {id: 'ignore', label: 'Ignore warning', effectiveness: 'poor' as const},
  ],
  requiredIds: ['wall', 'leave'],
};

const reasonedConfig = {
  hazard: 'Flood',
  solutions: [
    {id: 'channel', label: 'Floodwater channel', effectiveness: 'good' as const, strengths: ['redirects some water'], impacts: ['water near homes'], limits: ['needs land and maintenance']},
    {id: 'warning', label: 'Flood warning', effectiveness: 'good' as const, strengths: ['provides preparation time'], impacts: ['limited preparation time'], limits: ['does not stop water']},
    {id: 'block', label: 'Block every drain', effectiveness: 'poor' as const, strengths: ['adds no useful protection'], impacts: ['no impact reduced'], limits: ['can trap water']},
  ],
  requiredIds: ['channel', 'warning'],
  requiredImpactIds: ['water near homes', 'limited preparation time'],
};

test('rejects whitespace, ambiguous labels, duplicate solution IDs, and poor required solutions', () => {
  const invalids = [
    {...config, hazard: '   '},
    {...config, solutions: [{...config.solutions[0]!, id: ' '}, ...config.solutions.slice(1)]},
    {...config, solutions: [{...config.solutions[0]!, label: 'Plan'}, {...config.solutions[1]!, label: ' Plan '}, ...config.solutions.slice(2)]},
    {...config, solutions: [{...config.solutions[0]!}, {...config.solutions[1]!, id: 'wall'}, ...config.solutions.slice(2)]},
    {...config, requiredIds: ['wall', 'wall']},
    {...config, requiredIds: ['ignore']},
  ];

  for (const invalid of invalids) expect(HazardSolutionDesignerWidgetConfigSchema.safeParse(invalid).success).toBe(false);
  expect(HazardSolutionDesignerWidgetConfigSchema.safeParse({...config, requiredIds: ['wall', 'sandbags']}).success).toBe(true);
});

test('shows distinct selected design cards and honest model-and-safety framing', async () => {
  const user = userEvent.setup();
  render(<HazardSolutionDesigner config={config} onEvent={vi.fn()} />);

  expect(screen.getByText(/simplified authored mitigation-planning model/i)).toHaveTextContent(/not emergency advice.*does not promise safety/i);
  const seawall = screen.getByRole('button', {name: 'Toggle Seawall'});
  expect(seawall).toHaveAttribute('aria-pressed', 'false');
  expect(seawall).toHaveTextContent('Seawall');
  await user.click(seawall);
  expect(seawall).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText('Selected')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/selection changed/i);
});

test('keeps the configured hazard visible through selection, feedback, and completion', async () => {
  const user = userEvent.setup();
  render(<HazardSolutionDesigner config={config} onEvent={vi.fn()} />);

  const hazardContext = () => screen.getByTestId('hazard-context');
  expect(hazardContext()).toHaveTextContent('Flood');
  await user.click(screen.getByRole('button', {name: 'Toggle Seawall'}));
  expect(hazardContext()).toHaveTextContent('Flood');
  await user.click(screen.getByRole('button', {name: 'Check solution'}));
  expect(hazardContext()).toHaveTextContent('Flood');
  await user.click(screen.getByRole('button', {name: 'Toggle Evacuate'}));
  await user.click(screen.getByRole('button', {name: 'Check solution'}));
  expect(hazardContext()).toHaveTextContent('Flood');
});

test('gives correctable poor, missing, and unnecessary-extra feedback without completing', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<HazardSolutionDesigner config={config} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', {name: 'Toggle Seawall'}));
  await user.click(screen.getByRole('button', {name: 'Toggle Sandbags'}));
  await user.click(screen.getByRole('button', {name: 'Toggle Ignore warning'}));
  await user.click(screen.getByRole('button', {name: 'Check solution'}));
  expect(screen.getByRole('status')).toHaveTextContent(/ignore warning.*poor.*remove.*evacuate.*missing.*sandbags.*partial.*not needed/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
});

test('completes only the exact authored set once, then returns to designing when revised or reset', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<HazardSolutionDesigner config={config} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', {name: 'Toggle Seawall'}));
  await user.click(screen.getByRole('button', {name: 'Toggle Evacuate'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', {name: 'Check solution'}));
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    {type: 'interaction', action: 'check'},
    {type: 'change', value: {selectedIds: ['wall', 'leave']}},
    {type: 'complete', value: {selectedIds: ['wall', 'leave']}},
  ]);
  expect(screen.getByTestId('widget-hazard-solution-designer')).toHaveAttribute('data-state', 'complete');

  await user.click(screen.getByRole('button', {name: 'Toggle Sandbags'}));
  expect(screen.getByTestId('widget-hazard-solution-designer')).toHaveAttribute('data-state', 'designing');
  await user.click(screen.getByRole('button', {name: 'Toggle Sandbags'}));
  await user.click(screen.getByRole('button', {name: 'Check solution'}));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);

  await user.click(screen.getByRole('button', {name: 'Start over'}));
  expect(screen.getByRole('status')).toHaveTextContent('Choose protections for Flood.');
  expect(screen.getByTestId('widget-hazard-solution-designer')).toHaveAttribute('data-state', 'designing');
});

test('resets selections and check feedback when the authored configuration changes', async () => {
  const user = userEvent.setup();
  const {rerender} = render(<HazardSolutionDesigner config={config} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', {name: 'Toggle Seawall'}));
  await user.click(screen.getByRole('button', {name: 'Check solution'}));
  expect(screen.getByRole('status')).toHaveTextContent(/missing/i);

  rerender(<HazardSolutionDesigner config={{...config, hazard: 'Wildfire'}} onEvent={vi.fn()} />);
  expect(screen.getByRole('status')).toHaveTextContent('Choose protections for Wildfire.');
  expect(screen.getByRole('button', {name: 'Toggle Seawall'})).toHaveAttribute('aria-pressed', 'false');
});

test('shows every hazard tradeoff and completes a reasoned impact plan without exact-set grading', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<HazardSolutionDesigner config={reasonedConfig} onEvent={onEvent} />);

  expect(screen.getByText('redirects some water')).toBeInTheDocument();
  expect(screen.queryByText('water near homes')).not.toBeInTheDocument();
  expect(screen.getByText('needs land and maintenance')).toBeInTheDocument();
  expect(screen.getByText('can trap water')).toBeInTheDocument();

  await user.click(screen.getByRole('button', {name: 'Toggle Floodwater channel'}));
  await user.click(screen.getByRole('button', {name: 'Connect water near homes to Floodwater channel'}));
  await user.click(screen.getByRole('button', {name: 'Toggle Flood warning'}));
  await user.click(screen.getByRole('button', {name: 'Connect limited preparation time to Flood warning'}));
  await user.click(screen.getByRole('button', {name: 'Check solution'}));

  expect(screen.getByRole('status')).toHaveTextContent(/risk is reduced, not eliminated/i);
  expect(screen.getByTestId('widget-hazard-solution-designer')).toHaveAttribute('data-state', 'complete');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('keeps a poor hazard choice from completing even when its visible impact is selected', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<HazardSolutionDesigner config={reasonedConfig} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', {name: 'Toggle Block every drain'}));
  await user.click(screen.getByRole('button', {name: 'Connect no impact reduced to Block every drain'}));
  await user.click(screen.getByRole('button', {name: 'Check solution'}));
  expect(screen.getByRole('status')).toHaveTextContent(/does not reduce.*risk can be reduced/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
});
