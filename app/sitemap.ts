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

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
