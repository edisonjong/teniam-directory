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
import { useRouter, useSearchParams } from "next/navigation";

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
import React, { useEffect, useState } from "react";
// import { fetchFilteredItems } from "@/actions/toggle-bookmark";

export default function ClientComponent({ items, categoryList, tagList }) {
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>();
  const [selectedCategory, setSelectedCategory] = React.useState<string>();

  return (
    <SidebarProvider>
      <TechDirectoryProvider>
        <AppSidebar
          categoryList={categoryList}
          setSelectedPlatform={setSelectedPlatform}
          selectedPlatform={selectedPlatform}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Content items={items} tagList={tagList} />
      </TechDirectoryProvider>
    </SidebarProvider>
  );
}

function Content({ items, tagList }) {
  const [isLoading, setIsLoading] = React.useState(false);
  // const [bookmarkProducts, setBookmarkProducts] = useState([]);

  const [sortOrder, setSortOrder] = useState("default");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("f");
  const tagParam = searchParams.get("tag");
  const categoryParam = searchParams.get("category");

  const queryKey = Array.from(searchParams.keys())[0]; // e.g., "tag"
  const queryValue = searchParams.get(queryKey);
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    // On initial mount or when items change, sync state
    setFilteredItems(items);
  }, [items]);
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
  const handleSortChange = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      setSortOrder(value as "default" | "newest" | "oldest" | "a-z" | "z-a");

      if (value === "default") {
        params.delete("sort");
      } else if (value === "newest") {
        params.set("sort", "date-desc");
      } else if (value === "oldest") {
        params.set("sort", "date-asc");
      } else if (value === "a-z") {
        params.set("sort", "name-asc");
      } else if (value === "z-a") {
        params.set("sort", "name-desc");
      }

      const newParams = params.toString();
      router.push(`?${newParams}`);
    },
    [router, searchParams, setSortOrder]
  );
  const getTitle = React.useCallback(() => {
    if (filterParam === "featured") {
      return "Featured";
    } else if (filterParam === "bookmark") {
      return "Bookmarks";
    } else if (filterParam === "sponsor") {
      return "Sponsored";
    } else if (queryKey === "tag") {
      return tagParam.charAt(0).toUpperCase() + tagParam.slice(1);
    } else if (queryKey === "category") {
      return categoryParam
        ?.split("-")
        ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");
    } else {
      return "All Products";
    }
  }, [router, filterParam]);
  const tagDetail = React.useMemo(() => {
    if (!tagParam || !tagList?.length) return null;
    return tagList.find(
      (tag) => tag.name?.toLowerCase() === tagParam.toLowerCase()
    );
  }, [tagParam, tagList]);

  // useEffect(() => {
  //   if (filterParam === "bookmark") {
  //     const fetchBookmarks = async () => {
  //       setIsLoading(true);
  //       try {
  //         const filteredBookmark = await fetchFilteredItems("bookmark");
  //         setBookmarkProducts(filteredBookmark);
  //       } catch (err) {
  //         setError(err.message || "Failed to fetch bookmarks");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchBookmarks();
  //   }
  // }, [filterParam]);

  const handleBookmarkToggle = (id: string) => {
    setFilteredItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, bookmark: !item.bookmark } : item
      )
    );

    if (searchParams.get("f") === "bookmark") {
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
    }
  };
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  const getBreadcrumbLabel = () => {
    if (filterParam === "featured") {
      return "Featured";
    } else if (filterParam === "bookmark") {
      return "Bookmarks";
    } else if (filterParam === "sponsor") {
      return "Sponsored";
    } else if (queryKey === "tag") {
      return queryValue.charAt(0).toUpperCase() + queryValue.slice(1);
    } else if (queryKey === "category") {
      return queryValue
        ?.split("-")
        ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");
    } else {
      return "All Products";
    }
  };
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
                  <BreadcrumbLink href={"/"} className=" ">
                    <div className="flex items-center gap-1">
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className=" " />
                <BreadcrumbItem className=" cursor-pointer">
                  <BreadcrumbLink
                    onClick={(e) => {
                      e.preventDefault(); // prevent default anchor behavior
                      router.push("/directories"); // push path without query
                    }}
                  >
                    Tech Directory
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="" />
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="truncate">
                    {getBreadcrumbLabel()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <CommandSearch items={items} />
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
      {tagParam && (
        <div className="gap-2 flex flex-col p-4">
          <div className="text-xl font-semibold">
            #{tagDetail.name.charAt(0).toUpperCase() + tagParam.slice(1)}
          </div>

          {tagDetail?.description && (
            <div className="text-sm text-muted-foreground mt-1">
              {tagDetail.description}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((product, index) => (
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
                  //  isHighlighted={product.id === highlightedProductId}
                  slug={product.slug.current}
                  bookmark={product.bookmark}
                  onBookmarkToggle={handleBookmarkToggle}
                  homeBookmark={false}
                />
              </AnimatedCard>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
