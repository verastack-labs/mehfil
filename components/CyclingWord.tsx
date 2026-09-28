"use client";

import { useEffect, useState } from "react";

/**
 * A word that changes, one letter at a time.
 *
 * The hero used to read CHAI at display scale, which argued against the brand:
 * Mehfil is named for a gathering rather than for tea specifically, so a
 * six-rem CHAI told visitors the opposite of the truth. Cycling the word is
 * the argument, not the decoration. Chai is one mehfil. So is cards, so is
 * dinner in ten minutes.
 *
 * The letters roll rather than fade, because a board that flips its letters is
 * a departure board, which is the same object family as the notice board this
 * page is built from.
 *
 * Accessibility: the animated letters are hidden from assistive technology and
 * a single stable heading is exposed instead, because a heading that rewrites
 * itself every few seconds is noise to a screen reader. Under
 * `prefers-reduced-motion` the word still changes, it simply does not roll.
 */
export function CyclingWord({
  words,
  label,
  intervalMs = 2800,
  className = "",
}: {
  words: readonly string[];
  label: string;
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [words.length, intervalMs]);

  const word = words[index];

  return (
    <span className={className}>
      <span className="sr-only">{label}</span>
      <span className="cycle" aria-hidden="true">
        {Array.from(word).map((letter, position) => (
          /* Keyed by word index so every letter remounts and replays. */
          <span
            key={`${index}-${position}`}
            className="cycle-letter"
            style={{ animationDelay: `${position * 45}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </span>
  );
}
