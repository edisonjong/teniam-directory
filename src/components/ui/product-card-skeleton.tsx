import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="p-6 relative overflow-hidden h-full flex flex-col">
      <div className="flex flex-col h-full">
        {/* Top section with logo and badges */}
        <div className="flex justify-between items-start">
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Logo placeholder */}
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />{" "}
            {/* Star icon placeholder */}
            <Skeleton className="h-5 w-12 rounded-full" />{" "}
            {/* "Ad" badge placeholder */}
          </div>
        </div>

        {/* Middle content section with consistent height */}
        <div className="mt-6 flex-grow flex flex-col">
          <Skeleton className="h-5 w-3/4 mb-2" /> {/* Title */}
          <div className="min-h-[2.5rem] mt-2">
            <Skeleton className="h-4 w-full mb-1" /> {/* Description line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
          </div>
        </div>

        {/* Bottom action section */}
        <div className="mt-auto pt-6 border-t border-dashed border-border flex justify-between items-center">
          <Skeleton className="h-8 w-28 rounded-md" /> {/* Learn More button */}
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Bookmark button */}
        </div>
      </div>
    </Card>
  );
}
