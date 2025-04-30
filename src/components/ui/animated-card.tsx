"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  ...props
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Add a small delay based on the card's position to create a cascade effect
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      {
        root: null,
        rootMargin: rootMargin,
        threshold: threshold, // Trigger when at least 10% of the card is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay, hasAnimated, threshold, rootMargin]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-500 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        "hover:translate-y-[-4px] hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
