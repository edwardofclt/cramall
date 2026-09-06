import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { CollisionRampWidgetConfigSchema } from '../../content/schema';
import CollisionRamp, { stuckCartDirection } from './CollisionRamp';

const motionPreference = { reduced: false };
vi.mock('../../app/useReducedMotionPref', () => ({
  useReducedMotionPref: () => motionPreference.reduced,
}));

const nodeProcess = (globalThis as typeof globalThis & {
  process: { getBuiltinModule(name: 'fs'): { readFileSync(path: string, encoding: 'utf8'): string } };
}).process;

test('grades opposing next-state momenta rather than a hard-coded direction', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<CollisionRamp config={{ rampAngle: 20, massA: 1, massB: 1, speedA: 5, speedB: 4, target: 'predict-direction' }} onEvent={onEvent} />);

  expect(screen.getByRole('button', { name: 'Decrease cart A speed' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Decrease cart B speed' })).toBeEnabled();
  await user.click(screen.getByRole('button', { name: 'Increase cart B speed' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Stays the same' }));

  expect(screen.getByRole('status')).toHaveTextContent(/same.*correct/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'choose-prediction' },
    { type: 'change', value: { rampAngle: 20, speedA: 5, speedB: 5 } },
    { type: 'complete', value: { prediction: 'same', correct: true } },
  ]);
  await user.click(screen.getByRole('button', { name: 'Stays the same' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByRole('status')).toHaveTextContent(/make a prediction/i);
});

test('shows labelled carts, live completion, and the simplified-model boundary', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<CollisionRamp config={{ massA: 2, massB: 1, speedA: 3, speedB: 1 }} onEvent={onEvent} />);

  expect(screen.getByRole('img', { name: /cart A.*mass 2.*right/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /cart B.*mass 1.*left/i })).toBeInTheDocument();
  expect(screen.getByText(/simplified.*not physical evidence or full physics/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Moves right' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state', 'complete');
  await user.click(screen.getByRole('button', { name: 'Decrease cart A speed' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state', 'testing');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('validates bounded visual setup and reports opposing stuck-cart directions', () => {
  expect(stuckCartDirection(2, 3, 3, 2)).toBe('same');
  expect(stuckCartDirection(2, 4, 3, 2)).toBe('right');
  expect(stuckCartDirection(1, 2, 3, 2)).toBe('left');
  expect(CollisionRampWidgetConfigSchema.safeParse({ massA: 0, massB: 1 }).success).toBe(false);
  expect(CollisionRampWidgetConfigSchema.safeParse({ massA: 1, massB: 1, rampAngle: 46 }).success).toBe(false);
});

test('uses exact authored decimals and clamps decimal control endpoints', async () => {
  expect(stuckCartDirection(1.1, 3, 3.3, 1)).toBe('same');
  expect(stuckCartDirection(1, 1, 1.000000000001, 1)).toBe('left');
  expect(() => stuckCartDirection(1.0000000000001, 1, 1, 1)).toThrow(RangeError);
  expect(CollisionRampWidgetConfigSchema.safeParse({ massA: 1.0000000000001, massB: 1 }).success).toBe(false);
  const user = userEvent.setup();
  render(<CollisionRamp config={{ rampAngle: .5, massA: 1, massB: 1, speedA: .5, speedB: 99.5 }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Decrease ramp angle' }));
  await user.click(screen.getByRole('button', { name: 'Decrease cart A speed' }));
  await user.click(screen.getByRole('button', { name: 'Increase cart B speed' }));
  expect(screen.getByText(/ramp setup angle: 0°.*setup-only/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Decrease ramp angle' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Decrease cart A speed' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Increase cart B speed' })).toBeDisabled();
});

test('keeps every decimal control change inside the exact 12-place domain', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<CollisionRamp config={{
    rampAngle: 1.000000000001,
    massA: 1,
    massB: 1,
    speedA: 1.000000000001,
    speedB: 98.999999999999,
  }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Decrease ramp angle' }));
  await user.click(screen.getByRole('button', { name: 'Decrease cart A speed' }));
  await user.click(screen.getByRole('button', { name: 'Increase cart B speed' }));

  expect(onEvent.mock.calls.map(([event]) => event).filter((event) => event.type === 'change')).toEqual([
    { type: 'change', value: { rampAngle: 1e-12, speedA: 1.000000000001, speedB: 98.999999999999 } },
    { type: 'change', value: { rampAngle: 1e-12, speedA: 1e-12, speedB: 98.999999999999 } },
    { type: 'change', value: { rampAngle: 1e-12, speedA: 1e-12, speedB: 99.999999999999 } },
  ]);
  expect(screen.getByText(/Cart A push number: 1 × 1e-12 = 0\.000000000001/)).toBeInTheDocument();
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state', 'testing');
});

test('labels zero-speed carts as stationary and keeps the cart track horizontally scrollable', async () => {
  const user = userEvent.setup();
  render(<CollisionRamp config={{ massA: 2, massB: 3, speedA: 0, speedB: 0 }} onEvent={vi.fn()} />);
  expect(screen.getByRole('img', { name: /cart A.*stationary/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /cart B.*stationary/i })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/stationary.*no collision occurs/i);
  expect(screen.getByRole('heading', { name: /both carts are stationary.*no collision occurs.*matching model result/i })).toBeInTheDocument();
  expect(screen.getByTestId('collision-track-viewport')).toHaveClass('collision-track-viewport');
  await user.click(screen.getByRole('button', { name: 'Stays the same' }));
  expect(screen.getByRole('status')).toHaveTextContent(/remain stationary.*no collision occurs/i);
});

test('uses collision wording in the prediction heading only when a cart is moving', () => {
  render(<CollisionRamp config={{ massA: 1, massB: 1, speedA: 1, speedB: 0 }} onEvent={vi.fn()} />);
  expect(screen.getByRole('heading', { name: /after the modeled stuck-cart collision/i })).toBeInTheDocument();
});

test('runs two locked fair-test comparisons only after a prediction', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<CollisionRamp config={{
    rampAngle: 5,
    massA: 2,
    massB: 2,
    speedA: 1,
    speedB: 3,
    controlledVariable: 'speed-a',
    comparisonRuns: 2,
    taskPrompt: 'Change only Cart A speed and compare two modeled runs.',
  }} onEvent={onEvent} />);

  expect(screen.getByText('Change only Cart A speed and compare two modeled runs.')).toBeInTheDocument();
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'setup');
  expect(screen.getByRole('button', { name: 'Run collision model' })).toBeDisabled();
  expect(screen.getByText(/Cart A mass 2.*locked/i)).toBeInTheDocument();
  expect(screen.getByText(/Ramp angle 5°.*locked/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart B speed 3.*locked/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Moves left' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'predicted');
  expect(screen.getByRole('button', { name: 'Run collision model' })).toBeEnabled();
  await user.click(screen.getByRole('button', { name: 'Run collision model' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'running');
  expect(screen.getByTestId('collision-comparison-track')).toHaveAttribute('data-motion-direction', 'left');

  await waitFor(() => expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'observed'));
  expect(screen.getByTestId('collision-run-1')).toHaveTextContent(/Before:/i);
  expect(screen.getByTestId('collision-run-1')).toHaveTextContent(/After model:/i);
  expect(screen.getByRole('status')).toHaveTextContent(/Run 1 observed/i);
  expect(onEvent.mock.calls.some(([event]) => event.type === 'coach' && event.cue === 'milestone')).toBe(true);

  await user.click(screen.getByRole('button', { name: 'Increase Cart A speed' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'setup');
  await user.click(screen.getByRole('button', { name: 'Moves right' }));
  await user.click(screen.getByRole('button', { name: 'Run collision model' }));
  await waitFor(() => expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'observed'));
  expect(screen.getByText(/Run 2.*before.*after/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Compare runs' })).toBeDisabled();
  await user.click(screen.getByRole('button', { name: /Run 2 had more Cart A speed/i }));
  await user.click(screen.getByRole('button', { name: 'Compare runs' }));

  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'compared');
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-complete', 'yes');
  expect(screen.getByRole('status')).toHaveTextContent(/compared/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('requires a correct comparison statement and reports strategy feedback without changing locked inputs', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<CollisionRamp config={{
    massA: 1,
    massB: 1,
    speedA: 2,
    speedB: 2,
    controlledVariable: 'speed-b',
    comparisonRuns: 2,
    taskPrompt: 'Compare Cart B releases.',
  }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Stays the same' }));
  await user.click(screen.getByRole('button', { name: 'Run collision model' }));
  await waitFor(() => expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'observed'));
  expect(screen.getByRole('status')).toHaveTextContent(/change only Cart B speed/i);
  await user.click(screen.getByRole('button', { name: 'Increase Cart B speed' }));
  await user.click(screen.getByRole('button', { name: 'Moves left' }));
  await user.click(screen.getByRole('button', { name: 'Run collision model' }));
  await waitFor(() => expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'observed'));

  await user.click(screen.getByRole('button', { name: /Run 1 had more Cart B speed/i }));
  await user.click(screen.getByRole('button', { name: 'Compare runs' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'observed');
  expect(screen.getByRole('status')).toHaveTextContent(/revise|compare/i);
  expect(onEvent.mock.calls.some(([event]) => event.type === 'coach' && event.cue === 'retry')).toBe(true);
  expect(screen.getByText(/Cart A mass 1.*locked/i)).toBeInTheDocument();
  expect(screen.getByText(/Cart A speed 2.*locked/i)).toBeInTheDocument();
});

test('reduced motion reaches the same observed final state immediately', async () => {
  motionPreference.reduced = true;
  const user = userEvent.setup();
  render(<CollisionRamp config={{
    massA: 2,
    massB: 1,
    speedA: 1,
    speedB: 1,
    controlledVariable: 'speed-a',
    comparisonRuns: 2,
    taskPrompt: 'Compare modeled motion.',
  }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Moves right' }));
  await user.click(screen.getByRole('button', { name: 'Run collision model' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-motion', 'off');
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-phase', 'observed');
  expect(screen.getByTestId('collision-comparison-track')).toHaveAttribute('data-motion-direction', 'right');
  expect(screen.getByTestId('collision-run-1-after')).toHaveAttribute('data-direction', 'right');
  motionPreference.reduced = false;
});

test('uses truthful outcome-specific collision motion keyframes', () => {
  const themeCss = nodeProcess.getBuiltinModule('fs').readFileSync('src/theme.css', 'utf8');
  expect(themeCss).toMatch(/data-motion-direction='left'\]\[data-phase='running'\][^}]*animation-name:\s*collision-cart-roll-left/);
  expect(themeCss).toMatch(/data-motion-direction='right'\]\[data-phase='running'\][^}]*animation-name:\s*collision-cart-roll-right/);
  expect(themeCss).toMatch(/data-motion-direction='same'\]\[data-phase='running'\][^}]*animation-name:\s*collision-cart-roll-same/);
  expect(themeCss).toMatch(/@keyframes\s+collision-cart-roll-left[\s\S]*?translateX\(-8%\)/);
  expect(themeCss).toMatch(/@keyframes\s+collision-cart-roll-right[\s\S]*?translateX\(8%\)/);
});
