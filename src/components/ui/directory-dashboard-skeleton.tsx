'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function DirectoryDashboardSkeleton() {
  const [skeletonCount, setSkeletonCount] = useState(9);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateSkeletonCount = () => {
      const width = window.innerWidth;
      if (width < 640) setSkeletonCount(4);
      else if (width < 1024) setSkeletonCount(6);
      else setSkeletonCount(9);
    };

    updateSkeletonCount();
    window.addEventListener('resize', updateSkeletonCount);
    return () => window.removeEventListener('resize', updateSkeletonCount);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col justify-between border-r border-border bg-muted/10 p-4">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" /> {/* Logo */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Submit */}
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-40" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/10">
          <Skeleton className="h-4 w-48" /> {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-64 rounded-md hidden md:block" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'relative rounded-lg border border-border bg-muted/5 p-4 space-y-3'
              )}
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-md" /> {/* Icon */}
                <Skeleton className="h-4 w-32" /> {/* Title */}
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-8 w-24 rounded-md" /> {/* Learn More */}
                <Skeleton className="h-5 w-5 rounded-md" /> {/* Bookmark */}
              </div>
              {/* Optional Ad badge */}
              <div className="absolute top-2 right-2">
                <Skeleton className="h-5 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
