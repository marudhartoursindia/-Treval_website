import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Our Luxury Travel Specialists",
  description: "Connect with our luxury travel curators to begin planning your bespoke vacation or private safari.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
          Inquiries
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-wide">
          Connect With A Curator
        </h1>
        <p className="text-sm text-foreground/60 font-light leading-relaxed">
          Ready to map your next itinerary? Provide your travel preferences below, and one of our destination specialists will reach out to schedule a private consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Right Column: Contact info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Quick info list */}
          <div className="bg-stone-50 dark:bg-stone-900/10 border border-[var(--border-color)] p-8 space-y-6">
            <h3 className="font-playfair text-lg font-bold border-b border-[var(--border-color)] pb-3">
              Office Details
            </h3>

            <div className="space-y-4 text-xs font-light text-foreground/85">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>100 Luxury Way, Suite 500, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+1-800-555-0199</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>curator@bespokeluxury.com</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct */}
          <div className="bg-primary text-white p-8 space-y-4 border border-white/5 shadow-md">
            <h3 className="font-playfair text-lg font-bold flex items-center">
              <MessageCircle size={20} className="text-accent mr-2" />
              Instant Chat
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Prefer to connect instantly? Chat directly with one of our online curators via WhatsApp.
            </p>
            <a
              href="https://wa.me/18005550199"
              target="_blank"
              rel="noopener noreferrer"
              className="block pt-2"
            >
              <button className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-3 uppercase tracking-wider text-xs font-bold transition-colors cursor-pointer">
                Message On WhatsApp
              </button>
            </a>
          </div>

          {/* Map Representation */}
          <div className="relative h-60 w-full bg-stone-200 border border-[var(--border-color)] overflow-hidden">
            {/* Standard mock maps placeholder with high premium styling */}
            <div className="absolute inset-0 bg-stone-900 flex flex-col items-center justify-center text-white/80 p-6 text-center space-y-2 select-none">
              <MapPin size={24} className="text-accent animate-bounce" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-accent">
                Interactive Office Map
              </span>
              <p className="text-[9px] text-white/60 font-light max-w-[200px]">
                Beverly Hills HQ, California. Secure parking on level P2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
