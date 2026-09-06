import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { RockLayerExplorerWidgetConfigSchema } from '../../content/schema';
import RockLayerExplorer from './RockLayerExplorer';

const layers = [
  { id: 'top', label: 'Top sandstone', age: 1, artifact: 'Leaf print' },
  { id: 'middle', label: 'Middle shale', age: 2 },
  { id: 'bottom', label: 'Bottom limestone', age: 3, artifact: 'Shell fossil' },
];

test('renders the authored vertical stack order with ranks, artifacts, and the relative-age convention', () => {
  render(<RockLayerExplorer config={{ layers: [layers[2]!, layers[0]!, layers[1]!] }} onEvent={vi.fn()} />);

  expect(screen.getByTestId('rock-layer-stack')).toHaveAttribute('data-order', 'authored');
  expect(screen.getByTestId('rock-layer-stack').querySelectorAll('[data-layer-id]')).toHaveLength(3);
  expect([...screen.getByTestId('rock-layer-stack').querySelectorAll('[data-layer-id]')].map((layer) => layer.getAttribute('data-layer-id'))).toEqual(['bottom', 'top', 'middle']);
  expect(screen.getByTestId('rock-layer-bottom')).toHaveTextContent(/Bottom limestone.*Relative-age rank: 3.*Artifact: Shell fossil/i);
  expect(screen.getByTestId('rock-layer-top')).toHaveTextContent(/Top sandstone.*Relative-age rank: 1.*Artifact: Leaf print/i);
  expect(document.getElementById('rock-layer-convention')).toHaveTextContent(/larger relative-age ranks are relatively older in this model/i);
  expect(document.getElementById('rock-layer-convention')).toHaveTextContent(/not years or absolute ages/i);
});

test('selects before checking, permits correction, and completes only after checking the target once', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<RockLayerExplorer config={{ layers, targetLayerId: 'bottom' }} onEvent={onEvent} />);

  const bottom = screen.getByRole('button', { name: 'Select Bottom limestone layer' });
  await user.click(bottom);
  expect(bottom).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByTestId('rock-layer-bottom')).toHaveTextContent(/Selected/i);
  expect(screen.getByRole('status')).toHaveTextContent(/relative-age rank 3.*oldest rank shown.*larger.*older/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'select-layer' },
    { type: 'change', value: { selectedLayerId: 'bottom' } },
  ]);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);

  await user.click(screen.getByRole('button', { name: 'Select Top sandstone layer' }));
  await user.click(screen.getByRole('button', { name: 'Check layer' }));
  expect(screen.getByRole('status')).toHaveTextContent(/try again/i);
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'exploring');

  await user.click(bottom);
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Check layer' }));
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'check' },
    { type: 'change', value: { selectedLayerId: 'bottom' } },
    { type: 'complete', value: { selectedLayerId: 'bottom' } },
  ]);
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'complete');

  await user.click(screen.getByRole('button', { name: 'Select Middle shale layer' }));
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'exploring');
  await user.click(bottom);
  await user.click(screen.getByRole('button', { name: 'Check layer' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('allows no-target exploration without completing and resets live state', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<RockLayerExplorer config={{ layers }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Select Bottom limestone layer' }));
  await user.click(screen.getByRole('button', { name: 'Check layer' }));
  expect(screen.getByRole('status')).toHaveTextContent(/exploring.*no scored target/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'exploring');
  expect(screen.getByRole('button', { name: 'Check layer' })).toBeDisabled();
});

test('resets selection, status, checked state, and the completion latch for a new config', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  const { rerender } = render(<RockLayerExplorer config={{ layers, targetLayerId: 'bottom' }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Select Bottom limestone layer' }));
  await user.click(screen.getByRole('button', { name: 'Check layer' }));
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'complete');

  rerender(<RockLayerExplorer config={{ layers: [layers[0]!, layers[1]!], targetLayerId: 'top' }} onEvent={onEvent} />);
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'exploring');
  expect(screen.getByRole('button', { name: 'Select Top sandstone layer' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('button', { name: 'Check layer' })).toBeDisabled();
  expect(screen.getByRole('status')).toHaveTextContent(/select a rock layer.*larger relative-age ranks are relatively older/i);
});

test('rejects blank, visually equivalent, and duplicate layer fields or a missing target', () => {
  const valid = { layers: [{ id: 'top', label: 'Top', age: 1 }, { id: 'bottom', label: 'Bottom', age: 2 }] };
  expect(RockLayerExplorerWidgetConfigSchema.safeParse(valid).success).toBe(true);
  expect(RockLayerExplorerWidgetConfigSchema.safeParse({ layers: [{ id: ' ', label: 'Top', age: 1 }, { id: 'bottom', label: 'Bottom', age: 2 }] }).success).toBe(false);
  expect(RockLayerExplorerWidgetConfigSchema.safeParse({ layers: [{ id: 'top', label: ' ', age: 1 }, { id: 'bottom', label: 'Bottom', age: 2 }] }).success).toBe(false);
  expect(RockLayerExplorerWidgetConfigSchema.safeParse({ ...valid, prompt: '   ' }).success).toBe(false);
  expect(RockLayerExplorerWidgetConfigSchema.safeParse({ layers: [{ id: 'top', label: 'Top', age: 1, artifact: '  ' }, { id: 'bottom', label: 'Bottom', age: 2 }] }).success).toBe(false);
  expect(RockLayerExplorerWidgetConfigSchema.safeParse({ layers: [{ id: 'top', label: 'Top', age: 1 }, { id: 'TOP', label: ' top ', age: 2 }] }).success).toBe(false);
  expect(RockLayerExplorerWidgetConfigSchema.safeParse({ layers: [{ id: 'top', label: 'Top', age: 1 }, { id: 'bottom', label: 'Bottom', age: 1 }] }).success).toBe(false);
  expect(RockLayerExplorerWidgetConfigSchema.safeParse({ ...valid, targetLayerId: 'missing' }).success).toBe(false);
});

test('requires a fossil or rank evidence choice after the relative-age rank is checked', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  const config = {
    layers,
    targetLayerId: 'bottom',
    evidencePrompt: 'Which evidence supports this relative-age conclusion?',
    evidenceChoices: [
      { id: 'fossil-order', text: 'The lower layer has plant fossils below the shell layer.' },
      { id: 'years', text: 'Rank 3 means the layer is three years old.' },
    ],
    requiredEvidenceId: 'fossil-order',
  };
  render(<RockLayerExplorer config={config} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Select Bottom limestone layer' }));
  await user.click(screen.getByRole('button', { name: 'Check layer' }));
  expect(screen.getByRole('status')).toHaveTextContent(/choose.*evidence/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);

  await user.click(screen.getByRole('button', { name: /three years old/i }));
  expect(screen.getByRole('status')).toHaveTextContent(/revise|evidence/i);
  await user.click(screen.getByRole('button', { name: /lower layer has plant fossils/i }));
  expect(screen.getByTestId('rock-selected-evidence')).toHaveTextContent(/plant fossils/i);
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('status')).not.toHaveTextContent(/years old/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('normalizes evidence ids when a valid authored choice differs only by case', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<RockLayerExplorer config={{
    layers,
    targetLayerId: 'bottom',
    evidencePrompt: 'Choose evidence.',
    evidenceChoices: [
      { id: 'FOSSIL-ORDER', text: 'The fossil order supports the relative rank.' },
      { id: 'CALENDAR-YEARS', text: 'The rank names a calendar year.' },
    ],
    requiredEvidenceId: 'fossil-order',
  }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Select Bottom limestone layer' }));
  await user.click(screen.getByRole('button', { name: 'Check layer' }));
  await user.click(screen.getByRole('button', { name: /fossil order supports/i }));
  expect(screen.getByTestId('widget-rock-layer-explorer')).toHaveAttribute('data-state', 'complete');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});
