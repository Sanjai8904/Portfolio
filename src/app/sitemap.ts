import type { MetadataRoute } from "next";

// TODO — replace with the real production URL before deploying.
const SITE_URL = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
