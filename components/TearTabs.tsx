"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The invite, as the thing it actually resembles.
 *
 * A hostel notice with a fringe of tear-off phone-number tabs is exactly what
 * a shareable group code is, so tearing one here really tears it off and puts
 * the code on the clipboard. The clipboard call can fail legitimately (an
 * insecure origin, a denied permission), so the outcome message says which of
 * the two happened rather than claiming success either way.
 */

const TAB_COUNT = 8;

export function TearTabs({ code }: { code: string }) {
  const [torn, setTorn] = useState<ReadonlySet<number>>(new Set());
  const [message, setMessage] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const say = (text: string) => {
    setMessage(text);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(""), 4000);
  };

  const tear = async (index: number) => {
    setTorn((previous) => new Set(previous).add(index));

    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (torn.size + 1 >= TAB_COUNT) {
      say("That was the last tab. The code can be regenerated for a fresh set.");
      return;
    }

    say(
      copied
        ? `${code} copied. Paste it in the group chat.`
        : `${code} torn off. Copying is blocked here, so type it in.`,
    );
  };

  return (
    <>
      <p
        className="formmsg px-8 pb-6 text-center"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      <ul className="tabs">
        {Array.from({ length: TAB_COUNT }, (_, index) => {
          /* Only the first tab is a real control. Eight buttons with identical
             accessible names is eight identical stops in the tab order saying
             the same thing, and a torn tab animated to zero opacity was still
             focusable and still firing. The rest stay as the visual fringe,
             clickable by mouse, invisible to the keyboard and to assistive
             technology. */
          const isTorn = torn.has(index);
          const isPrimary = index === 0;
          return (
            <li key={index}>
              <button
                type="button"
                className={`tab ${isTorn ? "is-torn" : ""}`}
                onClick={() => tear(index)}
                disabled={isTorn}
                aria-label={
                  isPrimary ? `Tear off the invite code ${code}` : undefined
                }
                aria-hidden={isPrimary ? undefined : true}
                tabIndex={isPrimary ? undefined : -1}
              >
                {code}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
