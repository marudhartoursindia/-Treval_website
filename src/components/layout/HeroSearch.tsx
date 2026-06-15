"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Compass } from "lucide-react";
import { Button } from "../ui/Button";

interface HeroSearchProps {
  destinations: { slug: string; name: string }[];
}

export function HeroSearch({ destinations }: HeroSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDest, setSelectedDest] = React.useState("");
  const [selectedDuration, setSelectedDuration] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedDest) params.set("destination", selectedDest);
    if (selectedDuration) params.set("duration", selectedDuration);
    
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-[var(--card-bg)]/95 backdrop-blur-md border border-[var(--border-color)] p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-xl"
    >
      {/* Search Input */}
      <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-[var(--border-color)] pb-3 md:pb-0 md:pr-4">
        <label className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-1 flex items-center">
          <Search size={12} className="mr-1" />
          Keyword Search
        </label>
        <input
          type="text"
          placeholder="e.g. Safari, Cultural"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-0 p-0 text-sm focus:outline-none focus:ring-0 text-foreground placeholder:text-foreground/40 font-light"
        />
      </div>

      {/* Destination Dropdown */}
      <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-[var(--border-color)] pb-3 md:pb-0 md:pr-4">
        <label className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-1 flex items-center">
          <MapPin size={12} className="mr-1" />
          Destination
        </label>
        <select
          value={selectedDest}
          onChange={(e) => setSelectedDest(e.target.value)}
          className="bg-transparent border-0 p-0 text-sm focus:outline-none focus:ring-0 text-foreground font-light w-full cursor-pointer"
        >
          <option value="" className="text-foreground bg-[var(--card-bg)]">Any Destination</option>
          {destinations.map((dest) => (
            <option
              key={dest.slug}
              value={dest.slug}
              className="text-foreground bg-[var(--card-bg)]"
            >
              {dest.name}
            </option>
          ))}
        </select>
      </div>

      {/* Duration Range */}
      <div className="flex flex-col justify-center border-b md:border-b-0 pb-3 md:pb-0 md:pr-4">
        <label className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-1 flex items-center">
          <Calendar size={12} className="mr-1" />
          Duration
        </label>
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="bg-transparent border-0 p-0 text-sm focus:outline-none focus:ring-0 text-foreground font-light w-full cursor-pointer"
        >
          <option value="" className="text-foreground bg-[var(--card-bg)]">Any Duration</option>
          <option value="short" className="text-foreground bg-[var(--card-bg)]">1-5 Days</option>
          <option value="medium" className="text-foreground bg-[var(--card-bg)]">6-9 Days</option>
          <option value="long" className="text-foreground bg-[var(--card-bg)]">10+ Days</option>
        </select>
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-center">
        <Button type="submit" variant="accent" className="w-full flex items-center space-x-2 py-3.5">
          <Compass size={14} className="animate-pulse" />
          <span>Find Voyages</span>
        </Button>
      </div>
    </form>
  );
}
