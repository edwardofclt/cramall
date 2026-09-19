import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { LessonPlayer } from '../lesson/LessonPlayer';
import { createLiveTutor, type LiveOptions } from './realtime';
import { allLessons } from '../content/subjects';
vi.mock('./realtime', () => ({ createLiveTutor: vi.fn() }));
const sessions: ReturnType<typeof createLiveTutor>[] = [];
const options: LiveOptions[] = [];
beforeEach(() => {
  sessions.length = 0; options.length = 0;
  vi.stubGlobal('speechSynthesis', undefined);
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({liveAvailable:true}))));
  vi.mocked(createLiveTutor).mockImplementation(o => {
    options.push(o);
    const s = {connect:vi.fn(async () => o.onStatus('ready')),sendQuestion:vi.fn(),setContext:vi.fn(),setEvidence:vi.fn(),interrupt:vi.fn(),setMicrophone:vi.fn((on:boolean) => o.onMicChange(on)),close:vi.fn()}; sessions.push(s); return s;
  });
});
afterEach(() => { cleanup(); vi.clearAllMocks(); vi.unstubAllGlobals(); });
function Navigation() {
  const navigate = useNavigate();
  return <><button onClick={() => navigate(-1)}>Browser back</button><button onClick={() => navigate('/lesson/math-u01-l01/quiz')}>Open scored check</button></>;
}
function mount(path:string) {
  render(<MemoryRouter initialEntries={[path]}><Navigation /><Routes><Route path="/lesson/:lessonId" element={<LessonPlayer />} /><Route path="/lesson/:lessonId/quiz" element={<h1>Scored check</h1>} /></Routes></MemoryRouter>);
  return userEvent.setup();
}
async function startActivity(user:ReturnType<typeof userEvent.setup>) {
  for (let i=0;i<5;i++) {
    const start = screen.queryByRole('button',{name:'Try it'});
    if (start) { await user.click(start); return; }
    await user.click(await screen.findByRole('button',{name:'Next'}));
  }
  throw new Error('Activity intro did not finish');
}
it('uses the actual number, keeps the widget through collapse, updates on navigation, and stops for a scored check', async () => {
  const user = mount('/lesson/math-u01-l01?step=card:math-u01-l01-c1');
  await startActivity(user);
  const add = await screen.findByRole('button',{name:'Add one to the hundreds place'});
  await user.click(add); await user.click(add); await user.click(add);
  await user.click(screen.getByRole('button',{name:'Ask Nutty'}));
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  expect(options[0].selection).toEqual({lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c1',activity:{value:300}});
  act(() => options[0].onMessage({id:'one',role:'assistant',text:'You have three hundreds.'}));
  await user.click(screen.getByRole('button',{name:'Close guide'}));
  expect(screen.getByTestId('pv-standard')).toHaveTextContent('300');
  expect(sessions[0].close).toHaveBeenCalled();
  await user.click(screen.getByRole('button',{name:'Ask Nutty'}));
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  expect(options[1].history).toEqual(expect.arrayContaining([expect.objectContaining({text:'You have three hundreds.'})]));
  await user.click(screen.getByRole('button',{name:'Next step'}));
  await waitFor(() => expect(sessions[1].setContext).toHaveBeenLastCalledWith({lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c2'}));
  expect(screen.getByRole('log')).toHaveTextContent('three hundreds');
  await user.click(screen.getByRole('button',{name:'Browser back'}));
  await startActivity(user);
  await waitFor(() => expect(sessions[1].setContext).toHaveBeenLastCalledWith({lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c1',activity:{value:0}}));
  await user.click(screen.getByRole('button',{name:'Open scored check'}));
  expect(sessions[1].close).toHaveBeenCalled();
  expect(screen.queryByRole('complementary',{name:/AI guide/})).not.toBeInTheDocument();
});
it('keeps the reading source available and sends selected evidence without assessment fields', async () => {
  const user = mount('/lesson/reading-u04-l01?step=card:reading-u04-l01-c2');
  expect(await screen.findByRole('region',{name:'Lesson source: The Extra Row'})).toHaveTextContent('Their two families began trading garden tasks and vegetables.');
  await startActivity(user);
  await user.click(await screen.findByRole('button',{name:'Choose theme Generosity strengthens a community'}));
  await user.click(screen.getByRole('button',{name:/Toggle evidence.*source quote carried over/}));
  await user.click(screen.getByRole('button',{name:'Ask Winnie'}));
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  expect(options[0].selection).toEqual({lessonId:'reading-u04-l01',stageKey:'card:reading-u04-l01-c2',activity:{theme:'Generosity strengthens a community',evidenceIds:['shares']}});
  expect(JSON.stringify(options[0].selection)).not.toMatch(/correct|supports|answer|quiz/);
  await user.click(screen.getByRole('button',{name:'Next step'}));
  expect(await screen.findByRole('region',{name:'Lesson source: The Extra Row'})).toHaveTextContent('Their two families began trading garden tasks and vegetables.');
  expect(sessions[0].setContext).toHaveBeenLastCalledWith({lessonId:'reading-u04-l01',stageKey:'card:reading-u04-l01-c3'});
});
it.each([
  ['science-u01-l01','Sandy'],
  ['social-studies-u01-l01','Pip'],
  ['math-u12-l01','Nutty'],
  ['reading-u11-l01','Winnie'],
])('offers the guide throughout %s without starting a connection on open', async (lessonId, name) => {
  const user = mount(`/lesson/${lessonId}?step=worked`);
  await user.click(await screen.findByRole('button',{name:`Ask ${name}`}));
  expect(createLiveTutor).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  expect(options[0].selection).toEqual({lessonId,stageKey:'worked'});
  expect(sessions[0].sendQuestion).toHaveBeenCalledWith('Explain the idea in this step to me.');
});
it('shares an actual Social Studies placement and clears it when the activity is reset', async () => {
  const lesson = allLessons().find(item => item.learnCards.some(card => card.widget?.type === 'history-timeline'))!;
  const card = lesson.learnCards.find(item => item.widget?.type === 'history-timeline')!;
  if (card.widget?.type !== 'history-timeline') throw new Error('Missing timeline fixture');
  const user = mount(`/lesson/${lesson.id}?step=card:${card.id}`);
  await startActivity(user);
  await user.click(await screen.findByRole('button',{name:new RegExp(`Select.*${card.widget.config.events[0].title}`)}));
  await user.click(screen.getByRole('button',{name:/Place.*Position 1/}));
  await user.click(screen.getByRole('button',{name:'Ask Pip'}));
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  expect(options[0].selection?.activity).toEqual({placements:{[card.widget.config.events[0].id]:'position-1'}});
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(sessions[0].setContext).toHaveBeenLastCalledWith(expect.objectContaining({activity:{placements:{}}}));
});
