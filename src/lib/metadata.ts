import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { existsSync } from "fs";
import { join } from "path";

/**
 * Check if an OG image exists in the public directory
 * @param imagePath - Relative path from public directory (e.g., "og/category/ai-tools.png")
 * @returns Absolute URL if file exists, null otherwise
 */
export function getOgImageIfExists(imagePath: string): string | null {
  try {
    const publicPath = join(process.cwd(), "public", imagePath);
    if (existsSync(publicPath)) {
      return `${siteConfig.url}/${imagePath}`;
    }
  } catch (error) {
    // Silently fail if file check fails
  }
  return null;
}

/**
 * Construct the metadata object for the current page (in docs/guides)
 */
export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  canonicalUrl,
  image = siteConfig.image,
  noIndex = false,
  keywords,
  author = siteConfig.author,
}: {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
} = {}): Metadata {
  // If title already includes the site name (e.g., "Newtools – ..."), use it as-is
  // Otherwise, format it as "Site Name – Title"
  const fullTitle = title
    ? (title.includes(`${siteConfig.name} –`) || title === siteConfig.name ? title : `${siteConfig.name} – ${title}`)
    : siteConfig.name;
  return {
    title: fullTitle,
    description,
    keywords: keywords || siteConfig.keywords,
    authors: [
      {
        name: author,
      },
    ],
    creator: author,
    publisher: siteConfig.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: canonicalUrl
      ? {
        canonical: canonicalUrl,
      }
      : undefined,
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION && {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      }),
      ...(process.env.YANDEX_VERIFICATION && {
        yandex: process.env.YANDEX_VERIFICATION,
      }),
      ...(process.env.BING_VERIFICATION && {
        other: {
          "msvalidate.01": process.env.BING_VERIFICATION,
        },
      }),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl || siteConfig.url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image.startsWith("http") ? image : `${siteConfig.url}${image.startsWith("/") ? "" : "/"}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle || "Newtools — curated tools to build faster",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${siteConfig.url}${image.startsWith("/") ? "" : "/"}${image}`],
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.creator,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-32x32.png",
      apple: "/favicon.ico.jpeg",
    },
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
  };
}
