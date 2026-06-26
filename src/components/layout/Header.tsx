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
  { label: "Golden Triangle", href: "/golden-triangle" },
  { label: "Custom Package", href: "/custom-package" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Determine if the current page has a dark header overlay (Home page & Destination details)
  const hasDarkHero = React.useMemo(() => {
    return (
      pathname === "/" ||
      pathname === "/golden-triangle" ||
      (pathname.startsWith("/destinations/") && pathname !== "/destinations")
    );
  }, [pathname]);

  const isTransparent = !scrolled && hasDarkHero && !isMobile;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent py-4"
          : "bg-primary border-b border-accent/20 py-3 shadow-md"
      )}
    >
      <div className="w-full px-6 md:px-12 grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center">
        {/* Logo */}
        <div className="flex justify-start">
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
              <span className="font-playfair text-base md:text-lg font-bold tracking-widest transition-colors leading-none text-white group-hover:text-accent">
                MARUDHAR
              </span>
              <span className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold leading-none mt-1">
                Tours India
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8 2xl:space-x-10">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm uppercase tracking-widest transition-colors relative py-2 font-medium",
                  isActive
                    ? "text-accent font-semibold"
                    : "text-white/90 hover:text-accent",
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
        <div className="hidden lg:flex justify-end items-center space-x-4">
          <Link href="/custom-package">
            <Button
              variant={isTransparent ? "outline" : "accent"}
              size="sm"
              className={cn(
                isTransparent && "text-white border-white hover:bg-accent hover:text-white"
              )}
            >
              Plan Custom Trip
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center justify-end space-x-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 focus:outline-none transition-colors text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[72px] z-40 bg-primary/95 backdrop-blur-lg lg:hidden flex flex-col px-8 pt-6 pb-8 h-auto max-h-[calc(100vh-72px)] overflow-y-auto animate-fade-in border-b border-accent/20 shadow-xl">
          <div className="flex flex-col space-y-5">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-playfair font-semibold tracking-wider transition-colors",
                    isActive ? "text-accent" : "text-white/90 hover:text-accent"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 border-t border-accent/20 pt-6 space-y-5">
            <div className="flex items-center space-x-3 text-sm text-white/80">
              <PhoneCall size={18} className="text-accent" />
              <span>+91-95095-99502</span>
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
