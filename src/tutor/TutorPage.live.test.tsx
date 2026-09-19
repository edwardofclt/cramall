import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TutorPage } from './TutorPage';
import { createLiveTutor, type LiveOptions } from './realtime';

vi.mock('./realtime', () => ({ createLiveTutor: vi.fn() }));
const sessions: ReturnType<typeof createLiveTutor>[] = [];
beforeEach(() => {
  sessions.length = 0;
  vi.stubGlobal('speechSynthesis', undefined);
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ liveAvailable: true }), { status: 200 })));
  vi.mocked(createLiveTutor).mockImplementation((options: LiveOptions) => {
    const session = {
      connect: vi.fn(async () => { options.onStatus('connecting'); options.onStatus('ready'); }),
      sendQuestion: vi.fn(), setEvidence: vi.fn(), setContext: vi.fn(), interrupt: vi.fn(),
      setMicrophone: vi.fn((enabled: boolean) => options.onMicChange(enabled)),
      close: vi.fn(() => options.onMicChange(false)),
    };
    sessions.push(session);
    return session;
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.clearAllMocks(); });
async function startLive() {
  const user = userEvent.setup();
  render(<MemoryRouter><TutorPage /></MemoryRouter>);
  await screen.findByText('Live voice is available for adult review.');
  await user.click(screen.getByRole('button', { name: /Live voice.*Adult review/ }));
  return user;
}

describe('live tutor controls', () => {
  it('starts only on a request and closes the microphone when switching back to sample', async () => {
    const user = await startLive();
    expect(createLiveTutor).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    expect(sessions[0].sendQuestion).toHaveBeenCalledWith('Explain this idea to me.');
    await user.click(screen.getByRole('button', { name: 'Turn microphone on' }));
    expect(sessions[0].setMicrophone).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole('button', { name: 'Try the sample' }));
    expect(sessions[0].close).toHaveBeenCalled();
    expect(screen.getByRole('log')).toBeEmptyDOMElement();
  });
  it('allows a fresh session after page exit and a cached page return', async () => {
    const user = await startLive();
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    act(() => { window.dispatchEvent(new Event('pagehide')); window.dispatchEvent(new Event('pageshow')); });
    expect(sessions[0].close).toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Give me an example' }));
    expect(createLiveTutor).toHaveBeenCalledTimes(2);
    expect(sessions[1].sendQuestion).toHaveBeenCalledWith('Give me an example.');
  });
  it('recovers from setup failure without sending a question to a closed session', async () => {
    const user = await startLive();
    const factory = vi.mocked(createLiveTutor).getMockImplementation()!;
    vi.mocked(createLiveTutor).mockImplementationOnce(options => {
      const session = factory(options);
      session.connect = vi.fn(async () => { session.close(); options.onError('Voice setup failed. Try again.'); });
      return session;
    });
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Voice setup failed');
    expect(sessions[0].sendQuestion).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    expect(sessions[1].sendQuestion).toHaveBeenCalledOnce();
  });
});
