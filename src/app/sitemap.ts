import { MetadataRoute } from "next";
import { getTravelPackages, getDestinations, getBlogs } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://premiumtravels.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static paths
  const staticRoutes = ["", "/about", "/contact", "/packages", "/destinations", "/blog"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic content paths
  try {
    const [packages, destinations, blogs] = await Promise.all([
      getTravelPackages(),
      getDestinations(),
      getBlogs(),
    ]);

    const packageRoutes = packages.map((pkg) => ({
      url: `${SITE_URL}/packages/${pkg.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const destinationRoutes = destinations.map((dest) => ({
      url: `${SITE_URL}/destinations/${dest.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const blogRoutes = blogs.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    return [...staticRoutes, ...packageRoutes, ...destinationRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Sitemap generation failed, returning static routes", error);
    return staticRoutes;
  }
}
