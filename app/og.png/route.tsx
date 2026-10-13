/* A route handler at a literal `.png` path, not Next's `opengraph-image`
   metadata convention.

   The convention emits `out/opengraph-image` with no extension, GitHub Pages
   serves that as `application/octet-stream`, and scrapers refuse a non-image
   og:image. Worse, the convention's own tag *overrides* an explicit
   `openGraph.images` in metadata, so it cannot simply be pointed elsewhere:
   the only way to control the URL is not to use the convention.

   Exported statically at build, so this runs on the build machine and never
   at request time. */
import { renderOgImage } from "../og";

export const dynamic = "force-static";

export function GET() {
  return renderOgImage();
}
