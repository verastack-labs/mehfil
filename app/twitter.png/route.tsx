/* Same artwork as og.png. Separate route because X reads `twitter:image` and
   does not reliably fall back to `og:image`. See og.png/route.tsx for why
   these are route handlers rather than metadata conventions. */
import { renderOgImage } from "../og";

export const dynamic = "force-static";

export function GET() {
  return renderOgImage();
}
