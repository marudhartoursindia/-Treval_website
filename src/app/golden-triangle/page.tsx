import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Hotel, ShieldCheck, ShieldX, Car, Award, Sparkles, Map } from "lucide-react";
import { InquiryForm } from "@/components/package/InquiryForm";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Golden Triangle Luxury Tour - 9 Days Itinerary",
  description: "Embark on a luxury custom tour covering Delhi, Agra, Jaipur, and the UNESCO heritage temples of Khajuraho with private transfers and native guides.",
  alternates: {
    canonical: "/golden-triangle",
  },
};

export default function GoldenTrianglePage() {
  const itineraryItems = [
    {
      title: "Day 1: Arrival in Delhi - Welcome to India",
      content: (
        <p>Land at Indira Gandhi International Airport. Meet our representative for a VIP transfer to your luxury hotel. Spend the evening relaxing or enjoying a premium dining experience at the hotel.</p>
      )
    },
    {
      title: "Day 2: Old & New Delhi Heritage Exploration",
      content: (
        <p>Explore the dual histories of Delhi. Visit the imposing Red Fort and Jama Masjid in Old Delhi, followed by a rickshaw ride through Chandni Chowk. In the afternoon, explore New Delhi's Humayun's Tomb, Qutub Minar, and drive past India Gate and Rashtrapati Bhavan.</p>
      )
    },
    {
      title: "Day 3: Journey to Agra & Taj Mahal Sunset",
      content: (
        <p>Drive to Agra in a private luxury vehicle. Check into your boutique hotel. In the afternoon, explore the massive red sandstone Agra Fort. As the sun sets, witness the spectacular view of the Taj Mahal from Mehtab Bagh.</p>
      )
    },
    {
      title: "Day 4: Sunrise at Taj Mahal & Drive to Jaipur via Fatehpur Sikri",
      content: (
        <p>Witness the eternal monument of love, the Taj Mahal, at sunrise when the marble changes colors with the morning light. After breakfast, drive to Jaipur, visiting the ghost city of Fatehpur Sikri and the historic stepwell Chand Baori en route.</p>
      )
    },
    {
      title: "Day 5: Royal Heritage of the Pink City (Jaipur)",
      content: (
        <p>Enjoy a private guided tour of the Amber Fort with Jeep transfers. In the afternoon, visit the City Palace museum, the ancient observatory Jantar Mantar, and stop for photos at the iconic Hawa Mahal (Palace of Winds).</p>
      )
    },
    {
      title: "Day 6: Train to Jhansi & Drive to Orchha Medieval Town",
      content: (
        <p>Board the air-conditioned Shatabdi Express train to Jhansi. Drive to the medieval town of Orchha. Explore the architectural wonders of Orchha Fort, Jehangir Mahal, and the royal cenotaphs lining the Betwa River.</p>
      )
    },
    {
      title: "Day 7: Drive to Khajuraho - The Temple Artistry",
      content: (
        <p>Drive to the UNESCO World Heritage town of Khajuraho. Check into your luxury resort. In the evening, attend the spectacular Light and Sound Show at the temple complex, narrating the history of the Chandela dynasty.</p>
      )
    },
    {
      title: "Day 8: Ancient Temples of Khajuraho",
      content: (
        <p>Spend the day exploring the Western and Eastern groups of temples. Admire the exquisite sandstone carvings depicting life, divinity, and sensuality, including the famous Kandariya Mahadev and Lakshmana Temples.</p>
      )
    },
    {
      title: "Day 9: Flight to Delhi & International Departure",
      content: (
        <p>Fly from Khajuraho back to Delhi. Access the VIP lounge at Delhi Airport before boarding your international flight back home, carrying memories of an unforgettable voyage.</p>
      )
    }
  ];

  const faqItems = [
    {
      title: "What is the best season for this tour?",
      content: "The best time to travel is between October and March when the weather in North India and Madhya Pradesh is pleasant, perfect for heritage walks and temple tours."
    },
    {
      title: "Is the internal flight from Khajuraho to Delhi included?",
      content: "Yes, our luxury can bundle the domestic flight from Khajuraho back to Delhi inside your customized quote, ensuring seamless check-ins."
    },
    {
      title: "Are there specific dress codes for temple visits?",
      content: "Yes, visitors should dress modestly (knees and shoulders covered) at active temples in Delhi and Orchha. Leather items such as belts, wallets, and bags must be left outside the main Ranakpur or Khajuraho temple sanctuaries."
    }
  ];

  const galleryImages = [
    "/agra.jpg",
    "/delhi.jpg",
    "/jaipur_fort.jpg",
    "/khajuraho.jpg"
  ];

  const highlights = [
    "Private sunrise guided tour of the Taj Mahal in Agra",
    "Comprehensive historical excursions in Old & New Delhi",
    "Royal fort explorations & Jeep transfer in Jaipur",
    "Tour of the spectacular medieval palaces and cenotaphs of Orchha",
    "Detailed guide to the UNESCO World Heritage temples of Khajuraho",
    "Luxury air-conditioned private vehicle and expert drivers throughout",
    "Bespoke domestic travel arrangements (Express Train & Flight)"
  ];

  const inclusions = [
    "Luxury 5-star & heritage hotel accommodation on twin sharing",
    "Daily gourmet buffet breakfasts at all hotels",
    "Dedicated private air-conditioned SUV with professional chauffeur",
    "Expert English-speaking local guides at each city",
    "Air-conditioned Shatabdi Express Train tickets (Delhi - Jhansi)",
    "All applicable monument entrance tickets and camera fees",
    "Private Jeep ride to Amber Fort in Jaipur"
  ];

  const exclusions = [
    "International flight tickets and Indian tourist visa fees",
    "Domestic flight ticket (Khajuraho - Delhi) - can be quoted extra",
    "Lunch and dinner meals (unless specified)",
    "Personal expenses (laundry, telephone, tips, shopping)"
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative min-h-[50vh] md:min-h-[80vh] flex items-center justify-center bg-stone-950 py-20 px-6 -mt-[72px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/85 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/agra.jpg"
            alt="Taj Mahal Agra representing Golden Triangle Tour"
            fill
            className="object-cover object-center opacity-45"
            priority
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6 pt-10">
          <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-accent font-semibold block">
            Signature India Journeys
          </span>
          <h1 className="font-playfair text-3xl md:text-6xl font-bold !text-accent tracking-wide leading-tight">
            Golden Triangle <br className="hidden md:inline" />
            <span className="text-white italic font-normal"></span>
          </h1>
          <p className="text-sm md:text-base text-white/85 max-w-2xl mx-auto font-light leading-relaxed">
            The ultimate blend of India's royal palaces, Mughal grandeur, and the finest ancient temple craftsmanship in Khajuraho. A bespoke 9-day luxury expedition.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Panel: Content details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
                The Heritage Loop
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground border-b border-[var(--border-color)] pb-3">
                Journey Overview
              </h2>
              <p className="text-sm text-foreground/85 leading-relaxed font-light">
                This signature route connects India's famous **Golden Triangle**—the historical power center of **Delhi**, the romantic Mughal capital of **Agra** (home to the Taj Mahal), and the royal pink city of **Jaipur**—with the legendary architectural temples of **Khajuraho**. 
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed font-light">
                Designed specifically for luxury travelers from the USA, UK, Europe, and Japan, this tour promises unmatched heritage access, premium 5-star lodging, dedicated private transport, and local expert who bring centuries of history to life.
              </p>
            </section>

            {/* Key Destinations Section */}
            <section className="space-y-6">
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
                Featured Places
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground border-b border-[var(--border-color)] pb-3">
                Destinations Along the Route
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Delhi */}
                <div className="border border-[var(--border-color)] bg-[var(--card-bg)] group overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/delhi.jpg"
                      alt="Qutub Minar Monument, Delhi"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold border border-accent/20">
                      Day 1 - 2
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-playfair text-lg font-bold text-foreground">Delhi: The Historic Capital</h3>
                    <p className="text-xs text-foreground/75 leading-relaxed font-light">
                      Explore the contrasts of Old Delhi's bustling bazaars and historic Red Fort with the elegant, tree-lined boulevards and monuments of New Delhi.
                    </p>
                  </div>
                </div>

                {/* Agra */}
                <div className="border border-[var(--border-color)] bg-[var(--card-bg)] group overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/agra.jpg"
                      alt="Taj Mahal Monument, Agra"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold border border-accent/20">
                      Day 3 - 4
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-playfair text-lg font-bold text-foreground">Agra: Home of the Taj Mahal</h3>
                    <p className="text-xs text-foreground/75 leading-relaxed font-light">
                      Witness the Taj Mahal at sunrise, explore the grand walls of Agra Fort, and visit the abandoned Mughal imperial capital of Fatehpur Sikri.
                    </p>
                  </div>
                </div>

                {/* Jaipur */}
                <div className="border border-[var(--border-color)] bg-[var(--card-bg)] group overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/jaipur_fort.jpg"
                      alt="Amer Fort Castle, Jaipur"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold border border-accent/20">
                      Day 5
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-playfair text-lg font-bold text-foreground">Jaipur: The Royal Pink City</h3>
                    <p className="text-xs text-foreground/75 leading-relaxed font-light">
                      Take a private Jeep ride to Amber Fort, photograph the lattice windows of Hawa Mahal, and explore the royal courtyards of the City Palace.
                    </p>
                  </div>
                </div>

                {/* Khajuraho */}
                <div className="border border-[var(--border-color)] bg-[var(--card-bg)] group overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/khajuraho.jpg"
                      alt="Khajuraho Ancient Sculpted Temples"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold border border-accent/20">
                      Day 6 - 8
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-playfair text-lg font-bold text-foreground">Khajuraho & Orchha: Ancient Artistry</h3>
                    <p className="text-xs text-foreground/75 leading-relaxed font-light">
                      Discover the medieval fortress towers of Orchha and the UNESCO-listed sandstone temples of Khajuraho, renowned for their ancient sculptures.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold text-foreground border-b border-[var(--border-color)] pb-3">
                Expedition Highlights
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start text-xs text-foreground/90 font-light">
                    <span className="text-accent mr-2 font-bold shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Day Wise Itinerary */}
            <section className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold text-foreground border-b border-[var(--border-color)] pb-3">
                Day-by-Day Itinerary
              </h2>
              <Accordion items={itineraryItems} allowMultiple />
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-[var(--border-color)] py-8">
              <div className="space-y-4">
                <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                  <ShieldCheck size={18} className="text-green-600 mr-2" />
                  What's Included
                </h3>
                <ul className="space-y-2 text-xs text-foreground/80 font-light">
                  {inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-600 mr-2 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                  <ShieldX size={18} className="text-red-500 mr-2" />
                  What's Excluded
                </h3>
                <ul className="space-y-2 text-xs text-foreground/80 font-light">
                  {exclusions.map((exc, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-400 mr-2 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Hotels & Transit */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                  <Hotel size={18} className="text-accent mr-2" />
                  Superb Accommodations
                </h3>
                <p className="text-xs text-foreground/80 leading-relaxed font-light">
                  Stay in top-rated luxury properties such as The Leela Palace Delhi, The Oberoi Amarvilas (Agra), Taj Rambagh Palace (Jaipur), and The Lalit Temple View (Khajuraho).
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-playfair text-lg font-bold flex items-center text-foreground">
                  <Car size={18} className="text-accent mr-2" />
                  Luxury Transit
                </h3>
                <p className="text-xs text-foreground/80 leading-relaxed font-light">
                  Enjoy private, sanitized SUV transfers (Toyota Innova Crysta / luxury sedans) with professional, English-speaking chauffeurs dedicated to your safety and comfort.
                </p>
              </div>
            </section>

            {/* FAQs */}
            <section className="space-y-4">
              <h2 className="font-playfair text-2xl font-bold text-foreground border-b border-[var(--border-color)] pb-3">
                Frequently Asked Questions
              </h2>
              <Accordion items={faqItems} />
            </section>

          </div>

          {/* Right Panel: Sticky Booking / Enquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-6">
              {/* Pricing badge */}
              <div className="bg-primary text-white p-6 border border-white/5 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold block mb-1">
                  Bespoke Journey Pricing
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="font-playfair text-3xl font-bold text-accent">
                    $2,850
                  </span>
                  <span className="text-xs text-white/50 line-through">
                    $3,200
                  </span>
                  <span className="text-xs text-white/70 font-light">USD / person</span>
                </div>
                <p className="text-[10px] text-white/60 font-light mt-2 leading-relaxed">
                  * Custom pricing based on double sharing. Fully customizable itinerary with options to add Varanasi or Udaipur loops.
                </p>
              </div>

              {/* Inquiry Form component */}
              <InquiryForm packageName="Golden Triangle Tour" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
