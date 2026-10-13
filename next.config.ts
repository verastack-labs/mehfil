import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * The site is served from https://mehfil.verastack.dev/, a dedicated
 * subdomain, so it sits at the origin root and needs no `basePath`. It used to
 * be a project page under `/mehfil` and carried a `basePath` to match; that is
 * gone, and nothing in this repo should reintroduce a path prefix without the
 * DNS record changing first.
 *
 * The subdomain is held by `public/CNAME`, which the export copies into `out/`
 * verbatim. GitHub Pages reads that file on every deploy, so losing it silently
 * reverts the site to the default domain.
 *
 * `images.unoptimized` is required because `output: "export"` has no server to
 * run the optimizer. There are no raster images on this site at present, so it
 * costs nothing today and prevents a confusing build failure the first time
 * somebody adds one.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
