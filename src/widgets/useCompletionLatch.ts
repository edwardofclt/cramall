import { useRef, useState } from 'react';

export function useCompletionLatch(resetKey: string) {
  const latch = useRef({ key: resetKey, fired: false });
  const [completedKey, setCompletedKey] = useState<string | null>(null);

  if (latch.current.key !== resetKey) {
    latch.current = { key: resetKey, fired: false };
  }

  const completeOnce = (emit: () => void) => {
    if (latch.current.fired) return;

    latch.current.fired = true;
    setCompletedKey(resetKey);
    emit();
  };

  return { completed: latch.current.fired && completedKey === resetKey, completeOnce };
}
