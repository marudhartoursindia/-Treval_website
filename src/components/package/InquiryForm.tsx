"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  travelDate: z.string().min(1, "Please select a preferred travel date"),
  guests: z.number().min(1, "Must be at least 1 traveler").max(20, "For groups larger than 20, please contact us directly"),
  message: z.string().min(10, "Please provide a short description of your travel preferences"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  packageName: string;
}

export function InquiryForm({ packageName }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      guests: 2,
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 md:p-8 shadow-md">
      {submitSuccess ? (
        <div className="text-center py-10 space-y-4">
          <div className="flex justify-center text-accent">
            <CheckCircle2 size={48} className="animate-bounce" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-foreground">Inquiry Received</h3>
          <p className="text-xs text-foreground/70 leading-relaxed font-light">
            Thank you for contacting Bespoke Travels. One of our luxury travel curators will review your preferences for the <span className="font-semibold text-accent">{packageName}</span> package and connect with you within 24 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 border-accent text-accent hover:bg-accent hover:text-primary"
          >
            Submit Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="border-b border-[var(--border-color)] pb-3">
            <h3 className="font-playfair text-lg font-bold text-foreground">Book Your Voyage</h3>
            <p className="text-[10px] text-foreground/50 uppercase tracking-widest mt-0.5">
              Customize & Inquire
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
              placeholder="e.g. Alexander Mercer"
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
              className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
              placeholder="e.g. alexander@example.com"
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                <AlertCircle size={10} className="mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
              placeholder="e.g. +1 (555) 019-9234"
            />
            {errors.phone && (
              <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                <AlertCircle size={10} className="mr-1" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Date & Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                Travel Date
              </label>
              <input
                type="date"
                {...register("travelDate")}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light cursor-pointer"
              />
              {errors.travelDate && (
                <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                  <AlertCircle size={10} className="mr-1" />
                  {errors.travelDate.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
                Travelers
              </label>
              <input
                type="number"
                {...register("guests", { valueAsNumber: true })}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light"
                min="1"
              />
              {errors.guests && (
                <p className="text-[10px] text-red-500 flex items-center mt-0.5">
                  <AlertCircle size={10} className="mr-1" />
                  {errors.guests.message}
                </p>
              )}
            </div>
          </div>

          {/* Custom Preferences message */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-foreground/60 font-medium block">
              Bespoke Requirements
            </label>
            <textarea
              rows={4}
              {...register("message")}
              className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-light resize-none"
              placeholder="Describe dietary preferences, rooming choices, interest in specific excursions..."
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
            className="w-full flex items-center justify-center space-x-2 py-3"
          >
            {!isSubmitting && <Send size={14} />}
            <span>Send Travel Inquiry</span>
          </Button>
        </form>
      )}
    </div>
  );
}
