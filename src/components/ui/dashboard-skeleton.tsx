"use client";

import { Skeleton } from "@/components/ui/skeleton";
// import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductCardSkeleton } from "./product-card-skeleton";

export function DashboardSkeleton() {
  // Determine how many skeleton cards to show based on viewport
  const [skeletonCount, setSkeletonCount] = useState(9);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Update skeleton count based on viewport size
    const updateSkeletonCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setSkeletonCount(4); // Show fewer on mobile
      } else if (width < 1024) {
        // Tablet (sm breakpoint)
        setSkeletonCount(6); // 2 columns, 3 rows
      } else {
        // Desktop (lg breakpoint)
        setSkeletonCount(9); // 3 columns, 3 rows
      }
    };

    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => window.removeEventListener("resize", updateSkeletonCount);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-64 rounded-md hidden md:block" />
          <Skeleton className="h-8 w-8 rounded-md md:hidden" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* Product grid skeleton with consistent heights */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array(skeletonCount)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="h-full">
              <ProductCardSkeleton />
            </div>
          ))}
      </div>
    </div>
  );
}
