import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { MessageSenderWidgetConfigSchema } from '../../content/schema';
import MessageSender from './MessageSender';

test('uses the effective Morse alphabet and emits send completion once', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<MessageSender config={{ encoding: 'morse', message: 'A' }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add dot' }));
  await user.click(screen.getByRole('button', { name: 'Add dash' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Send message' }));
  expect(screen.getByRole('status')).toHaveTextContent('A');
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'send' },
    { type: 'change', value: { encoded: '.-' } },
    { type: 'complete', value: { encoded: '.-', decoded: 'A' } },
  ]);
  await user.click(screen.getByRole('button', { name: 'Send message' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('rejects unenterable, ambiguous, or unsupported effective codes', () => {
  expect(MessageSenderWidgetConfigSchema.safeParse({ encoding: 'morse', message: 'A', alphabet: { A: 'beep' } }).success).toBe(false);
  expect(MessageSenderWidgetConfigSchema.safeParse({ encoding: 'morse', message: '!', alphabet: {} }).success).toBe(false);
  expect(MessageSenderWidgetConfigSchema.safeParse({ encoding: 'binary', message: 'é' }).success).toBe(false);
  expect(MessageSenderWidgetConfigSchema.safeParse({ encoding: 'binary', message: 'A', alphabet: { é: '11101001' } }).success).toBe(false);
  expect(MessageSenderWidgetConfigSchema.safeParse({ encoding: 'morse', message: 'AB', alphabet: { A: '.-', B: '.-' } }).success).toBe(false);
  expect(MessageSenderWidgetConfigSchema.safeParse({ encoding: 'morse', message: 'A', alphabet: { ' ': '.-' } }).success).toBe(false);
});

test('renders target-relevant code references and character-grouped entry', async () => {
  const user = userEvent.setup();
  render(<MessageSender config={{ encoding: 'morse', message: 'AB' }} onEvent={vi.fn()} />);
  expect(screen.getByText('Target message: AB')).toBeInTheDocument();
  expect(screen.getByText('A = .-')).toBeInTheDocument();
  expect(screen.getByText('B = -...')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Add dot' }));
  await user.click(screen.getByRole('button', { name: 'Add dash' }));
  await user.click(screen.getByRole('button', { name: 'Add letter separator' }));
  await user.click(screen.getByRole('button', { name: 'Add dash' }));
  expect(screen.getAllByTestId('encoded-character-group')).toHaveLength(2);
  expect(screen.getByTestId('encoded-character-separator')).toHaveTextContent('|');
  expect(screen.getByText(/simplified in-app information-encoding model.*not an external transmission.*recording.*hearing assessment/i)).toBeInTheDocument();
});

test('keeps sent completion live when a correct code is edited', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<MessageSender config={{ encoding: 'morse', message: 'A' }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add dot' }));
  await user.click(screen.getByRole('button', { name: 'Add dash' }));
  await user.click(screen.getByRole('button', { name: 'Send message' }));
  expect(screen.getByTestId('widget-message-sender')).toHaveAttribute('data-state', 'complete');
  await user.click(screen.getByRole('button', { name: 'Remove last symbol' }));
  expect(screen.getByTestId('widget-message-sender')).toHaveAttribute('data-state', 'encoding');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});
