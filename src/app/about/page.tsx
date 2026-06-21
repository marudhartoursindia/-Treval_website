import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, Eye, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Luxury Travel Agency - Our Story",
  description: "Learn about Bespoke Luxury Travels, our mission, vision, and team of travel specialists.",
  alternates: {
    canonical: "/about",
  },
};

const TEAM_MEMBERS = [
  {
    name: "Genevieve Thorne",
    role: "Founder & Lead Curator",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
    bio: "With over 18 years in luxury hospitality, Genevieve curates bespoke itineraries for VIP explorers."
  },
  {
    name: "Christian Vance",
    role: "Senior Safari Specialist",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
    bio: "A native of East Africa, Christian has charted over 150 wildlife tracks in Serengeti and Ngorongoro."
  },
  {
    name: "Mika Tanaka",
    role: "East Asia Curator",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
    bio: "Mika specializes in Japanese ryokans, temple ceremonies, and off-the-beaten-path cultural tours."
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="bg-stone-50 dark:bg-stone-900/10 border-b border-[var(--border-color)] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
            Our Legacy
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-wide">
            Our Story
          </h1>
          <p className="text-sm text-foreground/60 font-light leading-relaxed max-w-2xl mx-auto">
            Bespoke Travels was founded on a simple conviction: travel should not be a checklist, but a tailored artistic exploration.
          </p>
        </div>
      </section>

      {/* Story Details */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative h-100 w-full bg-stone-100 border border-[var(--border-color)]">
          <Image
            src="/about.jpeg"
            alt="Scenic sailing vessel representing voyage"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
            The Philosophy
          </span>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold">
            Curating the Sublime
          </h2>
          <p className="text-sm text-foreground/85 leading-relaxed font-light">
            We reject pre-packaged tourist routes. Our mission is to understand your unique rhythm—whether that means waking at dawn to explore hidden temples in Kyoto, dining in private concessions in Serengeti, or meditating over coral reefs in Maldives.
          </p>
          <p className="text-sm text-foreground/85 leading-relaxed font-light">
            We maintain direct relationships with lodge owners, master chefs, and resident guides to guarantee top-tier service, exclusivity, and safety throughout your journey.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-stone-50 dark:bg-stone-900/10 py-20 px-6 border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-full text-accent">
              <Compass size={20} />
            </div>
            <h3 className="font-playfair text-lg font-bold text-foreground">Our Mission</h3>
            <p className="text-xs text-foreground/75 leading-relaxed font-light">
              To design high-end, tailored travel experiences that foster deep cultural appreciation and support wildlife conservation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-full text-accent">
              <Eye size={20} />
            </div>
            <h3 className="font-playfair text-lg font-bold text-foreground">Our Vision</h3>
            <p className="text-xs text-foreground/75 leading-relaxed font-light">
              To be the leading global boutique agency for bespoke adventure, renowned for ethical guidelines and premium hospitality.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-full text-accent">
              <Award size={20} />
            </div>
            <h3 className="font-playfair text-lg font-bold text-foreground">Our Promise</h3>
            <p className="text-xs text-foreground/75 leading-relaxed font-light">
              Exquisite lodging, custom transportation, 24/7 VIP assistance, and total transparency in every booking transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
            Specialists
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold tracking-wide">
            Our Travel Specialists
          </h2>
          <p className="text-xs text-foreground/60 font-light">
            Meet the experienced destination curators who design and coordinate our signature itineraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 space-y-4 group"
            >
              <div className="relative aspect-square overflow-hidden bg-stone-100 border border-[var(--border-color)]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-playfair text-lg font-bold text-foreground">{member.name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
                  {member.role}
                </span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed font-light">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
