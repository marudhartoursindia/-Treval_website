import type { Metadata } from "next";
import { getDestinations } from "@/lib/api";
import { DestinationCard } from "@/components/destination/DestinationCard";

export const revalidate = 0; // Dynamic rendering, no caching

export const metadata: Metadata = {
  title: "Luxury Travel Destinations",
  description: "Explore our curated list of breathtaking travel destinations, from cultural hubs to tropical havens.",
  alternates: {
    canonical: "/destinations",
  },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto w-full">
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
          Curated Regions
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-wide">
          Breathtaking Destinations
        </h1>
        <p className="text-sm text-foreground/60 font-light leading-relaxed">
          Embark on unforgettable, handpicked adventures in the world's most spectacular places. Select a destination to see dedicated itineraries and local guides.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  );
}
