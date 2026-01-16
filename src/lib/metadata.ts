import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

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
  const fullTitle = title ? `${title} - ${siteConfig.name}` : siteConfig.name;
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
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
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
