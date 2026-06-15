import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://premiumtravels.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/wp-admin/",
        "/wp-includes/",
        "/api/",
        "/preview/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
