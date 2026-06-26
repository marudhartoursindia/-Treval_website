import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { getTravelAgencySchema } from "@/lib/seo";
import Script from "next/script";

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
    default: "Marudhar Tours India - Luxury Custom India Tour Packages",
  },
  description: "Bespoke luxury tour packages and private custom itineraries across India for travelers from the USA, UK, Japan, Switzerland, France, and Italy. Discover Rajasthan, Taj Mahal, Varanasi, and hidden gems with native expert guides.",
  metadataBase: new URL("https://marudhartours.com"),
  alternates: { canonical: "/" },
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
  appleWebApp: {
    capable: true,
    title: "Marudhar Tours",
    statusBarStyle: "default",
  },
};

// Separate viewport export — required by Next.js 16+
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1F3B" },
  ],
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
        {/* Cross-browser compatibility meta tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-grow pt-[72px]">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
        <FloatingButtons />
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a3e226094471a1d4dea3c66/1js1bcipk';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
