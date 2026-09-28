/* ===========================================================================
   Design token drift gate.

   Run: pnpm check:tokens

   This repo is public and mehfil-app is private, so the landing page cannot
   import the design system; it carries a verbatim copy of the app's @theme
   block instead. A copy drifts. This fails when it has.

   The comparison is exact apart from line endings, because the block is meant
   to be copied rather than edited. A "close enough" comparison would let
   somebody retype a hex value one digit out and still pass. Carriage returns
   are stripped first: Git checks the two repos out with different line endings
   on Windows, and a gate that fails on invisible whitespace is a gate people
   learn to ignore.

   When mehfil-app is not checked out beside this repo the comparison is
   skipped rather than failed, and says so. A contributor cloning only the
   public repo has no way to satisfy it, and a gate that cannot pass is another
   gate people learn to ignore. CI runs with only this repo, so the skip is
   informational there; run it locally before changing tokens.
   =========================================================================== */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const APP_GLOBALS = join(ROOT, "..", "mehfil-app", "app", "globals.css");
const OURS = join(ROOT, "app", "globals.css");

const OPEN = "@theme {";
const CR = String.fromCharCode(13);
const LF = String.fromCharCode(10);

/** Pull the first @theme block out of a stylesheet, with braces balanced. */
function firstThemeBlock(raw, label) {
  const css = raw.split(CR).join("");
  const from = css.indexOf(OPEN);
  if (from === -1) throw new Error(`${label}: no @theme block found.`);

  let depth = 0;
  for (let i = from; i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(from, i + 1);
    }
  }
  throw new Error(`${label}: the @theme block is never closed.`);
}

if (!existsSync(APP_GLOBALS)) {
  console.log(
    "Token check skipped: mehfil-app is not checked out beside this repo, so " +
      "there is nothing to diff against." +
      LF +
      `  Looked for: ${APP_GLOBALS}`,
  );
  process.exit(0);
}

const theirs = firstThemeBlock(readFileSync(APP_GLOBALS, "utf8"), "mehfil-app");
const ours = firstThemeBlock(readFileSync(OURS, "utf8"), "mehfil");

if (theirs === ours) {
  const tokens = (ours.match(/^\s*--/gm) ?? []).length;
  console.log(
    "Token check passed. The shared @theme block matches mehfil-app exactly " +
      `(${tokens} tokens).`,
  );
  process.exit(0);
}

/* Report the first differing line, which is almost always the whole story. */
const a = theirs.split(LF);
const b = ours.split(LF);
let firstDiff = -1;
for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
  if (a[i] !== b[i]) {
    firstDiff = i;
    break;
  }
}

console.error(LF + "Token check FAILED: the shared @theme block has drifted." + LF);
if (firstDiff !== -1) {
  console.error(`  First difference at line ${firstDiff + 1} of the block:` + LF);
  console.error(`    mehfil-app: ${a[firstDiff] ?? "(line missing)"}`);
  console.error(`    mehfil:     ${b[firstDiff] ?? "(line missing)"}` + LF);
}
console.error(
  "  mehfil-app/app/globals.css is the source of truth. Copy its first @theme" +
    LF +
    "  block over the one in app/globals.css, and do not hand-edit the copy." +
    LF,
);
process.exit(1);
