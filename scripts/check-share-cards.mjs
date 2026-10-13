/* ===========================================================================
   Verify the share cards were exported as real PNG files.

   Run automatically after `next build`.

   This exists because of a failure that reached production. Next's
   `opengraph-image` metadata convention emits a file with no extension, GitHub
   Pages serves an extensionless file as `application/octet-stream`, and every
   scraper that matters (WhatsApp, Slack, Facebook, LinkedIn) refuses an
   og:image that is not `image/*`. The card rendered nowhere, while the build,
   the deploy and the page itself all looked healthy.

   The fix was to serve the cards from route handlers at literal `.png` paths.
   This gate makes sure they stay that way: a rename back to the convention, or
   a route that silently stops emitting, fails the build here instead of
   shipping a grey box.
   =========================================================================== */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");
const CARDS = ["og.png", "twitter.png"];
const PNG_MAGIC = "89504e470d0a1a0a";

let failed = false;

for (const name of CARDS) {
  const path = join(OUT, name);

  if (!existsSync(path)) {
    console.error(
      `\nShare card check FAILED: ${name} was not exported.` +
        `\n  Expected: ${path}` +
        `\n  Serve it from a route handler at a literal .png path. Next's` +
        `\n  opengraph-image convention emits an extensionless file, which` +
        `\n  GitHub Pages serves as application/octet-stream.\n`,
    );
    failed = true;
    continue;
  }

  /* Confirm it really is a PNG, so a build that wrote an error page to this
     path cannot ship looking correct. */
  const bytes = readFileSync(path);
  const magic = bytes.subarray(0, 8).toString("hex");
  if (magic !== PNG_MAGIC) {
    console.error(
      `\nShare card check FAILED: ${name} is not a PNG.` +
        `\n  ${bytes.length} bytes, magic ${magic}, expected ${PNG_MAGIC}\n`,
    );
    failed = true;
    continue;
  }

  console.log(`Share card check: ${name} is a PNG (${bytes.length} bytes).`);
}

process.exit(failed ? 1 : 0);
