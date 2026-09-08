import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { InlineTutor } from './InlineTutor';
import { ReadAloudButton } from '../lesson/ReadAloudButton';
import { createLiveTutor, type LiveOptions } from './realtime';
vi.mock('./realtime', () => ({ createLiveTutor: vi.fn() }));
const sessions: ReturnType<typeof createLiveTutor>[] = [];
const options: LiveOptions[] = [];
const initial = {lessonId:'math-u01-l01',stageKey:'intro'};
beforeEach(() => {
  sessions.length = 0; options.length = 0;
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({liveAvailable:true}))));
  vi.mocked(createLiveTutor).mockImplementation(o => {
    options.push(o);
    const session = {connect:vi.fn(async () => o.onStatus('ready')),sendQuestion:vi.fn(),setEvidence:vi.fn(),setContext:vi.fn(),interrupt:vi.fn(),setMicrophone:vi.fn((on:boolean) => o.onMicChange(on)),close:vi.fn()};
    sessions.push(session); return session;
  });
});
afterEach(() => { cleanup(); vi.clearAllMocks(); vi.unstubAllGlobals(); });
async function open() {
  const user = userEvent.setup();
  await user.click(await screen.findByRole('button', {name:'Ask Nutty'}));
  return user;
}
it('opens quietly, starts on request, and preserves the conversation while the lesson moves', async () => {
  const view = render(<InlineTutor selection={initial} />);
  const user = await open();
  expect(createLiveTutor).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button', {name:'Explain this'}));
  expect(sessions[0].sendQuestion).toHaveBeenCalledWith('Explain the idea in this step to me.');
  act(() => options[0].onMessage({id:'reply',role:'assistant',text:'Each place is ten times the place to its right.'}));
  view.rerender(<InlineTutor selection={{...initial,stageKey:'worked'}} />);
  expect(sessions[0].setContext).toHaveBeenLastCalledWith({...initial,stageKey:'worked'});
  expect(createLiveTutor).toHaveBeenCalledOnce();
  expect(screen.getByRole('log')).toHaveTextContent('Each place is ten times');
  await user.click(screen.getByRole('button', {name:'Close guide'}));
  expect(sessions[0].close).toHaveBeenCalled();
  await user.click(screen.getByRole('button', {name:'Ask Nutty'}));
  expect(screen.getByRole('log')).toHaveTextContent('Each place is ten times');
});
it.each([false, 'network'])('disables quietly when availability is %s', async result => {
  vi.mocked(fetch).mockImplementation(async () => { if (result === 'network') throw new Error('Offline'); return new Response(JSON.stringify({liveAvailable:false,reason:'missing_api_key'})); });
  render(<InlineTutor selection={initial} />);
  expect(await screen.findByText('Guide unavailable')).toBeVisible();
  expect(screen.getByRole('button', {name:'Ask Nutty'})).toBeDisabled();
  expect(createLiveTutor).not.toHaveBeenCalled();
  expect(document.body).not.toHaveTextContent(/API key|sample|billing/i);
});
it('disables after a provider failure without showing server setup details', async () => {
  render(<InlineTutor selection={initial} />);
  const user = await open();
  const factory = vi.mocked(createLiveTutor).getMockImplementation()!;
  vi.mocked(createLiveTutor).mockImplementationOnce(o => {
    const session = factory(o);
    session.connect = vi.fn(async () => { o.onUnavailable?.(); o.onError('Your API key has no credit_balance.'); });
    return session;
  });
  await user.click(screen.getByRole('button', {name:'Explain this'}));
  expect(screen.getByRole('button', {name:'Explain this'})).toBeDisabled();
  expect(document.body).not.toHaveTextContent(/API key|credit_balance/);
  expect(sessions[0].sendQuestion).not.toHaveBeenCalled();
});
it('does not send a stale request if the step changes during setup', async () => {
  let finish!: () => void;
  const factory = vi.mocked(createLiveTutor).getMockImplementation()!;
  vi.mocked(createLiveTutor).mockImplementationOnce(o => { const s = factory(o); s.connect = vi.fn(() => new Promise<void>(resolve => { finish = resolve; })); return s; });
  const view = render(<InlineTutor selection={initial} />);
  const user = await open();
  await user.click(screen.getByRole('button', {name:'Explain this'}));
  view.rerender(<InlineTutor selection={{...initial,stageKey:'worked'}} />);
  await act(async () => finish());
  expect(sessions[0].sendQuestion).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button', {name:'Explain this'}));
  expect(sessions[0].sendQuestion).toHaveBeenCalledOnce();
  view.unmount();
  expect(sessions[0].close).toHaveBeenCalled();
});

it('coordinates live audio with the existing reader', async () => {
  vi.stubGlobal('speechSynthesis', {speak:vi.fn(),cancel:vi.fn()});
  vi.stubGlobal('SpeechSynthesisUtterance', class { onend = null; onerror = null; rate = 1; constructor(public text:string) {} });
  render(<><InlineTutor selection={initial} /><ReadAloudButton text="A lesson" /></>);
  const user = await open();
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  await user.click(screen.getByRole('button',{name:'Read aloud'}));
  expect(sessions[0].setMicrophone).toHaveBeenLastCalledWith(false);
  expect(sessions[0].interrupt).toHaveBeenCalled();
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  expect(screen.getByRole('button',{name:'Read aloud'})).toBeVisible();
  expect(window.speechSynthesis.cancel).toHaveBeenCalled();
});
it('keeps runtime unavailability disabled during the retry cooldown', async () => {
  render(<InlineTutor selection={initial} />);
  const user = await open();
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  act(() => options[0].onUnavailable?.());
  act(() => window.dispatchEvent(new Event('focus')));
  expect(fetch).toHaveBeenCalledOnce();
  expect(screen.getByRole('button',{name:'Explain this'})).toBeDisabled();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
it('ignores an older availability response that arrives after a runtime failure', async () => {
  render(<InlineTutor selection={initial} />);
  const user = await open();
  await user.click(screen.getByRole('button',{name:'Explain this'}));
  let finish!: (response: Response) => void;
  vi.mocked(fetch).mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
  act(() => window.dispatchEvent(new Event('focus')));
  act(() => options[0].onUnavailable?.());
  await act(async () => finish(new Response(JSON.stringify({liveAvailable:true}))));
  expect(screen.getByRole('button',{name:'Explain this'})).toBeDisabled();
});
it('lets a narrow-screen learner return to an already-open guide without reconnecting', async () => {
  render(<InlineTutor selection={initial} />);
  const user = await open();
  await user.click(screen.getByRole('button',{name:'Back to Nutty'}));
  expect(screen.getByRole('heading',{name:'Talk it through with Nutty'})).toHaveFocus();
  expect(createLiveTutor).not.toHaveBeenCalled();
});
