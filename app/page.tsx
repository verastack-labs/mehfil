import {
  AutoRickshaw,
  ChaiGlass,
  Matchbox,
  PlayingCards,
  Tiffin,
} from "@/components/Illustrations";
import { CallAMehfil } from "@/components/CallAMehfil";
import { CyclingWord } from "@/components/CyclingWord";
import { Pin } from "@/components/Pin";
import { SessionNotice } from "@/components/SessionNotice";
import { SwingNotice } from "@/components/SwingNotice";
import { TearTabs } from "@/components/TearTabs";
import { WaitlistForm } from "@/components/WaitlistForm";

/* The hero word cycles because the product is not about any one of these.
   Chalein is the universal case: shall we go. */
const HERO_WORDS = ["Chalein", "Chai", "Cards", "Dinner", "Sutta"] as const;

const RITUALS = [
  {
    key: "chai",
    span: "ritual-wide",
    art: <ChaiGlass />,
    title: "Chai",
    body: "The eleven o'clock. The four o'clock. The one that was going to be ten minutes and turns into an hour. It is the most common mehfil, not the only one.",
  },
  {
    key: "break",
    span: "ritual-third",
    art: <Matchbox />,
    title: "The sutta break",
    body: "Five minutes outside. The one nobody bothers typing out, because by the time they have, everyone has already gone down and come back.",
  },
  {
    key: "cards",
    span: "ritual-half",
    art: <PlayingCards />,
    title: "Cards",
    body: "Teen patti on a Friday. One notice, and the table fills itself.",
  },
  {
    key: "lunch",
    span: "ritual-half",
    art: <Tiffin />,
    title: "Lunch",
    body: "Dinner is ready in ten. Flatmates, not a calendar invite.",
  },
  {
    key: "outing",
    span: "ritual-half",
    art: <AutoRickshaw />,
    title: "An outing",
    body: "Somebody has an auto. Somebody else knows a place.",
  },
];

const STEPS = [
  {
    when: "First",
    title: "Start a group",
    body: "Name it. Mehfil hands you a code. Anyone holding that code is in, and you can regenerate it the day it ends up somewhere it should not be.",
    tilt: -0.7,
  },
  {
    when: "Then",
    title: "Call a mehfil",
    body: "Fifteen minutes from now, or an exact time tonight. Anyone in the group can call one, not just whoever started it.",
    tilt: 0.5,
  },
  {
    when: "Then",
    title: "Watch it fill",
    body: "In, or later. Everybody sees each answer land as it happens, so nobody has to ask who is coming.",
    tilt: -0.4,
  },
];

export default function Home() {
  return (
    <div className="relative">
      <main id="main" className="shell">
        {/* ========== 1. THE BOARD ========== */}
        <section className="pt-8 pb-36" aria-labelledby="hook-h">
          <div className="plate">
            <b>Mehfil</b>
            <span>a gathering, convened at short notice</span>
          </div>

          <div className="mt-16 grid items-start gap-16 min-[1080px]:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1
                id="hook-h"
                className="text-[clamp(3.75rem,15vw,6rem)] tracking-[-0.04em]"
              >
                <CyclingWord
                  words={HERO_WORDS}
                  label="Shall we go? Chai, cards, dinner, whatever it is"
                />
                <span aria-hidden="true">?</span>
              </h1>
              <p className="mt-8 max-w-[44ch] text-[1.3rem] leading-[1.5]">
                Every group has this message, and it scrolls away before anyone
                answers it. Mehfil turns it into one time, two answers, and a
                live list of who is actually turning up.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <a className="btn btn-primary" href="#waitlist">
                  Pin your email
                </a>
                <a className="btn btn-ghost" href="#how">
                  See how it works
                </a>
              </div>
            </div>

            <SessionNotice />
          </div>
        </section>

        {/* ========== 2. THE RITUALS ========== */}
        <section className="py-36" aria-labelledby="rituals-h">
          <h2
            id="rituals-h"
            className="mb-12 max-w-[14ch] text-[clamp(2rem,5.5vw,3.25rem)]"
          >
            What goes up on the board
          </h2>
          <p className="mb-12 max-w-[62ch] text-[1.125rem] text-(--color-foreground-muted)">
            Chai is a mehfil. So is cards, so is dinner in ten minutes, so is
            five minutes outside. The occasion changes and the notice does not.
          </p>

          <div className="rituals">
            {RITUALS.map((ritual) => (
              <article key={ritual.key} className={`ritual ${ritual.span}`}>
                <div className="ritual-art">{ritual.art}</div>
                <div>
                  <h3
                    className={
                      ritual.span === "ritual-wide" ? "text-[2rem]" : "text-[1.5rem]"
                    }
                  >
                    {ritual.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] text-(--color-foreground-muted)">
                    {ritual.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========== 3. THE RULE ========== */}
        <section className="py-36" aria-labelledby="one-h">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 id="one-h" className="mb-12 max-w-[12ch] text-[clamp(2rem,5.5vw,3.25rem)]">
                One notice at a time
              </h2>
              <div className="max-w-[68ch] space-y-4">
                <p>
                  Every other tool hands you options. Three times to compare, a
                  poll to run, a thread to read back. That is the part that
                  fails, so Mehfil will not do it.
                </p>
                <p>
                  A group gets exactly one current session. Not by convention,
                  and not because the screen only shows one: the constraint is
                  specified in the database rather than the interface, so a
                  second cannot be accepted while the first is standing. When
                  its time arrives, the board is free again.
                </p>
              </div>
            </div>

            <div className="stack" aria-hidden="true">
              <div
                className="notice stack-old"
                style={{ ["--tilt" as string]: "1.4deg", top: 0, zIndex: 1 }}
              >
                <span className="label">Taken down</span>
                <p className="struck mt-2 font-(family-name:--font-heading) text-[1.5rem] uppercase text-(--color-foreground-muted)">
                  Lunch, 1:15
                </p>
              </div>
              <div
                className="notice stack-old"
                style={{ ["--tilt" as string]: "-1.8deg", top: 112, zIndex: 2 }}
              >
                <span className="label">Taken down</span>
                <p className="struck mt-2 font-(family-name:--font-heading) text-[1.5rem] uppercase text-(--color-foreground-muted)">
                  Cards, 9:00
                </p>
              </div>
              <SwingNotice
                as="div"
                className="notice-warm stack-current"
                tilt={-0.8}
                style={{ top: 232, zIndex: 3 }}
              >
                <Pin tone="urgent" />
                <span className="label">On the board now</span>
                <p className="mt-2 font-(family-name:--font-heading) text-[2.25rem] uppercase leading-none">
                  Chai, 4:45
                </p>
              </SwingNotice>
            </div>
          </div>
        </section>

        {/* ========== 3b. CALL A MEHFIL ========== */}
        <section className="py-36" aria-labelledby="call-h">
          <h2
            id="call-h"
            className="mb-12 max-w-[13ch] text-[clamp(2rem,5.5vw,3.25rem)]"
          >
            Call one yourself
          </h2>
          <p className="mb-12 max-w-[62ch] text-[1.125rem] text-(--color-foreground-muted)">
            This is the whole creation flow, working. Pick a time, say what it
            is for, put it up. Then try to put up a second one.
          </p>
          <CallAMehfil />
        </section>

        {/* ========== 4. THE CODE ========== */}
        <section className="py-36" aria-labelledby="code-h">
          <article
            className="notice notice-warm notice-pin-left pinup mx-auto max-w-[560px] p-0"
            style={{ ["--tilt" as string]: "0.6deg" }}
          >
            <Pin />
            <div className="px-8 pt-12 text-center">
              <h2 id="code-h" className="text-[clamp(1.75rem,4vw,2.5rem)]">
                The whole invite is a code
              </h2>
              <p className="mt-6 text-(--color-foreground-muted)">
                No email invitations, no directory, no searching for people you
                already see every day. The group exists before Mehfil does. It
                only needs a door. Paste the code into the chat you are already
                in.
              </p>
            </div>
            <TearTabs code="KDK-4F72" />
          </article>
        </section>

        {/* ========== 5. HOW ========== */}
        <section className="py-36" id="how" aria-labelledby="how-h">
          <h2
            id="how-h"
            className="mb-12 max-w-[15ch] text-[clamp(2rem,5.5vw,3.25rem)]"
          >
            Three things, then never again
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {STEPS.map((step) => (
              <article
                key={step.title}
                className="notice notice-warm"
                style={{ ["--tilt" as string]: `${step.tilt}deg` }}
              >
                <span className="label block text-(--color-urgent)">
                  {step.when}
                </span>
                <h3 className="mt-4 text-[1.25rem]">{step.title}</h3>
                <p className="mt-4 text-[0.98rem] text-(--color-foreground-muted)">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ========== 6. WAITLIST ========== */}
        <section className="py-36" id="waitlist" aria-labelledby="wait-h">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 id="wait-h" className="text-[clamp(2rem,5.5vw,3.25rem)]">
              Pin your email to the board
            </h2>
            <p className="mx-auto mt-6 max-w-[54ch] text-[1.125rem] text-(--color-foreground-muted)">
              Mehfil is being built slowly and is not finished. No launch
              date, no countdown, and no newsletter.
            </p>

            <WaitlistForm />

            <div className="honest">
              <strong className="text-(--color-foreground)">
                Where this actually stands, September 2026.
              </strong>{" "}
              The design system is built and the database schema is specified,
              with the first migration written and not yet applied to anything.
              No screens exist. The notice at the top of this page is a working
              demonstration made for this page, and the four people on it are
              invented. There are no users to count, no funding to mention, and
              no date to give you. The waitlist itself is not live yet, so the
              field above validates but sends nothing anywhere.
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t-3 border-(--color-urgent) py-8">
        <div className="shell flex flex-wrap items-center justify-between gap-6 text-[0.85rem] text-(--color-foreground-muted)">
          <div className="plate">
            <b>Mehfil</b>
          </div>
          <p>
            Built by{" "}
            <a
              className="underline underline-offset-[3px]"
              href="https://github.com/verastack-labs"
            >
              Verastack Labs
            </a>
            . Mehfil will be a progressive web app, so there is no app store
            and no store fee.
          </p>
        </div>
      </footer>
    </div>
  );
}
