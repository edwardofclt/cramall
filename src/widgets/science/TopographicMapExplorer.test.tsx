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

test('keeps every authored contour in a padded computed viewBox and maps a visible contour ID to its exact elevation-key entry', () => {
  render(<TopographicMapExplorer config={{ contours, points }} onEvent={vi.fn()} />);

  const map = screen.getByRole('img', { name: 'Topographic contour model: C1 — Contour 1: 300 m; C2 — Contour 2: 500 m' });
  expect(map).toHaveAttribute('viewBox', '-50 -30 90 60');
  const firstKeyEntry = screen.getByTestId('topographic-contour-key-C1');
  expect(screen.getByText('C1', { selector: 'text' })).toBeInTheDocument();
  expect(firstKeyEntry).toHaveTextContent('C1 — Contour 1: 300 m');
  expect(screen.getByTestId('topographic-contour-C2')).toBeInTheDocument();
  expect(screen.getByTestId('topographic-contour-key-C2')).toHaveTextContent('C2 — Contour 2: 500 m');
});

test('plots six authored points, exposes non-color symbols and a keyboard-linked point list, and checks a spatial band', async () => {
  const user = userEvent.setup();
  const points = [
    { id: 'p1', label: 'Peak 1', x: 20, y: 20, elevation: 500, group: 'peaks' },
    { id: 'p2', label: 'Peak 2', x: 40, y: 20, elevation: 500, group: 'peaks' },
    { id: 'p3', label: 'Peak 3', x: 60, y: 20, elevation: 500, group: 'peaks' },
    { id: 'v1', label: 'Valley 1', x: 20, y: 70, elevation: 100, group: 'valleys' },
    { id: 'v2', label: 'Valley 2', x: 40, y: 70, elevation: 100, group: 'valleys' },
    { id: 'v3', label: 'Valley 3', x: 60, y: 70, elevation: 100, group: 'valleys' },
  ];
  render(<TopographicMapExplorer config={{ contours, points, targetPattern: 'band' }} onEvent={vi.fn()} />);

  expect(screen.getAllByTestId(/^topographic-point-/)).toHaveLength(6);
  expect(screen.getByTestId('topographic-point-p1')).toHaveAttribute('aria-label', expect.stringMatching(/Peak 1.*500 m/));
  expect(screen.getByTestId('topographic-point-p1')).toHaveAttribute('data-x', '20');
  expect(screen.getByRole('img').querySelectorAll('[role="button"]').length).toBe(0);
  const listButton = screen.getByRole('button', { name: /Select Peak 1/ });
  expect(listButton).toHaveAttribute('aria-controls', 'topographic-point-p1');
  await user.click(listButton);
  expect(screen.getByRole('status')).toHaveTextContent(/elevation.*500.*pattern/i);
  await user.click(screen.getByRole('button', { name: /Select Peak 2/ }));
  await user.click(screen.getByRole('button', { name: /Select Peak 3/ }));
  await user.click(screen.getByRole('button', { name: /choose band/i }));
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('status')).toHaveTextContent(/visible.*band.*not.*cause/i);
});

test('does not allow direct pattern guessing without multiple same-group point evidence', async () => {
  const user = userEvent.setup();
  const onEvent = vi.fn();
  const points = [
    { id: 'p1', label: 'Peak 1', x: 20, y: 20, elevation: 500, group: 'peaks' },
    { id: 'p2', label: 'Peak 2', x: 40, y: 20, elevation: 500, group: 'peaks' },
    { id: 'v1', label: 'Valley 1', x: 20, y: 70, elevation: 100, group: 'valleys' },
  ];
  render(<TopographicMapExplorer config={{ contours, points, targetPattern: 'band' }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: /choose band/i }));
  expect(screen.getByTestId('widget-topographic-map-explorer')).toHaveAttribute('data-state', 'exploring');
  expect(screen.getByRole('status')).toHaveTextContent(/at least two.*same named group/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  expect(onEvent.mock.calls).toContainEqual([{ type: 'interaction', action: 'select-pattern' }]);
  expect(onEvent.mock.calls).toContainEqual([{ type: 'change', value: { selectedPointId: null, selectedPattern: 'band', selectedPointIds: [] } }]);
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

test('rejects a coordinate that parses to a nonfinite number', () => {
  const nonfiniteCoordinate = `1${'0'.repeat(309)}`;
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({
    contours: [{ elevation: 300, points: `0,0 ${nonfiniteCoordinate},1` }],
    points,
  }).success).toBe(false);
});

test('rejects duplicate point ids', () => {
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({
    contours,
    points: [points[0]!, { id: 'summit', label: 'Trail marker', elevation: 300 }],
  }).success).toBe(false);
});

test('rejects a blank point label', () => {
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse({
    contours,
    points: [{ id: 'summit', label: ' \t ', elevation: 500 }, points[1]!],
  }).success).toBe(false);
});

test('rejects finite coordinates whose derived SVG bounds overflow and renders finite positive bounds for accepted large coordinates', () => {
  const large = `1${'0'.repeat(300)}`;
  const extreme = `1${'0'.repeat(308)}`;
  const accepted = { contours: [{ elevation: 300, points: `-${large},0 ${large},1` }], points };
  const rejected = { contours: [{ elevation: 300, points: `-${extreme},0 ${extreme},1` }], points };
  const combinedOverflow = {
    contours: [
      { elevation: 300, points: `${extreme},0 ${extreme},1` },
      { elevation: 500, points: `-${extreme},0 -${extreme},1` },
    ],
    points,
  };

  expect(TopographicMapExplorerWidgetConfigSchema.safeParse(rejected).success).toBe(false);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse(combinedOverflow).success).toBe(false);
  expect(TopographicMapExplorerWidgetConfigSchema.safeParse(accepted).success).toBe(true);
  render(<TopographicMapExplorer config={accepted} onEvent={vi.fn()} />);
  const bounds = screen.getByRole('img', { name: /Topographic contour model: C1/ }).getAttribute('viewBox')!.split(' ').map(Number);
  expect(bounds).toHaveLength(4);
  expect(bounds.every(Number.isFinite)).toBe(true);
  expect(bounds[2]).toBeGreaterThan(0);
  expect(bounds[3]).toBeGreaterThan(0);
});
