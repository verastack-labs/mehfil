import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verastack-labs.github.io/mehfil/"),
  title: "Mehfil",
  description:
    "Mehfil turns the most ignored question in your group chat into a plan. " +
    "One person proposes a time, everyone taps in or later, and you see who is " +
    "actually coming.",
  openGraph: {
    title: "Mehfil",
    description:
      "Chai in fifteen? One notice, two answers, and a list of who is actually coming.",
    url: "https://verastack-labs.github.io/mehfil/",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#F3E9DA",
};

/**
 * The direction contract for this surface.
 *
 * It is emitted as a real HTML comment rather than a JSX comment, because a
 * JSX comment vanishes at build time and a contract nobody can grep in the
 * built output is a contract nobody can audit. The wrapper carries
 * `display: contents` so it adds an element to the DOM but nothing to the
 * layout.
 */
const DIRECTION_CONTRACT = `<!--
  THESIS: A group has exactly one current session, and that refusal to offer
  options is the product. This page refuses the app-landing template of hero
  screenshot plus three feature cards plus logo wall.
  OWN-WORLD: A hostel and office notice board. Cream wall, warm paper notices,
  3px ink edges, zero radius, hard zero-blur offset shadows, saffron and
  terracotta pins. Space Grotesk uppercase over Inter. Tokens copied verbatim
  from mehfil-app.
  STORY: The visitor recognises the dead "chai?" message, sees one working
  notice fill with real names, understands that one notice is the whole idea,
  and pins their email.
  FIRST VIEWPORT: Brand plate top-left. Left, the word CHAI? at display scale
  over one paragraph and two buttons. Right, a live session notice with working
  RSVP, labelled as a demonstration. Primary action sits under the hook.
  FORM: Notice board, position 6 of 7 on the resonance list, external roll,
  seed key 6a7e3276.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <div
          style={{ display: "contents" }}
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
