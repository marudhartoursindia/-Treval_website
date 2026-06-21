import { TravelPackage, Destination, Blog, FAQ } from "./api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://marudhartours.com";

export function getTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Marudhar Tours India",
    "image": `${SITE_URL}/mti-logo.jpg`,
    "@id": `${SITE_URL}/#agency`,
    "url": SITE_URL,
    "telephone": "+91-95095-99502",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "P No2, Kamal Gatta Colony, Talkatora Road",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302002",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.9124,
      "longitude": 75.7873
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
      "https://www.facebook.com/marudhartoursindia",
      "https://www.instagram.com/marudhartoursindia",
      "https://twitter.com/marudhartours"
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
      "name": "Marudhar Tours India"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marudhar Tours India",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/mti-logo.jpg`
      }
    },
    "description": post.excerpt.rendered.replace(/<[^>]*>/g, "")
  };
}
