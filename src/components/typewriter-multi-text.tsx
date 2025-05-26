'use client';

import { useEffect, useState } from 'react';

import { useTypewriter } from '@/hooks/use-typewriter';

import { cn } from '../lib/utils';

type TextLine = {
  type: 'text';
  text: string;
  speed?: number;
  className?: string;
  hideBlink?: boolean;
};

type ComponentLine = {
  type: 'component';
  content: React.ReactNode;
  className?: string;
  /** Optional delay (ms) before moving to next line automatically */
  displayDuration?: number;
};

type LineConfig = TextLine | ComponentLine;

interface MultiTypewriterProps {
  className?: string;
  lines: LineConfig[];
  lineDelay?: number;
  finishedCallback?: () => void;
}

export function TypewriterMultiText({
  className,
  lines,
  lineDelay = 500,
  finishedCallback,
}: MultiTypewriterProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [started, setStarted] = useState(false);
  const current = lines[currentLine];

  // Safe: always call the hook
  const typed = useTypewriter(
    current.type === 'text' ? current.text : '',
    current.type === 'text' ? (current.speed ?? 80) : 0,
    started && current.type === 'text',
  );

  useEffect(() => {
    if (!started) return;

    if (current.type === 'text' && typed === current.text) {
      const timeout = setTimeout(() => {
        nextLine();
      }, lineDelay);
      return () => clearTimeout(timeout);
    }

    if (current.type === 'component') {
      const duration = current.displayDuration ?? lineDelay;

      const timeout = setTimeout(() => {
        nextLine();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [typed, started, current, lineDelay]);

  useEffect(() => {
    setStarted(true);
  }, [currentLine]);

  const nextLine = () => {
    if (currentLine < lines.length - 1) {
      setCurrentLine((i) => i + 1);
      setStarted(false);
    } else {
      finishedCallback?.();
    }
  };

  return (
    <div className={cn('leading-relaxed text-cyan-400', className)}>
      {/* Render already completed lines */}
      {lines.slice(0, currentLine).map((line, i) => (
        <div key={i} className={line.className}>
          {line.type === 'text' ? line.text : line.content}
        </div>
      ))}

      {/* Render current line */}
      <div className={current.className}>
        {current.type === 'text' ? (
          <>
            <span>{typed}</span>
            {!current.hideBlink && (
              <span className={`animate-blink inline-block w-[0.6ch] bg-current`}>&nbsp;</span>
            )}
          </>
        ) : (
          current.content
        )}
      </div>
    </div>
  );
}
