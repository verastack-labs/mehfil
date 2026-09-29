import type { MetadataRoute } from "next";

/**
 * The sitemap Google Search Console points at.
 *
 * URLs must be absolute and must match what is actually served, which means
 * the `/mehfil` prefix from next.config.ts and the trailing slash from
 * `trailingSlash: true`. A sitemap listing a URL that redirects is reported as
 * an error in Search Console rather than being silently followed.
 *
 * There is one page. When there are more, they belong here: nothing else on a
 * project page can tell Google they exist, because robots.txt is only read
 * from the origin root and github.io's root is not ours.
 */
const SITE = "https://verastack-labs.github.io/mehfil/";

/* Hand-maintained rather than `new Date()`. A build timestamp would move on
   every deploy, including ones that change nothing on this page, and lastmod
   is a claim about the content, not about CI. Bump it when the page's copy or
   structure actually changes; Google discounts the field entirely once it
   catches you moving it for nothing. */
const LAST_MODIFIED = "2026-09-30";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
