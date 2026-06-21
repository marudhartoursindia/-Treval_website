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
    slug: "jaipur",
    title: { rendered: "Jaipur, Rajasthan" },
    excerpt: { rendered: "The legendary Pink City, famed for its royal palaces, imposing forts, and vibrant gemstone bazaars." },
    content: { rendered: "<p>Jaipur is the capital of India's Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or \"Pink City\" for its trademark building color.</p>" },
    featured_media_url: "/jaipur.avif",
    meta: {
      gallery: [
        "/jaipur.avif",
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200"
      ],
      popular_attractions: ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar"],
      best_time_to_visit: "October to March",
      travel_tips: ["Hire a certified local guide at Amber Fort.", "Enjoy authentic Dal Baati Churma at Chokhi Dhani."]
    }
  },
  {
    id: 102,
    slug: "jodhpur",
    title: { rendered: "Jodhpur, Rajasthan" },
    excerpt: { rendered: "The Sun City, characterized by blue-washed houses nestled beneath the towering Mehrangarh Fort." },
    content: { rendered: "<p>Jodhpur is a city in the Thar Desert of the northwest Indian state of Rajasthan. Its 15th-century Mehrangarh Fort is a former palace that's now a museum, displaying weapons, paintings and elaborate royal palanquins.</p>" },
    featured_media_url: "/jodhpur.avif",
    meta: {
      gallery: [
        "/jodhpur.avif",
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200"
      ],
      popular_attractions: ["Mehrangarh Fort", "Jaswant Thada", "Umaid Bhawan Palace", "Sardar Market"],
      best_time_to_visit: "October to March",
      travel_tips: ["Try the local Makhaniya Lassi.", "Zip-line over the fort walls for an adrenaline rush."]
    }
  },
  {
    id: 103,
    slug: "udaipur",
    title: { rendered: "Udaipur, Rajasthan" },
    excerpt: { rendered: "The City of Lakes and Venice of the East, showcasing romantic floating palaces and lush hills." },
    content: { rendered: "<p>Udaipur, formerly the capital of the Mewar Kingdom, is a city in the western Indian state of Rajasthan. Founded by Maharana Udai Singh II in 1559, it's set around a series of artificial lakes and is known for its lavish royal residences.</p>" },
    featured_media_url: "/udaipur.avif",
    meta: {
      gallery: [
        "/udaipur.avif",
        "https://images.unsplash.com/photo-1598977123418-45f04b016423?q=80&w=1200"
      ],
      popular_attractions: ["Lake Palace", "City Palace", "Jag Mandir", "Lake Pichola"],
      best_time_to_visit: "September to March",
      travel_tips: ["Take a sunset boat cruise on Lake Pichola.", "Attend the cultural Dharohar dance show at Bagore Ki Haveli."]
    }
  },
  {
    id: 104,
    slug: "jaisalmer",
    title: { rendered: "Jaisalmer, Rajasthan" },
    excerpt: { rendered: "The Golden City, rising from the Thar desert sands with sandstone architecture and sand dune safaris." },
    content: { rendered: "<p>Jaisalmer is a former medieval trading center and a princely state in the western Indian state of Rajasthan, in the heart of the Thar Desert. Known as the \"Golden City,\" it's distinguished by its yellow sandstone architecture.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1200",
        "https://images.unsplash.com/photo-1542796708-9188bca6835a?q=80&w=1200"
      ],
      popular_attractions: ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli", "Gadisar Lake"],
      best_time_to_visit: "October to March",
      travel_tips: ["Stay overnight in a luxury desert camp.", "Go on a camel safari at sunset in Sam Sand Dunes."]
    }
  },
  {
    id: 105,
    slug: "bikaner",
    title: { rendered: "Bikaner, Rajasthan" },
    excerpt: { rendered: "Famous for Junagarh Fort, camel breeding farm, and delicious spicy Bikaneri Bhujia." },
    content: { rendered: "<p>Bikaner is a city in the north of Rajasthan state. It is surrounded by the Thar Desert. The city is known for the 16th-century Junagarh Fort, a huge complex of ornate buildings and halls.</p>" },
    featured_media_url: "/bikaner.jpg",
    meta: {
      gallery: [
        "/bikaner.jpg"
      ],
      popular_attractions: ["Junagarh Fort", "Lallgarh Palace", "Karni Mata Temple", "National Research Centre on Camel"],
      best_time_to_visit: "October to March",
      travel_tips: ["Try the world-famous Bikaneri Bhujia sweets.", "Experience the annual Camel Festival in January."]
    }
  },
  {
    id: 106,
    slug: "agra",
    title: { rendered: "Agra, Uttar Pradesh" },
    excerpt: { rendered: "Home of the Taj Mahal, the ultimate monument of eternal love and architectural perfection." },
    content: { rendered: "<p>Agra is a city on the banks of the Yamuna river in the Indian state of Uttar Pradesh. It is famous for the Taj Mahal, Agra Fort, and Fatehpur Sikri, all of which are UNESCO World Heritage Sites.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200"
      ],
      popular_attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh"],
      best_time_to_visit: "October to March",
      travel_tips: ["Visit the Taj Mahal at sunrise to beat the crowd.", "Vehicles aren't allowed near the Taj Mahal; use electric rickshaws."]
    }
  },
  {
    id: 107,
    slug: "delhi",
    title: { rendered: "Delhi (NCR)" },
    excerpt: { rendered: "India's capital city, balancing ancient history in Old Delhi with modern metropolitan life." },
    content: { rendered: "<p>Delhi, India's capital territory, is a massive metropolitan area in the country's north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200"
      ],
      popular_attractions: ["Qutub Minar", "Red Fort", "India Gate", "Humayun's Tomb"],
      best_time_to_visit: "October to March",
      travel_tips: ["Use the Delhi Metro for fast transit.", "Enjoy street food in Chandni Chowk with a guided tour."]
    }
  },
  {
    id: 108,
    slug: "varanasi",
    title: { rendered: "Varanasi, Uttar Pradesh" },
    excerpt: { rendered: "The spiritual heart of India, one of the oldest continuously inhabited cities in the world." },
    content: { rendered: "<p>Varanasi is a city on the Ganges river in northern India that has a central place in pilgrimage, mysticism and poetry. It is regarded as the spiritual capital of India.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200",
    meta: {
      gallery: [
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200"
      ],
      popular_attractions: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Assi Ghat", "Sarnath"],
      best_time_to_visit: "October to March",
      travel_tips: ["Experience the spectacular Ganga Aarti at sunset.", "Take a morning boat ride along the ghats for sunrise views."]
    }
  },
  {
    id: 109,
    slug: "ranakpur",
    title: { rendered: "Ranakpur, Rajasthan" },
    excerpt: { rendered: "A tranquil valley home to the spectacular 15th-century Ranakpur Jain Temple, renowned for its intricate marble carvings." },
    content: { rendered: "<p>Ranakpur is a village near Sadri town in the Pali district of Rajasthan in western India. It is located between Jodhpur and Udaipur in a valley on the western side of the Aravalli Range. Ranakpur is widely known for its marble Jain temple, dedicated to Adinatha, which is considered one of the most spectacular Jain temples in the world.</p><p>With over 1,440 exquisitely carved pillars—each unique in design—and stunning domes, the temple stands as a supreme monument of devotion and craftsmanship.</p>" },
    featured_media_url: "/ranakpur.jpg",
    meta: {
      gallery: [
        "/ranakpur.jpg"
      ],
      popular_attractions: ["Chaumukha Mandir (Jain Temple)", "Sadri Town", "Muchhal Mahavir Temple", "Ranakpur Dam"],
      best_time_to_visit: "October to March",
      travel_tips: [
        "Dress modestly (knees and shoulders covered). Leather products like belts, wallets, and bags are prohibited inside.",
        "Visit during mid-day when the sun is overhead to see the marble pillars change color."
      ]
    }
  }
];

const MOCK_PACKAGES: TravelPackage[] = [
  {
    id: 201,
    slug: "rajasthan-royal-heritage-tour",
    title: { rendered: "Royal Rajasthan Heritage Tour" },
    excerpt: { rendered: "A classic luxury journey covering the grand palaces of Jaipur, Blue City Jodhpur, and City of Lakes Udaipur." },
    content: { rendered: "<p>Live like royalty on this handcrafted luxury tour across Rajasthan's most iconic cities. Stay in authentic palace hotels, enjoy private guided fort tours, and feast on traditional Rajasthani cuisine.</p>" },
    featured_media_url: "/jaipur.avif",
    categories_names: ["Rajasthan", "Royal Heritage"],
    meta: {
      duration: "8 Days / 7 Nights",
      price: 2499,
      discount_price: 2199,
      destination_id: 101,
      highlights: [
        "Private VIP tour of Amber Fort in Jaipur",
        "Stay at a premium heritage Haveli in Udaipur",
        "Sunset boat cruise on Lake Pichola in Udaipur",
        "Private heritage walk and dining experience in Jodhpur",
        "Chauffeur-driven luxury vehicle throughout the tour"
      ],
      overview: "Travel through the royal heart of Rajasthan in absolute comfort. From the bustling pink bazaars of Jaipur to the majestic Mehrangarh Fort in Jodhpur and the romantic lake views of Udaipur, you will experience the rich history and hospitality of the Land of Kings.",
      day_wise_itinerary: [
        { day: 1, title: "Arrival in Jaipur (The Pink City)", description: "Arrive in Jaipur. Check into your luxury hotel. Enjoy a traditional Rajasthani welcome dinner." },
        { day: 2, title: "Exploring Jaipur's Royal Forts", description: "Visit Amber Fort, Hawa Mahal, and the City Palace. Explore local markets for block prints and jewelry." },
        { day: 3, title: "Drive to Jodhpur (The Blue City)", description: "Travel to Jodhpur. Check in and relax. In the evening, visit Jaswant Thada monument." },
        { day: 4, title: "Mehrangarh Fort Conquest", description: "Explore the massive Mehrangarh Fort. Take a private walking tour of Jodhpur's blue streets." },
        { day: 5, title: "Journey to Udaipur", description: "Drive to Udaipur, visiting the historic Ranakpur Jain Temple en route. Check into your lakeside resort." },
        { day: 6, title: "Udaipur Palaces & Lake Pichola", description: "Visit Udaipur City Palace and Saheliyon-ki-Bari. Take a private sunset boat ride on Lake Pichola." },
        { day: 7, title: "Cultural Mewar Experience", description: "Wander through local crafts bazaars. Attend a traditional puppet and folk dance show at Bagore ki Haveli." },
        { day: 8, title: "Departure from Udaipur", description: "Enjoy a final royal breakfast, then transfer to Udaipur Airport for your onward journey." }
      ],
      included_services: [
        "5-star heritage hotel accommodations",
        "All breakfast meals and specialty welcome dinner",
        "Private air-conditioned SUV with professional English-speaking driver",
        "Local expert guides in each city",
        "Boat cruise fees on Lake Pichola"
      ],
      excluded_services: [
        "Domestic and international flights",
        "Camera and monument entrance fees",
        "Personal laundry and tips",
        "Meals not specified in itinerary"
      ],
      hotel_information: "Taj Rambagh Palace / ITC Rajputana (Jaipur), Ajit Bhawan Heritage Hotel (Jodhpur), Taj Lake Palace / Trident Udaipur (Udaipur).",
      transportation_information: "Private luxury SUV (Toyota Innova Crysta) with dedicated chauffeur.",
      faq: [
        { question: "Is this package customizable?", answer: "Yes, we can add cities like Bikaner or Jaisalmer to make a longer itinerary." },
        { question: "What should I wear on temple tours?", answer: "Modest clothing covering shoulders and knees is recommended. Shoes must be removed before entering." }
      ],
      map_location: "Rajasthan, India",
      booking_cta: "Book Royal Tour",
      gallery_images: [
        "/jaipur.avif",
        "/udaipur.avif",
        "/jodhpur.avif"
      ],
      seo_title: "Royal Rajasthan Heritage Tour Package - 8 Days Custom Itinerary",
      seo_description: "Explore Rajasthan's royal heritage. Book our 8-day luxury tour covering Jaipur, Jodhpur, and Udaipur with heritage hotels and private guides."
    }
  },
  {
    id: 202,
    slug: "golden-triangle-and-spiritual-india",
    title: { rendered: "Golden Triangle & Spiritual Varanasi" },
    excerpt: { rendered: "The ultimate cultural experience covering Delhi, the Taj Mahal in Agra, Pink City Jaipur, and spiritual Varanasi." },
    content: { rendered: "<p>Discover the landmarks that define India's history. Experience the Mughal grandeur of Delhi and Agra, the royal palaces of Jaipur, and the ancient, spiritual riverfront ghats of Varanasi.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200",
    categories_names: ["India", "Spiritual", "Golden Triangle"],
    meta: {
      duration: "10 Days / 9 Nights",
      price: 2999,
      discount_price: 2799,
      destination_id: 106,
      highlights: [
        "Sunrise tour of the Taj Mahal in Agra",
        "Explore Delhi's Red Fort and Qutub Minar Complex",
        "Elephant/Jeep ride at Amber Fort, Jaipur",
        "Experiencing Ganga Aarti and morning boat ride in Varanasi",
        "Domestic flights between Delhi/Jaipur and Varanasi included"
      ],
      overview: "A journey through the soul of India. Start in the historic capital of Delhi, marvel at the Taj Mahal, explore Jaipur's grand architecture, and fly to Varanasi to witness Hindu ceremonies on the banks of the Ganges.",
      day_wise_itinerary: [
        { day: 1, title: "Arrival in Delhi", description: "Land in Delhi. Meet our representative and transfer to your luxury hotel." },
        { day: 2, title: "Old & New Delhi Tour", description: "Explore the Red Fort, Jama Masjid, Qutub Minar, and drive past the India Gate and Parliament House." },
        { day: 3, title: "Drive to Agra", description: "Travel to Agra. In the afternoon, explore the grand Agra Fort and visit Mehtab Bagh for Taj sunset views." },
        { day: 4, title: "Taj Mahal Sunrise & Drive to Jaipur", description: "Witness the Taj Mahal at sunrise. Afterwards, drive to Jaipur, visiting Fatehpur Sikri on the way." },
        { day: 5, title: "Royal Jaipur Highlights", description: "Visit Amber Fort, Jal Mahal, Hawa Mahal, and the Jantar Mantar observatory." },
        { day: 6, title: "Fly to Varanasi", description: "Check out and fly to Varanasi. Check in. In the evening, witness the mystical Ganga Aarti at Dashashwamedh Ghat." },
        { day: 7, title: "Varanasi Ghat Boat Ride & Sarnath", description: "Take a sunrise boat ride on the Ganges. Visit Sarnath, where Lord Buddha gave his first sermon." },
        { day: 8, title: "Spiritual Varanasi Exploration", description: "Explore historic Varanasi temples, markets, and silk-weaving heritage." },
        { day: 9, title: "Fly back to Delhi", description: "Fly from Varanasi back to Delhi. Spend the evening shopping or relaxing." },
        { day: 10, title: "Departure", description: "Transfer to Delhi International Airport for your return flight." }
      ],
      included_services: [
        "All luxury hotel stays on twin-sharing basis",
        "Daily buffet breakfasts",
        "Domestic flight tickets (Delhi/Jaipur - Varanasi - Delhi)",
        "All city transfers and tours in private air-conditioned sedan",
        "English speaking local guides and boat ride fees"
      ],
      excluded_services: [
        "International flight tickets",
        "Visa fees",
        "Any monument entrance tickets",
        "Gratuities for drivers and guides"
      ],
      hotel_information: "The Leela Palace Delhi, The Oberoi Amarvilas (Agra), Taj Jai Mahal Palace (Jaipur), Taj Nadesar Palace (Varanasi).",
      transportation_information: "Private air-conditioned sedan for ground travel. Domestic economy flights for long distances.",
      faq: [
        { question: "Is Varanasi suitable for first-time visitors?", answer: "Yes, Varanasi is highly spiritual and busy. Having our private guide with you ensures a comfortable and informative experience." },
        { question: "Is the Taj Mahal closed on any day?", answer: "Yes, the Taj Mahal is closed to tourists every Friday." }
      ],
      map_location: "Delhi, Agra, Jaipur, Varanasi",
      booking_cta: "Enquire India Tour",
      gallery_images: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200",
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200",
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200"
      ],
      seo_title: "Golden Triangle & Varanasi Tour Package - 10 Days India Itinerary",
      seo_description: "Explore Delhi, Agra, Jaipur, and Varanasi in 10 days. Book this luxury Golden Triangle and Spiritual Varanasi package with private transfers and domestic flights."
    }
  },
  {
    id: 203,
    slug: "thar-desert-explorer",
    title: { rendered: "Thar Desert & Jaisalmer Explorer" },
    excerpt: { rendered: "An adventure into Jaisalmer's golden desert, Jodhpur's blue fortresses, and Bikaner's camel tracks." },
    content: { rendered: "<p>Journey into the heart of the Thar Desert. Explore the legendary sandstone castles, enjoy a luxury camping experience under the desert stars, and visit Bikaner's historical palaces.</p>" },
    featured_media_url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1200",
    categories_names: ["Desert Safari", "Adventure", "Rajasthan"],
    meta: {
      duration: "6 Days / 5 Nights",
      price: 1800,
      discount_price: 1599,
      destination_id: 104,
      highlights: [
        "Overnight stay in a luxury Swiss tent at Sam Sand Dunes",
        "Camel safari and jeep dune bashing in Jaisalmer",
        "Private guided tour of the living Jaisalmer Fort",
        "Explore the Camel Breeding Farm in Bikaner",
        "Sunset dining on the dunes with folk music and dance"
      ],
      overview: "Experience the magic of the Thar Desert. This package combines the royal heritage of Jodhpur, the golden sand dunes of Jaisalmer, and the camel country of Bikaner for an unforgettable desert adventure.",
      day_wise_itinerary: [
        { day: 1, title: "Jodhpur to Jaisalmer Drive", description: "Arrive in Jodhpur and drive straight to Jaisalmer (The Golden City). Check into your boutique hotel." },
        { day: 2, title: "Golden Fort & Havelis", description: "Explore Jaisalmer Fort (Sone Kila), Patwon ki Haveli, and Gadisar Lake. Take in the beautiful yellow sandstone carvings." },
        { day: 3, title: "Sam Dunes Desert Camping", description: "Transfer to a luxury desert camp in Sam Sand Dunes. Go on a camel ride, watch folk dances, and sleep in air-conditioned tents." },
        { day: 4, title: "Travel to Bikaner", description: "Drive from Jaisalmer to Bikaner. Check into your hotel. In the afternoon, visit the Camel Research Farm." },
        { day: 5, title: "Junagarh Fort & Karni Mata Temple", description: "Explore the imposing Junagarh Fort. Optionally visit the unique Deshnok Karni Mata Temple." },
        { day: 6, title: "Return to Jodhpur & Departure", description: "Drive back to Jodhpur. Visit Mehrangarh Fort before transferring to the airport/station for departure." }
      ],
      included_services: [
        "Heritage hotel stays and 1 night in luxury desert camp",
        "All breakfasts, lunches, and traditional desert camp dinners",
        "Camel ride and desert safari fees",
        "Dedicated private SUV with driver for the loop",
        "Local guides in Jaisalmer and Bikaner"
      ],
      excluded_services: [
        "Flights or rail tickets to Jodhpur",
        "Personal expenses, laundry, and drinks",
        "Tips for guides and camel handlers"
      ],
      hotel_information: "Suryagarh Jaisalmer (Luxury Heritage), Serai Desert Camp (Sam), Narendra Bhawan Bikaner.",
      transportation_information: "Dedicated private SUV (Toyota Innova) for desert terrain.",
      faq: [
        { question: "What is the best time for a desert safari?", answer: "Winter months (October to March) are ideal as summers get extremely hot in the Thar Desert." },
        { question: "Are the desert tents comfortable?", answer: "Yes, our luxury partner camps feature private en-suite bathrooms, comfortable beds, and full air conditioning." }
      ],
      map_location: "Jaisalmer, Bikaner, Jodhpur",
      booking_cta: "Book Desert Adventure",
      gallery_images: [
        "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1200",
        "/bikaner.jpg"
      ],
      seo_title: "Thar Desert Jaisalmer & Bikaner Safari Tour - 6 Days",
      seo_description: "Explore Rajasthan's Thar Desert. Book our 6-day package featuring luxury camping, camel safaris, and historic forts in Jaisalmer, Jodhpur, and Bikaner."
    }
  }
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 301,
    title: { rendered: "Rajesh & Meera Sharma" },
    content: { rendered: "<p>Our custom family trip to Udaipur and Jaisalmer with Marudhar Tours India was absolutely outstanding. The heritage stays, camel safaris, and seamless luxury transport made it unforgettable. Their local guide in Udaipur had incredible stories!</p>" },
    meta: {
      rating: 5,
      location: "Mumbai, India",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    }
  },
  {
    id: 302,
    title: { rendered: "Thomas K. Vance" },
    content: { rendered: "<p>Varanasi and Agra were mind-blowing. Seeing the Taj Mahal at sunrise is a memory my wife and I will cherish forever. MTI organized everything flawlessly, including our flights and guide details.</p>" },
    meta: {
      rating: 5,
      location: "San Francisco, USA",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
    }
  },
  {
    id: 303,
    title: { rendered: "Sanjay Singhania" },
    content: { rendered: "<p>We requested a custom itinerary to cover both Rajasthan and a quick escape to Kerala. The team at Marudhar Tours India handled the out-of-state coordination beautifully. Truly a bespoke service!</p>" },
    meta: {
      rating: 5,
      location: "Delhi, India",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"
    }
  }
];

const MOCK_FAQS: FAQ[] = [
  {
    id: 401,
    title: { rendered: "Do you only operate in Rajasthan, or other states too?" },
    meta: {
      answer: "Our core specialization is Rajasthan, though we also arrange Golden Triangle extensions (Delhi–Agra) on request.",
      category: "Destinations"
    }
  },
  {
    id: 402,
    title: { rendered: "Can I customize a package instead of booking a fixed itinerary?" },
    meta: {
      answer: "Yes — every package shown on our site is a starting template. We adjust duration, hotels, and stops to match your needs.",
      category: "Customization"
    }
  },
  {
    id: 403,
    title: { rendered: "What's the best time of year to visit Rajasthan?" },
    meta: {
      answer: "October to March offers the most comfortable weather for sightseeing and desert activities; summers (April–June) are best avoided for daytime touring.",
      category: "Destinations"
    }
  },
  {
    id: 404,
    title: { rendered: "Do your packages include hotel stays?" },
    meta: {
      answer: "Most packages include accommodation; you can also book hotels separately through our Hotel Booking service if you only need lodging.",
      category: "Booking & Pricing"
    }
  },
  {
    id: 405,
    title: { rendered: "Is airport or railway station pickup included?" },
    meta: {
      answer: "Yes, pickup and drop are included in most multi-day packages — confirm specifics for your itinerary at enquiry.",
      category: "Booking & Pricing"
    }
  },
  {
    id: 406,
    title: { rendered: "Can you arrange a private cab without a full tour package?" },
    meta: {
      answer: "Yes, our Cab Rental service is available standalone for point-to-point travel or full-day hire.",
      category: "Transport"
    }
  },
  {
    id: 407,
    title: { rendered: "Do your packages include all meals?" },
    meta: {
      answer: "Meal inclusions vary by package — most include breakfast, with options to add full-board plans.",
      category: "Booking & Pricing"
    }
  },
  {
    id: 408,
    title: { rendered: "Do you offer family-friendly itineraries?" },
    meta: {
      answer: "Yes — our Family Tours are designed with shorter drive times, kid-friendly stops, and flexible pacing.",
      category: "Packages"
    }
  },
  {
    id: 409,
    title: { rendered: "What's included in a desert safari package?" },
    meta: {
      answer: "Typically jeep or camel safari, cultural performances, and either a sunset experience or an overnight desert camp stay, depending on the package chosen.",
      category: "Packages"
    }
  },
  {
    id: 410,
    title: { rendered: "Do you arrange honeymoon packages with private experiences?" },
    meta: {
      answer: "Yes, our Honeymoon Tours include options like private candlelight dinners, palace-view stays, and couple-focused itineraries.",
      category: "Packages"
    }
  },
  {
    id: 411,
    title: { rendered: "How far in advance should I book?" },
    meta: {
      answer: "We recommend at least 3–4 weeks ahead in peak season (Oct–Mar) and festival periods, though we do accommodate shorter-notice requests when possible.",
      category: "Booking & Pricing"
    }
  },
  {
    id: 412,
    title: { rendered: "What documents do I need for booking?" },
    meta: {
      answer: "A valid government ID (Aadhaar/Passport) for hotel check-ins is generally required; foreign nationals should carry passport and visa documents.",
      category: "Safety & Booking"
    }
  },
  {
    id: 413,
    title: { rendered: "Do you provide English-speaking guides?" },
    meta: {
      answer: "Yes, English-speaking guides are available; other language options can be arranged on request, subject to availability.",
      category: "Customization"
    }
  },
  {
    id: 414,
    title: { rendered: "Is travel insurance included?" },
    meta: {
      answer: "Travel insurance is not included by default but can be added to your package on request.",
      category: "Safety"
    }
  },
  {
    id: 415,
    title: { rendered: "What's your cancellation policy?" },
    meta: {
      answer: "Cancellation terms vary by how far in advance you cancel — full details are on our Cancellation Policy page.",
      category: "Cancellation"
    }
  },
  {
    id: 416,
    title: { rendered: "Can you accommodate dietary restrictions?" },
    meta: {
      answer: "Yes, vegetarian, Jain, vegan, and other dietary needs can be communicated in advance and accommodated at most properties.",
      category: "Customization"
    }
  },
  {
    id: 417,
    title: { rendered: "Do you organize corporate or group trips?" },
    meta: {
      answer: "Yes, we handle corporate offsites, incentive travel, and large group tours with dedicated coordination.",
      category: "Packages"
    }
  },
  {
    id: 418,
    title: { rendered: "What's the difference between budget, standard, and luxury packages?" },
    meta: {
      answer: "They differ mainly in hotel category, vehicle type, and included experiences — our team can map this clearly to your budget during enquiry.",
      category: "Booking & Pricing"
    }
  },
  {
    id: 419,
    title: { rendered: "Can I make payment in installments?" },
    meta: {
      answer: "Yes, typically a booking advance followed by balance payment before travel — exact terms shared at booking.",
      category: "Payment"
    }
  },
  {
    id: 420,
    title: { rendered: "How do I get a custom quote?" },
    meta: {
      answer: "Use the 'Enquire Now' button anywhere on the site, or contact us directly via call or WhatsApp — we'll respond with a tailored itinerary and quote.",
      category: "Booking & Pricing"
    }
  }
];

const MOCK_BLOGS: Blog[] = [
  {
    id: 501,
    slug: "local-guide-to-jaisalmer-thar-desert",
    title: { rendered: "A Local's Guide to Exploring Jaisalmer & The Thar Desert" },
    excerpt: { rendered: "Discover the best sandstone forts, luxury camps, and desert sunset spots in Jaisalmer away from the tourist crowd." },
    content: { rendered: "<p>Jaisalmer, the Golden City, rises like a sandcastle from the Thar Desert. Here is how you can make the most of your trip, from camel safaris to cultural folk music...</p><h5>1. The Living Golden Fort</h5><p>Unlike most forts, Jaisalmer Fort is a living city with houses, shops, and temples inside. Take a guided walking tour at sunrise for the best light.</p><h5>2. Luxury Camping under the Stars</h5><p>Stay at Sam Sand Dunes in a luxury Swiss tent. Enjoy traditional Rajasthani Kalbeliya dance and fireside dinners under a clear desert sky.</p>" },
    date: "2026-05-12T08:00:00",
    featured_media_url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1200",
    categories_names: ["Guides", "Rajasthan"],
    tags_names: ["Desert Safari", "Jaisalmer", "Travel Tips"],
    meta: {
      seo_title: "Jaisalmer & Thar Desert Luxury Travel Guide",
      seo_description: "Explore the ultimate local guide to Jaisalmer. Learn about desert camping, fort walks, and experiencing Rajasthan's heritage."
    }
  },
  {
    id: 502,
    slug: "experience-the-spiritual-ganga-aarti-varanasi",
    title: { rendered: "How to Experience the Ganga Aarti in Varanasi" },
    excerpt: { rendered: "Our comprehensive guide covers the best ghat positions, timing, and boat hires to watch Varanasi's evening fire ceremonies." },
    content: { rendered: "<p>The Ganga Aarti at Dashashwamedh Ghat is one of India's most powerful spiritual ceremonies. Here is how to plan your evening...</p><h5>Hire a Private Boat</h5><p>To view the ceremony from the river, hire a private wooden boat 45 minutes before sunset. This gives you the best seat for the synchronized fire rituals.</p>" },
    date: "2026-06-02T10:30:00",
    featured_media_url: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200",
    categories_names: ["Guides", "Spiritual"],
    tags_names: ["Varanasi", "Ganga Aarti", "North India"],
    meta: {
      seo_title: "Varanasi Ganga Aarti Experience Guide",
      seo_description: "The complete guide to experiencing the Ganga Aarti ceremony in Varanasi, including boat hire tips and timings."
    }
  }
];

// WordPress API Fetch Layer with Robust Fallbacks
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL || "";
const GOOGLE_SHEET_API = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API || "";

interface SheetsData {
  packages: TravelPackage[];
  destinations: Destination[];
  blogs: Blog[];
  testimonials: Testimonial[];
  faqs: FAQ[];
}

let cachedSheetsData: SheetsData | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 10000; // 10 seconds

async function getSheetsData(): Promise<SheetsData> {
  console.log("getSheetsData called. API URL:", GOOGLE_SHEET_API);
  const now = Date.now();
  if (cachedSheetsData && (now - lastFetchTime < CACHE_TTL)) {
    console.log("Returning cachedSheetsData (cache hit)");
    return cachedSheetsData;
  }
  if (!GOOGLE_SHEET_API) {
    throw new Error("Google Sheet API URL is not defined.");
  }
  try {
    const res = await fetch(GOOGLE_SHEET_API, {
      next: { revalidate: 10 } // Cache for 10 seconds
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch from Google Sheets API: ${res.statusText}`);
    }
    const rawData = await res.json();
    console.log("Received rawData keys from sheets:", Object.keys(rawData));
    console.log("Raw packages count:", rawData.packages?.length);
  
  const formattedData: SheetsData = {
    packages: (rawData.packages || []).map((p: any) => ({
      id: Number(p.id),
      slug: p.slug,
      title: { rendered: p.title || "" },
      content: { rendered: p.content || "" },
      excerpt: { rendered: p.excerpt || "" },
      featured_media_url: p.featured_media_url || "",
      categories_names: Array.isArray(p.categories_names) ? p.categories_names : [],
      meta: {
        duration: p.duration || "",
        price: Number(p.price || 0),
        discount_price: p.discount_price ? Number(p.discount_price) : undefined,
        highlights: Array.isArray(p.highlights) ? p.highlights : [],
        overview: p.overview || "",
        day_wise_itinerary: Array.isArray(p.day_wise_itinerary) ? p.day_wise_itinerary : [],
        included_services: Array.isArray(p.included_services) ? p.included_services : [],
        excluded_services: Array.isArray(p.excluded_services) ? p.excluded_services : [],
        hotel_information: p.hotel_information || "",
        transportation_information: p.transportation_information || "",
        faq: Array.isArray(p.faq) ? p.faq : [],
        map_location: p.map_location || "",
        booking_cta: p.booking_cta || "",
        gallery_images: Array.isArray(p.gallery_images) ? p.gallery_images : [],
        destination_id: p.destination_id ? Number(p.destination_id) : undefined,
        seo_title: p.seo_title || "",
        seo_description: p.seo_description || ""
      }
    })),
    destinations: (rawData.destinations || []).map((d: any) => ({
      id: Number(d.id),
      slug: d.slug,
      title: { rendered: d.title || "" },
      content: { rendered: d.content || "" },
      excerpt: { rendered: d.excerpt || "" },
      featured_media_url: d.featured_media_url || "",
      meta: {
        gallery: Array.isArray(d.gallery) ? d.gallery : [],
        popular_attractions: Array.isArray(d.popular_attractions) ? d.popular_attractions : [],
        best_time_to_visit: d.best_time_to_visit || "",
        travel_tips: Array.isArray(d.travel_tips) ? d.travel_tips : []
      }
    })),
    blogs: (rawData.blogs || []).map((b: any) => ({
      id: Number(b.id),
      slug: b.slug,
      title: { rendered: b.title || "" },
      content: { rendered: b.content || "" },
      excerpt: { rendered: b.excerpt || "" },
      date: b.date || "",
      featured_media_url: b.featured_media_url || "",
      categories_names: Array.isArray(b.categories_names) ? b.categories_names : [],
      tags_names: Array.isArray(b.tags_names) ? b.tags_names : [],
      meta: {
        seo_title: b.seo_title || "",
        seo_description: b.seo_description || ""
      }
    })),
    testimonials: (rawData.testimonials || []).map((t: any) => ({
      id: Number(t.id),
      title: { rendered: t.title || "" },
      content: { rendered: t.content || "" },
      meta: {
        rating: Number(t.rating || 5),
        location: t.location || "",
        photo: t.photo || ""
      }
    })),
    faqs: (rawData.faqs || []).map((f: any) => ({
      id: Number(f.id),
      title: { rendered: f.title || "" },
      meta: {
        answer: f.answer || "",
        category: f.category || ""
      }
    }))
  };
  
  cachedSheetsData = formattedData;
  lastFetchTime = now;
  return formattedData;
  } catch (error: any) {
    console.error("Error in getSheetsData:", error);
    throw error;
  }
}

async function fetchFromWP<T>(endpoint: string, tags?: string[]): Promise<T> {
  if (!WP_API_URL) {
    throw new Error("WordPress API URL is not defined.");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${WP_API_URL}/wp-json/wp/v2/${endpoint}${separator}_embed=true`;

  const res = await fetch(url, {
    next: {
      revalidate: 0,
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
    let destinations: Destination[] = [];
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      destinations = data.destinations || [];
    } else if (WP_API_URL) {
      const data = await fetchFromWP<any[]>("destination", ["destinations"]);
      destinations = data.map(item => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        content: item.content,
        excerpt: item.excerpt,
        featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || item.featured_media_url,
        meta: item.meta || { gallery: [], popular_attractions: [], best_time_to_visit: "", travel_tips: [] }
      }));
    }

    if (destinations.length === 0) {
      return MOCK_DESTINATIONS;
    }
    const combined = [...destinations];
    for (const mock of MOCK_DESTINATIONS) {
      if (!combined.some(d => d.slug === mock.slug)) {
        combined.push(mock);
      }
    }
    return combined;
  } catch (error) {
    console.warn("getDestinations: Failed fetching from API. Falling back to mock data.", error);
    return MOCK_DESTINATIONS;
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      const found = data.destinations.find(d => d.slug === slug);
      if (found) return found;
    }
    if (WP_API_URL) {
      const data = await fetchFromWP<any[]>(`destination?slug=${slug}`, [`destination-${slug}`]);
      if (data.length) {
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
      }
    }
    return MOCK_DESTINATIONS.find(d => d.slug === slug) || null;
  } catch (error) {
    console.warn(`getDestinationBySlug(${slug}): Falling back to mock data.`, error);
    return MOCK_DESTINATIONS.find(d => d.slug === slug) || null;
  }
}

export async function getTravelPackages(): Promise<TravelPackage[]> {
  try {
    let packages: TravelPackage[] = [];
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      packages = data.packages || [];
    } else if (WP_API_URL) {
      const data = await fetchFromWP<any[]>("travel-package", ["packages"]);
      packages = data.map(item => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        content: item.content,
        excerpt: item.excerpt,
        featured_media_url: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || item.featured_media_url,
        categories_names: item._embedded?.["wp:term"]?.[0]?.map((t: any) => t.name) || [],
        meta: item.meta
      }));
    }

    if (packages.length === 0) {
      return MOCK_PACKAGES;
    }
    const combined = [...packages];
    for (const mock of MOCK_PACKAGES) {
      if (!combined.some(p => p.slug === mock.slug)) {
        combined.push(mock);
      }
    }
    return combined;
  } catch (error) {
    console.warn("getTravelPackages: Failed fetching from API. Falling back to mock data.", error);
    return MOCK_PACKAGES;
  }
}

export async function getTravelPackageBySlug(slug: string): Promise<TravelPackage | null> {
  try {
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      const found = data.packages.find(p => p.slug === slug);
      if (found) return found;
    }
    if (WP_API_URL) {
      const data = await fetchFromWP<any[]>(`travel-package?slug=${slug}`, [`package-${slug}`]);
      if (data.length) {
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
      }
    }
    return MOCK_PACKAGES.find(p => p.slug === slug) || null;
  } catch (error) {
    console.warn(`getTravelPackageBySlug(${slug}): Falling back to mock data.`, error);
    return MOCK_PACKAGES.find(p => p.slug === slug) || null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    let testimonials: Testimonial[] = [];
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      testimonials = data.testimonials || [];
    } else if (WP_API_URL) {
      const data = await fetchFromWP<any[]>("testimonial", ["testimonials"]);
      testimonials = data.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        meta: item.meta
      }));
    }

    if (testimonials.length === 0) {
      return MOCK_TESTIMONIALS;
    }
    const combined = [...testimonials];
    for (const mock of MOCK_TESTIMONIALS) {
      if (!combined.some(t => t.id === mock.id)) {
        combined.push(mock);
      }
    }
    return combined;
  } catch (error) {
    console.warn("getTestimonials: Falling back to mock data.", error);
    return MOCK_TESTIMONIALS;
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  try {
    let faqs: FAQ[] = [];
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      faqs = data.faqs || [];
    } else if (WP_API_URL) {
      const data = await fetchFromWP<any[]>("faq", ["faqs"]);
      faqs = data.map(item => ({
        id: item.id,
        title: item.title,
        meta: item.meta
      }));
    }

    if (faqs.length === 0) {
      return MOCK_FAQS;
    }
    const combined = [...faqs];
    for (const mock of MOCK_FAQS) {
      if (!combined.some(f => f.id === mock.id)) {
        combined.push(mock);
      }
    }
    return combined;
  } catch (error) {
    console.warn("getFAQs: Falling back to mock data.", error);
    return MOCK_FAQS;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    let blogs: Blog[] = [];
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      blogs = data.blogs || [];
    } else if (WP_API_URL) {
      const data = await fetchFromWP<any[]>("posts", ["blogs"]);
      blogs = data.map(item => ({
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
    }

    if (blogs.length === 0) {
      return MOCK_BLOGS;
    }
    const combined = [...blogs];
    for (const mock of MOCK_BLOGS) {
      if (!combined.some(b => b.slug === mock.slug)) {
        combined.push(mock);
      }
    }
    return combined;
  } catch (error) {
    console.warn("getBlogs: Falling back to mock data.", error);
    return MOCK_BLOGS;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    if (GOOGLE_SHEET_API) {
      const data = await getSheetsData();
      const found = data.blogs.find(b => b.slug === slug);
      if (found) return found;
    }
    if (WP_API_URL) {
      const data = await fetchFromWP<any[]>(`posts?slug=${slug}`, [`blog-${slug}`]);
      if (data.length) {
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
      }
    }
    return MOCK_BLOGS.find(b => b.slug === slug) || null;
  } catch (error) {
    console.warn(`getBlogBySlug(${slug}): Falling back to mock data.`, error);
    return MOCK_BLOGS.find(b => b.slug === slug) || null;
  }
}


