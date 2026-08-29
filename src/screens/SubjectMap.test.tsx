import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { Lesson, Subject, Unit } from '../content/schema';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, persist, type SaveData } from '../progress/storage';
import { SubjectMap } from './SubjectMap';

const { FIXTURE } = vi.hoisted(() => {
  function lesson(unitId: string, n: number, title: string): Lesson {
    const id = `${unitId}-l${n}`;
    return {
      id,
      unitId,
      title,
      indicatorCodes: ['4.NSBT.1'],
      intro: [{ speaker: 'nutty', text: 'Here we go!' }],
      learnCards: [{ id: `${id}-c1`, title: 'Card', blocks: [{ kind: 'text', text: 'Body' }] }],
      workedExample: { title: 'Worked example', steps: ['Step one'] },
      quiz: { passThreshold: 8, pool: [] },
    };
  }

  function unit(number: number, title: string, prereqs: string[], lessonTitles: string[]): Unit {
    const id = `math-u0${number}`;
    return {
      id,
      subjectId: 'math',
      number,
      title,
      indicatorCodes: ['4.NSBT.1'],
      prerequisiteUnitIds: prereqs,
      lessons: lessonTitles.map((t, i) => lesson(id, i + 1, t)),
    };
  }

  const subject: Subject = {
    id: 'math',
    title: 'Math',
    guide: 'nutty',
    color: '#f59e0b',
    units: [
      unit(1, 'Place Value Party', [], ['Reading Big Numbers', 'Comparing Numbers', 'Rounding Rodeo']),
      unit(2, 'Adding Adventures', ['math-u01'], ['Adding It Up']),
      unit(3, 'Fraction Frontier', ['math-u02'], []),
    ],
  };

  return { FIXTURE: [subject] };
});

vi.mock('../content/subjects', () => ({
  SUBJECTS: FIXTURE,
  getSubject: (id: string) => FIXTURE.find((s) => s.id === id),
}));

const L1 = 'math-u01-l1';
const L2 = 'math-u01-l2';
const L3 = 'math-u01-l3';
const U2L1 = 'math-u02-l1';

function saveWithFirstLessonPassed(): SaveData {
  const save = defaultSave();
  save.lessons[L1] = { status: 'passed', bestScore: 10, attempts: [] };
  return save;
}

function renderMap(save: SaveData, entry = '/subject/math') {
  persist(save);
  return render(
    <ProgressProvider>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="/" element={<h1>Home screen</h1>} />
          <Route path="/subject/:subjectId" element={<SubjectMap />} />
        </Routes>
      </MemoryRouter>
    </ProgressProvider>,
  );
}

function lessonLink(title: string) {
  return screen.getByText(title, { selector: '.lesson-node-title' }).closest('a')!;
}

describe('SubjectMap', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('shows the subject title, its guide, and every unit in order', () => {
    renderMap(defaultSave());

    expect(screen.getByRole('heading', { name: /math/i })).toBeInTheDocument();
    expect(screen.getByTestId('character-nutty')).toBeInTheDocument();

    const units = screen.getAllByTestId('unit-title').map((el) => el.textContent);
    expect(units).toEqual(['Place Value Party', 'Adding Adventures', 'Fraction Frontier']);
  });

  test('marks the up-next lesson with START HERE once the previous one is passed', () => {
    renderMap(saveWithFirstLessonPassed());

    const badges = screen.getAllByText('START HERE');
    expect(badges).toHaveLength(1);
    expect(lessonLink('Comparing Numbers')).toContainElement(badges[0]!);
    expect(lessonLink('Comparing Numbers')).toHaveAttribute('href', `/lesson/${L2}`);
  });

  test('a passed lesson shows its stars and links straight to the lesson', () => {
    renderMap(saveWithFirstLessonPassed());

    const link = lessonLink('Reading Big Numbers');
    expect(link).toHaveAttribute('href', `/lesson/${L1}`);
    expect(link).toHaveAttribute('data-state', 'passed');
    expect(link).toHaveAccessibleName(/passed/i);
    expect(link).toHaveAccessibleName(/3 stars/i);
  });

  test('a not-ready lesson stays a working link that peeks', () => {
    renderMap(saveWithFirstLessonPassed());

    const later = lessonLink('Rounding Rodeo');
    expect(later).toHaveAttribute('href', `/lesson/${L3}?peek=1`);
    expect(later).toHaveAttribute('data-state', 'locked');
    expect(later).toHaveAccessibleName(/finish comparing numbers first/i);
    expect(later).toHaveTextContent(/finish comparing numbers first/i);
    expect(later).toHaveTextContent('🔒');
    expect(later).not.toHaveTextContent('🔒🔒');

    // A lesson in a unit whose prerequisite unit is unfinished is locked too.
    const nextUnit = lessonLink('Adding It Up');
    expect(nextUnit).toHaveAttribute('href', `/lesson/${U2L1}?peek=1`);
    expect(nextUnit).toHaveAccessibleName(/finish place value party first/i);
    expect(nextUnit).toHaveTextContent(/finish place value party first/i);
  });

  test('a unit with no lessons yet shows a Coming soon chip', () => {
    renderMap(defaultSave());

    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /fraction frontier/i })).toBeNull();
  });

  test('the very first lesson is the START HERE node on a fresh save', () => {
    renderMap(defaultSave());

    expect(lessonLink('Reading Big Numbers')).toHaveAttribute('data-state', 'start');
    expect(screen.getAllByText('START HERE')).toHaveLength(1);
  });

  test('an unknown subject id redirects home instead of crashing', () => {
    renderMap(defaultSave(), '/subject/bogus');

    expect(screen.getByRole('heading', { name: 'Home screen' })).toBeInTheDocument();
  });

  test('offers a way back home', () => {
    renderMap(defaultSave());

    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });
});
