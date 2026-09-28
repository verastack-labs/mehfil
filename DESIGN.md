---
name: Mehfil
description: A hostel notice board rendered in the browser - warm paper, ink borders, hard shadows, one repeated notice.
colors:
  background: "#F3E9DA"
  secondary-background: "#FAF4EA"
  surface-sunken: "#E8DBC8"
  border: "#1C120B"
  foreground: "#1C120B"
  foreground-muted: "color-mix(in srgb, #1C120B 65%, transparent)"
  main: "#E8A33D"
  main-foreground: "#1C120B"
  ring: "#B93E29"
  urgent: "#B93E29"
  urgent-foreground: "#F3E9DA"
  ink-faint: "color-mix(in srgb, #1C120B 22%, transparent)"
  skin-1: "#F1C27D"
  skin-2: "#E0AC69"
  skin-3: "#C68642"
  skin-4: "#8D5524"
  outfit-1: "#2E6E6B"
  outfit-2: "#7B4B8A"
  outfit-3: "#3A5FA8"
  outfit-4: "#B0572E"
typography:
  heading:
    fontFamily: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  body:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.65
rounded:
  base: "0px"
components:
  button-primary:
    backgroundColor: "{colors.main}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.base}"
    padding: "1rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.main}"
    padding: "1rem 1.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.base}"
  notice:
    backgroundColor: "{colors.secondary-background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.base}"
    padding: "2rem"
---

# Design System: Mehfil

## Overview

**Creative North Star: "The Notice Board"**

The page is a cream wall with one kind of object pinned to it: a paper notice, ink-bordered, holding still under a hard offset shadow until somebody drags it. Nothing else on the page tries to look like an app. There is no card grid pretending to be a dashboard, no gradient trying to look like glass. The direction contract embedded as an HTML comment in `app/layout.tsx` states the thesis directly: a group has exactly one current session, and that refusal to offer options is the product, so the page refuses the generic app-landing template of hero screenshot plus three feature cards plus logo wall.

Every visual decision on this page either comes from the product's own design system (`mehfil-app`, copied token-for-token) or extends it in service of the same physical metaphor: paper, pins, torn tabs, a stack of taken-down notices. Where the page invents something the app does not have - the deep shadow, the warm terracotta shadow, the tear-off tabs - it is invented as more board, not as a second visual language.

Key characteristics:
- Zero border radius everywhere, with no exception found in the code.
- Every shadow is a hard, non-blurred offset (`0` blur radius in all four shadow tokens).
- Nothing is pure white or pure black; the darkest and lightest values are `#1C120B` and `#FAF4EA`.
- Exactly one component class family (`.notice`) carries almost every visible object on the page.
- Motion is used sparingly and each use is explained by a specific defect it fixes, not by decoration.

## Colors

The palette is a warm chai board: cream walls, ink text and borders, saffron for the thing you can act on, terracotta for the thing that is live or urgent.

### Primary
- **Saffron** (`#E8A33D`, `--color-main`): the one accent for default, active, or selected state - the primary button, a selected chip, a pressed toggle. Text on saffron is ink at 8.54:1 contrast (verified in `mehfil-app/lib/contrast.mjs`, referenced from `PRODUCT.md`), which clears WCAG AAA.
- **Terracotta** (`#B93E29`, `--color-urgent` / `--color-ring`): reserved for what is live, urgent, or in focus - the "On the board" stamp, countdown text, display headings (`h1`/`h2`), the brand plate background, and the single focus ring used across every interactive element. Cream text on terracotta measures 4.62:1, which clears AA only at large-and-bold sizes, which is exactly how it is used. **Terracotta never carries body copy.** `h3` and below, and every `<p>`, stay ink. This is enforced in the base layer (`app/globals.css` line 120: `h1, h2 { color: var(--color-urgent); }`), not by convention alone.

### Neutral
- **Cream** (`#F3E9DA`, `--color-background`): the page base, and the background of `<body>`.
- **Warm off-white** (`#FAF4EA`, `--color-secondary-background`): raised surfaces - the notice body, buttons, inputs, the readout panel's chip backgrounds.
- **Sunken cream** (`#E8DBC8`, `--color-surface-sunken`): inset or muted surfaces - the ritual illustration tiles and the "taken down" notices in the stack.
- **Ink** (`#1C120B`, `--color-border` / `--color-foreground`): the darkest value in the system, used for every border, every shadow, and default text. There is no separate darker "black" anywhere in the code.
- **Ink, muted** (`color-mix(in srgb, #1C120B 65%, transparent)`, `--color-foreground-muted`): secondary text - ritual body copy, the "who is in" label, the honesty disclaimer.
- **Ink, faint** (`color-mix(in srgb, #1C120B 22%, transparent)`, `--color-ink-faint`): landing-only. Hairline rules on paper - the dashed rule above tear tabs, the divider inside the session notice's "who" block, the rule-label dashes in the creation flow.

### Named Rules

**The No Pure Rule.** Nothing in the token layer is `#FFFFFF` or `#000000`. The lightest value is warm off-white (`#FAF4EA`), the darkest is ink (`#1C120B`). This was an explicit brand instruction (`PRODUCT.md`) and holds with no exception in the CSS.

**The One Accent Per Area Rule.** Saffron marks what you can act on or have selected; terracotta marks what is live, urgent, or focused. The two are never used interchangeably for the same purpose on the same element.

## Typography

**Display font:** Space Grotesk (`--font-space-grotesk`), loaded via `next/font/google` in `app/layout.tsx` at weight 700 only, with `display: "swap"`.
**Body font:** Inter (`--font-inter`), loaded the same way at weights 400, 500, 600, 700, with `display: "swap"`.

**Character:** a heavy, uppercase, tightly-tracked display face over a plain, comfortable body face - the pairing of a hand-lettered signboard over ordinary paragraph text.

### Base-layer heading rules

Every `h1`-`h6` (`app/globals.css`, `@layer base`) gets, unconditionally: `font-family: var(--font-heading)`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: -0.025em`, `line-height: 0.95`, `text-wrap: balance`, `margin: 0`. `h1` and `h2` additionally render in terracotta (see Colors). There is no lighter heading weight anywhere in the type system; Space Grotesk is only ever loaded at 700.

### Display scale actually used in `page.tsx`

- **Hero `h1`** (`text-[clamp(3.75rem,15vw,6rem)]`, `tracking-[-0.04em]`): the cycling-word headline, the largest text on the page.
- **Section `h2`** (`text-[clamp(2rem,5.5vw,3.25rem)]`): used identically across "What goes up on the board," "One notice at a time," "Call one yourself," "Three things, then never again," and "Pin your email to the board."
- **The code notice's `h2`** (`text-[clamp(1.75rem,4vw,2.5rem)]`): a smaller display size, scoped to the single centered notice in "The whole invite is a code" section.
- **`h3` in the rituals grid**: `text-[2rem]` for the wide (chai) tile, `text-[1.5rem]` for every other tile - the one place font size is conditional on layout, driven by `ritual.span === "ritual-wide"` in `page.tsx`.
- **`.session-what`** (component class, not a heading element): `clamp(2.5rem, 7vw, 3.5rem)`, used for the literal word "Mehfil" inside the session notice.
- **`.dropped-time`** (component class): `clamp(2.5rem, 7vw, 3.5rem)`, the time readout after a demo notice is pinned in the creation flow.

### Named Rules

**The Uppercase-Always Rule.** Every heading element is forced uppercase in the base layer. There is no component anywhere that renders a lowercase or sentence-case heading.

## Layout

The page is a single column of full-bleed sections inside one constrained shell: `.shell { width: min(1180px, 100% - 3rem); margin-inline: auto; }`. Sections use Tailwind padding utilities directly in `page.tsx` (`py-36`, with `pt-8 pb-36` on the first) rather than a spacing token scale - there is no `--spacing-*` custom property in `globals.css`.

Two column layouts appear, both collapsing to one column below their breakpoint: the hero (`min-[1080px]:grid-cols-[1.15fr_0.85fr]`) and the call-a-mehfil flow (`min-[1080px]:grid-cols-[0.9fr_1.1fr]`). The rituals grid is `repeat(6, 1fr)` at full width, `repeat(2, 1fr)` at 960px and below, and a single column at 640px and below, with the wide/third/half span classes collapsing to `span 2` and then `span 1` at each step.

At 640px, the notice's tilt is forced to `0deg` with `!important`, the swing cursor is disabled, the signup form stacks vertically, and session actions drop from a two-column grid to one column. A rotated notice in a single narrow column reads as a rendering mistake rather than as pinned paper, which is the stated reason (`app/globals.css` line 678) for zeroing tilt at that width rather than merely shrinking it.

## Elevation & Depth

Depth is conveyed entirely by hard, zero-blur offset shadows over a 3px ink border, never by blur, gradient, or translucency. There are four shadow tokens.

### Shadow Vocabulary
- **`--shadow-shadow`** (`4px 4px 0 0 #1C120B`): the default weight. Buttons, chips, the code stamp, the signup input.
- **`--shadow-prominent`** (`6px 6px 0 0 #1C120B`): one step heavier. Used only on the base `.notice` class, so every notice on the board starts at this weight unless a modifier overrides it.
- **`--shadow-deep`** (`10px 10px 0 0 #1C120B`, landing-only addition): the heaviest shadow in the system, applied via `.notice-deep`. Used on the session notice and on a dropped notice in the creation flow - the one notice on a given screen that has to read as lying on top of everything else on the board, and while a notice is actively being dragged (`.swing.is-dragging` also switches to this shadow).
- **`--shadow-warm`** (`6px 6px 0 0 #B93E29`, landing-only addition): a terracotta shadow at the same weight as `--shadow-prominent`, applied via `.notice-warm`. It exists because the brief sanctions colour on the shadow of a dark element as a premium accent, and it is the cheapest way to remove ink mass from a page that would otherwise be ink borders over ink shadows all the way down. Used on the current-session notice in the stack demo, the code notice, the three "how it works" step notices, and the picker/dropped notices in the creation flow; also underlies `.btn-ink`, the creation flow's primary action.

### Named Rules

**The Flat Until Pinned Rule.** Nothing on the page floats on ambient shadow the way a Material card does. A shadow here always reads as an offset silhouette behind a bordered object, standing in for the gap between paper and pin.

## Shapes

`--radius-base: 0px` is set once, globally, and nothing in the codebase overrides it. Every bordered surface - notices, buttons, chips, inputs, the readout panel, avatars - has square corners. Borders are consistently 3px solid ink (`--color-border`) on primary objects (notices, buttons, chips, avatars) and drop to 2px on secondary marks (the stamp, the day toggle, hairline rules where those are solid rather than dashed). Dashed 2px ink-faint borders mark things that are provisional or optional rather than committed: the tear-tabs divider, the honesty disclaimer box, the rule-label dividers, the empty board state.

The illustrations (`components/Illustrations.tsx`) extend the same shape language into artwork: flat geometry, one stroke weight (5, or 4 for the chai glass's steam lines), miter joins, square line caps, no gradients or shading, drawn only from palette colors. The code comment there states the reasoning directly: a shaded vector scene reads as amateur clip art, and Indian matchbox and signboard art is built the same flat way.

## Components

### The notice

The notice is the page's one repeated object - the physical unit every session, taken-down record, and info block is expressed as.

**Anatomy** (`.notice` in `app/globals.css`): warm off-white background, 3px ink border, `--shadow-prominent` by default, `2rem` padding, and a CSS custom property `--tilt` (default `0deg`) applied via `rotate: var(--tilt)`. The rotate and box-shadow properties both transition on `--ease-settle`.

**Modifiers**, applied as additional classes on the same element:
- `.notice-deep` swaps in `--shadow-deep`.
- `.notice-flat` swaps in `--shadow-shadow`.
- `.notice-warm` swaps in `--shadow-warm`.
- `.notice-sunken` swaps the background to sunken cream.
- `.notice-pin-left` moves the pin (see below) from centered to `2rem` from the left edge, and shifts the swing transform-origin to match.

**The pin** (`components/Pin.tsx`): a small SVG, absolutely positioned at `top: -16px`, centered by default (`left: 50%; translate: -50% 0`) or left-aligned under `.notice-pin-left`. It renders as a saffron or terracotta filled circle with a 3px ink ring and a smaller ink center dot, selected by a `tone` prop (`"main"` default, `"urgent"`). It is structural, not decorative: the notice's rotation and its swing transform-origin are both defined relative to the pin's position, so a notice's `transform-origin` (`50% -10px`, or `2rem -10px` when pin-left) always sits at the pin.

**The tilt variable**: every place a notice is placed with a nonzero rest angle, it is set as an inline style on `--tilt` (e.g. `style={{ ["--tilt"]: "-0.8deg" }}` in `page.tsx`, or the `tilt` prop threaded into `SwingNotice`). Angles used across the page are small and varied (roughly -1.8deg to 1.4deg), so notices read as individually pinned rather than aligned to a grid.

### Interaction components

- **`SwingNotice`** (`components/SwingNotice.tsx`): wraps a notice in pointer-driven drag physics - grab it, and it rotates about its pin with a spring that settles back to `tilt` on release (`SPRING = 0.055`, `DAMPING = 0.86`, `MAX_ANGLE = 14` degrees either side of rest). It is disabled outright on coarse pointers (max-width 640px) and returns to rest immediately, with no spring, under `prefers-reduced-motion`. It demonstrates the product's core physical metaphor - paper on a pin - as a real, played-with interaction rather than an illustration of one.
- **`SessionNotice`** (`components/SessionNotice.tsx`): the working RSVP demo. Cycles through three invented sessions every 6.5 seconds, pauses the cycle the moment the visitor answers (because changing the notice mid-interaction would be hostile), and models the real RSVP semantics - exactly two states, "in" and "later," answering replaces rather than adds. It demonstrates that a group has exactly one current session and that RSVP is a two-state commitment, not a poll.
- **`CallAMehfil`** (`components/CallAMehfil.tsx`): the full creation flow - quick-pick duration chips, an occasion chip group, a live time readout, a today/tomorrow toggle, and a primary action that pins a notice to an adjacent, otherwise-empty board. Putting up a second notice is not offered at all; the button becomes "Take it down" once one exists. It demonstrates the product's central, database-enforced constraint (one session at a time) as something the visitor's own hand runs into, not as an assertion in copy.
- **`TearTabs`** (`components/TearTabs.tsx`): a fringe of eight tear-off tabs under the code notice, modeled on a hostel flyer's phone-number strip. Tearing a tab attempts to copy the code to the clipboard and reports which of the two possible outcomes (copied, or copy blocked) actually happened.
- **`CyclingWord`** (`components/CyclingWord.tsx`): see Motion below - it is documented there because its whole design is a motion decision.

## Motion

Motion on this page is deliberately small in surface area, and every rule below exists because breaking it broke something specific during development. Treat these as invariants, not preferences.

**`rotate` has exactly one owner: the tilt-and-drag system (`SwingNotice`).** No animation, keyframe, or transition may set `rotate` on a notice. Two separate, already-encountered bugs are the reason:
1. A CSS animation outranks an element's own inline style in the cascade, so when an entrance animation also touched `rotate`, the drag handler's `el.style.rotate` writes were silently overridden and dragging stopped working.
2. A rotated element's bounding box is wider than the element itself. Three degrees of rotation on a tall notice widened the page by 37px and produced a horizontal scrollbar.

Both vanish once `rotate` is only ever written by `SwingNotice`'s pointer handlers and its settle loop. The entrance keyframes (`pinup`, `drop-in`) move on `translate` and `opacity` only, explicitly to avoid this.

**Entrance animations use `fill-mode: backwards`, never `both`.** `.pinup` and `.dropped` (`app/globals.css`) both end their `animation` shorthand in `backwards`. This holds the animation's `from` state before it starts (so a notice doesn't flash at its resting position for one frame before animating in) without pinning it to the `to` state forever afterward the way `both` would - which matters because these same elements are later moved by unrelated code (drag, settle) that needs to own their transform once the entrance is done.

**The cycling word (`CyclingWord.tsx`) is an odometer, not a fade.** The outgoing word rolls up and out of its slot on `letter-out` while the incoming word rolls up and in on `letter-in`, so there is ink in the slot at every instant of the cycle. The component's own comment records why: the first version faded each letter in from zero opacity on a stagger, which left the headline entirely blank for roughly a third of every 2800ms cycle - in the first viewport of a page whose whole job is persuasion. A hidden measuring copy of the longest word (`.cycle-measure`) reserves the slot's width so the question mark after it never shifts.

**One easing curve for everything: `--ease-settle` (`cubic-bezier(0.16, 1, 0.3, 1)`).** It is used on the skip link, the notice's rotate/shadow transitions, buttons, chips, tabs, and every keyframe animation (`pinup`, `drop-in`, `tear`, `letter-in`, `letter-out`). There is no second easing token anywhere in the CSS.

**Everything respects `prefers-reduced-motion`.** The base layer (`app/globals.css`, `@layer base`) collapses `animation-duration`, `animation-iteration-count`, and `transition-duration` globally under `@media (prefers-reduced-motion: reduce)`, and sets `scroll-behavior: auto`. On top of that global gate, individual keyframe blocks (`.cycle-in`/`.cycle-out` letters, `.dropped`, `.pinup`) are themselves wrapped in `@media (prefers-reduced-motion: no-preference)`, so they do not fire at all rather than firing at near-zero duration. `SwingNotice` additionally checks the media query directly in JavaScript and skips the settle spring on release when it matches.

## Accessibility

WCAG 2.1 AA is the stated floor (`PRODUCT.md`), verified mechanically in the private app repo (`mehfil-app/scripts/check-contrast.mjs`) rather than asserted.

**One focus ring, everywhere.** `:where(a, button, input, [tabindex]):focus-visible` gets a single treatment across the whole page: `outline: 3px solid var(--color-ring)` (terracotta) with `3px` offset. The base-layer comment gives the reason: terracotta reads legibly on every surface in the palette (cream, saffron, sunken cream, ink), where the other accent colors do not all clear that bar.

**Decorative-versus-real controls in `TearTabs`.** Of the eight tear tabs rendered, only the first is a real, focusable, labeled control (`aria-label="Tear off the invite code {code}"`). The remaining seven are `aria-hidden="true"` with `tabIndex={-1}` - visually identical, mouse-clickable, but absent from the tab order and from assistive technology. The component's own comment explains why: eight buttons with an identical accessible name would be eight identical stops in the tab order saying the same thing, and a torn tab animated to zero opacity was still focusable and still firing before this fix.

**Cycling text exposed to screen readers as one stable string.** `CyclingWord` hides its animated letter layers from assistive technology (`aria-hidden="true"` on both the outgoing and incoming layer) and instead exposes a single static `label` string via `.sr-only` - for the hero, "Shall we go? Chai, cards, dinner, whatever it is." A heading that silently rewrites itself every few seconds would be noise to a screen reader, not information.

**Honesty labelling on demonstration data.** Anywhere invented data appears as if it were live, it is marked: the session notice carries a visible `stamp-demo` badge reading "Demonstration" plus a sentence stating the people shown are invented, and the waitlist section's `.honest` block states plainly that the design system is built, the app is unbuilt, there are no real users, and the waitlist form sends nothing anywhere. This is a content rule with a visual expression (`.stamp-demo`: dashed border, muted color, transparent background - deliberately quieter than `.stamp-live`'s solid terracotta fill) rather than a purely copy-level decision.

## Do's and Don'ts

### Do:
- **Do** keep the shared `@theme` block in `app/globals.css` (lines 19-46) a byte-for-byte copy of `mehfil-app/app/globals.css`'s first `@theme` block. Edit it in `mehfil-app` and copy it across; never hand-edit it here. `pnpm check:tokens` (`scripts/check-tokens.mjs`) diffs the two blocks exactly (stripped of carriage returns only) and fails the build on any drift. It skips with a message, rather than failing, when `mehfil-app` is not checked out beside this repo - which is the normal case in CI, so the skip there is informational only; run the check locally before touching tokens.
- **Do** add any landing-only token to the second `@theme` block (lines 54-84) as an extension, never as an override of a value the first block already defines.
- **Do** give `rotate` to `SwingNotice` alone. If a notice needs a new animated entrance, animate `translate` and `opacity`, and end the animation's fill-mode in `backwards`.
- **Do** use `--ease-settle` for any new transition or keyframe animation on this page; it is the only easing token defined.
- **Do** wrap any new animation in `@media (prefers-reduced-motion: no-preference)` in addition to relying on the global reduced-motion override in the base layer.
- **Do** mark any new demonstration data - a name, a count, a session, an avatar - as invented, visibly, the way `SessionNotice` and the `.honest` block already do.

### Don't:
- **Don't** put terracotta on body copy. It carries display headings (`h1`, `h2`) and small accent marks (stamps, labels, the ring) only; every paragraph and every `h3`-and-below stays ink.
- **Don't** use pure white or pure black anywhere; the palette's extremes are `#FAF4EA` and `#1C120B`.
- **Don't** add a non-zero border radius. `--radius-base: 0px` has no exception in the current code.
- **Don't** add gradients, blur, or a glass/translucency effect. Every fill in the CSS is a flat color, a `color-mix` transparency ramp of ink, or one of the four hard-offset shadow tokens - never a `blur()`, `backdrop-filter`, or gradient.
- **Don't** shade, gradient, or perspective the illustrations. They are flat geometry in a single stroke weight, matching Indian matchbox and signboard art, and a shaded vector scene reads as amateur clip art by the component's own design comment.
- **Don't** use emoji as icons. Every icon-like mark on the page (the pin, the illustrations, the avatar figures) is an inline SVG built from palette tokens.
- **Don't** depict tobacco imagery. The sutta break is drawn as a matchbox, not a cigarette; "sutta" may appear in copy as vernacular, but a cigarette may not appear as a graphic (`PRODUCT.md`, `components/Illustrations.tsx`).
