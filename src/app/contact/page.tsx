import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock, Globe } from "lucide-react";
// Icons used in office details card
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Our Luxury Travel Specialists",
  description: "Connect with our luxury travel to begin planning your bespoke vacation or private safari.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">

      {/* ── Map (top) ── */}
      <div className="w-full h-72 md:h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d889.2806866249015!2d75.8253116696275!3d26.931322894201944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db14f38d0d77b%3A0x39de143d5c60f180!2sPrity%20Guest%20House!5e0!3m2!1sen!2sin!4v1782444377706!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Marudhar Tours India Office Map"
        />
      </div>

      {/* ── Main Content ── */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: Contact Form */}
          <div className="lg:col-span-2">
            <div className="mb-8 space-y-1">
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
                Send an Inquiry
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold tracking-wide">
                Plan Your Bespoke Journey
              </h2>
            </div>
            <ContactForm />
          </div>

          {/* RIGHT: Info Cards */}
          <div className="space-y-6">

            {/* Office Details Card */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 shadow-sm space-y-5">
              <h3 className="font-playfair text-base font-bold border-b border-[var(--border-color)] pb-3 !text-foreground flex items-center gap-2">
                <Globe size={16} className="text-accent" />
                Office Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-semibold mb-0.5">Address</p>
                    <p className="text-xs text-foreground/80 font-light leading-relaxed">
                      P No2, Kamal Gatta Colony, Talkatora Road,<br />Jaipur, Rajasthan — 302002
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-semibold mb-0.5">Phone</p>
                    <a href="tel:+919509599502" className="text-xs text-foreground/80 font-light hover:text-accent transition-colors">
                      +91 95095 99502
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-semibold mb-0.5">Email</p>
                    <a href="mailto:sonusingh1985@gmail.com" className="text-xs text-foreground/80 font-light hover:text-accent transition-colors">
                      sonusingh1985@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-semibold mb-0.5">Working Hours</p>
                    <p className="text-xs text-foreground/80 font-light">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white p-6 space-y-4 border border-[var(--border-color)] shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full" />
              <h3 className="font-playfair text-base font-bold flex items-center text-foreground gap-2 relative z-10">
                <MessageCircle size={16} className="text-accent" />
                Instant Chat
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed font-light relative z-10">
                Prefer to connect instantly? Chat directly with one of our online via WhatsApp — typically responds within minutes.
              </p>
              <a
                href="https://wa.me/919509599502"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative z-10"
              >
                <button className="w-full bg-accent hover:bg-accent-hover text-white py-3 uppercase tracking-wider text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <MessageCircle size={13} />
                  Message On WhatsApp
                </button>
              </a>
            </div>

          </div>
        </div>
      </section>



    </div>
  );
}
