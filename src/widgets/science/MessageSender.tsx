import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-science.css';
import { useEffect, useState } from 'react';
import { normalizeMorseAscii } from '../../content/schema';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type CoachPhase = 'none' | 'strategy' | 'retry';

const MORSE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
};

const binaryAlphabet = () => Object.fromEntries(Array.from({ length: 95 }, (_, index) => {
  const character = String.fromCharCode(index + 32);
  return [character, character.charCodeAt(0).toString(2).padStart(8, '0')];
}));

function effectiveAlphabet(encoding: 'morse' | 'binary', overrides: Record<string, string> | undefined) {
  const normalizedOverrides = Object.fromEntries(Object.entries(overrides ?? {}).map(([character, code]) => [encoding === 'morse' ? normalizeMorseAscii(character) : character, code]));
  return { ...(encoding === 'morse' ? MORSE : binaryAlphabet()), ...normalizedOverrides };
}

export default function MessageSender({ config, onEvent }: WidgetProps<'message-sender'>) {
  const key = JSON.stringify(config);
  const message = config.encoding === 'morse' ? normalizeMorseAscii(config.message.trim()) : config.message.trim();
  const alphabet = effectiveAlphabet(config.encoding, config.alphabet);
  const [explained,setExplained]=useState(false);
  const [received,setReceived]=useState<string | null>(null);
  const [explanation,setExplanation]=useState('');
  const [encoded, setEncoded] = useState('');
  const [sent, setSent] = useState(false);
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const [status, setStatus] = useState('Build the message with the code reference.');
  const { completeOnce } = useCompletionLatch(key);
  const reverseAlphabet = new Map(Object.entries(alphabet).map(([character, code]) => [code, character]));
  const decoded = encoded ? encoded.split(' ').map((code) => reverseAlphabet.get(code) ?? '?').join('') : '';
  const expectedGroups = [...message].map((character) => alphabet[character]!);
  const enteredGroups = encoded.split(' ');
  const visiblyComplete = sent && decoded === message && explained;

  useEffect(() => { setEncoded('');setReceived(null);setExplained(false);setExplanation(''); setSent(false);setExplained(false);setReceived(null);setExplanation(''); setCoachPhase('none'); setStatus('Build the message with the code reference.'); }, [key]);

  const emit = (next: string, action: 'append-symbol' | 'remove-symbol' | 'send' | 'reset') => {
    setEncoded(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { encoded: next } });
  };
  const coachWrong = () => {
    const cue = coachPhase === 'none' ? 'strategy' : 'retry';
    setCoachPhase(cue);
    onEvent({ type: 'coach', cue });
  };
  const append = (symbol: string) => {
    setSent(false);setExplained(false);setReceived(null);setExplanation('');
    setStatus('Message changed; use character separators when needed, then send it.');
    emit(encoded + symbol, 'append-symbol');
  };
  const remove = () => {
    setSent(false);setExplained(false);setReceived(null);setExplanation('');
    setStatus('Message changed; use character separators when needed, then send it.');
    emit(encoded.slice(0, -1), 'remove-symbol');
  };
  const send = () => {
    const replay = sent && received === encoded;
    setSent(true);setReceived(encoded);
    if(!replay){setExplained(false);setExplanation('');}
    const successful = decoded === message;
    const firstMismatch = expectedGroups.findIndex((expected, index) => enteredGroups[index] !== expected);
    setStatus(successful
      ? `Decoded message: ${message}`
      : `First mismatched character group: ${firstMismatch === -1 ? expectedGroups.length + 1 : firstMismatch + 1}. Compare that group with the reference, then revise.`);
    emit(encoded, 'send');
    if (!replay) {
      if (successful) onEvent({type:'coach',cue:'milestone'});
      else coachWrong();
    }
  };
  const reset = () => {
    setSent(false);setExplained(false);setReceived(null);setExplanation('');
    setCoachPhase('none');
    setStatus('Build the message with the code reference.');
    emit('', 'reset');
  };
  const relevantCharacters = [...new Set([...message])];
  const symbolControls = config.encoding === 'morse'
    ? [['Add dot', '.'], ['Add dash', '-']] as const
    : [['Add zero', '0'], ['Add one', '1']] as const;

  return <section className="card widget-experiment message activity-shell science-activity" data-testid="widget-message-sender" data-state={visiblyComplete ? 'complete' : 'encoding'} data-encoding={config.encoding}>
    <ActivityWorkbench label="Signal message model" revealKey={sent && decoded === message ? 'explain' : 'setup'} visual={<>
    <header><h3>{config.encoding === 'morse' ? 'Morse code message model' : 'Binary code message model'}</h3><p className="science-model-label">Model only · not physical evidence</p></header>
    <p className="message-target">Target message: {message}</p>
    <section className="message-reference" aria-label="Code reference">
      <h4>Code reference</h4>
      <ul>{relevantCharacters.map((character) => <li key={character}>{config.encoding === 'binary' && character === ' ' ? 'Space' : character} = {alphabet[character]}</li>)}</ul>
    </section>
    <section className="science-feedback"><h4>Sender → receiver</h4><p>Build a signal on the right. Send it to the model receiver.</p><div className="science-received" data-sent={sent?'yes':'no'} aria-label="Received signal">{received === null ? 'Receiver waiting' : [...received].map((symbol,index)=><span className="science-signal" key={index} style={{animationDelay:`${index*.08}s`}}>{symbol === ' ' ? '|' : symbol}</span>)}</div>{sent && <p aria-label="Decoded model message">Received decoding: {decoded || 'No message'}</p>}</section>
    </>}>
    <div className="message-entry" role="group" aria-label={`Entered code grouped by character: ${enteredGroups.join(' character separator ') || 'empty'}`}>
      {enteredGroups.map((group, index) => <span key={`${group}-${index}`}><span data-testid="encoded-character-group" data-group-index={index + 1} data-group-state={sent ? (group === expectedGroups[index] ? 'correct' : 'mismatch') : 'pending'} className="encoded-character-group">{group || '…'}</span>{index < enteredGroups.length - 1 && <span data-testid="encoded-character-separator" className="encoded-character-separator" aria-label="character separator">|</span>}</span>)}
    </div>
    <div className="message-controls" aria-label="Code symbol controls">
      {symbolControls.map(([label, symbol]) => <button key={symbol} aria-label={label} onClick={() => append(symbol)}>{symbol}</button>)}
      <button aria-label="Add character separator" disabled={!encoded || encoded.endsWith(' ')} onClick={() => append(' ')}>Separate characters</button>
      <button aria-label="Remove last symbol" disabled={!encoded} onClick={remove}>Delete</button>
      <button aria-label="Send message" onClick={send}>Send message</button>
    </div>
    {sent && decoded === message && <section className="science-feedback" data-activity-reveal><h4>Why could the receiver read it?</h4><button onClick={() => {setExplained(false);setExplanation('Try again. The signal has meaning because of an agreed code, not because it guesses.');onEvent({type:'coach',cue:'retry'});}}>The receiver guessed my thought</button><button onClick={() => {setExplained(true);setExplanation('The same code connected the symbols with the same letter at both ends.');onEvent({type:'interaction',action:'explain'});completeOnce(()=>onEvent({type:'complete',value:{encoded,decoded:message}}));}}>Both ends use the same code</button><p aria-label="Code explanation feedback" data-outcome={explanation ? explained ? 'correct' : 'retry' : undefined}>{explanation}</p></section>}
    <button className="message-reset" onClick={reset}>Start over</button>
    <p role="status">{visiblyComplete ? `Decoded message: ${message}` : status}</p>
    <section className="science-model-notes" aria-label="About this model"><h4>About this model</h4>

      <p>Simplified in-app information-encoding model. It is not an external transmission, recording, hearing, or hearing assessment.</p>
    </section>
    </ActivityWorkbench>
  </section>;
}
