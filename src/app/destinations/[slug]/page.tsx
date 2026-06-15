import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sun, CheckCircle, Info } from "lucide-react";
import { getDestinationBySlug, getTravelPackages } from "@/lib/api";
import { getDestinationSchema } from "@/lib/seo";
import { PackageCard } from "@/components/package/PackageCard";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) return {};

  return {
    title: `${dest.title.rendered} Travel Guide`,
    description: dest.excerpt.rendered.replace(/<[^>]*>/g, ""),
    alternates: {
      canonical: `/destinations/${slug}`,
    },
    openGraph: {
      title: dest.title.rendered,
      description: dest.excerpt.rendered.replace(/<[^>]*>/g, ""),
      images: dest.featured_media_url ? [{ url: dest.featured_media_url }] : [],
    },
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);

  if (!dest) {
    notFound();
  }

  // Fetch travel packages related to this destination
  const allPackages = await getTravelPackages();
  const relatedPackages = allPackages.filter((p) => p.meta.destination_id === dest.id);

  const schema = getDestinationSchema(dest);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] bg-stone-900 overflow-hidden flex items-center justify-center -mt-[85px]">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {dest.featured_media_url ? (
          <Image
            src={dest.featured_media_url}
            alt={dest.title.rendered}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-stone-800" />
        )}

        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-4 px-6">
          <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-accent font-semibold block animate-pulse">
            Bespoke Travel Guide
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white tracking-wide">
            {dest.title.rendered}
          </h1>
        </div>
      </section>

      <div className="py-16 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left 2 Columns: Guide Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold border-b border-[var(--border-color)] pb-3 text-foreground">
              About the Destination
            </h2>
            <div
              className="text-sm text-foreground/80 leading-relaxed font-light space-y-4"
              dangerouslySetInnerHTML={{ __html: dest.content.rendered }}
            />
          </section>

          {/* Gallery grid */}
          {dest.meta.gallery.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold border-b border-[var(--border-color)] pb-3">
                Scenery Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {dest.meta.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-video sm:aspect-square overflow-hidden bg-stone-100 border border-[var(--border-color)] group">
                    <Image
                      src={img}
                      alt={`${dest.title.rendered} gallery photo ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Popular Attractions */}
          {dest.meta.popular_attractions.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold border-b border-[var(--border-color)] pb-3">
                Popular Attractions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.meta.popular_attractions.map((attr, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-stone-50 dark:bg-stone-900/10 border border-[var(--border-color)]"
                  >
                    <CheckCircle className="text-accent shrink-0" size={16} />
                    <span className="text-xs font-medium text-foreground">{attr}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right 1 Column: Guide Details Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Quick Guide Card */}
          <div className="bg-stone-50 dark:bg-stone-900/10 border border-[var(--border-color)] p-6 md:p-8 space-y-6">
            <h3 className="font-playfair text-lg font-bold border-b border-[var(--border-color)] pb-3 text-foreground flex items-center">
              <Info size={18} className="text-accent mr-2" />
              Quick Travel Info
            </h3>

            {/* Best time to visit */}
            {dest.meta.best_time_to_visit && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold flex items-center">
                  <Sun size={12} className="mr-1" />
                  Best Season to Visit
                </span>
                <p className="text-xs text-foreground/80 font-light leading-relaxed">
                  {dest.meta.best_time_to_visit}
                </p>
              </div>
            )}

            {/* Travel Tips */}
            {dest.meta.travel_tips.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
                  Useful Travel Tips
                </span>
                <ul className="space-y-3 text-xs text-foreground/85 font-light">
                  {dest.meta.travel_tips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-accent mr-2 font-bold shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* CTA panel */}
          <div className="bg-primary text-white p-8 space-y-4 border border-white/5">
            <h4 className="font-playfair text-lg font-bold">Plan A Custom Trip</h4>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Want to see {dest.title.rendered}? Our luxury curators can craft a bespoke itinerary tailored just for you.
            </p>
            <Link href="/contact" className="block pt-2">
              <Button variant="accent" className="w-full text-center">
                Contact Curator
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Packages in this destination */}
      <section className="py-16 px-6 border-t border-[var(--border-color)] bg-stone-50/50 dark:bg-stone-950/20">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
              Trip Suggestions
            </span>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
              Packages in {dest.title.rendered}
            </h2>
          </div>

          {relatedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/50 font-light">
              We are currently drafting new private itineraries for this destination. Check back soon or contact our curators to request a custom plan.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
