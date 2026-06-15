"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  const [localOpen, setLocalOpen] = React.useState(false);

  const isExpanded = onToggle ? isOpen : localOpen;
  const toggle = onToggle ? onToggle : () => setLocalOpen(!localOpen);

  return (
    <div className="border-b border-[var(--border-color)]">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-accent focus:outline-none"
      >
        <div className="text-sm md:text-base font-semibold text-foreground">{title}</div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180 text-accent"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-0 text-sm text-foreground/80 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: {
    title: React.ReactNode;
    content: React.ReactNode;
  }[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [openIndexes, setOpenIndexes] = React.useState<number[]>([0]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <div className="space-y-1">
      {items.map((item, index) => {
        const isOpen = allowMultiple
          ? openIndexes.includes(index)
          : openIndex === index;
        return (
          <AccordionItem
            key={index}
            title={item.title}
            isOpen={isOpen}
            onToggle={() => handleToggle(index)}
          >
            {item.content}
          </AccordionItem>
        );
      })}
    </div>
  );
}
