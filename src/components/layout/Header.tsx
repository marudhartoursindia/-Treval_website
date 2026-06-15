"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Custom Package", href: "/custom-package" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border-color)] py-3 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative w-12 h-12 overflow-hidden rounded-full border border-accent/20 bg-stone-900 flex-shrink-0">
            <Image
              src="/mti-logo.jpg"
              alt="Marudhar Tours India Logo"
              fill
              className="object-cover scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-playfair text-base md:text-lg font-bold tracking-widest text-foreground group-hover:text-accent transition-colors leading-none">
              MARUDHAR
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-accent font-semibold leading-none mt-1">
              Tours India
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-6">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[10px] uppercase tracking-widest transition-colors relative py-2",
                  isActive
                    ? "text-accent font-semibold"
                    : scrolled
                    ? "text-foreground/80 hover:text-accent"
                    : "text-white hover:text-accent",
                  // Underline animation
                  "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Call to Action */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/custom-package">
            <Button variant={scrolled ? "primary" : "outline"} size="sm" className="border-accent hover:border-accent hover:bg-accent hover:text-primary">
              Plan Custom Trip
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "md:hidden p-2 focus:outline-none transition-colors",
            scrolled || pathname !== "/" ? "text-foreground" : "text-white"
          )}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-[var(--background)]/98 backdrop-blur-lg md:hidden flex flex-col px-8 py-12 animate-fade-in border-t border-[var(--border-color)]">
          <div className="flex flex-col space-y-6">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-playfair font-semibold tracking-wider transition-colors",
                    isActive ? "text-accent" : "text-foreground hover:text-accent"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto border-t border-[var(--border-color)] pt-8 space-y-6">
            <div className="flex items-center space-x-3 text-sm text-foreground/70">
              <PhoneCall size={18} className="text-accent" />
              <span>+1-800-555-0199</span>
            </div>
            <Link href="/custom-package" className="block w-full">
              <Button variant="accent" className="w-full text-center">
                Plan Custom Trip
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
