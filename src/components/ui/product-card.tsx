"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { ShineBorder } from "@/components/ui/shine-border";
import Image from "next/image";
import { urlForIcon } from "@/lib/image";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation"; // <-- For reading query params on client side
import { toggleBookmarkById } from "@/actions/toggle-bookmark";
import { useCurrentUser } from "@/hooks/use-current-user";

export interface LogoImage {
  alt?: string;
  asset: {
    _ref: string;
    _type: string;
  };
  blurDataURL?: string;
}
interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  logo?: LogoImage;
  featured?: boolean;
  isAd?: boolean;
  isHighlighted?: boolean;
  slug: string;
  bookmark?: boolean;
  onBookmarkToggle?: (id: string) => void;
}

export const ProductCard = React.memo(
  ({
    id,
    title,
    description,
    color,
    logo,
    featured = false,
    isAd = false,
    isHighlighted = false,
    slug,
    bookmark = false,
    onBookmarkToggle = () => {},
  }: ProductCardProps) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const iconProps = logo ? urlForIcon(logo) : null;
    const iconBlurDataURL = logo?.blurDataURL || null;
    const [bookmarked, setBookmarked] = useState<boolean>(bookmark);
    const [loading, setLoading] = useState<boolean>(false); // <-- New loading state
    const user = useCurrentUser();
    const router = useRouter();

    // Use next/navigation hook to read query params
    const searchParams = useSearchParams();
    const filterParam = searchParams.get("f");

    const itemUrlPrefix = "/item";

    const toggleBookmark = async (id: string) => {
      const updatedBookmark = await toggleBookmarkById(id);
      return updatedBookmark;
    };

    const handleBookmarkToggle = async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!user) {
        router.push("/login");
        return;
      }
      if (loading) return;

      setLoading(true); // Start loading

      const wasBookmarked = bookmarked;
      setBookmarked(!bookmarked);

      try {
        const updatedBookmark = await toggleBookmark(id);

        if (wasBookmarked) {
          toast.custom((t) => (
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded shadow-lg border border-border">
              <div className="flex-1">
                <p className="font-semibold text-sm text-red-600">
                  Bookmark removed
                </p>
                <p className="text-sm text-muted-foreground">
                  “{title}” has been removed from your bookmarks.
                </p>
              </div>
              <button
                onClick={async () => {
                  setLoading(true);
                  const revertedBookmark = await toggleBookmark(id);
                  setBookmarked(revertedBookmark);
                  setLoading(false);
                  toast.dismiss(t);
                }}
                className="text-sm font-medium text-primary hover:underline"
              >
                Undo
              </button>
            </div>
          ));
          onBookmarkToggle(id);
        } else {
          toast.custom(() => (
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded shadow-lg border border-border">
              <div>
                <p className="font-semibold text-sm text-green-600">
                  Bookmark added
                </p>
                <p className="text-sm text-muted-foreground">
                  “{title}” has been added to your bookmarks.
                </p>
              </div>
            </div>
          ));
          onBookmarkToggle(id);
        }
      } catch (err) {
        console.error("Bookmark toggle failed", err);
        setBookmarked(wasBookmarked); // Rollback on failure
      }

      setLoading(false); // End loading
    };

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
              {iconProps && (
                <Image
                  src={iconProps?.src}
                  alt={logo?.alt || `icon of ${title}`}
                  title={logo?.alt || `icon of ${title}`}
                  width={32}
                  height={32}
                  className="object-cover image-scale"
                  {...(iconBlurDataURL && {
                    placeholder: "blur",
                    blurDataURL: iconBlurDataURL,
                  })}
                />
              )}
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
              <Link href={`${itemUrlPrefix}/${slug}`} prefetch={false}>
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
              disabled={loading} // <-- Disable during loading
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
