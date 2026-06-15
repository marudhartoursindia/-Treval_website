export interface SEOFields {
  seo_title?: string;
  seo_description?: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
}

export interface PackageFAQ {
  question: string;
  answer: string;
}

export interface TravelPackageMeta extends SEOFields {
  duration: string;
  price: number;
  discount_price?: number;
  highlights: string[];
  overview: string;
  day_wise_itinerary: DayItinerary[];
  included_services: string[];
  excluded_services: string[];
  hotel_information?: string;
  transportation_information?: string;
  faq: PackageFAQ[];
  map_location?: string;
  booking_cta?: string;
  gallery_images: string[];
  destination_id?: number;
}

export interface TravelPackage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media_url?: string;
  meta: TravelPackageMeta;
  categories_names?: string[];
}

export interface DestinationMeta {
  gallery: string[];
  popular_attractions: string[];
  best_time_to_visit: string;
  travel_tips: string[];
}

export interface Destination {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media_url?: string;
  meta: DestinationMeta;
}

export interface Blog {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  featured_media_url?: string;
  categories_names?: string[];
  tags_names?: string[];
  meta?: SEOFields;
}

export interface Testimonial {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  meta: {
    rating: number;
    location: string;
    photo?: string;
  };
}

export interface FAQ {
  id: number;
  title: { rendered: string };
  meta: {
    answer: string;
    category: string;
  };
}

// PREMIUM MOCK DATA FALLBACKS
const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 101,
    slug: "kyoto-japan",
    title: { rendered: "Kyoto, Japan" },
    excerpt: { rendered: "Experience the timeless beauty of historic shrines, bamboo forests, and traditional tea ceremonies." },
    content: { rendered: "<p>Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its thousands of classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?q=80&w=800",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800",
        "https://images.unsplash.com/photo-1490806905543-ef4c7868903c?q=80&w=800"
      ],
      popular_attractions: [
        "Fushimi Inari Shrine",
        "Kinkaku-ji (Golden Pavilion)",
        "Arashiyama Bamboo Grove",
        "Gion District"
      ],
      best_time_to_visit: "October to November (Autumn Leaves) or April (Cherry Blossoms)",
      travel_tips: [
        "Purchase a Kansai Thru Pass for easy transit.",
        "Respect local photography restrictions in Gion.",
        "Book temple visits in advance during peak seasons."
      ]
    }
  },
  {
    id: 102,
    slug: "serengeti-tanzania",
    title: { rendered: "Serengeti National Park, Tanzania" },
    excerpt: { rendered: "Witness the Great Migration, endless savannahs, and the breathtaking African Big Five." },
    content: { rendered: "<p>The Serengeti National Park is a Tanzanian national park in the Serengeti ecosystem in the Mara and Simiyu regions. It is famous for its annual migration of over 1.5 million white-bearded wildebeest.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800"
      ],
      popular_attractions: [
        "Grumeti River (Migration crossing)",
        "Seronera Valley (Leopard spotting)",
        "Lobo Valley",
        "Ngorongoro Crater (nearby)"
      ],
      best_time_to_visit: "June to October (Dry season & Migration)",
      travel_tips: [
        "Bring a camera with a good optical zoom lens.",
        "Take yellow fever vaccinations prior to arrival.",
        "Dress in neutral colors (khakis and olives)."
      ]
    }
  },
  {
    id: 103,
    slug: "swiss-alps",
    title: { rendered: "Swiss Alps, Switzerland" },
    excerpt: { rendered: "Revel in alpine luxury, pristine snow slopes, crystal-clear lakes, and majestic peaks." },
    content: { rendered: "<p>The Alps are the highest and most extensive mountain range system that lies entirely in Europe, stretching approximately 1,200 km across eight alpine countries, with Switzerland offering some of the most dramatic vistas.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800"
      ],
      popular_attractions: [
        "The Matterhorn (Zermatt)",
        "Jungfraujoch (Top of Europe)",
        "Lake Geneva",
        "Interlaken Adventure Zone"
      ],
      best_time_to_visit: "December to March (Skiing) or June to September (Hiking)",
      travel_tips: [
        "Invest in a Swiss Travel Pass for unlimited train travel.",
        "Layers are essential; alpine weather changes rapidly.",
        "Always carry cash as some high-altitude refuges don't accept cards."
      ]
    }
  },
  {
    id: 104,
    slug: "maldives",
    title: { rendered: "The Maldives" },
    excerpt: { rendered: "Escape to private overwater villas, vibrant coral reefs, and pristine turquoise lagoons." },
    content: { rendered: "<p>The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It's known for its beaches, blue lagoons and extensive reefs.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
      ],
      popular_attractions: [
        "Male City (Cultural tour)",
        "Banana Reef (Diving)",
        "Bioluminescent Beach (Vaadhoo Island)",
        "Ari Atoll (Manta Ray spotting)"
      ],
      best_time_to_visit: "November to April (Dry monsoon season)",
      travel_tips: [
        "Respect local Islamic traditions when visiting inhabited local islands.",
        "Speedboat transfers are faster and cheaper than seaplanes.",
        "Pack coral-safe sunscreen to protect marine life."
      ]
    }
  }
];

const MOCK_PACKAGES: TravelPackage[] = [
  {
    id: 201,
    slug: "luxury-japan-cultural-odyssey",
    title: { rendered: "Luxury Japan Cultural Odyssey" },
    excerpt: { rendered: "A bespoke, immersive journey exploring the historic imperial temples of Kyoto, bustling Tokyo, and hot spring ryokans." },
    content: { rendered: "<p>Immerse yourself in Japan's delicate balance of ancient traditions and futuristic innovation. This premium package offers hand-selected 5-star accommodations, private temple tours, and Michelin-starred dining.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200",
    categories_names: ["Culture", "Luxury"],
    meta: {
      duration: "9 Days / 8 Nights",
      price: 6499,
      discount_price: 5899,
      destination_id: 101,
      highlights: [
        "Private guided tour of Fushimi Inari Shrine at sunrise",
        "Michelin-star Kaiseki dinner in Gion, Kyoto",
        "Stay at a premium Ryokan with private hot springs (Onsen)",
        "Bullet train Green Car transfers between Tokyo and Kyoto",
        "Bespoke sushi making masterclass with a master chef"
      ],
      overview: "Experience Japan in absolute style. From the neon high-rises of Tokyo to the tranquil temple gardens of Kyoto, you will enjoy private luxury vehicle transfers, English-speaking local historians as guides, and access to exclusive imperial cultural activities.",
      day_wise_itinerary: [
        { day: 1, title: "Arrival in Tokyo & Luxury Transfer", description: "Land at Haneda/Narita airport. Meet your private chauffeur and check into the Aman Tokyo. Enjoy a welcome cocktail overlooking the Tokyo skyline." },
        { day: 2, title: "Modern Tokyo Highlights", description: "Explore Shibuya, Harajuku, and the Meiji Shrine with a private guide. Cap off the night with an exclusive sushi omakase tasting." },
        { day: 3, title: "Mount Fuji & Ryokan Onsen Stay", description: "Travel to Hakone. Stay in an ultra-luxury Ryokan. Bathe in sulfur-rich hot springs and savor a multi-course Kaiseki dinner." },
        { day: 4, title: "Bullet Train to Ancient Kyoto", description: "Board the Shinkansen Bullet Train (First Class). Arrive in Kyoto and check into the Ritz-Carlton. Afternoon stroll in the historic Gion district." },
        { day: 5, title: "Golden Pavilion & Bamboo Groves", description: "Beat the crowds at Kinkaku-ji and wander the towering bamboo pathways of Arashiyama. Relax with a traditional tea ceremony." },
        { day: 6, title: "Bespoke Cultural Crafting", description: "Participate in a private pottery masterclass or Zen meditation session guided by a resident Buddhist monk." },
        { day: 7, title: "Nara Deer Park Excursion", description: "Take a short private drive to Nara. Marvel at the giant bronze Buddha statue at Todai-ji Temple and feed the bowing sika deer." },
        { day: 8, title: "Kyoto Farewell Kaiseki", description: "Spend your final day shopping for premium lacquerware and silk. Enjoy a celebratory farewell banquet with a private Geisha performance." },
        { day: 9, title: "Departure", description: "Private luxury vehicle transfer to Osaka Kansai or Tokyo Haneda Airport for your return flight." }
      ],
      included_services: [
        "5-star luxury accommodations throughout",
        "All breakfast meals plus 4 specialty dining banquets",
        "Private bilingual guides and modern luxury vehicles",
        "First-class bullet train ticket transfers",
        "All temple and workshop entry fees"
      ],
      excluded_services: [
        "International flights to/from Japan",
        "Personal travel insurance",
        "Alcoholic beverages outside scheduled dinners",
        "Gratuities for guides and drivers"
      ],
      hotel_information: "Aman Tokyo (Deluxe Room), Gora Kadan Hakone (Onsen suite), The Ritz-Carlton Kyoto (Garden Terrace Room). All hotels represent the highest tier of international hospitality.",
      transportation_information: "Private luxury Alphard MPV for transfers. JR Shinkansen Bullet Train (Green Car). Private airport meet-and-greet.",
      faq: [
        { question: "Is this tour suitable for families?", answer: "Yes, we can customize the itinerary with family-friendly activities like anime workshops or interactive digital art museums." },
        { question: "What is the luggage policy?", answer: "We arrange luggage forwarding services between Tokyo and Kyoto so you can travel light on the bullet train." }
      ],
      map_location: "Kyoto, Japan",
      booking_cta: "Reserve Cultural Odyssey",
      gallery_images: [
        "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?q=80&w=800",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800",
        "https://images.unsplash.com/photo-1490806905543-ef4c7868903c?q=80&w=800"
      ],
      seo_title: "Luxury Japan Cultural Odyssey Tour - 9 Days Custom Package",
      seo_description: "Book an ultra-luxury customized 9-day cultural trip to Japan. Experience private temple tours, Michelin sushi, and luxury ryokans in Tokyo & Kyoto."
    }
  },
  {
    id: 202,
    slug: "serengeti-exclusive-wildlife-safari",
    title: { rendered: "Serengeti Exclusive Wildlife Safari" },
    excerpt: { rendered: "An intimate, eco-luxury safari journey through the heart of the Serengeti with premium tented camp stays." },
    content: { rendered: "<p>Venture deep into the wilderness. Experience game drives with professional trackers, gourmet bush dining, and luxury glamping tents with plunge pools overlooking the savannah.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200",
    categories_names: ["Safari", "Adventure"],
    meta: {
      duration: "6 Days / 5 Nights",
      price: 4999,
      destination_id: 102,
      highlights: [
        "Daily game drives in custom open-sided 4x4 Land Cruisers",
        "Stunning hot-air balloon safari at sunrise over the plains",
        "Private bush dinners under the star-lit African sky",
        "Luxury glamping tents at Four Seasons Safari Lodge Serengeti",
        "Expert Maasai-guided walking safaris"
      ],
      overview: "Witness nature's greatest theater. This exclusive wildlife safari focuses on game viewing away from crowds, with expert drivers who know the subtle animal tracks. Look forward to capturing lions, elephants, leopards, rhinos, and buffaloes in their native habitats.",
      day_wise_itinerary: [
        { day: 1, title: "Arusha to Serengeti Fly-in", description: "Board your private charter flight from Arusha to Seronera Airstrip. Check into the luxury lodge and embark on an afternoon game drive." },
        { day: 2, title: "Full Day Wildlife Tracking", description: "Search for predators at dawn. Enjoy a luxury picnic lunch near a hippo pool, followed by an evening sundowner drink." },
        { day: 3, title: "Sunrise Hot Air Balloon Ride", description: "Float silently above the migration herd. Toast with a champagne breakfast upon landing on the savannah." },
        { day: 4, title: "Maasai Cultural Walk", description: "Walk with native warriors. Learn about tracking, medicinal plants, and local conservation efforts." },
        { day: 5, title: "River Crossings & Big Cats", description: "Observe crocodiles and hippos along the Mara River, looking for migration crossings. Dinner under the stars." },
        { day: 6, title: "Charter Flight back to Arusha", description: "Morning short game drive, followed by checkout and flight transfer back to Kilimanjaro International Airport." }
      ],
      included_services: [
        "All luxury airstrip transfers and local charter flights",
        "Full board meals, including premium beer and wines",
        "Park fees and conservation levies",
        "Sunrise hot air balloon flight",
        "Maasai guide fees"
      ],
      excluded_services: [
        "International flights",
        "Tanzania tourist visa ($50-$100)",
        "Tips for camp staff and guides",
        "Personal spa services"
      ],
      hotel_information: "Four Seasons Safari Lodge Serengeti (Savannah Waterhole View Room) and Singita Sabora Tented Camp.",
      transportation_information: "Bespoke safari-modified 4x4 Land Cruiser. Regional Cessna grand caravan charter flights.",
      faq: [
        { question: "Is malaria prophylaxis recommended?", answer: "Yes, Serengeti is a malaria-prone zone; consult your travel physician prior to travel." },
        { question: "What is the best month for the Wildebeest Migration?", answer: "Typically June and July for Northern Serengeti river crossings, and January to March for calving in the Southern plains." }
      ],
      map_location: "Serengeti National Park, Tanzania",
      booking_cta: "Enquire Safari Booking",
      gallery_images: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800"
      ],
      seo_title: "Premium Serengeti Wildlife Safari - 6 Days Eco-Luxury Tour",
      seo_description: "Book an exclusive 6-day luxury safari in Serengeti National Park, Tanzania. Includes hot air balloon rides, five-star tented lodges, and private 4x4 game drives."
    }
  },
  {
    id: 203,
    slug: "maldives-ultimate-overwater-escape",
    title: { rendered: "Maldives Ultimate Overwater Escape" },
    excerpt: { rendered: "Indulge in absolute tropical luxury with a private overwater villa, private pool, and marine reserve snorkeling." },
    content: { rendered: "<p>Unwind in paradise. A secluded escape designed for couples, honeymooners, and luxury seekers, featuring direct lagoon access and personal butler services.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200",
    categories_names: ["Beaches", "Luxury"],
    meta: {
      duration: "7 Days / 6 Nights",
      price: 7800,
      discount_price: 7200,
      destination_id: 104,
      highlights: [
        "Stay in a sunset-facing overwater pool villa",
        "Dedicated 24/7 personal island butler service",
        "Private yacht cruise with dolphin watching at sunset",
        "Undersea restaurant dinner reservation included",
        "Couples signature massage at an overwater spa pavilion"
      ],
      overview: "Surrender to the rhythm of the ocean. Suspended over crystal waters, your private villa features glass floor viewing panels, an infinity pool, and steps leading straight into a coral reef teeming with exotic sea life.",
      day_wise_itinerary: [
        { day: 1, title: "Seaplane Arrival", description: "Arrive in Male. Board your scenic seaplane to the resort. Enjoy a chilled coconut water greeting from your private butler." },
        { day: 2, title: "Lagoon Exploration & Snorkeling", description: "Snorkel in the house reef. Discover clownfish, sea turtles, and baby blacktip sharks. Enjoy a beachside barbecue." },
        { day: 3, title: "Overwater Spa & Wellness", description: "Indulge in a 90-minute therapeutic massage. Spend the afternoon paddleboarding or kayaking." },
        { day: 4, title: "Private Yacht Sunset Cruise", description: "Board a luxury catamaran. Sip premium champagne as spinner dolphins jump alongside the boat." },
        { day: 5, title: "Undersea Dinner Feast", description: "Dine five meters below the surface surrounded by panoramic views of coral gardens and marine life." },
        { day: 6, title: "Sandbar Picnic Escape", description: "Be cast away on a completely private sandbar for a luxury chef-catered picnic lunch and swimming." },
        { day: 7, title: "Depart Maldives", description: "Take a final morning dip, check out, and take the return seaplane flight to Male International Airport." }
      ],
      included_services: [
        "Round-trip seaplane transfers from Male Airport",
        "Half-board meals (Breakfast & Gourmet Dinners)",
        "Premium snorkeling equipment rental",
        "Daily sunset yoga classes",
        "Complimentary non-motorized water sports"
      ],
      excluded_services: [
        "International flights",
        "Motorized water sports (jet ski, flyboard)",
        "Premium spirits and cigars",
        "Green tax ($6 per night per person, paid at resort)"
      ],
      hotel_information: "Soneva Jani or Anantara Kihavah Maldives Villas (Overwater Pool Villa).",
      transportation_information: "Trans Maldivian Airways twin-otter seaplane. Resort golf buggies and custom wooden dhoni boats.",
      faq: [
        { question: "Are children allowed in overwater villas?", answer: "Yes, though safety nets can be installed upon request for toddlers." },
        { question: "Is all-inclusive dining available?", answer: "We can upgrade this package to full all-inclusive dining for an additional fee." }
      ],
      map_location: "Maldives",
      booking_cta: "Inquire Overwater Villa",
      gallery_images: [
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
      ],
      seo_title: "Maldives Luxury Overwater Escape Package - 7 Days Honeymoon Tour",
      seo_description: "Book an ultimate 7-day tropical luxury getaway in the Maldives. Experience overwater villas with private pools, undersea dining, and luxury yacht cruises."
    }
  }
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 301,
    title: { rendered: "Sarah & David Jenkins" },
    content: { rendered: "<p>Our honeymoon in the Maldives was absolutely flawless. The Soneva overwater villa was spectacular, and the personalized details arranged by the travel agency were unforgettable. Highly recommended!</p>" },
    meta: {
      rating: 5,
      location: "London, UK",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
    }
  },
  {
    id: 302,
    title: { rendered: "Marcus Vance" },
    content: { rendered: "<p>The Serengeti safari exceeded all my expectations. Our guide had an uncanny ability to find wildlife, and falling asleep to the sounds of the African bush in a luxury tent was incredible.</p>" },
    meta: {
      rating: 5,
      location: "New York, USA",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    }
  },
  {
    id: 303,
    title: { rendered: "Elena Rostova" },
    content: { rendered: "<p>Kyoto in autumn is breathtaking. The private temple access and geisha performance were cultural masterpieces. The attention to detail and luxury transfers were highly appreciated.</p>" },
    meta: {
      rating: 5,
      location: "Munich, Germany",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200"
    }
  }
];

const MOCK_FAQS: FAQ[] = [
  {
    id: 401,
    title: { rendered: "What is included in the package price?" },
    meta: {
      answer: "Generally, our luxury packages include premium 5-star accommodations, regional airport transfers, guided private tours, entrance tickets, and select specialty meals. International airfare is excluded to give you flexibility.",
      category: "Booking & Pricing"
    }
  },
  {
    id: 402,
    title: { rendered: "Can I customize an itinerary?" },
    meta: {
      answer: "Absolutely. All our travel itineraries serve as inspiration. As a premium agency, we tailor every travel plan to your interests, pacing, diet, and dates. Speak with our curators to build your bespoke vacation.",
      category: "Customization"
    }
  },
  {
    id: 403,
    title: { rendered: "What safety protocols are in place?" },
    meta: {
      answer: "We only partner with fully certified local operators, premium transport providers, and reputable hospitality brands. Additionally, we provide 24/7 emergency concierge support during your travel.",
      category: "Safety & Support"
    }
  }
];

const MOCK_BLOGS: Blog[] = [
  {
    id: 501,
    slug: "insiders-guide-kyoto-autumn-colors",
    title: { rendered: "An Insider's Guide to Kyoto's Autumn Colors" },
    excerpt: { rendered: "Discover the best temples, gardens, and hidden scenic spots to witness the crimson momiji leaves away from crowds." },
    content: { rendered: "<p>Autumn in Kyoto is a season of pure magic. The maple leaves turn shades of fiery red and gold, framing centuries-old temples. In this guide, we share our favorite secret photography spots, night illumination events, and traditional dining tips...</p><h5>1. Arashiyama at Sunrise</h5><p>To avoid massive crowds, arrive at the bamboo path and Togetsukyo bridge by 6:30 AM. The morning light hitting the foliage is breathtaking.</p><h5>2. Kodaiji Night Illumination</h5><p>Many temples light up their gardens at night. Kodaiji offers a stunning projection mapping show reflecting on the pond.</p>" },
    date: "2026-05-12T08:00:00",
    featured_media_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800",
    categories_names: ["Guides", "Japan"],
    tags_names: ["Autumn", "Kyoto", "Luxury Travel"],
    meta: {
      seo_title: "Guide to Kyoto Autumn Leaves - Best Scenic Spots",
      seo_description: "Explore the ultimate local guide to experiencing Kyoto in autumn. Learn about temple light-ups, best photography spots, and avoiding crowds."
    }
  },
  {
    id: 502,
    slug: "what-to-pack-luxury-african-safari",
    title: { rendered: "What to Pack for a Luxury African Safari" },
    excerpt: { rendered: "Our comprehensive packing list covers the essential gear, clothing color codes, and camera suggestions for Serengeti." },
    content: { rendered: "<p>Packing for a safari is unique because you must balance luggage weight restrictions on light aircraft with the need for functional, layered clothing. Here is our expert guide on what to bring...</p><h5>Color Code: Neutral Colors Only</h5><p>Avoid blue or black clothing (they attract tsetse flies) and bright whites (which spook wildlife). Neutral tans, khakis, and olive greens are perfect.</p>" },
    date: "2026-06-02T10:30:00",
    featured_media_url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
    categories_names: ["Travel Tips", "Safari"],
    tags_names: ["Packing Guide", "Serengeti", "Africa"],
    meta: {
      seo_title: "Bespoke Safari Packing List - Luxury Travel Tips",
      seo_description: "The ultimate luxury safari packing checklist. Find out which colors to wear, essential safari gear, camera recommendations, and health tips."
    }
  }
];

// WordPress API Fetch Layer with Robust Fallbacks
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL || "";

async function fetchFromWP<T>(endpoint: string, tags?: string[]): Promise<T> {
  if (!WP_API_URL) {
    throw new Error("WordPress API URL is not defined.");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${WP_API_URL}/wp-json/wp/v2/${endpoint}${separator}_embed=true`;

  const res = await fetch(url, {
    next: {
      revalidate: 3600, // 1 hour cache
      tags: tags,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from WP API: ${res.statusText}`);
  }

  return res.json();
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    if (!WP_API_URL) return MOCK_DESTINATIONS;
    // Map REST response if needed
    const data = await fetchFromWP<any[]>("destination", ["destinations"]);
    return data.map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || item.featured_media_url,
      meta: item.meta || { gallery: [], popular_attractions: [], best_time_to_visit: "", travel_tips: [] }
    }));
  } catch (error) {
    console.warn("getDestinations: Failed fetching from WordPress. Falling back to mock data.", error);
    return MOCK_DESTINATIONS;
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    if (!WP_API_URL) {
      return MOCK_DESTINATIONS.find(d => d.slug === slug) || null;
    }
    const data = await fetchFromWP<any[]>(`destination?slug=${slug}`, [`destination-${slug}`]);
    if (!data.length) return null;
    const item = data[0];
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
      meta: item.meta
    };
  } catch (error) {
    console.warn(`getDestinationBySlug(${slug}): Falling back to mock data.`, error);
    return MOCK_DESTINATIONS.find(d => d.slug === slug) || null;
  }
}

export async function getTravelPackages(): Promise<TravelPackage[]> {
  try {
    if (!WP_API_URL) return MOCK_PACKAGES;
    const data = await fetchFromWP<any[]>("travel-package", ["packages"]);
    return data.map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || item.featured_media_url,
      categories_names: item._embedded?.["wp:term"]?.[0]?.map((t: any) => t.name) || [],
      meta: item.meta
    }));
  } catch (error) {
    console.warn("getTravelPackages: Failed fetching from WordPress. Falling back to mock data.", error);
    return MOCK_PACKAGES;
  }
}

export async function getTravelPackageBySlug(slug: string): Promise<TravelPackage | null> {
  try {
    if (!WP_API_URL) {
      return MOCK_PACKAGES.find(p => p.slug === slug) || null;
    }
    const data = await fetchFromWP<any[]>(`travel-package?slug=${slug}`, [`package-${slug}`]);
    if (!data.length) return null;
    const item = data[0];
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
      categories_names: item._embedded?.["wp:term"]?.[0]?.map((t: any) => t.name) || [],
      meta: item.meta
    };
  } catch (error) {
    console.warn(`getTravelPackageBySlug(${slug}): Falling back to mock data.`, error);
    return MOCK_PACKAGES.find(p => p.slug === slug) || null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    if (!WP_API_URL) return MOCK_TESTIMONIALS;
    const data = await fetchFromWP<any[]>("testimonial", ["testimonials"]);
    return data.map(item => ({
      id: item.id,
      title: item.title,
      content: item.content,
      meta: item.meta
    }));
  } catch (error) {
    console.warn("getTestimonials: Falling back to mock data.", error);
    return MOCK_TESTIMONIALS;
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  try {
    if (!WP_API_URL) return MOCK_FAQS;
    const data = await fetchFromWP<any[]>("faq", ["faqs"]);
    return data.map(item => ({
      id: item.id,
      title: item.title,
      meta: item.meta
    }));
  } catch (error) {
    console.warn("getFAQs: Falling back to mock data.", error);
    return MOCK_FAQS;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    if (!WP_API_URL) return MOCK_BLOGS;
    const data = await fetchFromWP<any[]>("posts", ["blogs"]);
    return data.map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      date: item.date,
      featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
      categories_names: item._embedded?.["wp:term"]?.[0]?.map((t: any) => t.name) || [],
      tags_names: item._embedded?.["wp:term"]?.[1]?.map((t: any) => t.name) || [],
      meta: {
        seo_title: item.meta?.seo_title,
        seo_description: item.meta?.seo_description
      }
    }));
  } catch (error) {
    console.warn("getBlogs: Falling back to mock data.", error);
    return MOCK_BLOGS;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    if (!WP_API_URL) {
      return MOCK_BLOGS.find(b => b.slug === slug) || null;
    }
    const data = await fetchFromWP<any[]>(`posts?slug=${slug}`, [`blog-${slug}`]);
    if (!data.length) return null;
    const item = data[0];
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      date: item.date,
      featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
      categories_names: item._embedded?.["wp:term"]?.[0]?.map((t: any) => t.name) || [],
      tags_names: item._embedded?.["wp:term"]?.[1]?.map((t: any) => t.name) || [],
      meta: {
        seo_title: item.meta?.seo_title,
        seo_description: item.meta?.seo_description
      }
    };
  } catch (error) {
    console.warn(`getBlogBySlug(${slug}): Falling back to mock data.`, error);
    return MOCK_BLOGS.find(b => b.slug === slug) || null;
  }
}
