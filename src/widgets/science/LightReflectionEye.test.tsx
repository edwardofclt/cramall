import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { LightReflectionEyeWidgetConfigSchema } from '../../content/schema';
import LightReflectionEye from './LightReflectionEye';

test('changes angle, states the reflection, and completes on check once', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<LightReflectionEye config={{ incidentAngle: 29, targetAngle: 30, showEye: true }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Increase incident angle' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Check reflection' }));
  expect(screen.getByTestId('reflection-angle')).toHaveTextContent('30°');
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'check' },
    { type: 'change', value: { incidentAngle: 30, reflectionAngle: 30 } },
    { type: 'complete', value: { incidentAngle: 30, reflectionAngle: 30 } },
  ]);
  await user.click(screen.getByRole('button', { name: 'Check reflection' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('renders labelled equal-angle rays from a dashed normal and a truthful eye receiver', () => {
  render(<LightReflectionEye config={{ incidentAngle: 30, showEye: true }} onEvent={vi.fn()} />);
  expect(screen.getByRole('img', { name: /ray diagram.*incident angle 30.*reflected angle 30.*measured from the normal/i })).toBeInTheDocument();
  expect(screen.getByTestId('reflecting-surface')).toHaveAttribute('y1', '50');
  expect(screen.getByTestId('surface-normal')).toHaveAttribute('stroke-dasharray', '3 2');
  expect(screen.getByTestId('incident-ray')).toHaveAttribute('marker-end', 'url(#reflection-arrow)');
  expect(screen.getByTestId('reflected-ray')).toHaveAttribute('marker-end', 'url(#reflection-arrow)');
  expect(screen.getByTestId('incident-angle-arc').getAttribute('d')).toContain('A 12 12');
  expect(screen.getByTestId('reflected-angle-arc').getAttribute('d')).toContain('A 12 12');
  expect(screen.getByText('Incident angle: 30° from the normal')).toBeInTheDocument();
  expect(screen.getByText('Reflected angle: 30° from the normal')).toBeInTheDocument();
  expect(screen.getByText(/Eye receiver: a labelled schematic on the reflected path/i)).toBeInTheDocument();
  expect(screen.getByText(/not physical evidence/i)).toBeInTheDocument();
});

test('keeps the current checked state live after a completed reflection changes', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<LightReflectionEye config={{ incidentAngle: 29, targetAngle: 30 }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Increase incident angle' }));
  await user.click(screen.getByRole('button', { name: 'Check reflection' }));
  expect(screen.getByTestId('widget-light-reflection-eye')).toHaveAttribute('data-state', 'complete');
  await user.click(screen.getByRole('button', { name: 'Decrease incident angle' }));
  expect(screen.getByTestId('widget-light-reflection-eye')).toHaveAttribute('data-state', 'testing');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('strictly bounds authored reflection angles and controls at both endpoints', () => {
  expect(LightReflectionEyeWidgetConfigSchema.safeParse({ incidentAngle: -1 }).success).toBe(false);
  expect(LightReflectionEyeWidgetConfigSchema.safeParse({ incidentAngle: 91 }).success).toBe(false);
  expect(LightReflectionEyeWidgetConfigSchema.safeParse({ incidentAngle: 30, targetAngle: 30, extra: true }).success).toBe(false);
  render(<LightReflectionEye config={{ incidentAngle: 0 }} onEvent={vi.fn()} />);
  expect(screen.getByRole('button', { name: 'Decrease incident angle' })).toBeDisabled();
});
