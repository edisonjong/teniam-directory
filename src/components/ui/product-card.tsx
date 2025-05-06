"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { ShineBorder } from "@/components/ui/shine-border";
import { useBookmarks } from "./bookmark-context";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  logo: React.ElementType;
  featured?: boolean;
  isAd?: boolean;
  isHighlighted?: boolean;
}

export const ProductCard = React.memo(
  ({
    id,
    title,
    description,
    color,
    logo: Logo,
    featured = false,
    isAd = false,
    isHighlighted = false,
  }: ProductCardProps) => {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const { toast } = useToast();
    const bookmarked = isBookmarked(id);
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleBookmarkToggle = (e: React.MouseEvent) => {
      e.preventDefault();

      // Store the current state before toggling
      const wasBookmarked = bookmarked;

      // Toggle the bookmark
      toggleBookmark(id);

      // Show toast notification when removing a bookmark
      if (wasBookmarked) {
        toast({
          title: "Bookmark removed",
          description: `"${title}" has been removed from your bookmarks`,
          action: (
            <ToastAction
              altText="Undo removal"
              onClick={() => toggleBookmark(id)}
            >
              Undo
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: "Bookmark added",
          description: `"${title}" has been added to your bookmarks`,
        });
      }
    };

    // Animation effect for highlighted card
    React.useEffect(() => {
      if (isHighlighted && cardRef.current) {
        cardRef.current.classList.add(
          "ring-4",
          "ring-primary",
          "ring-opacity-70"
        );

        const timer = setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.classList.remove(
              "ring-4",
              "ring-primary",
              "ring-opacity-70"
            );
          }
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [isHighlighted]);

    return (
      <Card
        id={`product-${id}`}
        ref={cardRef}
        className={`p-6 relative overflow-hidden transition-all duration-300 ${
          isHighlighted ? "shadow-lg scale-[1.02]" : ""
        } hover:bg-card/80 hover:border-primary/20 sm:hover:shadow-md mobile-touch-feedback`}
      >
        {isAd && (
          <ShineBorder
            borderWidth={2}
            shineColor={["#FF4785", "#4353FF", "#00A389"]}
          />
        )}
        <div className="relative flex flex-col h-full">
          <div className="absolute top-0 right-0 flex gap-2">
            {featured && (
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            )}
            {isAd && (
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Ad
              </span>
            )}
          </div>

          <div className="*:size-10">
            <div
              className="flex items-center justify-center rounded-md"
              style={{ color }}
            >
              <Logo size={40} />
            </div>
          </div>

          <div className="space-y-2 py-6 flex-grow">
            <h3 className="text-base font-medium line-clamp-1">{title}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm min-h-[2.5rem]">
              {description}
            </p>
          </div>

          <div className="flex justify-between items-center gap-3 border-t border-dashed pt-6 border-border mt-auto">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="gap-1 pr-2 shadow-none transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Link href={`/product/${id}`} prefetch={false}>
                Learn More
                <ChevronRight className="ml-0 !size-3.5 opacity-50" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkToggle}
              className="ml-auto bookmark-button mobile-touch-feedback"
              aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
              aria-pressed={bookmarked}
            >
              <Bookmark
                className={`h-5 w-5 bookmark-icon ${
                  bookmarked ? "bookmark-icon-active" : ""
                }`}
              />
              <span className="sr-only">
                {bookmarked ? "Remove bookmark" : "Bookmark"}
              </span>
            </Button>
          </div>
        </div>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";
