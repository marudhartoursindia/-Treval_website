"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PackageGalleryProps {
  images: string[];
  fallbackImage?: string;
  packageName: string;
}

export function PackageGallery({ images, fallbackImage, packageName }: PackageGalleryProps) {
  const allImages = React.useMemo(() => {
    const list = [...images];
    if (fallbackImage && !list.includes(fallbackImage)) {
      list.unshift(fallbackImage);
    }
    return list.filter(Boolean);
  }, [images, fallbackImage]);

  const [activeIdx, setActiveIdx] = React.useState(0);

  if (allImages.length === 0) {
    return (
      <div className="h-96 w-full bg-stone-200 flex items-center justify-center text-foreground/45 uppercase tracking-widest text-xs">
        No Images Available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Large Featured Viewer */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-stone-100 border border-[var(--border-color)]">
        <Image
          src={allImages[activeIdx]}
          alt={`${packageName} - Gallery Image ${activeIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-cover transition-all duration-500 ease-in-out"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 text-[10px] tracking-wider uppercase">
          {activeIdx + 1} / {allImages.length}
        </div>
      </div>

      {/* Thumbnails grid */}
      {allImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative w-24 h-16 shrink-0 overflow-hidden border transition-all duration-300 focus:outline-none cursor-pointer",
                activeIdx === idx ? "border-accent scale-95" : "border-[var(--border-color)] hover:border-accent/50"
              )}
            >
              <Image
                src={img}
                alt={`${packageName} thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
