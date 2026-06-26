import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Compass, ShieldCheck, Map, Users, Star, ArrowRight, Award, Trophy, Milestone, Sliders, Receipt, Headphones, Building2, Calendar, ClipboardList, CreditCard, HeartHandshake } from "lucide-react";
import {
  getTravelPackages,
  getDestinations,
  getTestimonials,
  getFAQs,
  getBlogs,
} from "@/lib/api";
import { PackageCard } from "@/components/package/PackageCard";
import { DestinationCard } from "@/components/destination/DestinationCard";
import { HeroSearch } from "@/components/layout/HeroSearch";
import { HeroSlideshow } from "@/components/layout/HeroSlideshow";
import { StatsSection } from "@/components/layout/StatsSection";
import { TestimonialsSlider } from "@/components/layout/TestimonialsSlider";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rajasthan Tour Packages & Desert Safari | Marudhar Tours India",
  description: "Explore Rajasthan with Marudhar Tours India. Custom tour packages, desert safaris, heritage tours, hotel booking & cab rental. Plan your trip today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Discover the Real Rajasthan | Marudhar Tours India",
    description: "Forts, deserts, lakes, and living heritage — explore Rajasthan with a local travel partner who knows it best. Get a custom itinerary today.",
  },
};

export const revalidate = 0; // Dynamic rendering, no caching

export default async function HomePage() {
  const [packages, destinations, testimonials, faqs, blogs] = await Promise.all([
    getTravelPackages(),
    getDestinations(),
    getTestimonials(),
    getFAQs(),
    getBlogs(),
  ]);

  // Format destinations for the hero dropdown search
  const heroDestinations = destinations.map((d) => ({
    slug: d.slug,
    name: d.title.rendered,
  }));

  // Accordion format for FAQs
  const faqItems = faqs.slice(0, 6).map((f) => ({
    title: f.title.rendered,
    content: f.meta.answer,
  }));

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative min-h-[55vh] md:min-h-[90vh] flex items-center justify-center bg-stone-950 py-20 px-6 -mt-[72px] overflow-hidden">
        {/* Background visual */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-stone-950/95 z-10" />
        <HeroSlideshow />

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-accent font-semibold block animate-pulse">
            Royal Indian Heritage 
          </span>
          <h1 className="font-playfair text-4xl md:text-7xl font-bold !text-accent tracking-wide leading-tight">
            Discover Royal <br className="hidden md:inline" />
            <span className="text-white italic font-normal">Rajasthan</span> & India
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
            Experience bespoke luxury tours, Thar desert camel safaris, and custom itineraries curated by Marudhar Tours India. Tailored entirely to your choices.
          </p>

          <div className="pt-6">
            <HeroSearch destinations={heroDestinations} />
          </div>
        </div>
      </section>

      {/* 2. Popular Destinations */}
      <section className="py-12 md:py-16 px-6 max-w-[1600px] mx-auto w-full">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
            Popular Rajasthan Destinations
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
            Popular Destinations
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-light leading-relaxed">
            From the Pink City's bazaars to the Golden City's dunes, each Rajasthan destination has its own personality. Here's where most journeys begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {destinations[0] && (
            <div className="md:col-span-8 h-[400px]">
              <DestinationCard destination={destinations[0]} />
            </div>
          )}
          {destinations[1] && (
            <div className="md:col-span-4 h-[400px]">
              <DestinationCard destination={destinations[1]} />
            </div>
          )}
          {destinations[2] && (
            <div className="md:col-span-4 h-[400px]">
              <DestinationCard destination={destinations[2]} />
            </div>
          )}
          {destinations[3] && (
            <div className="md:col-span-8 h-[400px]">
              <DestinationCard destination={destinations[3]} />
            </div>
          )}
        </div>
      </section>

      {/* 3. Why Choose Us (Split-Screen Premium Layout) */}
      <section className="bg-background text-foreground py-12 md:py-16 px-6 border-y border-[var(--border-color)]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful Decorative Image */}
          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden border-2 border-accent/20 p-2 bg-stone-100">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1200"
                alt="Marudhar Desert Experience"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Absolute badge */}
            <div className="absolute top-6 left-6 bg-primary text-white text-[10px] uppercase tracking-widest px-4 py-2 font-semibold border border-accent/30 shadow-md">
              Land of the Kings
            </div>
          </div>

          {/* Right: Premium Value Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
                The Marudhar Standard
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold tracking-wide text-primary">
                Why Travelers Choose Marudhar Tours India
              </h2>
              <p className="text-sm text-foreground/85 font-light leading-relaxed">
                We've spent over a decade learning Rajasthan's back roads, festival calendars, and best-kept rooftop views — so your trip runs smoothly and feels personal, not packaged.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent">
                  <Map size={18} />
                  <h4 className="font-playfair text-sm font-bold text-foreground">Local Experts, Not Call-Centre Agents</h4>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed font-light">
                  Every itinerary is built by someone who has actually walked that fort, eaten at that dhaba, and knows what the brochure leaves out.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent">
                  <Sliders size={18} />
                  <h4 className="font-playfair text-sm font-bold text-foreground">Fully Customizable Itineraries</h4>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed font-light">
                  Swap a city, add a day, drop a stop — your trip is built around your pace, budget, and interests, not a fixed template.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent">
                  <Receipt size={18} />
                  <h4 className="font-playfair text-sm font-bold text-foreground">Transparent, No-Surprise Pricing</h4>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed font-light">
                  What you're quoted is what you pay. No hidden "convenience fees" sprung on you at checkout.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent">
                  <Headphones size={18} />
                  <h4 className="font-playfair text-sm font-bold text-foreground">24/7 On-Trip Support</h4>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed font-light">
                  A dedicated contact is one call or WhatsApp message away throughout your journey — not just during booking.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent">
                  <ShieldCheck size={18} />
                  <h4 className="font-playfair text-sm font-bold text-foreground">Vetted Hotels & Drivers</h4>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed font-light">
                  Every property and driver in our network is personally checked for safety, cleanliness, and reliability before we recommend them.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent">
                  <Building2 size={18} />
                  <h4 className="font-playfair text-sm font-bold text-foreground">Deep Rajasthan Specialization</h4>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed font-light">
                  We don't spread thin across all of India — Rajasthan is what we know, in detail others don't bother to learn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Popular Packages */}
      <section className="py-12 md:py-16 px-6 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
              Featured Tour Packages
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
              Featured Packages
            </h2>
            <p className="text-sm md:text-base text-stone-500 font-light leading-relaxed">
              Start with one of our most-booked itineraries — then tell us what you'd change.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/packages">
              <Button variant="outline" className="whitespace-nowrap">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>


      {/* 6. Testimonials */}
      <section className="py-12 md:py-16 px-6 max-w-[1600px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
            Traveler Diaries
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
            What Our Travelers Say
          </h2>
        </div>

        <TestimonialsSlider testimonials={testimonials} />
      </section>

      <section className="py-12 md:py-16 px-6 bg-background border-y border-[var(--border-color)]">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="text-center mb-12 space-y-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
              Seamless Bespoke Planning
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
              How It Works
            </h2>
            <div className="w-12 h-[2px] bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 flex flex-col items-center text-center space-y-4 group hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full flex items-start justify-end p-3">
                <span className="font-playfair text-sm font-bold text-accent">01</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-inner">
                <ClipboardList size={24} />
              </div>
              <h3 className="font-playfair text-base font-bold text-foreground">Tell Us Your Style</h3>
              <p className="text-xs text-foreground/75 leading-relaxed font-light">
                Share your dates, interests, and budget through a quick enquiry — takes under two minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 flex flex-col items-center text-center space-y-4 group hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full flex items-start justify-end p-3">
                <span className="font-playfair text-sm font-bold text-accent">02</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-inner">
                <Map size={24} />
              </div>
              <h3 className="font-playfair text-base font-bold text-foreground">Custom Itinerary</h3>
              <p className="text-xs text-foreground/75 leading-relaxed font-light">
                Our team builds a day-by-day plan suited to your pace, group size, and interests, usually within 24 hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 flex flex-col items-center text-center space-y-4 group hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full flex items-start justify-end p-3">
                <span className="font-playfair text-sm font-bold text-accent">03</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-inner">
                <Sliders size={24} />
              </div>
              <h3 className="font-playfair text-base font-bold text-foreground">Refine It Together</h3>
              <p className="text-xs text-foreground/75 leading-relaxed font-light">
                Swap a stop, add an experience, adjust the budget — we revise until it's right.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 flex flex-col items-center text-center space-y-4 group hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full flex items-start justify-end p-3">
                <span className="font-playfair text-sm font-bold text-accent">04</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-inner">
                <CreditCard size={24} />
              </div>
              <h3 className="font-playfair text-base font-bold text-foreground">Confirm & Book</h3>
              <p className="text-xs text-foreground/75 leading-relaxed font-light">
                Once you're happy, confirm with a simple booking process and transparent payment terms.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 flex flex-col items-center text-center space-y-4 group hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full flex items-start justify-end p-3">
                <span className="font-playfair text-sm font-bold text-accent">05</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-inner">
                <HeartHandshake size={24} />
              </div>
              <h3 className="font-playfair text-base font-bold text-foreground">Travel Supported</h3>
              <p className="text-xs text-foreground/75 leading-relaxed font-light">
                From airport pickup to the final drop-off, your dedicated contact is available throughout the trip.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      {faqItems.length > 0 && (
        <section className="py-12 md:py-16 px-6 max-w-4xl mx-auto w-full">
          <div className="text-center mb-12 space-y-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
              Common Queries
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion items={faqItems} />
        </section>
      )}


    </div>
  );
}
