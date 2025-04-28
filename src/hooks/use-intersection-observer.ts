"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  root?: React.RefObject<Element> | null;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  root = null,
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        // Update state only if necessary
        if (isElementIntersecting !== isIntersecting) {
          setIsIntersecting(isElementIntersecting);

          if (isElementIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        }
      },
      { threshold, rootMargin, root: root?.current || null }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect(); // Added disconnect to ensure proper cleanup
    };
  }, [
    threshold,
    rootMargin,
    root,
    freezeOnceVisible,
    isIntersecting,
    hasIntersected,
  ]);

  return {
    ref,
    isIntersecting: freezeOnceVisible ? hasIntersected : isIntersecting,
    hasIntersected,
  };
}
