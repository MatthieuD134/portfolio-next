// src/hooks/useTypewriter.ts
import { useEffect, useRef, useState } from 'react';

export function useTypewriter(
  fullText: string,
  speed = 100, // ms per character
  start = true, // controls whether to begin typing
) {
  const [displayed, setDisplayed] = useState('');
  const idxRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any ongoing timeouts on change of fullText, speed or start
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    idxRef.current = 0;
    setDisplayed('');

    // Only kick off the typing if `start` is true
    if (!start) return;

    function tick() {
      const i = idxRef.current;
      if (i <= fullText.length) {
        setDisplayed(fullText.slice(0, i));
        idxRef.current++;
        timeoutRef.current = window.setTimeout(tick, speed);
      }
    }

    tick();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fullText, speed, start]);

  return displayed;
}
