import { TravelPackage, Destination, Blog, FAQ } from "./api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://premiumtravels.com";

export function getTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Bespoke Luxury Travels",
    "image": `${SITE_URL}/images/logo.png`,
    "@id": `${SITE_URL}/#agency`,
    "url": SITE_URL,
    "telephone": "+1-800-555-0199",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Luxury Way, Suite 500",
      "addressLocality": "Beverly Hills",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0736,
      "longitude": -118.4004
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/bespokeluxurytravels",
      "https://www.instagram.com/bespokeluxurytravels",
      "https://twitter.com/lux_travels"
    ]
  };
}

export function getTripSchema(pkg: TravelPackage) {
  const price = pkg.meta.discount_price || pkg.meta.price;
  return {
    "@context": "https://schema.org",
    "@type": "Trip",
    "name": pkg.title.rendered,
    "description": pkg.meta.seo_description || pkg.excerpt.rendered.replace(/<[^>]*>/g, ""),
    "image": pkg.featured_media_url,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": price,
      "priceValidUntil": "2027-12-31",
      "url": `${SITE_URL}/packages/${pkg.slug}`,
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    },
    "itinerary": pkg.meta.day_wise_itinerary.map(day => ({
      "@type": "ListItem",
      "position": day.day,
      "item": {
        "@type": "TouristAttraction",
        "name": day.title,
        "description": day.description
      }
    }))
  };
}

export function getDestinationSchema(dest: Destination) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": dest.title.rendered,
    "description": dest.excerpt.rendered.replace(/<[^>]*>/g, ""),
    "image": dest.featured_media_url,
    "touristType": "Leisure, Culture, Luxury",
    "containedInPlace": {
      "@type": "Place",
      "name": dest.title.rendered
    }
  };
}

export function getFAQPageSchema(faqs: FAQ[] | { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => {
      const isPostFaq = 'title' in faq;
      return {
        "@type": "Question",
        "name": isPostFaq ? (faq as FAQ).title.rendered : (faq as any).question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isPostFaq ? (faq as FAQ).meta.answer : (faq as any).answer
        }
      };
    })
  };
}

export function getBlogSchema(post: Blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title.rendered,
    "image": post.featured_media_url,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "Bespoke Luxury Travels"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bespoke Luxury Travels",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/images/logo.png`
      }
    },
    "description": post.excerpt.rendered.replace(/<[^>]*>/g, "")
  };
}
