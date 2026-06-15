import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getTravelAgencySchema } from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Marudhar Tours India",
    default: "Marudhar Tours India - Custom Rajasthan & India Tour Packages",
  },
  description: "Premium travel agency specializing in custom Rajasthan tour packages, desert safaris, and luxury itineraries across India.",
  metadataBase: new URL("https://marudhartours.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marudhar Tours India",
    description: "Bespoke travel itineraries, private tours & desert safaris to Rajasthan and major Indian destinations.",
    url: "https://marudhartours.com",
    siteName: "Marudhar Tours India",
    images: [
      {
        url: "https://images.unsplash.com/photo-1477584322811-5a3ecfb790f3?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Marudhar Tours India",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marudhar Tours India",
    description: "Bespoke travel itineraries, private tours & desert safaris to Rajasthan and major Indian destinations.",
    images: ["https://images.unsplash.com/photo-1477584322811-5a3ecfb790f3?q=80&w=1200"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getTravelAgencySchema();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-grow pt-[85px]">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
