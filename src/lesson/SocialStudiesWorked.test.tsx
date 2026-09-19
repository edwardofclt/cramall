import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import { LessonPlayer } from './LessonPlayer';

vi.mock('../content/subjects', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../content/subjects')>();
  const { unit01Lessons } = await import('../content/social-studies/u01');
  const subject = actual.getSubject('social-studies');
  return { ...actual, findLesson: (id: string) => id === unit01Lessons[0].id
    ? { subject, unit: subject.units[0], lesson: unit01Lessons[0] }
    : actual.findLesson(id) };
});

test('keeps historical field notes beside the worked example coaching', async () => {
  render(<MemoryRouter initialEntries={['/lesson/social-studies-u01-l01?step=worked']}>
    <Routes><Route path="/lesson/:lessonId" element={<LessonPlayer />} /></Routes>
  </MemoryRouter>);
  const source = await screen.findByRole('region', { name: 'Passage: Lesson field notes' });
  expect(source).toHaveAttribute('tabindex', '0');
  expect(within(source).getByText(/Colonization means settling a place/)).toBeInTheDocument();
  const coaching = screen.getByRole('complementary', { name: 'How to use the evidence' });
  expect(within(coaching).getAllByTestId('worked-step')).toHaveLength(4);
  expect(coaching).not.toContainElement(source);
});

test('Pip closes with a lesson-specific reflection before the Quick Check', async () => {
  render(<MemoryRouter initialEntries={['/lesson/social-studies-u01-l01?step=outro']}>
    <Routes><Route path="/lesson/:lessonId" element={<LessonPlayer />} /></Routes>
  </MemoryRouter>);
  expect(await screen.findByText('You used different details to explain a shared pattern of land disputes.')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Pip the Carolina wren' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Start Quick Check/ })).toBeInTheDocument();
});
