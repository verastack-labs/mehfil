"use client";

import { useState, type FormEvent } from "react";

/**
 * The waitlist.
 *
 * It validates properly and then tells the truth, which is that nothing is
 * collected yet. When the Supabase project exists, the marked block below is
 * the only thing that changes: it posts to the waitlist table and the success
 * message stops disclaiming.
 *
 * Writing it this way rather than disabling the field is deliberate. A
 * disabled primary action on a page whose whole job is persuasion reads as
 * abandoned, and a form that silently pretends to store an address would be
 * worse than either.
 */

type Tone = "error" | "ok" | undefined;

const looksLikeEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export function WaitlistForm() {
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<Tone>(undefined);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      setInvalid(true);
      setTone("error");
      setMessage("Enter an email address first.");
      return;
    }
    if (!looksLikeEmail(trimmed)) {
      setInvalid(true);
      setTone("error");
      setMessage(
        "That does not look like an email address. Check for a missing @ or a typo in the domain.",
      );
      return;
    }

    setInvalid(false);
    setBusy(true);

    // TODO(waitlist): POST to the Supabase waitlist table once the project
    // exists. Until then this deliberately claims nothing.
    window.setTimeout(() => {
      setBusy(false);
      setTone("ok");
      setMessage(
        "The waitlist is not live yet, so that was not sent or stored anywhere. It opens when the app does.",
      );
    }, 500);
  };

  return (
    <>
      <form className="signup" onSubmit={onSubmit} noValidate>
        <div className="signup-field">
          <label className="label" htmlFor="email">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={invalid}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (invalid && looksLikeEmail(event.target.value)) {
                setInvalid(false);
                setMessage("");
                setTone(undefined);
              }
            }}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Pinning" : "Pin it"}
        </button>
      </form>
      <p className="mt-3 text-[0.85rem] text-(--color-foreground-muted)">
        The waitlist is not live yet, so this sends nothing and stores nothing.
        Said here rather than after you type.
      </p>
      <p className="formmsg" id="formmsg" data-tone={tone} role="status" aria-live="polite">
        {message}
      </p>
    </>
  );
}
