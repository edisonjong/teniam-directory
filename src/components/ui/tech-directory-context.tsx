"use client";

import * as React from "react";

type TechDirectoryContextType = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  selectedFeatured: boolean;
  setSelectedFeatured: (featured: boolean) => void;
  viewMode: "all" | "featured" | "bookmarks" | "sponsor" | "tags";
  setViewMode: (
    mode: "all" | "featured" | "bookmarks" | "sponsor" | "tags"
  ) => void;
  sortOrder: "default" | "newest" | "oldest" | "a-z" | "z-a";
  setSortOrder: (
    order: "default" | "newest" | "oldest" | "a-z" | "z-a"
  ) => void;
  highlightedProductId: string | null;
  setHighlightedProductId: (id: string | null) => void;
};

export const TechDirectoryContext =
  React.createContext<TechDirectoryContextType>({
    selectedCategory: null,
    setSelectedCategory: () => {},
    selectedTag: null,
    setSelectedTag: () => {},
    selectedFeatured: false,
    setSelectedFeatured: () => {},
    viewMode: "all",
    setViewMode: () => {},
    sortOrder: "default",
    setSortOrder: () => {},
    highlightedProductId: null,
    setHighlightedProductId: () => {},
  });

export function TechDirectoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [selectedFeatured, setSelectedFeatured] =
    React.useState<boolean>(false);
  const [viewMode, setViewMode] = React.useState<
    "all" | "featured" | "bookmarks" | "sponsor" | "tags"
  >("all");
  const [sortOrder, setSortOrder] = React.useState<
    "default" | "newest" | "oldest" | "a-z" | "z-a"
  >("default");
  const [highlightedProductId, setHighlightedProductId] = React.useState<
    string | null
  >(null);

  // Clear highlighted product after a short delay
  React.useEffect(() => {
    if (highlightedProductId) {
      const timer = setTimeout(() => {
        setHighlightedProductId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedProductId]);

  return (
    <TechDirectoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedTag,
        setSelectedTag,
        selectedFeatured,
        setSelectedFeatured,
        viewMode,
        setViewMode,
        sortOrder,
        setSortOrder,
        highlightedProductId,
        setHighlightedProductId,
      }}
    >
      {children}
    </TechDirectoryContext.Provider>
  );
}
