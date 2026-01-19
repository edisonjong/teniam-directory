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
  // If title already includes the site name (e.g., "Newtools – ..." or "Newtools | ..."), use it as-is
  // Otherwise, format it as "Site Name – Title"
  const fullTitle = title
    ? (title.includes(`${siteConfig.name} –`) ||
      title.includes(`${siteConfig.name} |`) ||
      title.startsWith(`${siteConfig.name} `) ||
      title === siteConfig.name ? title : `${siteConfig.name} – ${title}`)
    : siteConfig.name;
  const finalKeywords = keywords || siteConfig.keywords;
  const finalImage = image.startsWith("http") ? image : `${siteConfig.url}${image.startsWith("/") ? "" : "/"}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: finalKeywords,
    authors: [
      {
        name: author,
        url: siteConfig.url,
      },
    ],
    creator: author,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
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
        languages: {
          "en-US": canonicalUrl,
        },
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
          url: finalImage,
          width: 1200,
          height: 630,
          alt: fullTitle || "Newtools — curated tools to build faster",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [finalImage],
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.creator,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon-32x32.png",
      apple: [
        { url: "/favicon.ico.jpeg", sizes: "180x180", type: "image/jpeg" },
      ],
    },
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
    category: "Technology",
  };
}
