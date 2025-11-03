import type { ItemFullInfo } from "@/types";
import { siteConfig } from "@/config/site";
import { urlForImage } from "@/lib/image";

interface ProductSchemaProps {
  item: ItemFullInfo;
}

export function ProductSchema({ item }: ProductSchemaProps) {
  const imageProps = item?.image ? urlForImage(item.image) : null;
  const itemUrl = item.link || `${siteConfig.url}/item/${item.slug?.current}`;
  
  // Calculate average rating if ratings exist
  const ratings = item.ratings || [];
  const avgRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": item.name,
    "description": item.description,
    "url": itemUrl,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    ...(imageProps?.src && {
      "image": imageProps.src,
    }),
    ...(item.publishDate && {
      "datePublished": item.publishDate,
    }),
    ...(item._updatedAt && {
      "dateModified": item._updatedAt,
    }),
    ...(item.pricePlan === "free" && {
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
    }),
    ...(avgRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Math.round(avgRating * 10) / 10,
        "ratingCount": ratings.length,
        "bestRating": 5,
        "worstRating": 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

