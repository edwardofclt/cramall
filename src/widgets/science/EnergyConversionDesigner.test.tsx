import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { EnergyConversionDesignerWidgetConfigSchema } from '../../content/schema';
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
