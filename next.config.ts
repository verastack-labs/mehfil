import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * The site is served from https://verastack-labs.github.io/mehfil/, which is a
 * project page rather than a user page, so everything lives under a `/mehfil`
 * prefix. `basePath` is set unconditionally rather than only in production:
 * a dev server at the root and a deployment under a prefix is exactly how a
 * path bug reaches production undetected. Local dev therefore also runs at
 * http://localhost:3000/mehfil, which is mildly inconvenient and entirely
 * worth it.
 *
 * `images.unoptimized` is required because `output: "export"` has no server to
 * run the optimizer. There are no raster images on this site at present, so it
 * costs nothing today and prevents a confusing build failure the first time
 * somebody adds one.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mehfil",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
