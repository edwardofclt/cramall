import { useEffect, useState } from 'react';
import { normalizeMorseAscii } from '../../content/schema';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

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
  const [encoded, setEncoded] = useState('');
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('Build the message with the code reference.');
  const { completeOnce } = useCompletionLatch(key);
  const reverseAlphabet = new Map(Object.entries(alphabet).map(([character, code]) => [code, character]));
  const decoded = encoded ? encoded.split(' ').map((code) => reverseAlphabet.get(code) ?? '?').join('') : '';
  const visiblyComplete = sent && decoded === message;

  useEffect(() => { setEncoded(''); setSent(false); setStatus('Build the message with the code reference.'); }, [key]);

  const emit = (next: string, action: 'append-symbol' | 'remove-symbol' | 'send' | 'reset') => {
    setEncoded(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { encoded: next } });
  };
  const append = (symbol: string) => {
    setSent(false);
    setStatus('Message changed; use character separators when needed, then send it.');
    emit(encoded + symbol, 'append-symbol');
  };
  const remove = () => {
    setSent(false);
    setStatus('Message changed; use character separators when needed, then send it.');
    emit(encoded.slice(0, -1), 'remove-symbol');
  };
  const send = () => {
    setSent(true);
    const successful = decoded === message;
    setStatus(successful ? `Decoded message: ${message}` : `Decoded message: ${decoded || 'none yet'}. Compare each character group with the reference.`);
    emit(encoded, 'send');
    if (successful) completeOnce(() => onEvent({ type: 'complete', value: { encoded, decoded: message } }));
  };
  const reset = () => {
    setSent(false);
    setStatus('Build the message with the code reference.');
    emit('', 'reset');
  };
  const enteredGroups = encoded.split(' ');
  const relevantCharacters = [...new Set([...message])];
  const symbolControls = config.encoding === 'morse'
    ? [['Add dot', '.'], ['Add dash', '-']] as const
    : [['Add zero', '0'], ['Add one', '1']] as const;

  return <section className="card widget-experiment message" data-testid="widget-message-sender" data-state={visiblyComplete ? 'complete' : 'encoding'} data-encoding={config.encoding}>
    <header>
      <h3>{config.encoding === 'morse' ? 'Morse code message model' : 'Binary code message model'}</h3>
      <p>Simplified in-app information-encoding model. It is not an external transmission, recording, hearing, or hearing assessment.</p>
    </header>
    <p className="message-target">Target message: {message}</p>
    <section className="message-reference" aria-label="Code reference">
      <h4>Code reference</h4>
      <ul>{relevantCharacters.map((character) => <li key={character}>{config.encoding === 'binary' && character === ' ' ? 'Space' : character} = {alphabet[character]}</li>)}</ul>
    </section>
    <div className="message-entry" role="group" aria-label={`Entered code grouped by character: ${enteredGroups.join(' character separator ') || 'empty'}`}>
      {enteredGroups.map((group, index) => <span key={`${group}-${index}`}><span data-testid="encoded-character-group" className="encoded-character-group">{group || '…'}</span>{index < enteredGroups.length - 1 && <span data-testid="encoded-character-separator" className="encoded-character-separator" aria-label="character separator">|</span>}</span>)}
    </div>
    <div className="message-controls" aria-label="Code symbol controls">
      {symbolControls.map(([label, symbol]) => <button key={symbol} aria-label={label} onClick={() => append(symbol)}>{symbol}</button>)}
      <button aria-label="Add character separator" disabled={!encoded || encoded.endsWith(' ')} onClick={() => append(' ')}>Separate characters</button>
      <button aria-label="Remove last symbol" disabled={!encoded} onClick={remove}>Delete</button>
      <button aria-label="Send message" onClick={send}>Send message</button>
    </div>
    <button className="message-reset" onClick={reset}>Start over</button>
    <p role="status">{visiblyComplete ? `Decoded message: ${message}` : status}</p>
  </section>;
}
