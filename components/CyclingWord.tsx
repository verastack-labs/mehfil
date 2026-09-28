"use client";

import { useEffect, useState } from "react";

/**
 * A word that changes, one letter at a time.
 *
 * The hero used to read CHAI at display scale, which argued against the brand:
 * Mehfil is named for a gathering rather than for tea, so a six-rem CHAI told
 * visitors the opposite of the truth. Cycling the word is the argument, not
 * decoration. Chai is one mehfil. So is cards, so is dinner in ten minutes.
 *
 * Two defects shaped how this is built, both found by measuring rather than
 * watching:
 *
 * 1. The first version faded every letter in from zero opacity on a stagger,
 *    which left the headline completely blank from 43ms to 847ms of a 2800ms
 *    cycle. A third of the time, the first viewport of a page whose whole job
 *    is persuasion said nothing at all. So the outgoing word now rolls up and
 *    out while the incoming word rolls up and in: there is ink in the slot at
 *    every instant, and nothing fades.
 *
 * 2. The slot shrink-wrapped the current word, so the question mark after it
 *    jumped horizontally on every change. A hidden copy of the longest word
 *    reserves the width, and both layers are positioned over it, so the
 *    punctuation is a fixed anchor and the word turns beneath it.
 *
 * Accessibility: the animated letters are hidden from assistive technology and
 * one stable heading is exposed instead, because a heading that rewrites itself
 * every few seconds is noise to a screen reader. Under `prefers-reduced-motion`
 * the word still changes, it simply does not roll.
 */
export function CyclingWord({
  words,
  label,
  intervalMs = 2800,
}: {
  words: readonly string[];
  label: string;
  intervalMs?: number;
}) {
  const [turn, setTurn] = useState({ current: 0, previous: -1 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setTurn((t) => ({
        current: (t.current + 1) % words.length,
        previous: t.current,
      }));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [words.length, intervalMs]);

  /* The longest word sets the width once, so nothing after it ever moves. */
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  const letters = (word: string, direction: "in" | "out") =>
    Array.from(word).map((letter, position) => (
      <span
        key={`${direction}-${position}-${letter}`}
        className="cycle-letter"
        style={{ animationDelay: `${position * 28}ms` }}
      >
        {letter}
      </span>
    ));

  return (
    <span className="cycle">
      <span className="sr-only">{label}</span>

      {/* Width reserver. Hidden from both the eye and the screen reader. */}
      <span className="cycle-measure" aria-hidden="true">
        {widest}
      </span>

      {turn.previous >= 0 && (
        <span
          key={`out-${turn.previous}`}
          className="cycle-layer cycle-out"
          aria-hidden="true"
        >
          {letters(words[turn.previous], "out")}
        </span>
      )}

      <span
        key={`in-${turn.current}`}
        className={`cycle-layer ${turn.previous >= 0 ? "cycle-in" : ""}`}
        aria-hidden="true"
      >
        {letters(words[turn.current], "in")}
      </span>
    </span>
  );
}
