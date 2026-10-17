import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://mehfil.verastack.dev/"),
  title: "Mehfil - Call a mehfil, see who is actually coming",
  alternates: {
    /* Resolved against `metadataBase` above. The emitted href must match the
       `<loc>` in app/sitemap.ts exactly, trailing slash included, or Search
       Console reports the two as a mismatch. Verified against out/index.html
       after a build, not assumed. */
    canonical: "/",
  },
  description:
    "Mehfil turns the most ignored question in your group chat into a plan. " +
    "One person proposes a time, everyone taps in or later, and you see who is " +
    "actually coming.",
  openGraph: {
    title: "Mehfil - Call a mehfil, see who is actually coming",
    description:
      "Call a mehfil: one time, two answers, and a live list of who is actually " +
      "coming. No polls, no chasing the group chat, no plan that quietly dies.",
    url: "https://mehfil.verastack.dev/",
    type: "website",
    /* Points at the .png copies made by scripts/og-filenames.mjs, not at
       Next's own extensionless /opengraph-image route. GitHub Pages serves an
       extensionless file as application/octet-stream and every scraper refuses
       a non-image og:image, so the card rendered nowhere. Observed live. */
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mehfil. Call a mehfil, and see who is actually coming.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehfil - Call a mehfil, see who is actually coming",
    description:
      "Call a mehfil: one time, two answers, and a live list of who is actually " +
      "coming. No polls, no chasing the group chat, no plan that quietly dies.",
    images: ["/twitter.png"],
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
  FIRST VIEWPORT: Brand plate top-left. Left, a cycling word at display scale
  over one paragraph and two buttons; it opens on CHALEIN, never on CHAI, since
  a static chai headline argued against the brand. Right, a live session notice
  with working RSVP, labelled as a demonstration. Primary action under the hook.
  FORM: Notice board, position 6 of 7 on the resonance list, external roll,
  seed key 6a7e3276.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

/**
 * Cloudflare Web Analytics.
 *
 * Cookieless and without cross-site identifiers, so it needs no consent
 * banner and the page stays free of one. The beacon token is a public site
 * identifier, not a secret: it is visible in the served HTML of every site
 * that uses this product, and committing it here is how Cloudflare intends it
 * to be deployed.
 *
 * Production only. A dev build would otherwise send every hot reload to the
 * dashboard as real traffic. `output: "export"` means NODE_ENV is read when
 * `next build` runs, so this is a build-time decision and the component
 * simply is not rendered into the export of a non-production build.
 *
 * `afterInteractive` keeps the request off the critical path. What that means
 * for checking the build: the executing <script> tag is injected by the client
 * runtime after hydration, so it is not in out/index.html. What IS in the
 * static HTML is a <link rel="preload"> plus the RSC payload describing this
 * component, so a grep for "cloudflareinsights" finds two hits that prove only
 * that the component rendered, not that the beacon runs. Verify in a browser.
 *
 * `crossOrigin="anonymous"` is not decoration. A type="module" script is always
 * fetched in CORS mode, while Next emits its preload link without a crossorigin
 * attribute, so the two requests do not match and the browser throws the
 * preload away and downloads the file twice ("the request credentials mode does
 * not match" in the console). The attribute makes them match. It is safe
 * because the CDN serves `Access-Control-Allow-Origin: *`; verified by curl.
 */
function CloudflareAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      type="module"
      crossOrigin="anonymous"
      data-cf-beacon='{"token": "45b247d40e7348b299c2d31ea90a4071"}'
    />
  );
}

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
        <CloudflareAnalytics />
      </body>
    </html>
  );
}
