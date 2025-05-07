"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { AnimatedCard } from "@/components/ui/animated-card";
import { useBookmarks } from "@/components/ui/bookmark-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CommandSearch } from "@/components/ui/command-search";
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductCard } from "@/components/ui/product-card";
import { products } from "@/components/ui/product-data";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  TechDirectoryContext,
  TechDirectoryProvider,
} from "@/components/ui/tech-directory-context";

import { useDebounce } from "@/hooks/use-debounce";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Code,
  Filter,
  HomeIcon,
  Megaphone,
  SortAsc,
  SortDesc,
  Star,
} from "lucide-react";
import React from "react";

export default function ClientComponent({ items }) {
  return (
    <SidebarProvider>
      <TechDirectoryProvider>
        <AppSidebar />
        <Content items={items} />
        {/* <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        </SidebarInset> */}
      </TechDirectoryProvider>
    </SidebarProvider>
  );
}

// Update the Content component to use the sortOrder from context
function Content({ items }) {
  console.log("items", items);
  const {
    selectedCategory,
    selectedTag,
    selectedFeatured,
    setSelectedFeatured,
    viewMode,
    setViewMode,
    sortOrder,
    setSortOrder,
    highlightedProductId,
  } = React.useContext(TechDirectoryContext);
  const { bookmarkedItems } = useBookmarks();
  const [isLoading, setIsLoading] = React.useState(true);

  // Track filter changes to trigger loading state
  const filterKey = `${selectedCategory}-${selectedTag}-${selectedFeatured}-${viewMode}-${sortOrder}`;
  const debouncedFilterKey = useDebounce(filterKey, 300);

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when filters change
  React.useEffect(() => {
    // When filter key changes, set loading to true
    if (filterKey !== debouncedFilterKey) {
      setIsLoading(true);
    } else if (isLoading) {
      // When debounced key catches up with current key, set a timeout to turn off loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [filterKey, debouncedFilterKey, isLoading]);

  // Filter products based on selected category, tag, featured status, view mode, and sort order
  const filteredProducts = React.useMemo(() => {
    // First filter by view mode
    let filtered = items;

    if (viewMode === "featured") {
      filtered = items.filter((product) => product.featured);
    } else if (viewMode === "bookmarks") {
      filtered = items.filter((product) =>
        bookmarkedItems.includes(product.id)
      );
    } else if (viewMode === "ads") {
      filtered = items.filter((product) => product.isAd);
    }

    // Then apply additional filters
    filtered = filtered?.filter((product: any) => {
      // Check if product matches the selected category (main category or subcategory)
      const categoryMatch = selectedCategory
        ? product.category === selectedCategory ||
          product.subcategory === selectedCategory
        : true;

      // Check if product matches the selected tag
      const tagMatch = selectedTag ? product.tags.includes(selectedTag) : true;

      // Check if product matches the featured filter
      const featuredMatch = selectedFeatured ? product.featured === true : true;

      return categoryMatch && tagMatch && featuredMatch;
    });

    // Apply sorting
    if (sortOrder !== "default") {
      return [...filtered].sort((a, b) => {
        switch (sortOrder) {
          case "newest":
            // For demo purposes, we'll use the id as a proxy for creation date
            // In a real app, you'd use actual timestamps
            return Number.parseInt(b.id) - Number.parseInt(a.id);
          case "oldest":
            return Number.parseInt(a.id) - Number.parseInt(b.id);
          case "a-z":
            return a.title.localeCompare(b.title);
          case "z-a":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [
    selectedCategory,
    selectedTag,
    selectedFeatured,
    viewMode,
    bookmarkedItems,
    sortOrder,
  ]);
  console.log("filteredProducts", filteredProducts);
  // Get the title for the current view
  const getTitle = React.useCallback(() => {
    if (viewMode === "featured") {
      return "Featured";
    } else if (viewMode === "bookmarks") {
      return "Bookmarks";
    } else if (viewMode === "ads") {
      return "Sponsored";
    }

    const parts = [];

    if (selectedFeatured) {
      parts.push("Featured");
    }

    if (selectedCategory) {
      // Find if it's a main category or subcategory
      const mainCategory = items.find(
        (p) => p.category === selectedCategory
      )?.category;
      const subCategory = items.find(
        (p) => p.subcategory === selectedCategory
      )?.subcategory;

      if (mainCategory) {
        parts.push(formatId(mainCategory));
      } else if (subCategory) {
        parts.push(formatId(subCategory));
      }
    }

    if (selectedTag) {
      parts.push(formatId(selectedTag));
    }

    return parts.length > 0 ? parts.join(" - ") : "All Products";
  }, [selectedCategory, selectedTag, selectedFeatured, viewMode]);

  // Format ID to display name
  const formatId = React.useCallback((id: string) => {
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  // Handle filter selection
  const handleFilterChange = React.useCallback(
    (value: string) => {
      if (value === "featured") {
        setSelectedFeatured(true);
        setViewMode("all");
      } else if (value === "ads") {
        setViewMode("ads");
        setSelectedFeatured(false);
      } else {
        setSelectedFeatured(false);
        setViewMode("all");
      }
    },
    [setSelectedFeatured, setViewMode]
  );

  // Handle sort selection
  const handleSortChange = React.useCallback(
    (value: string) => {
      setSortOrder(value as "default" | "newest" | "oldest" | "a-z" | "z-a");
    },
    [setSortOrder]
  );

  // Get sort icon based on current sort order
  const getSortIcon = React.useCallback(() => {
    switch (sortOrder) {
      case "newest":
        return <ArrowDown className="h-4 w-4" />;
      case "oldest":
        return <ArrowUp className="h-4 w-4" />;
      case "a-z":
        return <SortAsc className="h-4 w-4" />;
      case "z-a":
        return <SortDesc className="h-4 w-4" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  }, [sortOrder]);

  // Scroll to highlighted product when it changes
  React.useEffect(() => {
    if (highlightedProductId) {
      // Store the current highlightedProductId to avoid race conditions
      const currentHighlightedId = highlightedProductId;

      const scrollTimer = setTimeout(() => {
        const element = document.getElementById(
          `product-${currentHighlightedId}`
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

      return () => clearTimeout(scrollTimer); // Clean up the timeout if component unmounts or highlightedProductId changes
    }
  }, [highlightedProductId]);

  // Add the AvatarTest component to the Content component for testing
  // Find the return statement in the Content component and add this after the isLoading check:

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // For development/testing purposes, uncomment the line below to test avatar behavior
  // return <AvatarTest />

  return (
    <SidebarInset className="mobile-safe-area">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="flex-1 min-w-0">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={"/"} className="hidden md:block">
                    <div className="flex items-center gap-1">
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/directories">
                    Tech Directory
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="truncate">
                    {getTitle()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 ml-2">
            {/* Enhanced Search Component */}
            <CommandSearch />

            {/* Filter Dropdown - Icon Only */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 mobile-touch-feedback"
                  aria-label="Filter"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                  All Products
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterChange("featured")}
                >
                  <Star className="h-4 w-4 mr-2" />
                  <span>Featured</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("ads")}>
                  <Megaphone className="h-4 w-4 mr-2" />
                  <span>Sponsored</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Dropdown - Icon Only */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 mobile-touch-feedback"
                  aria-label="Sort"
                >
                  {getSortIcon()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange("default")}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <span>Default</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("newest")}>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  <span>Newest</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("oldest")}>
                  <ArrowUp className="h-4 w-4 mr-2" />
                  <span>Oldest</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("a-z")}>
                  <SortAsc className="h-4 w-4 mr-2" />
                  <span>A-Z</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("z-a")}>
                  <SortDesc className="h-4 w-4 mr-2" />
                  <span>Z-A</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <AnimatedCard
                key={product.id}
                delay={index * 50}
                threshold={0.1}
                rootMargin="20px"
              >
                <ProductCard
                  id={product._id ? product._id : null}
                  title={product.name}
                  description={product.description}
                  color={product.color || "#0070f3"}
                  logo={product.icon || Code}
                  featured={product.featured}
                  isAd={product.sponsor}
                  isHighlighted={product.id === highlightedProductId}
                  slug={product.slug.current}
                />
              </AnimatedCard>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try selecting a different category or tag
              </p>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
