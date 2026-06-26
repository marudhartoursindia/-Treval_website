import type { Metadata } from "next";
import { getTravelPackages, getDestinations } from "@/lib/api";
import { PackagesClient } from "@/components/package/PackagesClient";

export const revalidate = 0; // Dynamic rendering, no caching

export const metadata: Metadata = {
  title: "Travel Packages & Custom Safaris",
  description: "Browse our handpicked collection of luxury travel packages, eco-safaris, and tropical overwater bungalow escapes.",
  alternates: {
    canonical: "/packages",
  },
};

export default async function PackagesPage() {
  const [packages, destinations] = await Promise.all([
    getTravelPackages(),
    getDestinations(),
  ]);

  return (
    <div className="py-16 px-6 max-w-[1600px] mx-auto w-full">
      {/* Header section */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
          Bespoke Journeys
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-wide">
          Our Travel Catalog
        </h1>
        <p className="text-base text-foreground/75 font-light leading-relaxed">
          Filter by destination, style, duration, or price to discover your ideal bespoke vacation. Every tour is fully customisable.
        </p>
      </div>

      {/* Main Client Grid Layout */}
      <PackagesClient initialPackages={packages} destinations={destinations} />
    </div>
  );
}
