import { Fragment } from 'react';

/**
 * The only markup lesson content may use is `**bold**` and newlines, so a dozen lines
 * beat a markdown dependency (and the bundle it drags along).
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          {boldParts(line)}
        </Fragment>
      ))}
    </>
  );
}

// Splitting on a capturing group interleaves the pieces: even indexes are plain text,
// odd indexes are whatever sat between a pair of asterisks.
function boldParts(line: string) {
  return line.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index}>{part}</strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/** Same text with the markup taken back out — for read-aloud, which speaks the asterisks. */
export function plainText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\n+/g, ' ').trim();
}

/**
 * Joins a card's pieces into one utterance. Each piece ends in punctuation so the voice
 * pauses between the title, the blocks, and so on instead of running them together.
 */
export function speechText(parts: string[]): string {
  return parts
    .map(plainText)
    .filter(Boolean)
    .map((part) => (/[.!?:]$/.test(part) ? part : `${part}.`))
    .join(' ');
}
