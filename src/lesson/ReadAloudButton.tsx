import { useEffect, useRef, useState } from 'react';

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

  // Speech outlives React: without this, walking to the next card leaves the old card
  // reading over the new screen with nothing left on screen to stop it.
  useEffect(
    () => () => {
      releaseUtterance();
      // Gated like every other call: teardown must never be the thing that throws.
      if (canSpeak()) window.speechSynthesis.cancel();
    },
    [],
  );

  function toggle() {
    // Cancel first either way: a second tap stops, and a fresh tap never stacks voices.
    releaseUtterance();
    window.speechSynthesis.cancel();

    if (speaking) {
      setSpeaking(false);
      return;
    }

    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
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
