'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface UrlPreviewProps {
  url: string;
  className?: string;
  item?: any;
  imageProps?: any;
}

// Fallback component that mimics a URL preview
const FallbackPreview: React.FC<{ url: string }> = ({ url }) => {
  // Extract domain for display
  const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
      <div className="relative bg-muted">
        {/* Use a wrapper div with padding-bottom to maintain aspect ratio */}
        <div className="relative pb-[56.25%]">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt={domain}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 p-4 sm:p-6">
        <h3 className="text-xl font-semibold leading-none tracking-tight sm:text-2xl">
          {domain}
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Visit this website to learn more about its content and services.
        </p>
      </div>
      <div className="flex items-center p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex items-center text-xs text-muted-foreground sm:text-sm">
          <span className="line-clamp-1">{url}</span>
        </div>
      </div>
    </div>
  );
};

// Custom URL preview component that uses a simple iframe approach
export const UrlPreview: React.FC<UrlPreviewProps> = ({
  url,
  className,
  imageProps,
  item,
}) => {
  console.log('item', item);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Reset error state when URL changes
    setError(false);
    setIsLoading(true);
  }, [url]);

  if (!mounted) return null;

  if (error) {
    return <FallbackPreview url={url} />;
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col overflow-hidden rounded-xl border shadow-lg">
        {/* Browser chrome */}
        <div className="flex h-8 items-center border-b bg-muted px-2 sm:h-10 sm:px-4">
          <div className="flex space-x-1.5">
            <div className="h-2 w-2 rounded-full bg-red-500 sm:h-3 sm:w-3"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500 sm:h-3 sm:w-3"></div>
            <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3"></div>
          </div>
          <div className="mx-auto max-w-[calc(100%-6rem)] truncate rounded-md bg-background px-2 py-1 text-[10px] text-muted-foreground sm:px-3 sm:text-xs">
            {url}
          </div>
        </div>

        {/* Image container with improved responsive styling */}
        <div className="relative bg-muted">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
          {/* Use a wrapper div with padding-bottom to maintain aspect ratio */}
          <div className="relative pb-[56.25%]">
            <Image
              src={imageProps.src}
              alt={item.image?.alt || `image for ${item.name}`}
              title={item.image?.alt || `image for ${item.name}`}
              loading="eager"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              priority
              onError={() => setError(true)}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
