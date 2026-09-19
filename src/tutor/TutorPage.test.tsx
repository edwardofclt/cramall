import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TutorPage } from './TutorPage';

class Utterance {
  text: string;
  rate = 1;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(text: string) { this.text = text; }
}
let spoken: Utterance[];
let canceled: number;
beforeEach(() => {
  spoken = []; canceled = 0;
  vi.stubGlobal('SpeechSynthesisUtterance', Utterance);
  vi.stubGlobal('speechSynthesis', { speak: (utterance: Utterance) => { spoken.push(utterance); utterance.onstart?.(); }, cancel: () => { canceled++; } });
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ liveAvailable: false, reason: 'missing_key' }), { status: 200 })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
function HistoryBack() { const navigate = useNavigate(); return <button onClick={() => navigate(-1)}>Browser back</button>; }
function mount(path = '/tutor') { return render(<MemoryRouter initialEntries={[path]}><TutorPage /><HistoryBack /></MemoryRouter>); }

describe('Winnie tutor preview', () => {
  it('keeps the complete source visible without autoplay or microphone access', async () => {
    mount();
    expect(screen.getByRole('heading', { name: 'The Extra Row' })).toBeVisible();
    expect(screen.getByText(/Their two families began trading garden tasks and vegetables/)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Explain this' })).toBeVisible();
    expect(spoken).toHaveLength(0);
    expect(await screen.findByText(/Live voice needs a server-side API key/)).toBeVisible();
  });
  it('explains, simplifies and reads only on request', async () => {
    const user = userEvent.setup(); mount();
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    expect(within(screen.getByRole('log')).getByText(/Think of a topic/)).toBeVisible();
    expect(spoken[0].text).not.toContain('Mateo measured straight garden rows');
    await user.click(screen.getByRole('button', { name: 'Say it another way' }));
    expect(within(screen.getByRole('log')).getByText(/two stickers/)).toBeVisible();
    expect(spoken[0].onend).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Read the story' }));
    expect(spoken[spoken.length - 1]?.text).toContain('Their two families began trading garden tasks and vegetables.');
    expect(screen.getByText(/Speaking/)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Stop speaking' }));
    expect(screen.getByText('Ready when you are')).toBeVisible();
  });
  it('uses selected source evidence for a typed follow-up', async () => {
    const user = userEvent.setup(); mount('/tutor?focus=reading-u04-l01-c2');
    await user.click(screen.getByRole('checkbox', { name: /Mateo measured straight garden rows/ }));
    await user.type(screen.getByRole('textbox', { name: 'Your question' }), 'Does my evidence fit?');
    await user.click(screen.getByRole('button', { name: 'Ask Winnie' }));
    expect(within(screen.getByRole('log')).getByText(/That shows careful planning/)).toBeVisible();
    expect(screen.getByText(/Their two families began trading garden tasks and vegetables/)).toBeVisible();
  });
  it('cleans up speech and conversation on focus changes and restores focus with history', async () => {
    const user = userEvent.setup(); mount();
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    const before = canceled;
    await user.click(screen.getByRole('button', { name: /2.*Find evidence/ }));
    expect(canceled).toBeGreaterThan(before);
    expect(screen.getByRole('log')).toBeEmptyDOMElement();
    expect(screen.getByRole('heading', { name: 'Gather Key Details' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Browser back' }));
    expect(screen.getByRole('heading', { name: 'State a Theme as a Message' })).toBeVisible();
  });
  it('keeps the conversation usable when speech is unsupported', async () => {
    vi.stubGlobal('speechSynthesis', undefined);
    const user = userEvent.setup(); mount();
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    expect(within(screen.getByRole('log')).getByText(/Think of a topic/)).toBeVisible();
    expect(screen.getByText(/Voice is unavailable in this browser/)).toBeVisible();
  });
  it('reports speech errors and ignores old utterance callbacks', async () => {
    const user = userEvent.setup(); const { unmount } = mount();
    await user.click(screen.getByRole('button', { name: 'Explain this' }));
    act(() => spoken[0].onerror?.());
    expect(screen.getByRole('alert')).toHaveTextContent(/voice could not play/i);
    const before = canceled;
    unmount();
    expect(canceled).toBeGreaterThan(before);
    expect(spoken[0].onend).toBeNull();
  });
  it('does not submit empty questions and caps input length', async () => {
    mount();
    await screen.findByText(/Live voice needs a server-side API key/);
    expect(screen.getByRole('button', { name: 'Ask Winnie' })).toBeDisabled();
    const question = screen.getByRole('textbox', { name: 'Your question' });
    expect(question).toHaveAttribute('maxlength', '1000');
    fireEvent.change(question, { target: { value: '   ' } });
    expect(screen.getByRole('button', { name: 'Ask Winnie' })).toBeDisabled();
  });
});
