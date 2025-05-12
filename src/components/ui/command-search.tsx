"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Building,
  LineChart,
  Lightbulb,
  Rocket,
  Star,
  Bookmark,
  Megaphone,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { products } from "./product-data";
import { TechDirectoryContext } from "./tech-directory-context";
import { Badge } from "./badge";
import { useDebounce } from "@/hooks/use-debounce";
// import { Badge } from "./ui/badge";
// import { useDebounce } from "@/lib/use-debounce";

export function CommandSearch({ categoryList, tagList, items }) {
  console.log("tagList", tagList);
  const router = useRouter();
  const {
    setSelectedCategory,
    setSelectedTag,
    setViewMode,
    setHighlightedProductId,
  } = React.useContext(TechDirectoryContext);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);

  // Load recent searches from localStorage on component mount
  React.useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  // Save a search term to recent searches
  const saveToRecentSearches = (term: string) => {
    if (!term.trim()) return;

    setRecentSearches((prev) => {
      // Remove the term if it already exists to avoid duplicates
      const filtered = prev.filter((s) => s !== term);
      // Add the new term at the beginning and limit to 5 items
      const updated = [term, ...filtered].slice(0, 5);
      // Save to localStorage with error handling
      try {
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save recent searches to localStorage", e);
      }
      return updated;
    });
  };

  // Category icons mapping using Lucide icons
  const categoryIcons: Record<string, React.ReactNode> = React.useMemo(
    () => ({
      build: <Building className="mr-2 h-4 w-4" />,
      grow: <LineChart className="mr-2 h-4 w-4" />,
      innovate: <Lightbulb className="mr-2 h-4 w-4" />,
      "future-tech": <Rocket className="mr-2 h-4 w-4" />,
    }),
    []
  );

  // Format category or tag names for display
  const formatName = React.useCallback((name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  // Handle keyboard shortcut to open the command dialog
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Reset search query when dialog closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchQuery("");
      }, 200);
    }
  }, [open, setSearchQuery]);

  // Filter and group search results
  const searchResults = React.useMemo(() => {
    if (!debouncedSearchQuery) return {};

    const query = debouncedSearchQuery.toLowerCase();

    // Search functionality - search titles, categories, subcategories, and tags
    const matchedProducts = products.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      const subcategoryMatch = product.subcategory
        .toLowerCase()
        .includes(query);
      const tagMatch = product.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(query);

      return (
        titleMatch ||
        categoryMatch ||
        subcategoryMatch ||
        tagMatch ||
        descriptionMatch
      );
    });

    // Group results by category
    return matchedProducts.reduce(
      (grouped: Record<string, typeof products>, product) => {
        const category = product.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(product);
        return grouped;
      },
      {}
    );
  }, [debouncedSearchQuery]);

  // Handle selecting a search result
  const handleSelect = (product: (typeof products)[0]) => {
    // Close the dialog
    setOpen(false);

    // Save the search query to recent searches
    saveToRecentSearches(searchQuery);

    // Navigate to the product details page
    router.push(`/product/${product.id}`);
  };

  // Handle selecting a category
  const handleCategorySelect = (category: string) => {
    setOpen(false);
    setSelectedCategory(category);
    setSelectedTag(null);
    setViewMode("all");
    setHighlightedProductId(null);

    // Save the search query to recent searches if there is one
    if (searchQuery) {
      saveToRecentSearches(searchQuery);
    }
  };

  // Handle selecting a tag
  const handleTagSelect = (tag: string) => {
    setOpen(false);
    setSelectedCategory(null);
    setSelectedTag(tag);
    setViewMode("all");
    setHighlightedProductId(null);

    // Save the search query to recent searches if there is one
    if (searchQuery) {
      saveToRecentSearches(searchQuery);
    }
  };

  // Get all unique tags across products
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    products.forEach((product) => {
      product.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Get all categories
  const allCategories = React.useMemo(() => {
    const categories = new Set<string>();

    products.forEach((product) => {
      categories.add(product.category);
    });

    return Array.from(categories);
  }, []);

  // Handle clicking on a recent search
  const handleRecentSearchClick = (term: string) => {
    setSearchQuery(term);
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("recentSearches");
    } catch (e) {
      console.error("Failed to remove recent searches from localStorage", e);
    }
  };

  return (
    <>
      {/* Mobile Search Icon */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>

      {/* Desktop Search Button */}
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 hidden md:inline-flex"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">
          <Search className="mr-2 h-4 w-4" />
          Search products...
        </span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products, categories, tags..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          autoFocus
        />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center text-sm">
              <p>No results found.</p>
              <p className="text-muted-foreground mt-1">
                Try searching for a product, category, or tag.
              </p>
            </div>
          </CommandEmpty>

          {debouncedSearchQuery ? (
            // Search results
            <>
              {Object.entries(searchResults).map(([category, results]) => (
                <CommandGroup key={category} heading={formatName(category)}>
                  {results.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => handleSelect(product)}
                      className="flex items-center py-3"
                      value={product.title}
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-md mr-3"
                        style={{
                          backgroundColor: product.color,
                          color: "#fff",
                        }}
                      >
                        <product.logo className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{product.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {product.description}
                        </span>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        {product.featured && (
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        )}
                        {product.isAd && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] py-0"
                          >
                            Ad
                          </Badge>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </>
          ) : (
            // Default content when no search query
            <>
              {recentSearches.length > 0 && (
                <>
                  <CommandGroup heading="Recent Searches">
                    {recentSearches.map((term) => (
                      <CommandItem
                        key={term}
                        onSelect={() => handleRecentSearchClick(term)}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{term}</span>
                        </div>
                      </CommandItem>
                    ))}
                    <CommandItem
                      onSelect={clearRecentSearches}
                      className="text-sm text-muted-foreground justify-center italic"
                    >
                      Clear recent searches
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              <CommandGroup heading="Categories">
                {allCategories.map((category) => (
                  <CommandItem
                    key={category}
                    onSelect={() => handleCategorySelect(category)}
                    className="py-2"
                  >
                    {categoryIcons[category]}
                    <span className="font-medium">{formatName(category)}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Popular Tags">
                {tagList.slice(0, 8).map((tag) => (
                  <CommandItem
                    key={tag}
                    onSelect={() => handleTagSelect(tag.slug.current)}
                    className="py-2"
                  >
                    <Tag className="mr-2 h-3.5 w-3.5" />
                    <span>{tag.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Views">
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setViewMode("featured");
                    setHighlightedProductId(null);
                  }}
                  className="py-2"
                >
                  <Star className="mr-2 h-3.5 w-3.5" />
                  <span className="font-medium">Featured</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setViewMode("bookmarks");
                    setHighlightedProductId(null);
                  }}
                  className="py-2"
                >
                  <Bookmark className="mr-2 h-3.5 w-3.5" />
                  <span className="font-medium">Bookmarks</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setViewMode("sponsor");
                    setHighlightedProductId(null);
                  }}
                  className="py-2"
                >
                  <Megaphone className="mr-2 h-3.5 w-3.5" />
                  <span className="font-medium">Sponsored</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
