# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated. Plain static HTML and CSS with hand-authored inline SVG, no build step
and no framework. Chosen because this repo is served by GitHub Pages at
`verastack-labs.github.io/mehfil`, where a static file deploys with zero
configuration, and because a landing page that needs a toolchain acquires
dependency drift it never repays. The product app itself is a separate Next.js
repo (`mehfil-app`); this repo mirrors its design tokens by value, not by import.

## Users

Small, already-formed groups of people who see each other often and decide things
informally: flatmates, office colleagues, hostel wings, a regular card circle.
They are comfortable with technology but are not looking for another app to
manage. The job is not scheduling in the calendar sense. It is answering one
question fast: who is actually coming, right now or in the next hour?

The situation is almost always a group chat where somebody typed "chai?" and got
silence, or three replies an hour later, or a conversation that drifts without
ever resolving.

## Product Purpose

Mehfil turns an informal, low-stakes invitation into a visible commitment. One
person proposes a time, the rest of the group tap "I'm in" or "Later", and
everyone sees who is coming, live. Success is that a group stops negotiating in
chat and starts showing up.

It deliberately does not do calendars, reminders, recurring events, locations, or
scheduling negotiation. Those belong to a different product.

## Positioning

The mechanism a neighbouring product could not truthfully copy without becoming
this one: **a group has exactly one current session at a time.** That constraint
is enforced in the database, not in the interface. There is no list of competing
proposals to compare, no polling, no "which of these three times works for
everyone". There is one question on screen and two answers.

The second mechanism: a user marks one group as their default, so opening the app
lands directly inside that group's current session rather than on a group list.
The common case costs zero navigation.

## Operating Context

The rituals this serves are specific and recurring rather than planned: the chai
break, the smoke break, the lunch call, a cards evening, a spontaneous outing.
They are proposed minutes to hours ahead, not days. Their coordination currently
happens in WhatsApp-style group chats and fails in a characteristic way, where
the proposal scrolls out of view before enough people answer it.

Invitations spread by a short shareable code passed into that same chat, rather
than by email invite, because the group already exists socially and only needs a
door.

## Capabilities and Constraints

Confirmed and specified, though not yet built:

- Groups, joined by a short regenerable invite code in the format `XXX-XXXX`.
- Sessions with a proposed time, either a quick relative pick (15, 30, 45 or 60
  minutes from now) or an exact time today or tomorrow.
- RSVP with exactly two states, "in" and "later". No third state, no maybe.
- Live updates of who is coming, via Supabase Realtime.
- Web Push notifications. On iOS these work only after the user adds the app to
  their home screen, which needs an explicit onboarding step.
- Authentication is Google OAuth only. No email and password, and no Sign in with
  Apple, which would require an Apple Developer Program membership at USD 99 per
  year and reinstate the exact cost the PWA decision was made to avoid.
- Users are visible to each other by a chosen username and a chosen avatar only.
  Real name and email are deliberately never stored in the readable profile.
- Avatars are chosen from a fixed catalogue of SVG figures with selectable skin
  tone and outfit colour, not uploaded images.
- Delivered as a PWA rather than a native app, specifically to avoid Apple's USD
  99 per year and Google Play's USD 25 store fees.

Undecided, and not to be invented: launch date, pricing (the intent is free at MVP
scale, but no commercial commitment has been made), and group size limits.

## Brand Commitments

- The name is **Mehfil**, an Urdu and Hindi word for a gathering, particularly one
  convened for music, poetry, or company. Chosen deliberately over a literal
  "chai" name so the product covers cards, lunch and outings equally well.
- The visual system is fixed and already shipped in `mehfil-app`: a neobrutalist
  language on a warm chai palette. Cream `#F3E9DA`, warm off-white `#FAF4EA`,
  sunken cream `#E8DBC8`, ink `#1C120B`, saffron `#E8A33D`, terracotta `#B93E29`.
  Borders are 3px solid ink, border radius is zero everywhere, shadows are hard
  offsets with no blur. Display face Space Grotesk, body face Inter.
- Nothing is ever pure white or pure black. This was an explicit instruction: the
  palette has to stay comfortable to look at.
- **No tobacco imagery.** The project's own brief requires that the product does
  not depict or promote tobacco use, and that imagery stays on the tea-break
  hangout framing. The word "sutta" may appear in copy as cultural vernacular; a
  cigarette may not appear as a graphic.
- **No em dashes** in any copy, ever. Ordinary hyphens are fine. This is a
  standing instruction from the owner.

## Evidence on Hand

Honest state as of 2026-09-28, which future work must not fabricate past:

- **The app does not exist.** The design system is built and merged. The data
  layer is fully specified and planned, with one migration written and not yet
  applied to any database. No screens beyond a token preview route exist.
- **There are no users, no signups, no testimonials, no press, no metrics and no
  case studies.** Any number, quote, logo or endorsement on a surface would be
  fabricated.
- Real assets that do exist: the token layer at `mehfil-app/app/globals.css`,
  Button, Card and Badge components, verified contrast ratios in
  `mehfil-app/lib/contrast.mjs`, and the data layer spec and plan under
  `mehfil-internal/docs/`.
- Product screenshots do not exist. Any interface shown on a marketing surface is
  a constructed demonstration and has to be recognisable as one.

## Product Principles

1. **One question on screen.** The product's whole advantage is its refusal to
   offer alternatives. Surfaces should inherit that refusal rather than present
   menus.
2. **Commitment is the unit, not the calendar entry.** What matters is who is
   coming, visibly, now. Never reframe this as scheduling software.
3. **The group already exists.** Mehfil never helps people find each other, build
   an audience or grow a network. It serves circles that are already closed.
4. **Cultural specificity is the moat.** The product encodes an Indian social
   rhythm precisely. Genericising it into "group coordination" throws away the
   reason it works at all.
5. **Say what is true.** The product is unbuilt, and surfaces have to be honest
   about that rather than implying traction that does not exist.

## Accessibility & Inclusion

WCAG 2.1 AA is the floor, and the design system already enforces it mechanically:
`mehfil-app/scripts/check-contrast.mjs` verifies every documented colour pairing
and fails below its stated minimum. Verified ratios include ink on cream at
15.32:1, ink on saffron at 8.54:1, and cream on terracotta at 4.62:1, which is
why terracotta carries large or bold text only and never body copy.

Motion must respect `prefers-reduced-motion`. Every interactive control needs a
visible keyboard focus state, which in this system reads as a terracotta ring.
