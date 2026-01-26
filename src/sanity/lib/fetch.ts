import { sanityClient } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import type { ClientPerspective, QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

/**
 * https://www.sanity.io/plugins/next-sanity
 *
 * Used to fetch data in Server Components, it has built in support for handling Draft Mode and perspectives.
 * When using the "published" perspective then time-based revalidation is used,
 * set to match the time-to-live on Sanity's API CDN (60 seconds)
 * and will also fetch from the CDN.
 * When using the "previewDrafts" perspective then the data is fetched from the live API and isn't cached,
 * it will also fetch draft content that isn't published yet.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  perspective = process.env.NODE_ENV === "development" || draftMode().isEnabled
    ? "previewDrafts"
    : "published",
  disableCache,
}: {
  query: string;
  params?: QueryParams;
  perspective?: Omit<ClientPerspective, "raw">;
  disableCache?: boolean;
}) {
  // console.log('sanityFetch, perspective', perspective, 'query', query);
  if (perspective === "previewDrafts") {
    return sanityClient.fetch<QueryResponse>(query, params, {
      perspective: "previewDrafts",
      // The token is required to fetch draft content
      token,
      // The `previewDrafts` perspective isn't available on the API CDN
      useCdn: false,
      // And we can't cache the responses as it would slow down the live preview experience
      next: { revalidate: 0 },
    });
  }
  // Determine cache TTL based on query type for optimal performance
  const getCacheTTL = (query: string): number => {
    // Shorter TTL for frequently updated content
    if (query.includes('item') || query.includes('submission')) {
      return 30; // 30 seconds for directory items and submissions
    }
    if (query.includes('blog') || query.includes('post')) {
      return 60; // 60 seconds for blog content
    }
    // Longer TTL for stable content
    if (query.includes('category') || query.includes('tag') || query.includes('group')) {
      return 300; // 5 minutes for category/tag data (less frequently updated)
    }
    if (query.includes('user') || query.includes('account')) {
      return 120; // 2 minutes for user data
    }
    // Default TTL for directories and other pages
    return 30; // 30 seconds default for directories page
  };

  return sanityClient.fetch<QueryResponse>(query, params, {
    perspective: "published",
    // The `published` perspective is available on the API CDN
    useCdn: !disableCache,
    // Smart cache TTL based on content type
    next: { revalidate: disableCache ? 0 : getCacheTTL(query) },
  });
}
