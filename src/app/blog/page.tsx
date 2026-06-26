import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getBlogs } from "@/lib/api";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Bespoke Journal - Luxury Travel Insights",
  description: "Read our ' journals, packing lists, and local guides for your next adventure.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogListingPage() {
  const blogs = await getBlogs();

  return (
    <div className="py-16 px-6 max-w-[1600px] mx-auto w-full">
      {/* Header section */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
          Travel Journal
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-wide">
          Bespoke Insights
        </h1>
        <p className="text-sm text-foreground/60 font-light leading-relaxed">
          Expert recommendations, packing checklists, and local insights written directly by our global destination specialists.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {blogs.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <article key={post.id} className="group flex flex-col space-y-4">
              {/* Featured Image */}
              <Link href={`/blog/${post.slug}`} className="relative h-72 md:h-80 w-full overflow-hidden bg-stone-100 border border-[var(--border-color)]">
                {post.featured_media_url ? (
                  <Image
                    src={post.featured_media_url}
                    alt={post.title.rendered}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-750 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200" />
                )}
                {post.categories_names?.[0] && (
                  <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-2.5 py-1 z-10 font-medium">
                    {post.categories_names[0]}
                  </span>
                )}
              </Link>

              {/* Meta information */}
              <div className="flex items-center space-x-4 text-[10px] text-foreground/50 uppercase tracking-wider font-light">
                <span className="flex items-center">
                  <Calendar size={12} className="text-accent mr-1.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center">
                  <User size={12} className="text-accent mr-1.5" />
                  
                </span>
              </div>

              {/* Title & Excerpt */}
              <div className="space-y-3">
                <h2 className="font-playfair text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                  <Link href={`/blog/${post.slug}`}>{post.title.rendered}</Link>
                </h2>
                <p className="text-xs text-foreground/75 leading-relaxed font-light line-clamp-3">
                  {post.excerpt.rendered.replace(/<[^>]*>/g, "")}
                </p>
              </div>

              {/* Action Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-foreground font-semibold border-b border-foreground/15 pb-1 w-fit group-hover:border-accent group-hover:text-accent transition-all duration-300 pt-2"
              >
                <span>Read Article</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
