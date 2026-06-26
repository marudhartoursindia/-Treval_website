import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking attacks
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer privacy
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable DNS prefetching for privacy
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Enforce HTTPS (enable on production with real domain)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Permissions policy — disable camera/mic/geolocation access
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  // Cross-Origin Opener Policy
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  // ── Images ──────────────────────────────────────────
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
    formats: ["image/avif", "image/webp"],   // modern formats with fallback
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  // ── Compression ─────────────────────────────────────
  compress: true,

  // ── Security Headers (all routes) ───────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // ── Redirects ────────────────────────────────────────
  async redirects() {
    return [];
  },
};

export default nextConfig;
