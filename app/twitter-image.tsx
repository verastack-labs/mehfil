/* Same artwork as the OpenGraph card. It exists as its own route because
   Next only emits `twitter:image` for the `twitter-image` convention, and
   X does not reliably fall back to `og:image`. */
import { OG_ALT, OG_SIZE, renderOgImage } from "./og";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return renderOgImage();
}
