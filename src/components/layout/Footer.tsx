import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Brand & Intro */}
        <div className="space-y-6">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-accent/20 bg-stone-900 flex-shrink-0">
              <Image
                src="/mti-logo.jpg"
                alt="Marudhar Tours India Logo"
                fill
                className="object-cover scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-base font-bold tracking-widest text-white group-hover:text-accent transition-colors leading-none">
                MARUDHAR
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-accent font-semibold leading-none mt-1">
                Tours India
              </span>
            </div>
          </Link>
          <p className="text-sm text-white/70 leading-relaxed font-light">
            Crafting tailored royal heritage voyages, custom desert safaris, and luxury tours across Rajasthan and extraordinary Indian destinations.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/marudhartoursindia/"


            className="p-2 bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300 rounded-none" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/MarudharToursIndia/" className="p-2 bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300 rounded-none" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3.7l.3-3H12V6.5c0-.8.2-1 1-1h2.7V2H13c-2.9 0-4 1.4-4 3.8V8z" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-accent hover:text-primary transition-all duration-300 rounded-none" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
            Explore
          </h4>
          <ul className="space-y-3 text-sm font-light text-white/70">
            <li>
              <Link href="/destinations" className="hover:text-accent transition-colors">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-accent transition-colors">
                Travel Packages
              </Link>
            </li>
            <li>
              <Link href="/custom-package" className="hover:text-accent transition-colors">
                Custom Itinerary
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent transition-colors">
                Bespoke Journal
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Destination Links */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
            Popular Getaways
          </h4>
          <ul className="space-y-3 text-sm font-light text-white/70">
            <li>
              <Link href="/packages/rajasthan-royal-heritage-tour" className="hover:text-accent transition-colors">
                Royal Rajasthan Heritage Tour
              </Link>
            </li>
            <li>
              <Link href="/packages/thar-desert-explorer" className="hover:text-accent transition-colors">
                Thar Desert Explorer
              </Link>
            </li>
            <li>
              <Link href="/packages/golden-triangle-and-spiritual-india" className="hover:text-accent transition-colors">
                Golden Triangle & Varanasi
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
            Inquiries
          </h4>
          <ul className="space-y-4 text-sm font-light text-white/70">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
              <span>MTI Plaza, Near Hawa Mahal, Jaipur, Rajasthan, India - 302002</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-accent shrink-0" />
              <span>+91 98290 12345</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-accent shrink-0" />
              <a href="mailto:yuvraj.kilawat@gmail.com" className="hover:text-accent transition-colors">
                yuvraj.kilawat@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/45 font-light">
        <p>© {new Date().getFullYear()} Marudhar Tours India. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-accent transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
