import { useEffect, useState, type MouseEvent } from 'react';
import { DialoguePlayer } from '../characters/DialoguePlayer';
import type { DialogueLine } from '../content/schema';

type AnnouncingDialogueProps = {
  lines: DialogueLine[];
  onDone: () => void;
  onAnnouncement: (text: string) => void;
  size?: number;
};

/** Keeps announcements outside the character implementation while mirroring its line index. */
export function AnnouncingDialogue({
  lines,
  onDone,
  onAnnouncement,
  size,
}: AnnouncingDialogueProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    onAnnouncement(lines[0]?.text ?? '');
  }, [lines, onAnnouncement]);

  function captureAdvance(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest('button[aria-label="Next"]')) return;
    const next = Math.min(index + 1, Math.max(0, lines.length - 1));
    if (next !== index) onAnnouncement(lines[next]?.text ?? '');
    setIndex(next);
  }

  return (
    <div onClickCapture={captureAdvance}>
      <DialoguePlayer lines={lines} onDone={onDone} size={size} />
    </div>
  );
}
