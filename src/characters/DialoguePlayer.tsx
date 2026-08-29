import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { DialogueLine } from '../content/schema';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import { Character } from './Character';
import { SpeechBubble } from './SpeechBubble';

export type DialoguePlayerProps = {
  lines: DialogueLine[];
  onDone: () => void;
  /** Rendered size of the speaking guide. */
  size?: number;
};

export function DialoguePlayer({ lines, onDone, size = 132 }: DialoguePlayerProps) {
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState({ lines, id: 0 });
  const done = useRef(false);

  // A swapped-in dialogue has to start over — otherwise the old index carries
  // across (opening mid-array, or rendering nothing when the new array is
  // shorter) and the spent `done` guard means onDone can never fire again.
  // Resetting during render is React's "adjust state on prop change" pattern:
  // it re-renders before committing, so the stale line never paints. `run.id`
  // also feeds the AnimatePresence key so the swap animates like any advance.
  if (run.lines !== lines) {
    setRun({ lines, id: run.id + 1 });
    setIndex(0);
    done.current = false;
  }

  useEffect(() => {
    if (lines.length === 0 && !done.current) {
      done.current = true;
      onDone();
    }
  }, [lines, onDone]);

  const reduced = useReducedMotionPref();
  const line = lines[index];
  if (!line) return null;

  const isKid = line.speaker === 'kid';
  const isLast = index === lines.length - 1;

  function advance() {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    if (done.current) return;
    done.current = true;
    onDone();
  }

  const swap = reduced ? { duration: 0 } : { duration: 0.16 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${run.id}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: swap }}
          exit={{ opacity: 0, y: -10, transition: swap }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: isKid ? 'flex-end' : 'flex-start',
            gap: '0.5rem',
            minHeight: size,
          }}
        >
          {line.speaker !== 'kid' && (
            <Character guide={line.speaker} pose={line.pose ?? 'talk'} size={size} />
          )}
          <SpeechBubble align={isKid ? 'right' : 'left'} style={{ marginBottom: '0.5rem' }}>
            {line.text}
          </SpeechBubble>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-primary" aria-label="Next" onClick={advance}>
          Next <span aria-hidden="true">&nbsp;→</span>
        </button>
      </div>
    </div>
  );
}
