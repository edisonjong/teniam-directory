"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LandingPageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-border bg-muted/10">
        <Skeleton className="h-6 w-24" /> {/* Logo */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-16" /> {/* Link 1 */}
          <Skeleton className="h-6 w-16" /> {/* Link 2 */}
          <Skeleton className="h-6 w-16 hidden sm:block" /> {/* Link 3 */}
          <Skeleton className="h-8 w-24 rounded-md" /> {/* Button */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 bg-muted/5 text-center">
        <Skeleton className="h-10 w-3/4 max-w-xl mb-4" /> {/* Headline */}
        <Skeleton className="h-5 w-1/2 max-w-md mb-6" /> {/* Subheadline */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-10 w-32 rounded-md" /> {/* CTA Button */}
          <Skeleton className="h-10 w-32 rounded-md" /> {/* Secondary CTA */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-24" /> {/* Feature Title */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Skeleton className="h-8 w-1/2 mx-auto" /> {/* Testimonial Title */}
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-1/4 mx-auto" /> {/* Customer Name */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center bg-blue-100">
        <Skeleton className="h-8 w-1/2 mx-auto mb-6" /> {/* CTA Headline */}
        <Skeleton className="h-10 w-40 mx-auto rounded-md" /> {/* CTA Button */}
      </section>

      {/* Footer */}
      <footer className="w-full py-6 px-6 bg-gray-800 text-white text-center">
        <Skeleton className="h-4 w-48 mx-auto" /> {/* Footer Text */}
      </footer>
    </div>
  );
}
