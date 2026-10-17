/**
 * JSON-LD for the landing page.
 *
 * Why this exists: the AI search crawlers that matter here do not run
 * JavaScript, so everything a model should know has to be in the HTML the
 * server sends. This file is that, in machine-readable form.
 *
 * Two rules it follows, both of which matter more than completeness.
 *
 * 1. Every claim below is one the visible page already makes. Structured data
 *    that runs ahead of the page is the fastest way to earn a manual action,
 *    and this page is unusually careful about not overclaiming: it says
 *    outright that no screens exist and that the waitlist sends nothing. So
 *    there is no `offers` node (no price is public), no `aggregateRating` (no
 *    users to rate it), and no `datePublished` for a thing that has not
 *    shipped. If a claim is not on the page, it is not here.
 *
 * 2. The Organization keeps the `@id` the studio's own site uses,
 *    `https://verastack.dev/#organization`. A different `@id` for the same
 *    studio would read as a second, unrelated company that happens to share a
 *    name, which is the exact confusion this markup is supposed to prevent.
 *
 * The shape mirrors verastack.dev: one `@context`, one `@graph`, `@id` anchors
 * so the nodes can point at each other.
 */

const SITE = "https://mehfil.verastack.dev/";
const ORG = "https://verastack.dev/#organization";

export type FaqEntry = { q: string; a: string };

/**
 * The questions, in one place.
 *
 * `app/page.tsx` renders this same array as the visible FAQ, which is not a
 * convenience. The check requires the FAQ to be visible as well as marked up,
 * and Google treats marked-up answers that do not appear on the page as spam,
 * so the two must not drift apart. One source makes that impossible.
 *
 * Declared above `STRUCTURED_DATA` deliberately: that object calls the mapper
 * below while the module is being evaluated, and a `const` referenced before
 * its declaration is a temporal dead zone error rather than `undefined`.
 */
export const FAQ: FaqEntry[] = [
  {
    q: "What is Mehfil?",
    a: "Every group chat has the message that asks whether everyone is going, and it scrolls away before anyone answers it. Mehfil turns that into one time, two answers, and a live list of who is actually turning up.",
  },
  {
    q: "How many plans can a group have at once?",
    a: "Exactly one. A group gets one current session, and the constraint is specified in the database rather than the interface, so a second cannot be accepted while the first is standing. When its time arrives, the board is free again.",
  },
  {
    q: "How do people join a group?",
    a: "The whole invite is a code. There are no email invitations and no directory, because the group already exists before Mehfil does and only needs a door. You paste the code into the chat you are already in, and you can regenerate it the day it ends up somewhere it should not be.",
  },
  {
    q: "Who can call a mehfil, and what can people answer?",
    a: "Anyone in the group can call one, not just whoever started it, for fifteen minutes from now or an exact time tonight. The answers are in, or later, and everybody sees each one land as it happens.",
  },
  {
    q: "Is there an app to download?",
    a: "No. Mehfil will be a progressive web app, so there is no app store and no store fee.",
  },
  {
    q: "Can I use it yet?",
    a: "Not yet. Mehfil is being built slowly and is not finished. The design system is built and the database schema is specified, with the first migration written and not yet applied to anything. No screens exist, there is no launch date, and the waitlist itself is not live, so the email field on this page validates but sends nothing anywhere.",
  },
];

const faqNodes = () =>
  FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  }));

export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG,
      name: "VeraStack Labs",
      url: "https://verastack.dev/",
      logo: "https://verastack.dev/icon.svg",
      sameAs: ["https://github.com/verastack-labs", "https://verastack.dev/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}#website`,
      url: SITE,
      name: "Mehfil",
      inLanguage: "en",
      publisher: { "@id": ORG },
      about: { "@id": `${SITE}#app` },
    },
    {
      /* Both types on purpose. WebApplication is the accurate one, since the
         page's footer says Mehfil will be a progressive web app, but it is a
         subtype of SoftwareApplication and a reader looking for the parent
         term should not have to know the hierarchy to find it. */
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${SITE}#app`,
      name: "Mehfil",
      url: SITE,
      image: `${SITE}icon.svg`,
      applicationCategory: "SocialNetworkingApplication",
      /* A progressive web app, per the footer, so the platform is the browser
         rather than any particular operating system. */
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser",
      publisher: { "@id": ORG },
      author: { "@id": ORG },
      description:
        "Mehfil turns the message that scrolls away in a group chat into one " +
        "time, two answers, and a live list of who is actually turning up. A " +
        "group gets exactly one current session at a time.",
      featureList: [
        "One current session per group, enforced in the database rather than the interface",
        "Two answers: in, or later",
        "Invite by a single group code, pasted into a chat the group already uses",
        "Anyone in the group can call a session, not only its creator",
        "Answers appear as they land, so nobody has to ask who is coming",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}#faq`,
      isPartOf: { "@id": `${SITE}#website` },
      mainEntity: faqNodes(),
    },
  ],
};
