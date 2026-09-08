import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LessonPlayer } from './LessonPlayer';
import { mathWorkshopActivities } from '../content/math/workshopActivities';
import { readingWorkshopActivities } from '../content/reading/workshopActivities';
import { scienceWorkshopActivities } from '../content/science/workshopActivities';

const placements = [
  ...mathWorkshopActivities.map(item => ({ ...item, subject: 'math', guide: 'nutty' })),
  ...readingWorkshopActivities.map(item => ({ ...item, subject: 'reading', guide: 'winnie' })),
  ...scienceWorkshopActivities.map(item => ({ ...item, subject: 'science', guide: 'sandy' })),
];

test.each(placements)('$cardId replaces one-action dialogue with its actual authored experience', async ({ lessonId, cardId, subject, guide, config, coach }) => {
  const user = userEvent.setup();
  const before = window.localStorage.getItem('cramall.v1');
  render(<MemoryRouter initialEntries={[`/lesson/${lessonId}?step=card:${cardId}`]}><Routes><Route path="/lesson/:lessonId" element={<LessonPlayer />} /></Routes></MemoryRouter>);
  const intro = await screen.findByTestId('widget-coach-intro');
  expect(within(intro).getByTestId(`character-${guide}`)).toBeVisible();
  expect(screen.queryByTestId(`widget-${subject}-workshop`)).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Next' })).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: coach.startLabel! }));
  const activity = await screen.findByTestId(`widget-${subject}-workshop`);
  expect(activity).toHaveAttribute('data-activity', config.activity);
  expect(screen.queryByTestId('widget-coach-intro')).not.toBeInTheDocument();
  expect(screen.queryByTestId('widget-napping')).not.toBeInTheDocument();
  await waitFor(() => expect(activity.contains(document.activeElement)).toBe(true));
  expect(window.localStorage.getItem('cramall.v1')).toBe(before);
});
