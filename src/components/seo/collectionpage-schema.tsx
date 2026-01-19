import { siteConfig } from "@/config/site";
import type { ItemFullInfo } from "@/types";
import { urlForImage } from "@/lib/image";

interface CollectionPageSchemaProps {
  name: string;
  description: string;
  url: string;
  items: ItemFullInfo[];
}

export function CollectionPageSchema({
  name,
  description,
  url,
  items,
}: CollectionPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": siteConfig.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/newtools_logo.png`,
      },
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": items.length,
      "itemListElement": items.map((item, index) => {
        const imageProps = item?.image ? urlForImage(item.image) : null;
        const itemUrl = item.link || `${siteConfig.url}/item/${item.slug?.current}`;
        
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": item.name,
            "description": item.description,
            "url": itemUrl,
            ...(imageProps?.src && {
              "image": imageProps.src,
            }),
          },
        };
      }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
