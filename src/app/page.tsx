import Link from "next/link";
import Image from "next/image";
import { Compass, ShieldCheck, Map, Users, Star, ArrowRight, Award, Trophy, Milestone } from "lucide-react";
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
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { formatPrice } from "@/lib/utils";

export const revalidate = 3600; // Revalidate every hour (ISR)

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
  const faqItems = faqs.map((f) => ({
    title: f.title.rendered,
    content: f.meta.answer,
  }));

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-stone-950 py-20 px-6 -mt-[85px] overflow-hidden">
        {/* Background visual */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000"
          alt="Luxury Voyage Background"
          fill
          priority
          className="object-cover object-center scale-105 select-none"
        />

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-accent font-semibold block animate-pulse">
            Bespoke Luxury Curators
          </span>
          <h1 className="font-playfair text-4xl md:text-7xl font-bold text-white tracking-wide leading-tight">
            Discover the <br className="hidden md:inline" />
            <span className="text-accent italic font-normal">Extraordinary</span> World
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Unveiling handcrafted itineraries, custom African safaris, and secluded tropical villa escapes tailored precisely to your sense of adventure.
          </p>

          <div className="pt-6">
            <HeroSearch destinations={heroDestinations} />
          </div>
        </div>
      </section>

      {/* 2. Top Destinations */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
              Curated Escapes
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
              Top Destinations
            </h2>
          </div>
          <p className="text-sm text-foreground/60 max-w-md font-light leading-relaxed mt-4 md:mt-0">
            Immerse yourself in our favorite hand-selected locales, ranging from historic Japanese shrines to pristine overwater coral reefs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.slice(0, 4).map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="bg-stone-50 dark:bg-stone-900/10 py-24 px-6 border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold">
              The Bespoke Standard
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
              The Art of Luxury Travel
            </h2>
            <p className="text-sm text-foreground/60 font-light">
              We define luxury not just by 5-star lodging, but by the exclusive access, profound insights, and seamless ease we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 space-y-4 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full text-accent">
                <Compass size={24} />
              </div>
              <h3 className="font-playfair text-lg font-bold text-foreground">Bespoke Curation</h3>
              <p className="text-xs text-foreground/70 leading-relaxed font-light">
                Tailored voyages designed down to the minute. You set the pace; our curators arrange the absolute ideal itinerary.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 space-y-4 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full text-accent">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-playfair text-lg font-bold text-foreground">Elite Accommodations</h3>
              <p className="text-xs text-foreground/70 leading-relaxed font-light">
                Every single villa, private ryokan, and safari tent is inspected personally to ensure top-tier comforts.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 space-y-4 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full text-accent">
                <Map size={24} />
              </div>
              <h3 className="font-playfair text-lg font-bold text-foreground">Local Guides</h3>
              <p className="text-xs text-foreground/70 leading-relaxed font-light">
                Walk with resident historians, wildlife biologists, and cultural gatekeepers for profound destination insights.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 space-y-4 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-accent/10 rounded-full text-accent">
                <Users size={24} />
              </div>
              <h3 className="font-playfair text-lg font-bold text-foreground">24/7 VIP Safeguards</h3>
              <p className="text-xs text-foreground/70 leading-relaxed font-light">
                Enjoy complete peace of mind. Our local representatives and global concierges stand ready to assist at any moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Packages */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
              Featured Voyages
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
              Popular Packages
            </h2>
          </div>
          <Link href="/packages">
            <Button variant="outline" className="border-accent hover:bg-accent hover:text-primary">
              View All Packages
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 5. Statistics */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-light via-primary to-primary opacity-80" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <div className="flex justify-center text-accent mb-2">
              <Award size={36} />
            </div>
            <div className="font-playfair text-4xl md:text-5xl font-bold text-accent">15+ Years</div>
            <p className="text-xs uppercase tracking-widest text-white/70 font-light">Crafting Premium Travel</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-center text-accent mb-2">
              <Milestone size={36} />
            </div>
            <div className="font-playfair text-4xl md:text-5xl font-bold text-accent">50+ Spots</div>
            <p className="text-xs uppercase tracking-widest text-white/70 font-light">Breathtaking Destinations</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-center text-accent mb-2">
              <Trophy size={36} />
            </div>
            <div className="font-playfair text-4xl md:text-5xl font-bold text-accent">10k+ Travelers</div>
            <p className="text-xs uppercase tracking-widest text-white/70 font-light">Satisfied Expeditions</p>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
            Traveler Diaries
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-accent mb-4">
                  {[...Array(test.meta.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <div
                  className="text-sm text-foreground/80 leading-relaxed font-light italic mb-6"
                  dangerouslySetInnerHTML={{ __html: test.content.rendered }}
                />
              </div>

              <div className="flex items-center space-x-4 border-t border-[var(--border-color)] pt-4">
                {test.meta.photo && (
                  <div className="relative w-10 h-10 overflow-hidden bg-stone-100">
                    <Image
                      src={test.meta.photo}
                      alt={test.title.rendered}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-playfair text-sm font-bold text-foreground">
                    {test.title.rendered}
                  </h4>
                  <span className="text-[10px] text-foreground/50 uppercase tracking-wider block">
                    {test.meta.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Latest Blogs */}
      {blogs.length > 0 && (
        <section className="bg-stone-50 dark:bg-stone-900/10 py-24 px-6 border-y border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
                  Bespoke Journal
                </span>
                <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide">
                  Latest Insights
                </h2>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="border-accent hover:bg-accent hover:text-primary">
                  Read Journal
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {blogs.slice(0, 2).map((post) => (
                <div key={post.id} className="group grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    {post.featured_media_url ? (
                      <Image
                        src={post.featured_media_url}
                        alt={post.title.rendered}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-200" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-widest text-accent font-semibold">
                      {post.categories_names?.[0] || "Travel Guide"}
                    </span>
                    <h3 className="font-playfair text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title.rendered}</Link>
                    </h3>
                    <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed font-light">
                      {post.excerpt.rendered.replace(/<[^>]*>/g, "")}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider text-foreground font-semibold pt-2 border-b border-foreground/15 group-hover:border-accent group-hover:text-accent transition-all duration-300"
                    >
                      <span>Read More</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQ Section */}
      {faqItems.length > 0 && (
        <section className="py-24 px-6 max-w-4xl mx-auto w-full">
          <div className="text-center mb-16 space-y-4">
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

      {/* 9. Contact CTA */}
      <section className="relative py-24 px-6 bg-primary text-white overflow-hidden text-center border-t border-white/5">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-light to-primary opacity-90" />
        
        <div className="relative z-20 max-w-2xl mx-auto space-y-8">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
            Begin Your Voyage
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide leading-tight">
            Ready to Plan Your <br />
            Next Tailored Escape?
          </h2>
          <p className="text-sm text-white/70 font-light leading-relaxed">
            Connect directly with our luxury curators today to customize your personal itinerary, select premium stays, and finalize your travel coordinates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link href="/contact">
              <Button variant="accent" size="lg">
                Request Custom Itinerary
              </Button>
            </Link>
            <a href="https://wa.me/18005550199" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-white/20 hover:border-white text-white hover:bg-white hover:text-primary">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
