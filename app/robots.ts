import type { MetadataRoute } from "next";

/**
 * Now possible, and it was not before.
 *
 * Crawlers read robots.txt only from the origin root. While this site lived at
 * `verastack.dev/mehfil/` the root belonged to the org's main site, so a
 * robots.txt here would never have been fetched and the sitemap could only be
 * announced by submitting it to Google by hand. On its own subdomain the root
 * is ours, so every crawler can find the sitemap without being told.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://mehfil.verastack.dev/sitemap.xml",
  };
}
