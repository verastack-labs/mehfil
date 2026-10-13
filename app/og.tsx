import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/* ===========================================================================
   The share card.

   This product's sharing surface is a WhatsApp group, which means the image is
   seen at roughly 300px wide inside a chat bubble, next to a thumbnail of
   somebody's face. It is designed for that size first: one word large enough
   to survive the downscale, one line of copy, and a single live detail. Fine
   print would be unreadable and is therefore absent rather than small.

   Fonts are vendored in `assets/` as TrueType rather than fetched at build.
   Satori, which renders this, cannot read woff2, so `next/font` output is
   unusable here. Fetching from Google at build time would also make a
   deployment fail whenever their CDN is slow, for an image that changes maybe
   twice a year. The files are read from disk at build; nothing ships to the
   browser.
   =========================================================================== */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT =
  "Mehfil. Call a mehfil, and see who is actually coming.";

const CREAM = "#F3E9DA";
const PAPER = "#FAF4EA";
const INK = "#1C120B";
const SAFFRON = "#E8A33D";
const TERRACOTTA = "#B93E29";

const font = (file: string) =>
  readFileSync(join(process.cwd(), "assets", file));

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: CREAM,
          padding: 48,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            background: PAPER,
            border: `5px solid ${INK}`,
            boxShadow: `16px 16px 0 0 ${TERRACOTTA}`,
            padding: 56,
          }}
        >
          {/* The notice itself: what the board is for. */}
          <div
            style={{
              flex: 1.55,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingRight: 48,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 23,
                  fontWeight: 600,
                  letterSpacing: 5,
                  color: TERRACOTTA,
                }}
              >
                ONE GROUP. ONE PLAN.
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Space Grotesk",
                  fontSize: 152,
                  lineHeight: 1,
                  letterSpacing: -5,
                  color: INK,
                  marginTop: 14,
                }}
              >
                MEHFIL
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 31,
                  lineHeight: 1.35,
                  color: INK,
                  marginTop: 26,
                }}
              >
                Call it, they answer, and you see who is actually coming.
              </div>
            </div>

            {/* The domain anchors the bottom of the column. Without it the
                `space-between` left a large dead area under the wordmark, and
                a share card that does not say where it came from wastes the
                one place a reader looks for that. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 25,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {/* The opacity belongs on the text, not the row. On the row it
                  also faded the saffron square to a washed-out beige. */}
              <div
                style={{
                  display: "flex",
                  width: 15,
                  height: 15,
                  background: SAFFRON,
                  border: `2px solid ${INK}`,
                  marginRight: 14,
                }}
              />
              <div style={{ display: "flex", color: INK, opacity: 0.62 }}>
                mehfil.verastack.dev
              </div>
            </div>
          </div>

          {/* The live detail. One group has exactly one session, so the card
              shows exactly one. */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: INK,
              padding: 34,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 21,
                  fontWeight: 600,
                  letterSpacing: 4,
                  color: SAFFRON,
                }}
              >
                CHAI IN
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Space Grotesk",
                  fontSize: 104,
                  lineHeight: 1,
                  letterSpacing: -3,
                  color: SAFFRON,
                  marginTop: 6,
                }}
              >
                12 min
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {["Rig is in", "Aman is in", "Sana, later"].map((who, i) => (
                <div
                  key={who}
                  style={{
                    display: "flex",
                    fontSize: 23,
                    fontWeight: 600,
                    padding: "11px 16px",
                    background: i === 2 ? "transparent" : SAFFRON,
                    border: `2px solid ${i === 2 ? SAFFRON : SAFFRON}`,
                    color: i === 2 ? SAFFRON : INK,
                  }}
                >
                  {who}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Space Grotesk", data: font("SpaceGrotesk-Bold.ttf"), weight: 700, style: "normal" },
        { name: "Inter", data: font("Inter-Regular.ttf"), weight: 400, style: "normal" },
        { name: "Inter", data: font("Inter-SemiBold.ttf"), weight: 600, style: "normal" },
      ],
    },
  );
}
