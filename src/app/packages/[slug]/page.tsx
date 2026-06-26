import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Users, Hotel, ShieldCheck, ShieldX, Car } from "lucide-react";
import { getTravelPackageBySlug, getTravelPackages } from "@/lib/api";
import { getTripSchema, getFAQPageSchema } from "@/lib/seo";
import { PackageGallery } from "@/components/package/PackageGallery";
import { InquiryForm } from "@/components/package/InquiryForm";
import { PackageCard } from "@/components/package/PackageCard";
import { Accordion } from "@/components/ui/Accordion";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate Dynamic SEO tags
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getTravelPackageBySlug(slug);
  if (!pkg) return {};

  return {
    title: pkg.meta.seo_title || pkg.title.rendered,
    description: pkg.meta.seo_description || pkg.excerpt.rendered.replace(/<[^>]*>/g, ""),
    alternates: {
      canonical: `/packages/${slug}`,
    },
    openGraph: {
      title: pkg.title.rendered,
      description: pkg.excerpt.rendered.replace(/<[^>]*>/g, ""),
      images: pkg.featured_media_url ? [{ url: pkg.featured_media_url }] : [],
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = await getTravelPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  // Fetch all packages to recommend related ones
  const allPackages = await getTravelPackages();
  const relatedPackages = allPackages
    .filter((p) => p.slug !== slug && p.meta.destination_id === pkg.meta.destination_id)
    .slice(0, 2);

  const itineraryItems = pkg.meta.day_wise_itinerary.map((day) => ({
    title: `Day ${day.day}: ${day.title}`,
    content: day.description,
  }));

  const pkgFaqs = pkg.meta.faq.map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  // Structured schemas
  const tripSchema = getTripSchema(pkg);
  const faqSchema = pkg.meta.faq.length > 0 ? getFAQPageSchema(pkg.meta.faq) : null;

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="py-12 px-6 max-w-[1600px] mx-auto w-full">
        {/* Title Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center space-x-3 text-accent text-xs font-semibold uppercase tracking-widest">
            <span>{pkg.categories_names?.join(" • ") || "Luxury Voyage"}</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide text-foreground">
            {pkg.title.rendered}
          </h1>
          <div className="flex flex-wrap gap-6 text-xs text-foreground/60 font-light pt-2">
            <span className="flex items-center">
              <Calendar size={14} className="text-accent mr-1.5" />
              {pkg.meta.duration}
            </span>
            <span className="flex items-center">
              <MapPin size={14} className="text-accent mr-1.5" />
              {pkg.meta.map_location || "Bespoke coordinates"}
            </span>
          </div>
        </div>

        {/* Split Details & Sidebar Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Main Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery Slider */}
            <PackageGallery
              images={pkg.meta.gallery_images}
              fallbackImage={pkg.featured_media_url}
              packageName={pkg.title.rendered}
            />

            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold border-b border-[var(--border-color)] pb-3">
                Overview
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed font-light">
                {pkg.meta.overview}
              </p>
            </section>

            {/* Highlights */}
            {pkg.meta.highlights.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-playfair text-2xl font-bold border-b border-[var(--border-color)] pb-3">
                  Highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.meta.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start text-xs text-foreground/90 font-light">
                      <span className="text-accent mr-2 font-bold shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Day Wise Itinerary */}
            {pkg.meta.day_wise_itinerary.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-playfair text-2xl font-bold border-b border-[var(--border-color)] pb-3">
                  Detailed Itinerary
                </h2>
                <Accordion items={itineraryItems} allowMultiple />
              </section>
            )}

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-[var(--border-color)] py-8">
              <div className="space-y-4">
                <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                  <ShieldCheck size={18} className="text-green-600 mr-2" />
                  What's Included
                </h3>
                <ul className="space-y-2 text-xs text-foreground/80 font-light">
                  {pkg.meta.included_services.map((inc, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-600 mr-2 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                  <ShieldX size={18} className="text-red-500 mr-2" />
                  What's Excluded
                </h3>
                <ul className="space-y-2 text-xs text-foreground/80 font-light">
                  {pkg.meta.excluded_services.map((exc, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-400 mr-2 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Hotels & Transportation */}
            {(pkg.meta.hotel_information || pkg.meta.transportation_information) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pkg.meta.hotel_information && (
                  <div className="space-y-3">
                    <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                      <Hotel size={18} className="text-accent mr-2" />
                      Hotel Accommodation
                    </h3>
                    <p className="text-xs text-foreground/80 leading-relaxed font-light">
                      {pkg.meta.hotel_information}
                    </p>
                  </div>
                )}
                {pkg.meta.transportation_information && (
                  <div className="space-y-3">
                    <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                      <Car size={18} className="text-accent mr-2" />
                      Transit & Transfers
                    </h3>
                    <p className="text-xs text-foreground/80 leading-relaxed font-light">
                      {pkg.meta.transportation_information}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Package FAQs */}
            {pkgFaqs.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-playfair text-2xl font-bold border-b border-[var(--border-color)] pb-3">
                  Package FAQs
                </h2>
                <Accordion items={pkgFaqs} />
              </section>
            )}
          </div>

          {/* Right: Sticky Booking Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-6">
              {/* Price Panel */}
              <div className="bg-primary text-white p-6 border border-white/5 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold block mb-1">
                  Private Journey Pricing
                </span>
                <div className="flex items-baseline space-x-2">
                  {pkg.meta.discount_price ? (
                    <>
                      <span className="font-playfair text-3xl font-bold text-accent">
                        {formatPrice(pkg.meta.discount_price)}
                      </span>
                      <span className="text-xs text-white/50 line-through">
                        {formatPrice(pkg.meta.price)}
                      </span>
                    </>
                  ) : (
                    <span className="font-playfair text-3xl font-bold text-white">
                      {formatPrice(pkg.meta.price)}
                    </span>
                  )}
                  <span className="text-xs text-white/70 font-light">USD / person</span>
                </div>
                <p className="text-[10px] text-white/60 font-light mt-2 leading-relaxed">
                  * All pricing is based on double occupancy. Solo explorer supplements and private group discounts apply.
                </p>
              </div>

              {/* Inquiry Form */}
              <InquiryForm packageName={pkg.title.rendered} />
            </div>
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[var(--border-color)] space-y-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground tracking-wide">
              Recommended Journeys
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPackages.map((rel) => (
                <PackageCard key={rel.id} pkg={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
