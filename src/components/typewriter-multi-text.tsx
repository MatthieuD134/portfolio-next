'use client';

import { useEffect, useState } from 'react';

import { useTypewriter } from '@/hooks/use-typewriter';

import { cn } from '../lib/utils';

type LineConfig = {
  /** The text to type */
  text: string;
  /** Milliseconds per character (overrides default) */
  speed?: number;
  /** Any additional CSS classes for styling */
  className?: string;
};

interface MultiTypewriterProps {
  className?: string;
  /** Array of lines to type out, in order */
  lines: LineConfig[];
  /** Delay (ms) between lines once one finishes */
  lineDelay?: number;
}

export function TypewriterMultiText({ className, lines, lineDelay = 500 }: MultiTypewriterProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [started, setStarted] = useState(false);

  // Tracks the text typed for the current line
  const { text: fullText, speed: defaultSpeed } = {
    text: lines[currentLine].text,
    speed: lines[currentLine].speed ?? 80,
  };
  const typed = useTypewriter(fullText, defaultSpeed, started);

  // Once the current line is fully typed, wait then advance
  useEffect(() => {
    if (!started) return;

    if (typed === fullText) {
      const timeout = setTimeout(() => {
        if (currentLine < lines.length - 1) {
          setCurrentLine((i) => i + 1);
          setStarted(false);
        }
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [typed, fullText, currentLine, lines.length, lineDelay, started]);

  // Whenever we move to a new line, restart typing
  useEffect(() => {
    setStarted(true);
  }, [currentLine]);

  return (
    <div className={cn('leading-relaxed text-cyan-400', className)}>
      {lines.slice(0, currentLine).map((line, i) => (
        <div key={i} className={line.className}>
          {line.text}
        </div>
      ))}

      <div className={lines[currentLine].className}>
        <span>{typed}</span>
        <span className="w-0.6ch animate-blink inline-block bg-current">&nbsp;</span>
      </div>
    </div>
  );
}
