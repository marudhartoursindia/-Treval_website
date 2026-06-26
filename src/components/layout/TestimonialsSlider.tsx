"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
  meta: {
    rating: number;
    photo?: string;
    location: string;
  };
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll =
        direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scrollable Container */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] shrink-0 bg-[var(--card-bg)] border border-[var(--border-color)] p-6 flex flex-col snap-start hover:shadow-md transition-shadow duration-300"
          >
            {/* Quote mark */}
            <span className="text-4xl text-accent/30 font-serif leading-none mb-2 select-none">&ldquo;</span>

            {/* Stars */}
            <div className="flex items-center space-x-1 text-accent mb-3">
              {[...Array(test.meta.rating)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>

            {/* Review text */}
            <div
              className="text-sm text-foreground/75 leading-relaxed font-light italic mb-6 flex-grow overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: test.content.rendered }}
            />

            {/* Author */}
            <div className="flex items-center space-x-3 border-t border-[var(--border-color)] pt-4 mt-auto">
              {test.meta.photo && (
                <div className="relative w-10 h-10 overflow-hidden bg-stone-100 rounded-full shrink-0">
                  <Image
                    src={test.meta.photo}
                    alt={test.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-playfair text-sm font-bold text-foreground leading-tight">
                  {test.title.rendered}
                </h4>
                <span className="text-[10px] text-foreground/50 uppercase tracking-wider block mt-0.5">
                  {test.meta.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-foreground flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-foreground flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Next testimonials"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
