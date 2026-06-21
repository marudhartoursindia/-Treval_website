"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Map, Calendar, Award } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
}

function StatItem({ icon, target, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500; // 1.5 seconds animation duration
          const increment = Math.ceil(target / (duration / 30));
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 30);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, hasAnimated]);

  return (
    <div 
      ref={elementRef}
      className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-white/5 p-8 flex flex-col items-center justify-center space-y-4 group hover:-translate-y-2 hover:shadow-xl hover:border-accent/40 transition-all duration-500 rounded-none relative overflow-hidden"
    >
      {/* Golden top accent bar appearing on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-inner">
        {icon}
      </div>
      <div className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-accent tracking-tight flex items-baseline justify-center">
        <span>{count.toLocaleString()}</span>
        <span className="text-accent font-light ml-0.5">{suffix}</span>
      </div>
      <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/75 dark:text-white/75 font-semibold text-center">
        {label}
      </p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[var(--background)] to-[var(--color-accent-light)] dark:from-primary-light dark:to-primary text-foreground dark:text-white overflow-hidden border-y border-[var(--border-color)] dark:border-white/5">
      {/* Decorative blurred golden light spheres in background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <StatItem 
            icon={<Users size={24} />} 
            target={12000} 
            suffix="+" 
            label="Happy Travelers" 
          />
          <StatItem 
            icon={<Map size={24} />} 
            target={25} 
            suffix="+" 
            label="Destinations Covered" 
          />
          <StatItem 
            icon={<Calendar size={24} />} 
            target={12} 
            suffix="+" 
            label="Years of Experience" 
          />
          <StatItem 
            icon={<Award size={24} />} 
            target={150} 
            suffix="+" 
            label="Packages Designed" 
          />
        </div>
      </div>
    </section>
  );
}
