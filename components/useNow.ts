"use client";

import { useSyncExternalStore } from "react";

export const TICK_MS = 20_000;

/* Intl inserts a narrow no-break space before AM/PM in some locales. Named
   rather than pasted, because an invisible character inside a string literal is
   unreadable and the next person deletes it by accident. */
const NARROW_NBSP = String.fromCharCode(0x202f);

export const formatTime = (ms: number) =>
  new Date(ms)
    .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    .split(NARROW_NBSP)
    .join(" ");

/**
 * The current time, quantised to the tick, or null while rendering on the
 * server and during hydration.
 *
 * `useSyncExternalStore` rather than state plus an effect: it models a server
 * snapshot and a client snapshot explicitly, which is the real shape of this
 * problem, and it keeps the clock read out of render, which has to stay pure.
 * The snapshot is a number so React can compare it by value between ticks.
 *
 * Callers must render something sensible for `null`, so the page still reads
 * correctly with JavaScript off.
 */
export function useQuantisedNow(): number | null {
  return useSyncExternalStore(
    (onStoreChange) => {
      const id = window.setInterval(onStoreChange, TICK_MS);
      return () => window.clearInterval(id);
    },
    () => Math.floor(Date.now() / TICK_MS) * TICK_MS,
    () => null,
  );
}
