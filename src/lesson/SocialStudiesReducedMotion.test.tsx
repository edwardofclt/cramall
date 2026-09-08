import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import { LessonPlayer } from './LessonPlayer';

vi.mock('../app/useReducedMotionPref', () => ({ useReducedMotionPref: () => true }));
// Keep this preference test scoped to the four history components.
vi.mock('../widgets/registry', async () => {
  const { lazy } = await import('react');
  return { widgetRegistry: {
    'history-evidence-board': lazy(() => import('../widgets/social-studies/HistoryEvidenceBoard')),
    'history-cause-effect': lazy(() => import('../widgets/social-studies/HistoryCauseEffect')),
    'history-map': lazy(() => import('../widgets/social-studies/HistoryMap')),
    'history-timeline': lazy(() => import('../widgets/social-studies/HistoryTimeline')),
  } };
});

test.each([
  ['social-studies-u01-l01', 'history-evidence-board'],
  ['social-studies-u01-l02', 'history-cause-effect'],
  ['social-studies-u01-l03', 'history-map'],
  ['social-studies-u01-l05', 'history-timeline'],
])('%s supports Pip coaching and source interaction with reduced motion', async (id, type) => {
  const user = userEvent.setup();
  const storage = vi.spyOn(Storage.prototype, 'setItem');
  render(<MemoryRouter initialEntries={[`/lesson/${id}?step=card:${id}-c2`]}>
    <Routes><Route path="/lesson/:lessonId" element={<LessonPlayer />} /></Routes>
  </MemoryRouter>);
  expect(screen.getByTestId('character-pip')).toHaveAttribute('data-pose', 'talk');
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.getByTestId('character-pip')).toHaveAttribute('data-pose', 'idle');
  await user.click(screen.getByRole('button', { name: 'Try it' }));
  expect(await screen.findByTestId(`widget-${type}`)).toHaveAttribute('data-state', 'building');
  const card = within(screen.getByRole('group', { name: '1. Select a source card' })).getAllByRole('button')[0];
  expect(card).toHaveFocus();
  await user.click(card);
  await user.click(within(screen.getByRole('group', { name: '2. Build the connections' })).getAllByRole('button')[0]);
  expect(screen.getByRole('region', { name: 'Historical sources' })).toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Placement feedback' }).textContent).toMatch(/Correct:|Try again:/);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(card).toHaveFocus();
  expect(storage).not.toHaveBeenCalled();
  storage.mockRestore();
});
