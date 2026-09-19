import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Character } from '../characters/Character';
import { claimAudio, releaseAudio } from '../lesson/audio-focus';
import { buildInlineContext, type GuideSelection } from './inline-context.mjs';
import { createLiveTutor, type LiveTutor, type TutorMessage, type TutorStatus } from './realtime';
import './inline-tutor.css';

const labels: Record<TutorStatus, string> = {
  ready: 'Ready when you are', connecting: 'Getting ready…', thinking: 'Thinking it through…',
  speaking: 'Speaking · you can stop anytime', listening: 'Microphone on · listening', ended: 'Conversation paused · microphone off',
};
export function InlineTutor({selection, onExpandedChange, onReturnToLesson}: {
  selection: GuideSelection; onExpandedChange?: (open: boolean) => void; onReturnToLesson?: () => void;
}) {
  const context = buildInlineContext(selection);
  const [expanded, setExpanded] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const [availability, setAvailability] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<TutorStatus>('ready');
  const [mic, setMic] = useState(false);
  const [connected, setConnected] = useState(false);
  const session = useRef<LiveTutor>();
  const alive = useRef(true);
  const unavailable = useRef(false);
  const retryAfter = useRef(0);
  const connecting = useRef(false);
  const request = useRef(0);
  const current = useRef(selection);
  const heading = useRef<HTMLHeadingElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const available = availability === 'available';
  const busy = status === 'connecting';

  const endSession = useCallback(() => {
    request.current++;
    session.current?.close();
    session.current = undefined;
    connecting.current = false;
    if (alive.current) { setConnected(false); setMic(false); setStatus('ended'); }
  }, []);
  const stopVoice = useCallback(() => {
    request.current++;
    if (connecting.current) endSession();
    else { session.current?.setMicrophone(false); session.current?.interrupt(); }
    if (alive.current) { setMic(false); setStatus('ready'); }
    releaseAudio(stopVoice);
  }, [endSession]);

  useEffect(() => {
    alive.current = true;
    const leave = () => { endSession(); releaseAudio(stopVoice); };
    window.addEventListener('pagehide', leave);
    return () => { alive.current = false; leave(); window.removeEventListener('pagehide', leave); };
  }, [endSession, stopVoice]);
  useEffect(() => {
    let controller: AbortController;
    const check = () => {
      if (Date.now() < retryAfter.current) return;
      controller?.abort();
      controller = new AbortController();
      const {signal} = controller;
      void fetch('/api/tutor/status', {signal}).then(async response => {
        if (!response.ok) throw new Error('Unavailable');
        const data = await response.json();
        if (signal.aborted || Date.now() < retryAfter.current) return;
        unavailable.current = data.liveAvailable !== true;
        setAvailability(unavailable.current ? 'unavailable' : 'available');
        if (unavailable.current) { endSession(); releaseAudio(stopVoice); }
      }).catch(() => {
        if (signal.aborted || Date.now() < retryAfter.current) return;
        unavailable.current = true;
        setAvailability('unavailable'); endSession(); releaseAudio(stopVoice);
      });
    };
    check();
    window.addEventListener('focus', check); window.addEventListener('online', check);
    return () => { controller.abort(); window.removeEventListener('focus', check); window.removeEventListener('online', check); };
  }, [endSession, stopVoice]);
  // This component survives stage changes. Update the connection before a new
  // student action can run, while the animated lesson card mounts independently.
  const selectionKey = JSON.stringify(selection);
  useLayoutEffect(() => {
    if (current.current.stageKey !== selection.stageKey) {
      request.current++;
      setMic(false); setError('');
      if (!connecting.current) setStatus('ready');
      releaseAudio(stopVoice);
    }
    current.current = selection;
    session.current?.setContext(selection);
  }, [selectionKey, selection, stopVoice]);
  useEffect(() => {
    if (!expanded) { setPanelVisible(false); return; }
    heading.current?.focus();
    if (!panel.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setPanelVisible(entry.isIntersecting));
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, [expanded]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages]);
  function addMessage(message: TutorMessage) {
    if (!alive.current) return;
    setMessages(items => (items.some(item => item.id === message.id)
      ? items.map(item => item.id === message.id ? message : item) : [...items, message]).slice(-30));
  }
  async function run(text?: string, useMic = false) {
    if (!available || connecting.current) return;
    const ticket = ++request.current;
    claimAudio(stopVoice);
    setError('');
    if (!session.current) {
      connecting.current = true; setStatus('connecting');
      const live = createLiveTutor({selection:current.current, history:messages,
        onStatus: value => {
          if (!alive.current || session.current !== live) return;
          setStatus(value);
          if (value === 'ended') { endSession(); releaseAudio(stopVoice); }
        },
        onMessage: message => { if (session.current === live) addMessage(message); },
        onMicChange: value => { if (alive.current && session.current === live) setMic(value); },
        onUnavailable: () => {
          unavailable.current = true;
          retryAfter.current = Date.now() + 30_000;
          if (alive.current) { setAvailability('unavailable'); endSession(); releaseAudio(stopVoice); }
        },
        onError: message => {
          if (!alive.current || (session.current !== live && !unavailable.current)) return;
          endSession(); releaseAudio(stopVoice);
          if (!unavailable.current) setError(/permission/i.test(message) ? 'Check microphone permission and try again.' : 'Voice paused. Please try again.');
        },
      });
      session.current = live;
      await live.connect();
      if (!alive.current || session.current !== live) return;
      connecting.current = false; setConnected(true); setStatus('ready');
      live.setContext(current.current);
    }
    if (ticket !== request.current || !session.current) return;
    if (useMic) session.current.setMicrophone(true);
    if (text?.trim()) {
      const trimmed = text.trim().slice(0, 1000);
      session.current.setMicrophone(false);
      addMessage({id:crypto.randomUUID(),role:'user',text:trimmed});
      session.current.sendQuestion(trimmed);
    }
  }
  function togglePanel() {
    if (expanded) { endSession(); releaseAudio(stopVoice); }
    setExpanded(!expanded); onExpandedChange?.(!expanded);
    if (expanded) requestAnimationFrame(() => launcher.current?.focus());
  }
  const name = context.guide.name;
  return <aside className={`inline-guide ${expanded ? 'is-expanded' : ''}`} aria-label={`${name}'s AI guide`}>
    <button ref={launcher} className="inline-guide-launcher" disabled={!available} onClick={togglePanel} aria-label={`Ask ${name}`} aria-expanded={expanded} aria-controls="inline-guide-panel" hidden={expanded}>
      <Character guide={context.guide.id} pose="idle" size={56} />
      <span><strong>Ask {name}</strong><small>{availability === 'checking' ? 'Getting ready…' : available ? 'A little help, whenever you need it' : 'Guide unavailable'}</small></span><span aria-hidden="true">✦</span>
    </button>
    {expanded && !panelVisible && <button className="inline-guide-jump" onClick={() => heading.current?.focus()}>Back to {name} <span aria-hidden="true">↓</span></button>}
    {expanded && <section ref={panel} id="inline-guide-panel" className="inline-guide-panel" aria-labelledby="inline-guide-title">
      <header className="inline-guide-header">
        <Character guide={context.guide.id} pose={status === 'speaking' ? 'talk' : status === 'thinking' ? 'think' : 'idle'} size={88} />
        <div><span className="inline-guide-eyebrow">Your AI guide</span><h2 id="inline-guide-title" ref={heading} tabIndex={-1}>Talk it through<br />with {name}</h2></div>
        <button className="inline-guide-close" aria-label="Close guide" onClick={togglePanel}>×</button>
      </header>
      <p className="inline-guide-focus"><span>Here with you</span>{context.currentFocus}</p>
      <p className="inline-guide-status" role="status"><span aria-hidden="true" className={mic || status === 'speaking' ? 'is-active' : ''} />{!available ? 'Guide unavailable' : labels[status]}</p>
      {!messages.length && <p className="inline-guide-invitation">Big ideas can start with a small conversation. We can try an example, talk about a clue, or take it one small step at a time.</p>}
      <div className="inline-guide-primary"><button disabled={!available || busy} onClick={() => void run('Explain the idea in this step to me.')}><span aria-hidden="true">✦ </span>Explain this</button>{(connected || busy) && <button onClick={stopVoice}>Stop</button>}</div>
      <div className="inline-guide-log" ref={log} tabIndex={messages.length ? 0 : undefined} role="log" aria-label={`Conversation with ${name}`} aria-live="polite" aria-relevant="additions text">{messages.map(message => <div className={`inline-guide-message is-${message.role}`} key={message.id}><span>{message.role === 'assistant' ? name : 'You'}</span><p>{message.text}</p></div>)}</div>
      <div className="inline-guide-suggestions" aria-label="Ways to get help">
        <button disabled={!available || busy} onClick={() => void run('Say it another way, using a simple everyday example.')}>Another way</button>
        <button disabled={!available || busy} onClick={() => void run('Give me an example of the idea in this step.')}>An example</button>
        <button disabled={!available || busy} onClick={() => void run(context.source ? 'Please read the complete source passage aloud exactly as written.' : 'Please read the current step title and concepts aloud exactly as written.')}>Read this</button>
      </div>
      <form className="inline-guide-question" onSubmit={event => { event.preventDefault(); if (question.trim() && available && !busy) { void run(question); setQuestion(''); } }}>
        <label htmlFor="inline-guide-question">What are you wondering?</label>
        <div><input id="inline-guide-question" value={question} onChange={event => setQuestion(event.target.value)} disabled={!available || busy} maxLength={1000} placeholder="Ask a question…" autoComplete="off" /><button type="submit" disabled={!available || busy || !question.trim()} aria-label="Send question">↑</button></div>
      </form>
      {error && <p className="inline-guide-error" role="alert">{error}</p>}
      <div className="inline-guide-controls"><button disabled={!available || busy} aria-pressed={mic} onClick={() => mic ? stopVoice() : void run(undefined, true)}>{mic ? 'Turn microphone off' : 'Talk to me'}</button>{(connected || busy) && <button onClick={() => { endSession(); releaseAudio(stopVoice); }}>End session</button>}<span>{mic ? 'Microphone on' : 'Microphone off'}</span></div>
      <p className="inline-guide-note">AI can make mistakes. Your voice and messages go to OpenAI. Sessions last up to 5 minutes.</p>
      {onReturnToLesson && <button className="inline-guide-return" onClick={onReturnToLesson}>Back to the lesson ↑</button>}
    </section>}
  </aside>;
}
