import Link from "next/link";
import Image from "next/image";
import { Clock, Tag } from "lucide-react";
import { TravelPackage } from "@/lib/api";
import { Card, CardContent } from "../ui/Card";
import { formatPrice } from "@/lib/utils";

interface PackageCardProps {
  pkg: TravelPackage;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const { duration, price, discount_price, highlights } = pkg.meta;
  const categories = pkg.categories_names || [];

  return (
    <Card className="group h-full flex flex-col">
      {/* Featured Image */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-100">
        {pkg.featured_media_url ? (
          <Image
            src={pkg.featured_media_url}
            alt={pkg.title.rendered}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200 text-foreground/45 text-sm uppercase tracking-widest">
            Bespoke Voyage
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        
        {/* Category Tags */}
        {categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className="bg-accent/90 text-primary text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex-grow flex flex-col p-6">
        <div className="flex items-center space-x-2 text-foreground/50 text-[10px] uppercase tracking-widest mb-2">
          <Clock size={12} className="text-accent" />
          <span>{duration}</span>
        </div>

        <h3 className="font-playfair text-lg md:text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
          <Link href={`/packages/${pkg.slug}`}>{pkg.title.rendered}</Link>
        </h3>

        <p className="text-sm text-foreground/80 line-clamp-2 mb-4 leading-relaxed font-light">
          {pkg.excerpt.rendered.replace(/<[^>]*>/g, "")}
        </p>

        {/* Highlights summary */}
        {highlights.length > 0 && (
          <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
            <span className="text-[11px] tracking-wider text-accent font-semibold block mb-2">
              Key Highlights
            </span>
            <ul className="text-xs text-foreground/75 space-y-1 font-light">
              {highlights.slice(0, 2).map((hl, i) => (
                <li key={i} className="line-clamp-1">
                  • {hl}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pricing & Button */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border-color)]">
          <div>
            {discount_price ? (
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold text-accent">
                  {formatPrice(discount_price)}
                </span>
                <span className="text-sm text-foreground/45 line-through font-light">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="text-base font-semibold text-foreground">
                {formatPrice(price)}
              </span>
            )}
            <span className="text-[10px] text-foreground/45 uppercase tracking-wider block -mt-1">
              per person
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="text-sm uppercase tracking-widest text-foreground font-semibold hover:text-accent transition-colors flex items-center space-x-1"
          >
            <span>Details</span>
            <span>→</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
