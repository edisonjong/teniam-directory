'use client';

import * as React from 'react';

type BookmarkContextType = {
  bookmarkedItems: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
};

export const BookmarkContext = React.createContext<BookmarkContextType>({
  bookmarkedItems: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  // Use localStorage to persist bookmarks, but handle it safely for SSR
  const [bookmarkedItems, setBookmarkedItems] = React.useState<string[]>([]);

  // Initialize from localStorage on client-side only
  // React.useEffect(() => {
  //   const storedBookmarks = localStorage.getItem('bookmarkedItems');
  //   if (storedBookmarks) {
  //     try {
  //       setBookmarkedItems(JSON.parse(storedBookmarks));
  //     } catch (e) {
  //       console.error('Failed to parse bookmarks from localStorage', e);
  //       setBookmarkedItems([]);
  //     }
  //   }
  // }, []);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure it only runs on the client-side
      const storedBookmarks = localStorage.getItem('bookmarkedItems');
      if (storedBookmarks) {
        try {
          setBookmarkedItems(JSON.parse(storedBookmarks));
        } catch (e) {
          console.error('Failed to parse bookmarks from localStorage', e);
          setBookmarkedItems([]);
        }
      }
    }
  }, []);

  const toggleBookmark = React.useCallback((id: string) => {
    setBookmarkedItems((prev) => {
      const newBookmarks = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // Save to localStorage with error handling
      try {
        localStorage.setItem('bookmarkedItems', JSON.stringify(newBookmarks));
      } catch (e) {
        console.error('Failed to save bookmarks to localStorage', e);
      }
      return newBookmarks;
    });
  }, []);

  const isBookmarked = React.useCallback(
    (id: string) => bookmarkedItems.includes(id),
    [bookmarkedItems]
  );

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedItems,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => React.useContext(BookmarkContext);
