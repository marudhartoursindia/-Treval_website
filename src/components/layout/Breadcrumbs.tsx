"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/golden-triangle") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="py-4 border-b border-[var(--border-color)] bg-[var(--background)] px-6">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-light tracking-wider uppercase">
        <Link href="/" className="hover:text-accent transition-colors flex items-center text-foreground/60">
          <Home size={14} className="mr-1" />
          Home
        </Link>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = segment.replace(/-/g, " ");

          return (
            <div key={href} className="flex items-center space-x-2">
              <ChevronRight size={12} className="text-foreground/30" />
              {isLast ? (
                <span className="text-accent font-medium select-none" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-accent transition-colors text-foreground/60">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
