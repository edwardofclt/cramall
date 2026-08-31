import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { TopographicMapExplorerWidgetConfigSchema } from '../../content/schema';
import TopographicMapExplorer from './TopographicMapExplorer';

const contours = [
  { elevation: 300, points: '-40,-20 30,-20 30,20 -40,20 -40,-20' },
  { elevation: 500, points: '-10,-5 15,-5 15,10 -10,10 -10,-5' },
];

const points = [
  { id: 'summit', label: 'Summit marker', elevation: 500 },
  { id: 'trail', label: 'Trail marker', elevation: 300 },
];

test('keeps every authored contour in a padded computed viewBox and provides a non-color elevation key', () => {
  render(<TopographicMapExplorer config={{ contours, points }} onEvent={vi.fn()} />);

  const map = screen.getByLabelText('Topographic contour model');
  expect(map).toHaveAttribute('viewBox', '-50 -30 90 60');
  expect(screen.getByRole('list', { name: 'Contour elevation key' })).toHaveTextContent('300 m contour');
  expect(screen.getByRole('list', { name: 'Contour elevation key' })).toHaveTextContent('500 m contour');
});

test('presents named elevations as map-data key entries without inventing locations', () => {
  render(<TopographicMapExplorer config={{ contours, points }} onEvent={vi.fn()} />);

  expect(screen.getByRole('heading', { name: 'Named map-data key' })).toBeInTheDocument();
  expect(screen.getByText(/authored topographic model/i)).toHaveTextContent(/not a measured survey.*physical evidence.*proof of a real location/i);
  expect(screen.getByText(/authored topographic model/i)).toHaveTextContent(/compar.*printed elevation data/i);
  expect(screen.queryByTestId('topographic-point-summit')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Select Summit marker' })).toHaveTextContent('Summit marker: 500 m');
});

test('names selected elevation, allows correction, and completes only when the target is checked once', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<TopographicMapExplorer config={{ contours, points, targetPointId: 'summit' }} onEvent={onEvent} />);

  const summit = screen.getByRole('button', { name: 'Select Summit marker' });
  await user.click(summit);
  expect(summit).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('status')).toHaveTextContent('Summit marker: 500 m');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);

  await user.click(screen.getByRole('button', { name: 'Select Trail marker' }));
  await user.click(screen.getByRole('button', { name: 'Check point' }));
  expect(screen.getByRole('status')).toHaveTextContent(/try again/i);
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'exploring');

  await user.click(summit);
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Check point' }));
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'check' },
    { type: 'change', value: { selectedPointId: 'summit' } },
    { type: 'complete', value: { selectedPointId: 'summit' } },
  ]);
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'complete');

  await user.click(screen.getByRole('button', { name: 'Select Trail marker' }));
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'exploring');
  await user.click(summit);
  await user.click(screen.getByRole('button', { name: 'Check point' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('keeps no-target configurations exploration-only and resets live state', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<TopographicMapExplorer config={{ contours, points }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Select Summit marker' }));
  await user.click(screen.getByRole('button', { name: 'Check point' }));
  expect(screen.getByRole('status')).toHaveTextContent(/exploring.*no scored target/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'exploring');
  expect(screen.getByRole('button', { name: 'Check point' })).toBeDisabled();
});

test('resets selection, visible state, and completion latch for a new configuration', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  const { rerender } = render(<TopographicMapExplorer config={{ contours, points, targetPointId: 'summit' }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Select Summit marker' }));
  await user.click(screen.getByRole('button', { name: 'Check point' }));
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'complete');

  rerender(<TopographicMapExplorer config={{ contours: [contours[1]!], points, targetPointId: 'trail' }} onEvent={onEvent} />);
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'exploring');
  expect(screen.getByRole('button', { name: 'Select Summit marker' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('button', { name: 'Check point' })).toBeDisabled();
  expect(screen.getByRole('status')).toHaveTextContent(/select a map point/i);
});

test('rejects malformed, nonfinite, duplicate, blank, and missing-target map data', () => {
  const valid = { contours, points };
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse(valid).success).toBe(true);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({ ...valid, contours: [{ elevation: 300, points: '0,0 nope' }] }).success).toBe(false);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({ ...valid, contours: [{ elevation: Infinity, points: '0,0 1,1' }] }).success).toBe(false);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({ ...valid, contours: [{ elevation: 300, points: '0,0 0,0' }] }).success).toBe(false);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({ ...valid, points: [{ id: ' ', label: 'Summit', elevation: 500 }, points[1]!] }).success).toBe(false);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({ ...valid, points: [{ id: 'summit', label: 'Summit', elevation: 500 }, { id: 'other', label: ' summit ', elevation: 300 }] }).success).toBe(false);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({ ...valid, targetPointId: 'missing' }).success).toBe(false);
});
