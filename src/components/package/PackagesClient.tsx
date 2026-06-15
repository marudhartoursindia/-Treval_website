"use client";

import * as React from "react";
import { Search, RotateCcw, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TravelPackage, Destination } from "@/lib/api";
import { PackageCard } from "./PackageCard";
import { Button } from "../ui/Button";

interface PackagesClientProps {
  initialPackages: TravelPackage[];
  destinations: Destination[];
}

export function PackagesClient({ initialPackages, destinations }: PackagesClientProps) {
  const [search, setSearch] = React.useState("");
  const [selectedDest, setSelectedDest] = React.useState("");
  const [selectedCat, setSelectedCat] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState<number>(10000);
  const [durationFilter, setDurationFilter] = React.useState("");
  const [sortBy, setSortBy] = React.useState("featured");

  // Read URL search params on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("search")) setSearch(params.get("search") || "");
      if (params.get("destination")) setSelectedDest(params.get("destination") || "");
      if (params.get("duration")) setDurationFilter(params.get("duration") || "");
    }
  }, []);

  // Get unique categories across all packages
  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    initialPackages.forEach((pkg) => {
      pkg.categories_names?.forEach((cat) => cats.add(cat));
    });
    return Array.from(cats);
  }, [initialPackages]);

  // Find overall maximum price to set slider max dynamically
  const absoluteMaxPrice = React.useMemo(() => {
    const prices = initialPackages.map((p) => p.meta.discount_price || p.meta.price);
    return Math.max(...prices, 10000);
  }, [initialPackages]);

  // Set default slider max on mount
  React.useEffect(() => {
    setMaxPrice(absoluteMaxPrice);
  }, [absoluteMaxPrice]);

  // Reset all filters helper
  const handleReset = () => {
    setSearch("");
    setSelectedDest("");
    setSelectedCat("");
    setMaxPrice(absoluteMaxPrice);
    setDurationFilter("");
    setSortBy("featured");
  };

  // Filtering Logic
  const filteredPackages = React.useMemo(() => {
    return initialPackages
      .filter((pkg) => {
        // Keyword Search
        const text = `${pkg.title.rendered} ${pkg.meta.overview} ${pkg.meta.highlights.join(" ")}`.toLowerCase();
        if (search && !text.includes(search.toLowerCase())) return false;

        // Destination Filter
        if (selectedDest) {
          const dest = destinations.find((d) => d.slug === selectedDest);
          if (dest && pkg.meta.destination_id !== dest.id) return false;
        }

        // Category Filter
        if (selectedCat && !pkg.categories_names?.includes(selectedCat)) return false;

        // Price Filter
        const pkgPrice = pkg.meta.discount_price || pkg.meta.price;
        if (pkgPrice > maxPrice) return false;

        // Duration Filter
        if (durationFilter) {
          // Parse number of days
          const match = pkg.meta.duration.match(/(\d+)\s*Day/i);
          if (match) {
            const days = parseInt(match[1]);
            if (durationFilter === "short" && days > 5) return false;
            if (durationFilter === "medium" && (days < 6 || days > 9)) return false;
            if (durationFilter === "long" && days < 10) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const aPrice = a.meta.discount_price || a.meta.price;
        const bPrice = b.meta.discount_price || b.meta.price;

        if (sortBy === "price-asc") return aPrice - bPrice;
        if (sortBy === "price-desc") return bPrice - aPrice;
        if (sortBy === "duration") {
          const aDays = parseInt(a.meta.duration.match(/(\d+)/)?.[0] || "0");
          const bDays = parseInt(b.meta.duration.match(/(\d+)/)?.[0] || "0");
          return bDays - aDays;
        }
        return 0; // default featured / no-sort
      });
  }, [initialPackages, destinations, search, selectedDest, selectedCat, maxPrice, durationFilter, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* Sidebar Filters */}
      <aside className="lg:col-span-1 space-y-8 bg-stone-50 dark:bg-stone-900/10 p-6 border border-[var(--border-color)] h-fit">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
            <SlidersHorizontal size={18} className="mr-2 text-accent" />
            Filters
          </h3>
          <button
            onClick={handleReset}
            className="text-[10px] uppercase tracking-widest text-foreground/50 hover:text-accent flex items-center transition-colors cursor-pointer"
          >
            <RotateCcw size={12} className="mr-1" />
            Reset
          </button>
        </div>

        {/* 1. Keyword Search */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
            Keyword Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-accent text-foreground"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-foreground/45" />
          </div>
        </div>

        {/* 2. Destination Filter */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
            Destination
          </label>
          <select
            value={selectedDest}
            onChange={(e) => setSelectedDest(e.target.value)}
            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] px-4 py-2.5 text-sm focus:outline-none focus:border-accent text-foreground cursor-pointer"
          >
            <option value="">All Destinations</option>
            {destinations.map((dest) => (
              <option key={dest.slug} value={dest.slug}>
                {dest.title.rendered}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Category Filter */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
            Travel Style / Category
          </label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] px-4 py-2.5 text-sm focus:outline-none focus:border-accent text-foreground cursor-pointer"
          >
            <option value="">All Styles</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Price Filter */}
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] uppercase tracking-wider text-accent font-semibold">
            <span>Max Price</span>
            <span>${maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={1000}
            max={absoluteMaxPrice}
            step={250}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer bg-stone-300 dark:bg-stone-800"
          />
          <div className="flex justify-between text-[9px] text-foreground/45">
            <span>$1,000</span>
            <span>${absoluteMaxPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* 5. Duration Filter */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
            Duration
          </label>
          <div className="space-y-2">
            {[
              { label: "All Durations", value: "" },
              { label: "1-5 Days", value: "short" },
              { label: "6-9 Days", value: "medium" },
              { label: "10+ Days", value: "long" },
            ].map((dur) => (
              <label
                key={dur.value}
                className="flex items-center space-x-3 text-xs text-foreground/85 cursor-pointer font-light select-none"
              >
                <input
                  type="radio"
                  name="duration"
                  value={dur.value}
                  checked={durationFilter === dur.value}
                  onChange={() => setDurationFilter(dur.value)}
                  className="accent-accent"
                />
                <span>{dur.label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Listing Area */}
      <main className="lg:col-span-3 space-y-8">
        {/* Sort header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--border-color)] pb-4 space-y-4 sm:space-y-0">
          <p className="text-xs text-foreground/60 font-light">
            Showing <span className="font-semibold text-foreground">{filteredPackages.length}</span> luxury voyages
          </p>

          <div className="flex items-center space-x-3 text-xs w-full sm:w-auto">
            <ArrowUpDown size={14} className="text-accent shrink-0" />
            <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-semibold shrink-0">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-[var(--border-color)] px-3 py-1.5 focus:outline-none focus:border-accent text-foreground text-xs cursor-pointer w-full sm:w-auto"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration: Longest First</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPackages.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-stone-50 dark:bg-stone-900/10 border border-[var(--border-color)] space-y-4"
            >
              <p className="text-sm text-foreground/60 font-light">
                No luxury packages match your specific filter criteria.
              </p>
              <Button variant="outline" onClick={handleReset}>
                Reset Filter Choices
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
