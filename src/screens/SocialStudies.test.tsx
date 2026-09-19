import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, expect, test } from 'vitest';
import { Home } from './Home';
import { SubjectMap } from './SubjectMap';
import { ProgressScreen } from './ProgressScreen';
import { ParentCorner } from './ParentCorner';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, exportSave, importSave, loadSave, persist, recordAttempt, setParentChecked } from '../progress/storage';

beforeEach(() => window.localStorage.clear());
function show(path: string) {
  return render(<ProgressProvider><MemoryRouter initialEntries={[path]}><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/subject/:subjectId" element={<SubjectMap />} />
    <Route path="/progress" element={<ProgressScreen />} />
    <Route path="/parent" element={<ParentCorner />} />
  </Routes></MemoryRouter></ProgressProvider>);
}

test('Home and the real subject map expose all thirty social studies lessons with Pip', () => {
  const home = show('/');
  expect(screen.getByRole('link', {name:/Social Studies — 0 of 30 lessons done/i})).toHaveAttribute('href','/subject/social-studies');
  expect(screen.getByRole('img', {name:'Pip the Carolina wren'})).toBeInTheDocument();
  home.unmount();
  show('/subject/social-studies');
  expect(screen.getByRole('heading', {name:'Social Studies'})).toBeInTheDocument();
  const lessons = screen.getAllByRole('link').filter(link=>link.getAttribute('href')?.startsWith('/lesson/social-studies-'));
  expect(lessons).toHaveLength(30);
  expect(lessons[0]).toHaveAttribute('href','/lesson/social-studies-u01-l01');
  expect(lessons[6]).toHaveAttribute('href','/lesson/social-studies-u02-l01?peek=1');
});

test('a new Social Studies attempt coexists with original progress through refresh and export/import', () => {
  let old=defaultSave();
  for (const id of ['math-u01-l01','reading-u01-l01','science-u01-l01']) {
    old=recordAttempt(old,id,{date:'2026-09-07',score:9,total:10,missedConceptTags:[]},8);
  }
  old=setParentChecked(old,'math-u01-l01',true);
  const restored=importSave(exportSave(old));
  const updated=recordAttempt(restored,'social-studies-u01-l01',{date:'2026-09-07',score:8,total:10,missedConceptTags:['history-card-2']},8);
  expect(persist(updated)).toBe(true);
  const loaded=loadSave();
  for (const id of Object.keys(old.lessons)) expect(loaded.lessons[id]).toEqual(old.lessons[id]);
  expect(loaded.parentChecked).toEqual(old.parentChecked);
  expect(importSave(exportSave(loaded))).toEqual(updated);
  expect(window.localStorage.getItem('cramall.v1')).toBe(JSON.stringify(updated));
  show('/progress');
  expect(screen.getByRole('progressbar',{name:'Social Studies completion'})).toHaveAttribute('aria-valuenow','1');
  expect(screen.getByRole('progressbar',{name:'Social Studies completion'})).toHaveAttribute('aria-valuemax','30');
});

test('Parent Corner provides Social Studies spot checks and its official source', () => {
  show('/parent');
  expect(screen.getByRole('link',{name:'2019 South Carolina Social Studies College- and Career-Ready Standards'})).toHaveAttribute('href',expect.stringContaining('ed.sc.gov'));
  const row = screen.getByRole('row',{name:/When Cultures Met/});
  expect(within(row).getByRole('checkbox')).not.toBeChecked();
});
