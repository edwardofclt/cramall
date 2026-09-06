import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { EnergyConversionDesignerWidgetConfigSchema } from '../../content/schema';
import { WidgetFrame } from '../WidgetFrame';
import EnergyConversionDesigner from './EnergyConversionDesigner';

const config = {
  components: [
    { id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: 'light' },
    { id: 'panel', label: 'Panel', energyIn: 'light', energyOut: 'electric' },
    { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light' },
  ],
  requiredStart: 'sun',
  requiredEnd: 'lamp',
};

const replacementConfig = {
  components: [
    { id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: 'light' },
    { id: 'battery', label: 'Battery', energyIn: 'light', energyOut: 'electric' },
    { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light' },
  ],
  requiredStart: 'sun',
  requiredEnd: 'lamp',
};

const constrainedConfig = {
  components: [
    { id: 'battery', label: 'Battery', energyIn: 'stored', energyOut: 'electric', satisfiesConstraintIds: ['material', 'cost'] },
    { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light', satisfiesConstraintIds: ['time', 'safety'] },
  ],
  requiredStart: 'battery', requiredEnd: 'lamp',
  constraints: [
    { id: 'material', label: 'Available materials', kind: 'material' as const },
    { id: 'cost', label: 'At most 8 tokens', kind: 'cost' as const },
    { id: 'time', label: 'Within 10 minutes', kind: 'time' as const },
    { id: 'safety', label: 'Adult safety check', kind: 'safety' as const },
  ],
};

test('rejects incompatible adjacency without corrupting the valid chain', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<EnergyConversionDesigner config={config} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add Sun' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Add Lamp' }));
  expect(screen.getByRole('status')).toHaveTextContent(/does not connect/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'append-chain' },
    { type: 'change', value: { chain: ['sun'] } },
    { type: 'coach', cue: 'strategy' },
  ]);
  expect(screen.getByTestId('conversion-chain')).toHaveTextContent('sun');
  await user.click(screen.getByRole('button', { name: 'Add Panel' }));
  await user.click(screen.getByRole('button', { name: 'Add Lamp' }));
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'complete');
  const completeCalls = onEvent.mock.calls.filter(([event]) => event.type === 'complete');
  expect(completeCalls[completeCalls.length - 1]?.[0]).toEqual({ type: 'complete', value: { chain: ['sun', 'panel', 'lamp'] } });
});

test('rejects equal endpoints and endpoint pairs with no compatible path', () => {
  const components = [
    { id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: 'light' },
    { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light' },
  ];
  expect(EnergyConversionDesignerWidgetConfigSchema.safeParse({ components, requiredStart: 'sun', requiredEnd: 'sun' }).success).toBe(false);
  expect(EnergyConversionDesignerWidgetConfigSchema.safeParse({ components, requiredStart: 'sun', requiredEnd: 'lamp' }).success).toBe(false);
});

test('normalizes graph terms and rejects visually ambiguous component ids or labels', () => {
  const parsed = EnergyConversionDesignerWidgetConfigSchema.parse({
    components: [
      { id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: ' light ' },
      { id: 'lamp', label: 'Lamp', energyIn: 'light', energyOut: 'visible light' },
    ],
    requiredStart: ' sun ', requiredEnd: 'lamp ',
  });
  expect(parsed.components[0]?.energyOut).toBe('light');
  expect(parsed.requiredStart).toBe('sun');
  expect(EnergyConversionDesignerWidgetConfigSchema.safeParse({
    components: [
      { id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: 'light' },
      { id: ' sun ', label: 'Panel', energyIn: 'light', energyOut: 'electric' },
      { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'visible light' },
    ], requiredStart: 'sun', requiredEnd: 'lamp',
  }).success).toBe(false);
  expect(EnergyConversionDesignerWidgetConfigSchema.safeParse({
    components: [
      { id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: 'light' },
      { id: 'lamp', label: ' Sun ', energyIn: 'light', energyOut: 'visible light' },
    ], requiredStart: 'sun', requiredEnd: 'lamp',
  }).success).toBe(false);
});

test('renders the selected chain as labelled nodes and returns live state to building after an edit', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<EnergyConversionDesigner config={config} onEvent={onEvent} />);
  for (const label of ['Sun', 'Panel', 'Lamp']) await user.click(screen.getByRole('button', { name: `Add ${label}` }));
  expect(screen.getByTestId('conversion-chain')).toHaveTextContent(/Sun.*light.*Panel.*electric.*Lamp/i);
  expect(screen.getAllByTestId('conversion-connector')).toHaveLength(2);
  expect(screen.getByText(/simplified energy-conversion model.*not directly seen.*not physical evidence/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Add Panel' }));
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'building');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('keeps exact correction feedback live after an incompatible append to a complete chain', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<EnergyConversionDesigner config={config} onEvent={onEvent} />);
  for (const label of ['Sun', 'Panel', 'Lamp']) await user.click(screen.getByRole('button', { name: `Add ${label}` }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Add Sun' }));
  expect(screen.getByTestId('conversion-chain')).toHaveTextContent(/sun.*panel.*lamp/i);
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('status')).toHaveTextContent(/Lamp outputs light.*does not connect to Sun's nuclear input/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'append-chain' },
    { type: 'change', value: { chain: ['sun', 'panel', 'lamp'] } },
    { type: 'coach', cue: 'milestone' },
    { type: 'coach', cue: 'strategy' },
  ]);
});

test('announces success when a valid append completes the required chain', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<EnergyConversionDesigner config={config} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add Sun' }));
  await user.click(screen.getByRole('button', { name: 'Add Panel' }));
  await user.click(screen.getByRole('button', { name: 'Add Lamp' }));
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('status')).toHaveTextContent(/connects the required endpoints/i);
});

test('clears a retained chain before a replacement config removes its interior component', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  const view = render(<EnergyConversionDesigner config={config} onEvent={onEvent} />);
  for (const label of ['Sun', 'Panel', 'Lamp']) await user.click(screen.getByRole('button', { name: `Add ${label}` }));

  view.rerender(<EnergyConversionDesigner config={replacementConfig} onEvent={onEvent} />);
  expect(screen.getByTestId('conversion-chain')).toHaveAccessibleName(/empty/i);
  expect(screen.getByRole('status')).toHaveTextContent(/choose the required starting component/i);

  for (const label of ['Sun', 'Battery', 'Lamp']) await user.click(screen.getByRole('button', { name: `Add ${label}` }));
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('conversion-chain')).toHaveTextContent(/sun.*battery.*lamp/i);
});

test('recovers from an interior-component config replacement inside WidgetFrame without its fallback', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  const view = render(<WidgetFrame type="energy-conversion-designer" config={config} onEvent={onEvent} />);
  await screen.findByTestId('widget-energy-conversion-designer');
  for (const label of ['Sun', 'Panel', 'Lamp']) await user.click(screen.getByRole('button', { name: `Add ${label}` }));

  view.rerender(<WidgetFrame type="energy-conversion-designer" config={replacementConfig} onEvent={onEvent} />);
  expect(await screen.findByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'building');
  expect(screen.queryByTestId('widget-napping')).not.toBeInTheDocument();

  for (const label of ['Sun', 'Battery', 'Lamp']) await user.click(screen.getByRole('button', { name: `Add ${label}` }));
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'complete');
});

test('snaps and removes chain tokens, then requires every visible constraint stamp', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<EnergyConversionDesigner config={constrainedConfig} onEvent={onEvent} />);
  expect(screen.getByTestId('conversion-constraints')).toHaveTextContent(/Available materials.*unmet/i);
  expect(screen.getAllByTestId(/constraint-stamp-/)).toHaveLength(4);
  await user.click(screen.getByRole('button', { name: 'Add Battery' }));
  await user.click(screen.getByRole('button', { name: 'Add Lamp' }));
  expect(screen.getByTestId('conversion-chain-slot-1')).toHaveTextContent('Lamp');
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('conversion-constraints')).toHaveTextContent(/all constraints met/i);
  await user.click(screen.getByRole('button', { name: 'Remove Lamp from chain' }));
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'building');
  expect(screen.getByTestId('conversion-constraints')).toHaveTextContent(/unmet/i);
});

test('coaches an incompatible chain without claiming a universally best device', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<EnergyConversionDesigner config={constrainedConfig} onEvent={onEvent} />);
  expect(screen.getByText(/no single device is universally best/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Add Battery' }));
  await user.click(screen.getByRole('button', { name: 'Add Battery' }));
  expect(screen.getByRole('status')).toHaveTextContent(/does not connect/i);
  expect(onEvent.mock.calls.some(([event]) => event.type === 'coach' && event.cue === 'strategy')).toBe(true);
});

test('coaches a valid endpoint chain when an authored constraint is still unmet', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  const partialConfig = {
    components: [
      { id: 'battery', label: 'Battery', energyIn: 'stored', energyOut: 'electric', satisfiesConstraintIds: ['material'] },
      { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light', satisfiesConstraintIds: ['safety'] },
      { id: 'spare', label: 'Spare panel', energyIn: 'sunlight', energyOut: 'electric', satisfiesConstraintIds: ['cost'] },
    ],
    requiredStart: 'battery', requiredEnd: 'lamp',
    constraints: [
      { id: 'material', label: 'Available materials', kind: 'material' as const },
      { id: 'cost', label: 'At most 8 tokens', kind: 'cost' as const },
      { id: 'safety', label: 'Adult safety check', kind: 'safety' as const },
    ],
  };
  expect(EnergyConversionDesignerWidgetConfigSchema.safeParse(partialConfig).success).toBe(true);
  render(<EnergyConversionDesigner config={partialConfig} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add Battery' }));
  await user.click(screen.getByRole('button', { name: 'Add Lamp' }));
  expect(screen.getByRole('status')).toHaveTextContent(/unmet constraints remain.*at most 8 tokens/i);
  expect(onEvent.mock.calls.some(([event]) => event.type === 'coach' && event.cue === 'retry')).toBe(true);
  expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state', 'building');
});
