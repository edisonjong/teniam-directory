"use client";
import { useParams, notFound } from "next/navigation";
// import { products } from "@/components/product-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bookmark, ExternalLink, Share2, Star } from "lucide-react";
import Link from "next/link";
// import { useBookmarks } from "@/components/bookmark-context";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ShineBorder } from "@/components/ui/shine-border";
import { useEffect, useState } from "react";
import { useBookmarks } from "@/components/ui/bookmark-context";
import { products } from "@/components/ui/product-data";

export default function ProductPage() {
  const { id } = useParams();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Find the product with the matching ID
  const product = products.find((p) => p.id === id);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // If still loading, the loading.tsx file will handle the UI
  if (isLoading) {
    return null;
  }

  const bookmarked = isBookmarked(product.id);

  const handleBookmarkToggle = () => {
    // Store the current state before toggling
    const wasBookmarked = bookmarked;

    // Toggle the bookmark
    toggleBookmark(product.id);

    // Show toast notification
    if (wasBookmarked) {
      toast({
        title: "Bookmark removed",
        description: `"${product.title}" has been removed from your bookmarks`,
        action: (
          <ToastAction
            altText="Undo removal"
            onClick={() => toggleBookmark(product.id)}
          >
            Undo
          </ToastAction>
        ),
      });
    } else {
      toast({
        title: "Bookmark added",
        description: `"${product.title}" has been added to your bookmarks`,
      });
    }
  };

  // Format category or tag names for display
  const formatName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const Logo = product.logo;

  return (
    <div className="container max-w-6xl py-8 mobile-safe-area">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/directories">
                Tech Directory
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/directories?category=${product.category}`}
              >
                {formatName(product.category)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/directories?subcategory=${product.subcategory}`}
              >
                {formatName(product.subcategory)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>{product.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/directories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="mobile-touch-feedback">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            variant={bookmarked ? "default" : "outline"}
            size="sm"
            onClick={handleBookmarkToggle}
            className="mobile-touch-feedback bookmark-button"
            aria-pressed={bookmarked}
          >
            <Bookmark
              className={`mr-2 h-4 w-4 bookmark-icon ${bookmarked ? "bookmark-icon-active" : ""}`}
            />
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </div>

      <Card className="relative overflow-hidden p-8">
        {product.isAd && (
          <ShineBorder
            borderWidth={2}
            shineColor={["#FF4785", "#4353FF", "#00A389"]}
          />
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div
              className="flex items-center justify-center w-24 h-24 rounded-lg"
              style={{ backgroundColor: product.color, color: "#fff" }}
            >
              <Logo className="h-12 w-12" />
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              {product.featured && (
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              )}
              {product.isAd && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  Sponsored
                </Badge>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {formatName(product.category)}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    {formatName(product.subcategory)}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 mobile-touch-feedback">
                Visit Website
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="mobile-touch-feedback"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Features</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            <li>Feature 4</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Use Cases</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Use Case 1</li>
            <li>Use Case 2</li>
            <li>Use Case 3</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Pricing</h3>
          <div className="space-y-1 text-muted-foreground">
            <p>Starting at: Free</p>
            <p>Premium plans available</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
