import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LessonPlayer } from './LessonPlayer';
import { findLesson } from '../content/subjects';
import { widgetSpeechText } from '../widgets/widgetSpeechText';

const prototypes = [
  { lessonId: 'math-u09-l04', cardId: 'math-u09-l04-c3', guide: 'nutty', type: 'scale-reading', label: 'Weigh the kit' },
  { lessonId: 'reading-u01-l01', cardId: 'reading-u01-l01-c2', guide: 'winnie', type: 'phrase-pathfinder', label: 'Plan my reading' },
  { lessonId: 'science-u05-l04', cardId: 'science-u05-l04-c3', guide: 'sandy', type: 'device-retest', label: 'Compare the refinement' },
];

test.each(prototypes)('$lessonId loads its real activity only after the one-action conversation', async ({ lessonId, cardId, guide, type, label }) => {
  const user = userEvent.setup();
  const before = window.localStorage.getItem('cramall.v1');
  render(<MemoryRouter initialEntries={[`/lesson/${lessonId}?step=card:${cardId}`]}><Routes><Route path="/lesson/:lessonId" element={<LessonPlayer />} /></Routes></MemoryRouter>);
  const intro = await screen.findByTestId('widget-coach-intro');
  expect(within(intro).getByTestId(`character-${guide}`)).toBeVisible();
  expect(screen.queryByTestId(`widget-${type}`)).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Next' })).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: label }));
  const activity = await screen.findByTestId(`widget-${type}`);
  expect(screen.queryByTestId('widget-coach-intro')).not.toBeInTheDocument();
  await waitFor(() => expect(activity.contains(document.activeElement)).toBe(true));
  expect(screen.queryByTestId('widget-napping')).not.toBeInTheDocument();
  expect(window.localStorage.getItem('cramall.v1')).toBe(before);
});

test('new read-aloud text includes source information without supplying hidden outcomes', () => {
  const refs = prototypes.map(({ lessonId, cardId }) => findLesson(lessonId)!.lesson.learnCards.find(card => card.id === cardId)!.widget!);
  expect(widgetSpeechText(refs[0]!).join(' ')).not.toMatch(/6 ounces|4 kilograms/);
  expect(widgetSpeechText(refs[1]!).join(' ')).toContain('The tray marked “shade” belonged under the oak');
  expect(widgetSpeechText(refs[2]!).join(' ')).toContain('6, 7, 6');
  expect(widgetSpeechText(refs[2]!).join(' ')).not.toContain('10, 10, 10');
});
