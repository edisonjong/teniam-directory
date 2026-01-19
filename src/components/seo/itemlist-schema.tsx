import { siteConfig } from "@/config/site";
import type { ItemInfo } from "@/types";
import { urlForImage } from "@/lib/image";

interface ItemListSchemaProps {
  items: ItemInfo[];
  name: string;
  description?: string;
  url: string;
}

export function ItemListSchema({ items, name, description, url }: ItemListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "description": description || `Curated list of ${name} tools and resources`,
    "url": url,
    "numberOfItems": items.length,
    "itemListElement": items.slice(0, 20).map((item, index) => {
      const imageProps = item?.image ? urlForImage(item.image) : null;
      const itemUrl = item.link || `${siteConfig.url}/item/${item.slug?.current}`;
      
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": item.name || "Untitled",
          "description": item.description || "",
          "url": itemUrl,
          ...(imageProps?.src && {
            "image": imageProps.src,
          }),
          "applicationCategory": "WebApplication",
          "operatingSystem": "Web",
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
