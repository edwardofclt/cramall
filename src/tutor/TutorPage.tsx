import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Character } from '../characters/Character';
import { tutorLesson } from './context';
import { demoReply, type TutorAction } from './demo';
import { createLiveTutor, type LiveTutor, type TutorMessage, type TutorStatus } from './realtime';
import './tutor.css';

type Mode = 'sample' | 'live';
const focusLabels = ['The big idea', 'Find evidence', 'Follow the change'];
const prompts: Record<TutorAction, string> = {
  explain: 'Explain this idea to me.', simplify: 'Say it another way.', example: 'Give me an example.', read: 'Please read the complete story aloud.', question: '',
};
const statusLabels: Record<TutorStatus, string> = {
  ready: 'Ready when you are', connecting: 'Connecting to Winnie…', thinking: 'Preparing a reply…', speaking: 'Speaking · you can stop anytime', listening: 'Microphone on · listening', ended: 'Session ended · microphone off',
};

function HighlightedText({ text, evidenceIds }: { text: string; evidenceIds: string[] }) {
  const quotes = tutorLesson.evidence.filter(item => evidenceIds.includes(item.id)).map(item => item.quote);
  let segments: { text: string; highlighted: boolean }[] = [{ text, highlighted: false }];
  for (const quote of quotes) {
    segments = segments.flatMap(segment => {
      if (segment.highlighted || !segment.text.includes(quote)) return [segment];
      const index = segment.text.indexOf(quote);
      return [{ text: segment.text.slice(0, index), highlighted: false }, { text: quote, highlighted: true }, { text: segment.text.slice(index + quote.length), highlighted: false }];
    });
  }
  return <>{segments.map((segment, index) => segment.highlighted ? <mark key={index}>{segment.text}</mark> : <span key={index}>{segment.text}</span>)}</>;
}

function Conversation({ cardId, evidenceIds, mode }: { cardId: string; evidenceIds: string[]; mode: Mode }) {
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<TutorStatus>('ready');
  const [error, setError] = useState('');
  const [voice, setVoice] = useState(true);
  const [mic, setMic] = useState(false);
  const [connected, setConnected] = useState(false);
  const session = useRef<LiveTutor>();
  const alive = useRef(true);
  const utterance = useRef<SpeechSynthesisUtterance>();
  const speechTimer = useRef<ReturnType<typeof setTimeout>>();
  const log = useRef<HTMLDivElement>(null);
  const currentEvidence = useRef(evidenceIds);
  currentEvidence.current = evidenceIds;
  const canSpeak = typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance === 'function';
  const busy = status === 'connecting';

  function cancelSpeech() {
    clearTimeout(speechTimer.current);
    if (utterance.current) {
      utterance.current.onstart = null;
      utterance.current.onend = null;
      utterance.current.onerror = null;
      utterance.current = undefined;
    }
    window.speechSynthesis?.cancel();
  }
  useEffect(() => {
    alive.current = true;
    const stopForPageExit = () => {
      session.current?.close();
      session.current = undefined;
      cancelSpeech();
      if (alive.current) { setConnected(false); setMic(false); setStatus('ended'); }
    };
    window.addEventListener('pagehide', stopForPageExit);
    return () => { alive.current = false; stopForPageExit(); window.removeEventListener('pagehide', stopForPageExit); };
  }, []);
  useEffect(() => { session.current?.setEvidence(evidenceIds); }, [evidenceIds]);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages]);
  function addMessage(message: TutorMessage) {
    if (!alive.current) return;
    setMessages(current => {
      const found = current.some(item => item.id === message.id);
      return (found ? current.map(item => item.id === message.id ? message : item) : [...current, message]).slice(-30);
    });
  }
  function speak(text: string) {
    cancelSpeech();
    if (!voice || !canSpeak) { setStatus('ready'); return; }
    const next = new SpeechSynthesisUtterance(text);
    utterance.current = next;
    next.rate = 0.92;
    setStatus('thinking');
    next.onstart = () => { if (utterance.current === next) { clearTimeout(speechTimer.current); setStatus('speaking'); } };
    next.onend = () => { if (utterance.current === next) { cancelSpeech(); setStatus('ready'); } };
    next.onerror = () => { if (utterance.current === next) { cancelSpeech(); setStatus('ready'); setError('The voice could not play. You can read the reply below or try with voice off.'); } };
    speechTimer.current = setTimeout(() => { if (utterance.current === next) { cancelSpeech(); setStatus('ready'); setError('The voice could not play. The written reply is ready below.'); } }, 5000);
    window.speechSynthesis.speak(next);
  }
  async function run(action: TutorAction, typed = '') {
    if (busy) return;
    const text = action === 'question' ? typed.trim().slice(0, 1000) : prompts[action];
    if (!text) return;
    setError('');
    if (mode === 'sample') {
      addMessage({ id: crypto.randomUUID(), role: 'user', text });
      const reply = demoReply(action, text, cardId, evidenceIds);
      addMessage({ id: crypto.randomUUID(), role: 'assistant', text: reply });
      speak(reply);
      return;
    }
    if (!session.current) {
      const live = createLiveTutor({ cardId, evidenceIds,
        onStatus: value => {
          if (!alive.current) return;
          setStatus(value);
          if (value === 'ended') { session.current = undefined; setConnected(false); }
        },
        onMessage: addMessage,
        onError: message => { if (alive.current) { session.current = undefined; setConnected(false); setStatus('ready'); setError(message); } },
        onMicChange: value => { if (alive.current) setMic(value); },
      });
      session.current = live;
      await live.connect();
      if (!alive.current || session.current !== live) return;
      setConnected(true);
      live.setEvidence(currentEvidence.current);
    }
    addMessage({ id: crypto.randomUUID(), role: 'user', text });
    session.current.sendQuestion(text);
  }
  function stopSpeaking() { cancelSpeech(); session.current?.interrupt(); setStatus(mic ? 'listening' : 'ready'); }
  function endSession() { session.current?.close(); session.current = undefined; setConnected(false); setMic(false); cancelSpeech(); setStatus('ended'); }

  return <section className="tutor-conversation" aria-labelledby="conversation-title">
    <div className="tutor-guide-row">
      <div className="tutor-portrait"><Character guide="winnie" pose={status === 'speaking' ? 'talk' : status === 'thinking' ? 'think' : 'idle'} size={116} /></div>
      <div><span className="tutor-eyebrow">Your reading guide</span><h2 id="conversation-title" tabIndex={-1}>Talk it through<br />with Winnie</h2></div>
    </div>
    <p className="tutor-status" role="status"><span className={`tutor-status-dot ${status === 'speaking' || mic ? 'is-active' : ''}`} aria-hidden="true" />{statusLabels[status]}</p>
    {!messages.length && <div className="tutor-invitation"><p>Big ideas can start with a small conversation.</p><span>I can explain the idea, try another example, or help you think about a clue.</span></div>}
    <div className="tutor-primary-actions">
      <button className="tutor-explain" onClick={() => void run('explain')} disabled={busy}><span aria-hidden="true">✦</span> Explain this</button>
      {(status === 'speaking' || status === 'thinking') && <button className="tutor-stop" onClick={stopSpeaking}>Stop speaking</button>}
    </div>
    <div className="tutor-transcript" ref={log} role="log" aria-label="Conversation with Winnie" aria-live="polite" aria-relevant="additions text">{messages.map(message => <div className={`tutor-message tutor-message-${message.role}`} key={message.id}><span className="tutor-message-name">{message.role === 'assistant' ? 'Winnie' : 'You'}</span><p>{message.text}</p></div>)}</div>
    <div className="tutor-suggestions" aria-label="Ways Winnie can help">
      <button disabled={busy} onClick={() => void run('simplify')}>Say it another way</button>
      <button disabled={busy} onClick={() => void run('example')}>Give me an example</button>
      <button disabled={busy} onClick={() => void run('read')}>Read the story</button>
    </div>
    <form className="tutor-question" onSubmit={event => { event.preventDefault(); if (question.trim() && !busy) { void run('question', question); setQuestion(''); } }}>
      <label htmlFor="tutor-question">What are you wondering?</label>
      <div><input id="tutor-question" aria-label="Your question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={1000} placeholder="Why isn’t gardening a theme?" autoComplete="off" /><button aria-label="Ask Winnie" disabled={!question.trim() || busy} type="submit">Ask <span aria-hidden="true">↑</span></button></div>
    </form>
    {error && <p className="tutor-error" role="alert">{error}</p>}
    <div className="tutor-session-controls">
      {mode === 'sample' ? <>
        <button aria-pressed={voice && canSpeak} disabled={!canSpeak} onClick={() => { setVoice(!voice); cancelSpeech(); setStatus('ready'); }}>{voice && canSpeak ? 'Voice on' : 'Voice off'}</button>
        <span>{canSpeak ? 'Sample replies · device voice' : 'Voice is unavailable in this browser. Replies appear above.'}</span>
      </> : <>
        <button disabled={!connected} aria-pressed={mic} onClick={() => session.current?.setMicrophone(!mic)}>{mic ? 'Turn microphone off' : 'Turn microphone on'}</button>
        {(connected || busy) && <button onClick={endSession}>End session</button>}
        <span>{mic ? 'Microphone on. Turn it off when you finish asking.' : 'Microphone off. You can type a question.'}</span>
      </>}
    </div>
    <p className="tutor-transcript-note">{mode === 'sample' ? 'Prepared examples to try the experience. No microphone is used.' : 'AI voice · adult review only · up to 5 minutes. Voice and messages are sent to OpenAI.'}</p>
  </section>;
}

export function TutorPage() {
  const [params, setParams] = useSearchParams();
  const cardId = tutorLesson.cards.some(card => card.id === params.get('focus')) ? params.get('focus')! : tutorLesson.cards[0].id;
  const card = tutorLesson.cards.find(item => item.id === cardId)!;
  const [mode, setMode] = useState<Mode>('sample');
  const [evidenceIds, setEvidenceIds] = useState<string[]>([]);
  const [liveAvailable, setLiveAvailable] = useState(false);
  const [setupReason, setSetupReason] = useState('Checking live voice availability…');
  useEffect(() => {
    const controller = new AbortController();
    void fetch('/api/tutor/status', { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json();
      if (controller.signal.aborted) return;
      setLiveAvailable(data.liveAvailable === true);
      setSetupReason(data.liveAvailable === true ? 'Live voice is available for adult review.' : data.reason === 'adult_review_required' ? 'Live voice needs adult review enabled on the server.' : 'Live voice needs a server-side API key. The sample is ready to try.');
    }).catch(() => { if (!controller.signal.aborted) setSetupReason('Live voice is unavailable here. The sample is ready to try.'); });
    return () => controller.abort();
  }, []);
  const paragraphs = tutorLesson.source.text.split(/\n\s*\n/).filter(paragraph => paragraph !== tutorLesson.source.title);
  return <div className="tutor-page">
    <header className="tutor-topbar"><Link to="/" className="tutor-brand">Cram All<span>learning together, one idea at a time</span></Link><span className="tutor-preview-badge">Voice tutor preview</span></header>
    <div className="tutor-heading"><div><span className="tutor-eyebrow">Reading · Theme & evidence</span><h1>Let’s make it click.</h1><p>A story, a question, and a little help from Winnie.</p></div><Link className="tutor-lesson-link" to={`/lesson/${tutorLesson.lessonId}?step=card:${cardId}`}>Open the lesson <span aria-hidden="true">↗</span></Link></div>
    <button className="tutor-jump" onClick={() => document.getElementById('conversation-title')?.focus()}>Talk with Winnie <span aria-hidden="true">↓</span></button>
    <nav className="tutor-focus-nav" aria-label="Concept focus">{tutorLesson.cards.map((item, index) => <button key={item.id} aria-current={item.id === cardId ? 'step' : undefined} onClick={() => setParams(current => { const next = new URLSearchParams(current); next.set('focus', item.id); return next; })}><span className="tutor-focus-number">{index + 1}</span>{focusLabels[index]}</button>)}</nav>
    <div className="tutor-workspace">
      <section className="tutor-reading" aria-labelledby="focus-title">
        <header className="tutor-focus-heading"><span className="tutor-eyebrow">Our focus</span><h2 id="focus-title">{card.title}</h2><p>{card.concepts[0]}</p></header>
        <article className="tutor-source" aria-labelledby="source-title"><header><span className="tutor-book-icon" aria-hidden="true">▤</span><div><span className="tutor-eyebrow">Keep the story close</span><h3 id="source-title">The Extra Row</h3></div><span className="tutor-source-tag">Story</span></header>
          <div className="tutor-passage" role="region" aria-label="The complete story" tabIndex={0}>{paragraphs.map((paragraph, index) => <p key={index}><span className="tutor-paragraph-number" aria-hidden="true">{index + 1}</span><HighlightedText text={paragraph} evidenceIds={evidenceIds} /></p>)}</div>
        </article>
        <fieldset className="tutor-evidence"><legend>Your evidence</legend><p>Pick a clue to talk about. Winnie will know which one you chose.</p>{tutorLesson.evidence.map(item => <label key={item.id} className={evidenceIds.includes(item.id) ? 'is-selected' : ''}><input type="checkbox" checked={evidenceIds.includes(item.id)} onChange={event => setEvidenceIds(current => event.target.checked ? [...current, item.id] : current.filter(id => id !== item.id))} /><span>“{item.quote}”</span></label>)}</fieldset>
      </section>
      <div className="tutor-right-column">
        <div className="tutor-mode-picker" role="group" aria-label="Tutor mode"><button aria-pressed={mode === 'sample'} onClick={() => setMode('sample')}>Try the sample</button><button aria-pressed={mode === 'live'} disabled={!liveAvailable} aria-describedby="tutor-setup-status" onClick={() => setMode('live')}>Live voice <span>Adult review</span></button></div>
        <p className="tutor-availability" id="tutor-setup-status">{setupReason}</p>
        <Conversation key={`${cardId}:${mode}`} cardId={cardId} evidenceIds={evidenceIds} mode={mode} />
        <details className="tutor-about"><summary>About this prototype</summary><p>The sample uses prepared replies about this lesson. Live mode uses OpenAI to answer new questions. Conversation and evidence selections are not saved by Cram All.</p><p>Live mode is for adult testing. Student use needs the applicable child privacy safeguards and OpenAI data-retention setup first.</p></details>
      </div>
    </div>
    <footer className="tutor-footer"><span>Small questions. Clearer ideas.</span><Link to={`/subject/reading`}>Back to Reading</Link></footer>
  </div>;
}
