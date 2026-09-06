import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { LightReflectionEyeWidgetConfigSchema } from '../../content/schema';
import LightReflectionEye from './LightReflectionEye';

const motionPreference = { reduced: false };
vi.mock('../../app/useReducedMotionPref', () => ({
  useReducedMotionPref: () => motionPreference.reduced,
}));

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

test('traces source to object to eye before committing the modeled ray', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<LightReflectionEye config={{
    incidentAngle: 25,
    showEye: true,
    task: 'trace-path',
    taskPrompt: 'Connect the source, object, and eye.',
    pathLabels: { source: 'Lamp', object: 'Book', eye: 'Eye' },
  }} onEvent={onEvent} />);

  expect(screen.getByText('Connect the source, object, and eye.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Select source: Lamp' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Select object: Book' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Select eye: Eye' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Increase incident angle' })).not.toBeInTheDocument();
  expect(screen.getByTestId('widget-light-reflection-eye')).toHaveAttribute('data-path-committed', 'no');

  await user.click(screen.getByRole('button', { name: 'Select object: Book' }));
  expect(screen.getByRole('status')).toHaveTextContent(/start with the source/i);
  await user.click(screen.getByRole('button', { name: 'Select source: Lamp' }));
  await user.click(screen.getByRole('button', { name: 'Select object: Book' }));
  await user.click(screen.getByRole('button', { name: 'Select eye: Eye' }));
  expect(screen.getByRole('button', { name: 'Trace committed light path' })).toBeEnabled();
  await user.click(screen.getByRole('button', { name: 'Trace committed light path' }));

  expect(screen.getByTestId('widget-light-reflection-eye')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('widget-light-reflection-eye')).toHaveAttribute('data-path-committed', 'yes');
  expect(screen.getByRole('status')).toHaveTextContent(/Lamp.*Book.*Eye/i);
  expect(onEvent.mock.calls.some(([event]) => event.type === 'coach' && event.cue === 'milestone')).toBe(true);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('uses the same committed ray and message when reduced motion is enabled', async () => {
  motionPreference.reduced = true;
  const user = userEvent.setup();
  render(<LightReflectionEye config={{
    incidentAngle: 25,
    task: 'trace-path',
    pathLabels: { source: 'Lamp', object: 'Book', eye: 'Eye' },
  }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Select source: Lamp' }));
  await user.click(screen.getByRole('button', { name: 'Select object: Book' }));
  await user.click(screen.getByRole('button', { name: 'Select eye: Eye' }));
  await user.click(screen.getByRole('button', { name: 'Trace committed light path' }));
  expect(screen.getByTestId('widget-light-reflection-eye')).toHaveAttribute('data-motion', 'off');
  expect(screen.getByTestId('reflected-ray')).toHaveAttribute('data-committed', 'yes');
  expect(screen.getByRole('status')).toHaveTextContent(/Lamp.*Book.*Eye/i);
  motionPreference.reduced = false;
});
