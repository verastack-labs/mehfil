"use client";

import { useState } from "react";
import { Pin } from "./Pin";
import { SwingNotice } from "./SwingNotice";
import { formatTime, useQuantisedNow } from "./useNow";

/**
 * The creation flow, working, rebuilt from the project's own draft screen
 * (05-create-session-time-picker): quick-pick durations, a today and tomorrow
 * toggle, a live readout, and one primary action.
 *
 * The reason it earns a section rather than a screenshot is the last part. The
 * board accepts exactly one notice, so putting a second one up is refused, in
 * the interface, by the visitor's own hand. That is the product's central
 * constraint demonstrated instead of asserted, and it is the one claim on this
 * page a competitor could not copy without becoming this product.
 *
 * Everything here is local state. Nothing is sent anywhere, because there is
 * nowhere to send it yet.
 */

const QUICK_PICKS = [15, 30, 45, 60] as const;
type Minutes = (typeof QUICK_PICKS)[number];
type Day = "today" | "tomorrow";

const OCCASIONS = ["Chai", "Cards", "Dinner", "Sutta"] as const;

const labelFor = (m: Minutes) => (m === 60 ? "1 hour" : `${m} min`);

export function CallAMehfil() {
  const now = useQuantisedNow();
  const [minutes, setMinutes] = useState<Minutes>(15);
  const [day, setDay] = useState<Day>("today");
  const [occasion, setOccasion] = useState<string>(OCCASIONS[0]);
  const [pinned, setPinned] = useState<{
    at: number;
    occasion: string;
    day: Day;
  } | null>(null);

  const DAY_MS = 24 * 60 * 60 * 1000;
  const target =
    now === null ? null : now + minutes * 60 * 1000 + (day === "tomorrow" ? DAY_MS : 0);

  // Renders a plausible fixed time on the server so the section reads with
  // JavaScript off, then becomes real once mounted.
  const readout = target === null ? "4:45 PM" : formatTime(target);
  const relative =
    day === "tomorrow" ? `tomorrow, ${readout}` : `in ${minutes} min`;

  return (
    <div className="grid items-start gap-16 min-[1080px]:grid-cols-[0.9fr_1.1fr]">
      {/* ---------------- the picker ---------------- */}
      <div className="notice notice-warm" style={{ ["--tilt" as string]: "-0.5deg" }}>
        <span className="label">Quick pick</span>
        <div className="chips" role="group" aria-label="How long from now">
          {QUICK_PICKS.map((m) => (
            <button
              key={m}
              type="button"
              className="chip"
              aria-pressed={minutes === m}
              onClick={() => setMinutes(m)}
            >
              {labelFor(m)}
            </button>
          ))}
        </div>

        <div className="rule-label">
          <span>or what it is for</span>
        </div>

        <div className="chips" role="group" aria-label="What the mehfil is for">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              type="button"
              className="chip"
              aria-pressed={occasion === o}
              onClick={() => setOccasion(o)}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="readout">
          <span className="label readout-label">{occasion}</span>
          <p className="readout-time">{readout}</p>
          <p className="readout-rel">{relative}</p>
        </div>

        <div className="daytoggle" role="group" aria-label="Which day">
          <button
            type="button"
            className="dayopt"
            aria-pressed={day === "today"}
            onClick={() => setDay("today")}
          >
            Today
          </button>
          <button
            type="button"
            className="dayopt"
            aria-pressed={day === "tomorrow"}
            onClick={() => setDay("tomorrow")}
          >
            Tomorrow
          </button>
        </div>

        {pinned ? (
          <>
            <button
              type="button"
              className="btn btn-ink mt-6 w-full"
              onClick={() => setPinned(null)}
            >
              Take it down
            </button>
            <p className="mt-4 text-[0.85rem] text-(--color-foreground-muted)">
              The board is taken. A group gets one notice at a time, so the next
              one has to wait for this to come down or for its time to arrive.
              That rule lives in the database, not in this button.
            </p>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-ink mt-6 w-full"
            onClick={() =>
              setPinned({ at: target ?? Date.now(), occasion, day })
            }
          >
            Put it on the board
          </button>
        )}
      </div>

      {/* ---------------- the board ---------------- */}
      <div className="boardspace">
        {pinned ? (
          <SwingNotice
            className="notice-deep pinup dropped"
            tilt={-1.4}
            key={`${pinned.at}-${pinned.occasion}`}
          >
            <Pin tone="urgent" />
            <span className="label">Your board &middot; {pinned.occasion}</span>
            <p className="dropped-time">{formatTime(pinned.at)}</p>
            <p className="dropped-rel">
              {pinned.day === "tomorrow" ? "Tomorrow" : "Today"}
            </p>
            <p className="mt-6 text-[0.85rem] text-(--color-foreground-muted)">
              Everyone in the group sees this the moment it goes up, and answers
              in one tap. Drag it, it is paper on a pin.
            </p>
          </SwingNotice>
        ) : (
          <div className="boardempty">
            <p className="label">Nothing on the board</p>
            <p className="mt-3 max-w-[30ch] text-(--color-foreground-muted)">
              Pick a time and put one up. This board is yours and it is empty,
              which is the only state Mehfil ever shows you besides one notice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
