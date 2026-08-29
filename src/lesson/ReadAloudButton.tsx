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

/** 🔊 button that reads a learn card (or worked example) out loud for a kid who is stuck. */
export function ReadAloudButton({ text }: ReadAloudButtonProps) {
  if (!canSpeak()) return null;

  function speak() {
    // Cancel first: tapping twice should restart the reading, not stack two voices.
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button type="button" className="btn btn-read-aloud" aria-label="Read aloud" onClick={speak}>
      <span aria-hidden="true">🔊</span>
    </button>
  );
}
