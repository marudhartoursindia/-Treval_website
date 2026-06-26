import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { getBlogBySlug, getBlogs } from "@/lib/api";
import { getBlogSchema } from "@/lib/seo";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta?.seo_title || post.title.rendered,
    description: post.meta?.seo_description || post.excerpt.rendered.replace(/<[^>]*>/g, ""),
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      images: post.featured_media_url ? [{ url: post.featured_media_url }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related blogs
  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 2);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const schema = getBlogSchema(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="py-12 px-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Journal</span>
        </Link>

        {/* Title Header */}
        <div className="space-y-4">
          {post.categories_names?.[0] && (
            <span className="text-[10px] tracking-widest uppercase text-accent font-semibold block">
              {post.categories_names[0]}
            </span>
          )}
          <h1 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide leading-tight text-foreground">
            {post.title.rendered}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-[10px] text-foreground/55 uppercase tracking-wider font-light pt-2">
            <span className="flex items-center">
              <Calendar size={12} className="text-accent mr-1.5" />
              {formattedDate}
            </span>
            <span className="flex items-center">
              <User size={12} className="text-accent mr-1.5" />
             
            </span>
          </div>
        </div>

        {/* Featured Banner */}
        {post.featured_media_url && (
          <div className="relative h-[400px] w-full overflow-hidden bg-stone-100 border border-[var(--border-color)]">
            <Image
              src={post.featured_media_url}
              alt={post.title.rendered}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Rich Content Area */}
        <div
          className="prose prose-stone dark:prose-invert max-w-none text-sm text-foreground/85 leading-relaxed font-light space-y-6 pt-4 border-b border-[var(--border-color)] pb-12
          prose-headings:font-playfair prose-headings:font-bold prose-headings:text-foreground prose-h2:text-2xl prose-h3:text-xl
          prose-strong:font-semibold prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Tags */}
        {post.tags_names && post.tags_names.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center text-xs pt-4">
            <Tag size={12} className="text-accent mr-2" />
            {post.tags_names.map((tag) => (
              <span
                key={tag}
                className="bg-[var(--border-color)]/20 border border-[var(--border-color)] px-3 py-1 text-xs font-medium text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[var(--border-color)] space-y-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold tracking-wide">
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.map((b) => (
                <div key={b.id} className="group space-y-3">
                  <Link href={`/blog/${b.slug}`} className="relative block h-56 overflow-hidden bg-stone-100 border border-[var(--border-color)]">
                    {b.featured_media_url ? (
                      <Image
                        src={b.featured_media_url}
                        alt={b.title.rendered}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-200" />
                    )}
                  </Link>
                  <h3 className="font-playfair text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                    <Link href={`/blog/${b.slug}`}>{b.title.rendered}</Link>
                  </h3>
                  <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed font-light">
                    {b.excerpt.rendered.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
