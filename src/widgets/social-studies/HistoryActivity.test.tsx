import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import HistoryTimeline from './HistoryTimeline';
import HistoryMap from './HistoryMap';
import HistoryEvidenceBoard from './HistoryEvidenceBoard';
import HistoryCauseEffect from './HistoryCauseEffect';
import { causeConfig, evidenceConfig, historyBase, mapConfig, timelineConfig } from './history-fixtures';

const families = [
  {
    type: 'history-timeline',
    renderWidget: (onEvent: ReturnType<typeof vi.fn>) => <HistoryTimeline config={timelineConfig} onEvent={onEvent} />,
    surface: 'Your timeline',
    items: ['New government begins', 'Articles take effect', 'States approve'],
    targets: ['Position 3 (latest)', 'Position 1 (earliest)', 'Position 2'],
    wrongTarget: 'Position 1 (earliest)',
    placements: { began: 'position-3', articles: 'position-1', approved: 'position-2' },
  },
  {
    type: 'history-map',
    renderWidget: (onEvent: ReturnType<typeof vi.fn>) => <HistoryMap config={mapConfig} onEvent={onEvent} />,
    surface: 'Your map connections',
    items: ['The northwest is farther from the ocean.', 'Ships reached this coastal port.'],
    targets: ['Upcountry', 'Charleston'],
    wrongTarget: 'Charleston',
    placements: { inland: 'upcountry', port: 'charleston' },
  },
  {
    type: 'history-evidence-board',
    renderWidget: (onEvent: ReturnType<typeof vi.fn>) => <HistoryEvidenceBoard config={evidenceConfig} onEvent={onEvent} />,
    surface: 'Your evidence board',
    items: ['The Articles took effect in 1781.', 'States approved the Constitution in 1788.'],
    targets: ['First national plan', 'New national plan'],
    wrongTarget: 'New national plan',
    placements: { 'articles-card': 'first', 'constitution-card': 'new' },
  },
  {
    type: 'history-cause-effect',
    renderWidget: (onEvent: ReturnType<typeof vi.fn>) => <HistoryCauseEffect config={causeConfig} onEvent={onEvent} />,
    surface: 'Your cause and effect connections',
    items: ['The Articles take effect.', 'A new government can begin.'],
    targets: ['States approve the first plan', 'Enough states approve the Constitution'],
    wrongTarget: 'Enough states approve the Constitution',
    placements: { first: 'agreement', new: 'approval' },
  },
];

describe.each(families)('$type interaction', family => {
  test('selection does not grade; placement builds a visible relationship, gives feedback, and recovers', async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    render(family.renderWidget(onEvent));
    expect(screen.queryByRole('button', { name: historyBase.explain.choices[0].text })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: `Select ${family.items[0]}` }));
    expect(screen.getByRole('button', { name: `Select ${family.items[0]}` })).toHaveAttribute('aria-pressed', 'true');
    expect(onEvent.mock.calls.map(([event]) => event)).toEqual([{ type: 'interaction', action: 'select' }]);
    expect(screen.getByLabelText('Placement feedback')).not.toHaveTextContent(/Correct:|Try again:/);
    await user.click(screen.getByRole('button', { name: `Place selected card: ${family.wrongTarget}` }));
    expect(screen.getByLabelText('Placement feedback')).toHaveTextContent('Try again:');
    expect(within(screen.getByRole('region', { name: family.surface })).getByText(family.items[0])).toBeVisible();
    expect(onEvent.mock.calls.some(([event]) => event.type === 'coach' && event.cue === 'retry')).toBe(true);
    for (let index = 0; index < family.items.length; index++) {
      await user.click(screen.getByRole('button', { name: `Select ${family.items[index]}` }));
      await user.click(screen.getByRole('button', { name: `Place selected card: ${family.targets[index]}` }));
    }
    expect(screen.getByLabelText('Placement feedback')).not.toHaveTextContent('Try again:');
    expect(screen.getByLabelText('Placement feedback')).toHaveTextContent('Correct:');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'change').slice(-1)[0]?.[0]).toEqual({ type: 'change', value: { placements: family.placements } });
    expect(screen.getByTestId(`widget-${family.type}`)).toHaveAttribute('data-state', 'explaining');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  });

  test('requires an explanation, retains sources and earlier feedback, and invalidates completion after revision', async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    render(family.renderWidget(onEvent));
    for (let index = 0; index < family.items.length; index++) {
      await user.click(screen.getByRole('button', { name: `Select ${family.items[index]}` }));
      await user.click(screen.getByRole('button', { name: `Place selected card: ${family.targets[index]}` }));
    }
    const placementFeedback = screen.getByLabelText('Placement feedback').textContent;
    await user.click(screen.getByRole('button', { name: historyBase.explain.choices[1].text }));
    expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent('Try again:');
    expect(screen.getByLabelText('Placement feedback').textContent).toBe(placementFeedback);
    expect(screen.getByTestId(`widget-${family.type}`)).toHaveAttribute('data-state', 'explaining');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: historyBase.explain.choices[0].text }));
    expect(screen.getByTestId(`widget-${family.type}`)).toHaveAttribute('data-state', 'complete');
    expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent(historyBase.explain.explanation);
    expect(screen.getByLabelText('Placement feedback').textContent).toBe(placementFeedback);
    for (const source of historyBase.sources) {
      expect(screen.getByRole('heading', { name: source.title })).toBeVisible();
      expect(screen.getByText(source.text)).toBeVisible();
    }
    await user.click(screen.getByRole('button', { name: historyBase.explain.choices[0].text }));
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toEqual([[{ type: 'complete', value: { explanationId: 'approval' } }]]);
    await user.click(screen.getByRole('button', { name: `Select ${family.items[0]}` }));
    await user.click(screen.getByRole('button', { name: `Place selected card: ${family.wrongTarget}` }));
    expect(screen.getByTestId(`widget-${family.type}`)).toHaveAttribute('data-state', 'building');
    expect(screen.getByLabelText('Explanation feedback')).not.toHaveTextContent('Correct:');
    expect(screen.queryByRole('button', { name: historyBase.explain.choices[0].text })).not.toBeInTheDocument();
    for (let index = 0; index < family.items.length; index++) {
      await user.click(screen.getByRole('button', { name: `Select ${family.items[index]}` }));
      await user.click(screen.getByRole('button', { name: `Place selected card: ${family.targets[index]}` }));
    }
    expect(screen.getByRole('button', { name: historyBase.explain.choices[0].text })).toHaveAttribute('aria-pressed', 'false');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: historyBase.explain.choices[0].text }));
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(2);
  });

  test('supports native keyboard actions and resets local state with focus without writing storage', async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    const storageWrite = vi.spyOn(Storage.prototype, 'setItem');
    render(family.renderWidget(onEvent));
    const first = screen.getByRole('button', { name: `Select ${family.items[0]}` });
    first.focus();
    await user.keyboard('{Enter}');
    const target = screen.getByRole('button', { name: `Place selected card: ${family.targets[0]}` });
    target.focus();
    await user.keyboard(' ');
    expect(screen.getByLabelText('Placement feedback')).toHaveTextContent('Correct:');
    await user.click(screen.getByRole('button', { name: 'Start over' }));
    expect(first).toHaveFocus();
    expect(first).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByLabelText('Placement feedback')).not.toHaveTextContent('Correct:');
    expect(onEvent.mock.calls.filter(([event]) => event.type === 'change').slice(-1)[0]?.[0]).toEqual({ type: 'change', value: { placements: {} } });
    expect(screen.getByTestId(`widget-${family.type}`)).toHaveAttribute('data-state', 'building');
    expect(storageWrite).not.toHaveBeenCalled();
    storageWrite.mockRestore();
  });
});

test('timeline replacement returns the displaced event to the bank and keeps one event per position', async () => {
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(<HistoryTimeline config={timelineConfig} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Select Articles take effect' }));
  await user.click(screen.getByRole('button', { name: 'Place selected card: Position 1 (earliest)' }));
  await user.click(screen.getByRole('button', { name: 'Select New government begins' }));
  await user.click(screen.getByRole('button', { name: 'Place selected card: Position 1 (earliest)' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'change').slice(-1)[0]?.[0]).toEqual({ type: 'change', value: { placements: { began: 'position-1' } } });
  const timeline = screen.getByRole('region', { name: 'Your timeline' });
  expect(within(timeline).queryByText('Articles take effect')).not.toBeInTheDocument();
  expect(within(timeline).getByText('New government begins')).toBeVisible();
  expect(screen.getByLabelText('Placement feedback')).toHaveTextContent(/returned to the card bank/i);
});

test.each(['south-carolina', 'united-states', 'colonial-regions'] as const)('map %s exposes dated geographic reference, north direction, numbered places, and complete location text', mapKind => {
  render(<HistoryMap config={{ ...mapConfig, mapKind }} onEvent={vi.fn()} />);
  expect(screen.getByText(/Schematic map — not to scale/)).toBeVisible();
  expect(screen.getByText(/1780–1789/)).toBeVisible();
  expect(screen.getByRole('img', { name: /North is up/ })).toBeVisible();
  for (const location of mapConfig.locations) {
    expect(screen.getByRole('heading', { name: new RegExp(location.label) })).toBeVisible();
    expect(screen.getByText(location.detail)).toBeVisible();
  }
});

test('map attachments update the numbered geographic key so a place is visibly connected to its evidence', async () => {
  const user = userEvent.setup();
  render(<HistoryMap config={mapConfig} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Select Ships reached this coastal port.' }));
  await user.click(screen.getByRole('button', { name: 'Place selected card: Charleston' }));
  expect(screen.getByLabelText('Map key')).toHaveTextContent('Charleston: 1 card attached');
  expect(screen.getByLabelText('Map key')).toHaveTextContent('Upcountry: 0 cards attached');
});

test('a replacement config discards old selections, construction, and explanation', async () => {
  const user = userEvent.setup();
  const view = render(<HistoryTimeline config={timelineConfig} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Select Articles take effect' }));
  await user.click(screen.getByRole('button', { name: 'Place selected card: Position 1 (earliest)' }));
  view.rerender(<HistoryTimeline config={{ ...timelineConfig, title: 'A different investigation' }} onEvent={vi.fn()} />);
  expect(screen.getByLabelText('Placement feedback')).not.toHaveTextContent('Correct:');
  expect(screen.getByRole('button', { name: 'Select Articles take effect' })).toHaveAttribute('aria-pressed', 'false');
  expect(within(screen.getByRole('region', { name: 'Your timeline' })).queryByText('Articles take effect')).not.toBeInTheDocument();
});
