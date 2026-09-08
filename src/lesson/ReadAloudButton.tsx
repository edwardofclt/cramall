import { useCallback, useEffect, useRef, useState } from 'react';
import { claimAudio, releaseAudio } from './audio-focus';

export type ReadAloudButtonProps = {
  /** Plain text to speak — no markup; run it through `speechText` first. */
  text: string;
};

/**
 * Web Speech is feature-detected on every render rather than cached: jsdom and older
 * browsers have no `speechSynthesis` at all, and the button simply does not exist there.
 */
function canSpeak(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined' &&
    typeof window.SpeechSynthesisUtterance === 'function'
  );
}

/**
 * 🔊 button that reads a learn card (or worked example) out loud for a kid who is stuck.
 * The gate lives out here so the speaking half can use hooks unconditionally.
 */
export function ReadAloudButton({ text }: ReadAloudButtonProps) {
  if (!canSpeak()) return null;
  return <SpeakingButton text={text} />;
}

function SpeakingButton({ text }: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  function releaseUtterance() {
    const utterance = utteranceRef.current;
    if (utterance) {
      utterance.onend = null;
      utterance.onerror = null;
    }
    utteranceRef.current = null;
  }

  const stop = useCallback(() => {
    releaseUtterance();
    if (canSpeak()) window.speechSynthesis.cancel();
    setSpeaking(false);
    releaseAudio(stop);
  }, []);

  useEffect(() => () => {
    releaseUtterance();
    if (releaseAudio(stop) && canSpeak()) window.speechSynthesis.cancel();
  }, [stop]);

  function toggle() {
    if (speaking) { stop(); return; }
    claimAudio(stop);
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    const finish = () => {
      releaseUtterance();
      releaseAudio(stop);
      setSpeaking(false);
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      className="btn btn-read-aloud"
      aria-label={speaking ? 'Stop reading' : 'Read aloud'}
      data-speaking={speaking ? 'yes' : 'no'}
      onClick={toggle}
    >
      <span aria-hidden="true">{speaking ? '⏹' : '🔊'}</span>
    </button>
  );
}
