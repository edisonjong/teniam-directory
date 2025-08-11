'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { useDebounce } from '@/hooks/use-debounce';
import { Badge } from '../ui/badge';
// import { Badge } from "./ui/badge";
// import { useDebounce } from "@/lib/use-debounce";

export function MarketplaceSearch({ items }) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);

  // Load recent searches from localStorage on component mount
  React.useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
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
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recent searches to localStorage', e);
      }
      return updated;
    });
  };

  // Handle keyboard shortcut to open the command dialog
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Reset search query when dialog closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchQuery('');
      }, 200);
    }
  }, [open, setSearchQuery]);

  // Filter and group search results
  const searchResults = React.useMemo(() => {
    if (!debouncedSearchQuery) return [];

    const query = debouncedSearchQuery.toLowerCase();

    return items.filter((product) => {
      debugger;
      const titleMatch = product?.title?.toLowerCase().includes(query);
      const descriptionMatch = product?.excerpt?.toLowerCase().includes(query);

      return titleMatch || descriptionMatch;
    });
  }, [debouncedSearchQuery, items]);
  console.log('searchResults', searchResults);
  // Handle selecting a search result
  const handleSelect = (product: (typeof items)[0]) => {
    // Close the dialog
    setOpen(false);

    // Save the search query to recent searches
    saveToRecentSearches(searchQuery);

    // Navigate to the product details page
    router.push(`/marketplace/${product.slug.current}`);
  };

  // Handle clicking on a recent search
  const handleRecentSearchClick = (term: string) => {
    setSearchQuery(term);
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('recentSearches');
    } catch (e) {
      console.error('Failed to remove recent searches from localStorage', e);
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
              <CommandGroup heading="Results">
                {searchResults.map((product) => (
                  <CommandItem
                    key={product._id}
                    onSelect={() => handleSelect(product)}
                    className="flex items-center py-3 cursor-pointer"
                    value={product.title}
                  >
                    {/* <div
                      className="flex items-center justify-center w-8 h-8 rounded-md mr-3"
                      style={{
                        backgroundColor: product.color,
                        color: "#fff",
                      }}
                    >
                      <product.logo className="h-4 w-4" />
                    </div> */}
                    <div className="flex flex-col">
                      <span className="font-medium">{product.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {product.excerpt}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      {product.featured && (
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      )}
                      {product.sponsor && (
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
                      className="text-sm text-muted-foreground justify-center italic cursor-pointer"
                    >
                      Clear recent searches
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              <CommandSeparator />
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
