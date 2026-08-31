import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { EnergyTransferBuilderWidgetConfigSchema } from '../../content/schema';
import EnergyTransferBuilder from './EnergyTransferBuilder';

test('rejects an invalid next token then completes the exact path', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<EnergyTransferBuilder config={{ sources: ['Sun'], transfers: ['Electricity'], targets: ['Lamp'], requiredPath: ['Sun', 'Electricity', 'Lamp'] }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add Lamp to path' }));
  expect(screen.getByRole('status')).toHaveTextContent(/not the next transfer/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([{ type: 'interaction', action: 'append-path' }, { type: 'change', value: { path: [] } }]);
  for (const label of ['Sun', 'Electricity', 'Lamp']) await user.click(screen.getByRole('button', { name: `Add ${label} to path` }));
  expect(screen.getByTestId('widget-energy-transfer-builder')).toHaveAttribute('data-state', 'complete');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toEqual([[{ type: 'complete', value: { path: ['Sun', 'Electricity', 'Lamp'] } }]]);
});

test('rejects duplicate or cross-category energy tokens and shows model boundaries', () => {
  expect(EnergyTransferBuilderWidgetConfigSchema.safeParse({ sources: ['Sun'], transfers: ['Sun'], targets: ['Lamp'], requiredPath: ['Sun', 'Sun', 'Lamp'] }).success).toBe(false);
  render(<EnergyTransferBuilder config={{ sources: ['Sun'], transfers: ['Light'], targets: ['Plant'], requiredPath: ['Sun', 'Light', 'Plant'] }} onEvent={vi.fn()} />);
  expect(screen.getByText(/energy is inferred.*not directly seen.*not physical evidence/i)).toBeInTheDocument();
  expect(screen.getByText('Source')).toBeInTheDocument();
});
