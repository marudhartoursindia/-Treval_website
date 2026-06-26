"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Compass, Shield, Calendar, Users, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CITIES = [
  { id: "jaipur", name: "Jaipur" },
  { id: "jodhpur", name: "Jodhpur" },
  { id: "udaipur", name: "Udaipur" },
  { id: "jaisalmer", name: "Jaisalmer" },
  { id: "bikaner", name: "Bikaner" },
  { id: "delhi", name: "Delhi (NCR)" },
  { id: "agra", name: "Agra" },
  { id: "khajuraho", name: "Khajuraho" },
  { id: "varanasi", name: "Varanasi" },
  { id: "golden-triangle", name: "Golden Triangle" },
  { id: "other", name: "Outside Rajasthan / Other India Spots" }
];

const THEMES = [
  { id: "heritage", name: "Royal Heritage & Palaces", desc: "Stay in heritage Haveli hotels and palaces" },
  { id: "desert", name: "Thar Desert & Camels", desc: "Desert safaris, camel tracks, and dune camping" },
  { id: "spiritual", name: "Spiritual & Cultural", desc: "Temple tours, ghats, and Ganga Aarti" },
  { id: "adventure", name: "Adventure & Wildlife", desc: "Jeep safaris, wildlife sanctuaries" },
  { id: "custom", name: "Mix of Everything", desc: "Tailored combination of all experiences" }
];

export default function CustomPackagePage() {
  const [selectedCities, setSelectedCities] = React.useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = React.useState<string>("heritage");
  const [duration, setDuration] = React.useState<number>(7);
  const [guests, setGuests] = React.useState<number>(2);
  const [hotelPref, setHotelPref] = React.useState<string>("heritage-luxury");
  
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [travelDate, setTravelDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleCityToggle = (cityId: string) => {
    setSelectedCities(prev =>
      prev.includes(cityId)
        ? prev.filter(c => c !== cityId)
        : [...prev, cityId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !travelDate) {
      setErrorMsg("Please fill in all required fields (Name, Email, Phone, Travel Date).");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);
    
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/placeholder";
      const payload = {
        fullName,
        email,
        phone,
        travelDate,
        duration,
        guests,
        hotelPref,
        selectedTheme,
        selectedCities: selectedCities.map(c => CITIES.find(ci => ci.id === c)?.name || c).join(", "),
        notes,
      };
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errData = await response.json();
        setErrorMsg(errData.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Connection error. Please check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold flex items-center justify-center space-x-2">
            <Sparkles size={12} className="text-accent animate-pulse" />
            <span>Bespoke Travel Planner</span>
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground">
            Design Your Custom Itinerary
          </h1>
          <p className="text-base text-foreground/75 max-w-2xl mx-auto font-light leading-relaxed">
            Tell us about your dream trip. Whether you want a royal Rajasthani getaway, a spiritual Varanasi experience, or a tour extending outside Rajasthan, ours at Marudhar Tours India will build a tailor-made plan for you.
          </p>
        </div>

        {success ? (
          <div className="bg-[var(--card-bg)] border border-accent/30 p-8 md:p-12 text-center space-y-6 shadow-xl max-w-2xl mx-auto">
            <div className="flex justify-center text-accent">
              <CheckCircle2 size={64} className="animate-bounce" />
            </div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
              Your Itinerary Request is Received!
            </h2>
            <p className="text-sm text-foreground/75 leading-relaxed font-light">
              Thank you, <span className="font-bold text-accent">{fullName}</span>. Our tour specialists at <span className="font-bold">Marudhar Tours India</span> are already compiling custom options matching your choices:
            </p>
            <div className="bg-[var(--background)] p-4 text-left rounded border border-[var(--border-color)] text-xs space-y-2 max-w-md mx-auto">
              <p><strong>Selected Destinations:</strong> {selectedCities.length > 0 ? selectedCities.map(c => CITIES.find(ci => ci.id === c)?.name).join(", ") : "All Rajasthan Route"}</p>
              <p><strong>Preferred Theme:</strong> {THEMES.find(t => t.id === selectedTheme)?.name}</p>
              <p><strong>Duration:</strong> {duration} Days</p>
              <p><strong>Travelers:</strong> {guests} guests</p>
              <p><strong>Est. Start Date:</strong> {travelDate}</p>
            </div>
            <p className="text-xs text-foreground/50">
              We will email your detailed day-wise customized plan and quotes within 24 hours.
            </p>
            <Button
              variant="outline"
              className="mt-6 border-accent text-accent hover:bg-accent hover:text-primary"
              onClick={() => {
                setSuccess(false);
                setSelectedCities([]);
                setFullName("");
                setEmail("");
                setPhone("");
                setTravelDate("");
                setNotes("");
              }}
            >
              Plan Another Itinerary
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 md:p-10 shadow-lg space-y-8">
            
            {/* Step 1: Select Cities */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2">
                <MapPin className="text-accent" size={18} />
                <h3 className="font-playfair text-lg font-bold">1. Where would you like to focus?</h3>
              </div>
              <p className="text-xs text-foreground/60">Choose one or more cities you want to include in your package.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {CITIES.map(city => {
                  const isChecked = selectedCities.includes(city.id);
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleCityToggle(city.id)}
                      className={`px-3 py-2.5 text-xs text-left border transition-all duration-300 ${
                        isChecked
                          ? "border-accent bg-accent/5 text-accent font-semibold shadow-sm"
                          : "border-[var(--border-color)] bg-[var(--background)] hover:border-accent/50 text-foreground/80"
                      }`}
                    >
                      {city.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Theme */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2">
                <Compass className="text-accent" size={18} />
                <h3 className="font-playfair text-lg font-bold">2. What style of travel do you prefer?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {THEMES.map(theme => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 text-left border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "border-accent bg-accent/5 shadow-md"
                          : "border-[var(--border-color)] bg-[var(--background)] hover:border-accent/30"
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected ? "text-accent" : "text-foreground"}`}>
                        {theme.name}
                      </span>
                      <span className="text-[10px] text-foreground/60 font-light mt-1">
                        {theme.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Duration & Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                  Duration (Days)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="3"
                    max="21"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full accent-accent bg-[var(--background)]"
                  />
                  <span className="text-xs font-bold text-accent shrink-0">{duration} Days</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                  Number of Guests
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-[var(--border-color)] text-sm font-semibold hover:border-accent"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-bold">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(prev => prev + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-[var(--border-color)] text-sm font-semibold hover:border-accent"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                  Accommodation Preference
                </label>
                <select
                  value={hotelPref}
                  onChange={(e) => setHotelPref(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                >
                  <option value="heritage-luxury">Palace & Heritage Hotels (Premium)</option>
                  <option value="luxury-5star">5-Star Luxury Resorts</option>
                  <option value="boutique-standard">Comfort Boutique Haveli Stays</option>
                </select>
              </div>
            </div>

            {/* Step 4: Contact & Travel Date */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2">
                <Calendar className="text-accent" size={18} />
                <h3 className="font-playfair text-lg font-bold">3. Contact Details & Estimated Start Date</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                    placeholder="e.g. Vikramaditya Singh"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                    placeholder="e.g. vikram@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                    placeholder="e.g. +91 98290 12345"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                    Estimated Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                  Additional Notes / Special Requirements
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light resize-none"
                  placeholder="Tell us if you want to travel outside Rajasthan (e.g. Delhi-Agra-Varanasi circuit), or list any specific monuments, dietary preferences, or flight detail requests."
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-medium flex items-center">
                {errorMsg}
              </p>
            )}

            <Button
              type="submit"
              variant="accent"
              loading={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 py-3.5 text-xs uppercase tracking-widest font-semibold"
            >
              <span>Build My Custom Itinerary</span>
              <ArrowRight size={14} />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
