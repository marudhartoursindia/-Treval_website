"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-none cursor-pointer tracking-wider uppercase text-xs",
          {
            // Primary (Secondary Button: Royal Gold)
            "bg-accent text-white hover:bg-accent-hover hover:text-white hover:border-accent-hover border border-accent":
              variant === "primary",
            // Accent (Primary Button: Royal Gold)
            "bg-accent text-white hover:bg-accent-hover hover:text-white hover:border-accent-hover border border-accent ":
              variant === "accent",
            // Outline
            "bg-transparent text-accent border border-accent hover:bg-accent hover:text-white":
              variant === "outline",
            // Ghost
            "bg-transparent text-foreground hover:bg-accent-light hover:text-accent":
              variant === "ghost",
          },
          {
            "px-4 py-2": size === "sm",
            "px-6 py-3": size === "md",
            "px-8 py-4": size === "lg",
          },
          "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
