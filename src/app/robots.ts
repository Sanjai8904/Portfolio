import type { MetadataRoute } from "next";

// TODO — replace with the real production URL before deploying.
const SITE_URL = "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
