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
    template: "%s | Bespoke Luxury Travels",
    default: "Bespoke Luxury Travels - Tailored Voyages & Safaris",
  },
  description: "Curators of bespoke luxury tours, custom safaris, and tropical overwater bungalow getaways worldwide. Experience 5-star tailored travel.",
  metadataBase: new URL("https://premiumtravels.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bespoke Luxury Travels",
    description: "Curating bespoke travel itineraries & private tours to the world's most beautiful destinations.",
    url: "https://premiumtravels.com",
    siteName: "Bespoke Luxury Travels",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Bespoke Luxury Travels",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Luxury Travels",
    description: "Curating bespoke travel itineraries & private tours to the world's most beautiful destinations.",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200"],
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
