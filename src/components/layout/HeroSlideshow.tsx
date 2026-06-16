"use client";

import * as React from "react";
import Image from "next/image";

const IMAGES = [
  "/jaipur.avif",
  "/jodhpur.avif",
  "/udaipur.avif",
  "/bikaner.jpg"
];

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {IMAGES.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-60" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Marudhar Tours Slideshow Image ${index + 1}`}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-[5000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
