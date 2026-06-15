import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Destination } from "@/lib/api";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-stone-900 border border-[var(--border-color)]">
      {/* Background Image */}
      {destination.featured_media_url ? (
        <Image
          src={destination.featured_media_url}
          alt={destination.title.rendered}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-80"
          priority={false}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-stone-800 text-white/50 text-sm uppercase tracking-widest">
          Explore Destination
        </div>
      )}

      {/* Shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-1/2 text-white">
        <div className="flex items-center space-x-1 text-accent text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
          <MapPin size={12} />
          <span>{destination.meta.best_time_to_visit ? "Seasonal" : "Discover"}</span>
        </div>

        <h3 className="font-playfair text-xl md:text-2xl font-bold mb-2 tracking-wide group-hover:text-accent transition-colors">
          {destination.title.rendered}
        </h3>

        <p className="text-xs text-white/75 line-clamp-2 mb-4 leading-relaxed font-light transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {destination.excerpt.rendered.replace(/<[^>]*>/g, "")}
        </p>

        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold border-b border-white/20 pb-1 w-fit group-hover:border-accent group-hover:text-accent transition-all duration-300">
          <span>Explore</span>
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
