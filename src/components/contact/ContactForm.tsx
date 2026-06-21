"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  destination: z.string().min(1, "Please select a destination"),
  message: z.string().min(10, "Please describe your travel plan in at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/placeholder";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        const errData = await response.json();
        alert(errData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 md:p-8 shadow-sm">
      {submitSuccess ? (
        <div className="text-center py-12 space-y-4">
          <div className="flex justify-center text-accent">
            <CheckCircle2 size={48} className="animate-bounce" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-foreground">Message Dispatched</h3>
          <p className="text-xs text-foreground/70 leading-relaxed font-light">
            Thank you for contacting Bespoke Travels. One of our destination curators will review your custom coordinates and connect with you shortly.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 border-accent text-accent hover:bg-accent hover:text-primary"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                placeholder="e.g. Elizabeth Bennett"
              />
              {errors.fullName && (
                <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                  <AlertCircle size={10} className="mr-1" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                placeholder="e.g. elizabeth@example.com"
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                  <AlertCircle size={10} className="mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                placeholder="e.g. +1 (555) 019-9234"
              />
              {errors.phone && (
                <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                  <AlertCircle size={10} className="mr-1" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Preferred Destination */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                Preferred Destination
              </label>
              <select
                {...register("destination")}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-foreground font-light cursor-pointer"
              >
                <option value="">-- Select Destination --</option>
                <option value="Rajasthan">Rajasthan (Jaipur, Udaipur, Jodhpur, Jaisalmer)</option>
                <option value="Ranakpur">Ranakpur Jain Temple</option>
                <option value="Varanasi">Varanasi (Spiritual Ganges)</option>
                <option value="Agra">Agra (Taj Mahal)</option>
                <option value="Delhi">Delhi & Golden Triangle</option>
                <option value="Other">Other / Custom Route</option>
              </select>
              {errors.destination && (
                <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                  <AlertCircle size={10} className="mr-1" />
                  {errors.destination.message}
                </p>
              )}
            </div>
          </div>

          {/* Message Notes */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
              Describe Your Vision
            </label>
            <textarea
              rows={6}
              {...register("message")}
              className="w-full bg-[var(--background)] border border-[var(--border-color)] px-4 py-2.5 text-xs focus:outline-none focus:border-accent text-foreground font-light resize-none"
              placeholder="What are your goals for this trip? (e.g. honeymoons, private guides, specialized dining preference, absolute privacy...)"
            />
            {errors.message && (
              <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                <AlertCircle size={10} className="mr-1" />
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="accent"
            loading={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 py-3.5"
          >
            {!isSubmitting && <Send size={14} />}
            <span>Dispatch Inquiry</span>
          </Button>
        </form>
      )}
    </div>
  );
}
