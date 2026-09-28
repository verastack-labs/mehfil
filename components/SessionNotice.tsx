"use client";

import { useEffect, useState } from "react";
import { Avatar, type OutfitColor, type SkinTone } from "./Avatar";
import { Pin } from "./Pin";
import { SwingNotice } from "./SwingNotice";
import { formatTime, useQuantisedNow } from "./useNow";

/**
 * The product's own artifact, working, on a marketing page.
 *
 * It cycles through three different gatherings rather than sitting on one,
 * because a single frozen CHAI notice made the product look like a tea app.
 * The notice is identical every time and only the occasion changes, which is
 * precisely the claim the page is making.
 *
 * The headline on the notice stays a static "Mehfil". It briefly animated the
 * occasion letter by letter, which duplicated the hero's animation a few
 * hundred pixels away and made the first viewport twitchy: two things moving
 * in the same way at the same time compete rather than reinforce. The occasion
 * now sits quietly in the header line beside the group, where it still informs
 * without demanding anything.
 *
 * Everyone named here is invented and the notice says so in the markup. No
 * real session has ever existed, PRODUCT.md records that the app is unbuilt,
 * and implying otherwise would be the easiest lie available on this page.
 *
 * RSVP has exactly two states, matching the database enum. There is no
 * "maybe", and answering replaces your row rather than adding one, because a
 * person has exactly one answer per session. Answering also stops the cycle:
 * having the notice change out from under somebody mid-interaction would be
 * hostile.
 */

type Answer = "in" | "later" | null;

type Person = {
  name: string;
  skin: SkinTone;
  outfit: OutfitColor;
  answer: Exclude<Answer, null>;
};

type DemoSession = {
  group: string;
  what: string;
  minutesOut: number;
  crew: readonly Person[];
};

const SESSIONS: readonly DemoSession[] = [
  {
    group: "Wing B",
    what: "Chai",
    minutesOut: 12,
    crew: [
      { name: "Aditi", skin: 3, outfit: 1, answer: "in" },
      { name: "Farhan", skin: 1, outfit: 3, answer: "in" },
      { name: "Meera", skin: 4, outfit: 2, answer: "in" },
      { name: "Kabir", skin: 2, outfit: 4, answer: "later" },
    ],
  },
  {
    group: "Flat 3B",
    what: "Dinner",
    minutesOut: 26,
    crew: [
      { name: "Rhea", skin: 2, outfit: 2, answer: "in" },
      { name: "Ishaan", skin: 4, outfit: 1, answer: "in" },
      { name: "Tara", skin: 1, outfit: 4, answer: "later" },
    ],
  },
  {
    group: "The Regulars",
    what: "Cards",
    minutesOut: 52,
    crew: [
      { name: "Zoya", skin: 3, outfit: 3, answer: "in" },
      { name: "Vikram", skin: 4, outfit: 4, answer: "in" },
      { name: "Nikhil", skin: 2, outfit: 1, answer: "in" },
      { name: "Sana", skin: 1, outfit: 2, answer: "in" },
    ],
  },
];

const CYCLE_MS = 6_500;

/* Evaluated once when this module loads. On the client that is page load, which
   is the base every countdown is measured from. It is a module constant rather
   than a call inside render, because reading a clock during render is impure. */
const LOADED_AT = Date.now();

export function SessionNotice() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(null);
  const now = useQuantisedNow();

  const paused = answer !== null;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % SESSIONS.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const session = SESSIONS[index];
  const target = LOADED_AT + session.minutesOut * 60 * 1000;

  // The server renders the first session at a plausible fixed time, so the
  // page reads correctly with JavaScript off. Once mounted it becomes a real
  // countdown rather than a picture of one.
  const clock = now === null ? "4:45 PM" : formatTime(target);
  let remaining = `in ${session.minutesOut} min`;
  if (now !== null) {
    const left = Math.round((target - now) / 60000);
    remaining = left > 0 ? `in ${left} min` : "time to go";
  }

  const choose = (next: Exclude<Answer, null>) =>
    setAnswer((current) => (current === next ? null : next));

  return (
    <SwingNotice className="notice-deep session pinup" tilt={-1.2}>
      <Pin />

      <header className="session-top">
        <span className="label">
          {session.group} &middot; {session.what}
        </span>
        <span className="stamp stamp-live">On the board</span>
      </header>

      <div className="session-body">
        <p className="session-what">Mehfil</p>

        <p className="session-when">
          <span>{clock}</span>
          <span className="countdown">{remaining}</span>
        </p>

        <div className="who">
          <span className="label">Who is in</span>
          <ul className="who-list">
            {session.crew.map((person) => (
              <li
                key={`${index}-${person.name}`}
                className={person.answer === "later" ? "is-out" : undefined}
              >
                <Avatar skin={person.skin} outfit={person.outfit} />
                {person.answer === "later" ? `${person.name}, later` : person.name}
              </li>
            ))}
            {answer && (
              <li className={answer === "later" ? "is-you is-out" : "is-you"}>
                <Avatar skin={2} outfit={4} />
                {answer === "later" ? "You, later" : "You"}
              </li>
            )}
          </ul>
        </div>

        <div className="session-actions">
          <button
            className="btn"
            type="button"
            aria-pressed={answer === "in"}
            onClick={() => choose("in")}
          >
            I am in
          </button>
          <button
            className="btn"
            type="button"
            aria-pressed={answer === "later"}
            onClick={() => choose("later")}
          >
            Later
          </button>
        </div>

        <p className="mt-6 text-[0.82rem] text-(--color-foreground-muted)">
          <span className="stamp stamp-demo mr-2">Demonstration</span>
          {paused
            ? "Cycling stopped while you are answering. Tap your answer again to undo it. Everyone here is invented."
            : "Built for this page, not a screenshot. Everyone here is invented. Try the buttons, and drag the notice."}
        </p>
      </div>
    </SwingNotice>
  );
}
