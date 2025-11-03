import Link from "next/link";
import type { ItemInfo } from "@/types";
import { urlForImage } from "@/lib/image";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RelatedItemsProps {
  currentItem: ItemInfo;
  relatedItems: ItemInfo[];
  category?: string;
}

export function RelatedItems({ 
  currentItem, 
  relatedItems, 
  category 
}: RelatedItemsProps) {
  // Filter out the current item and limit to 6 items
  const filteredItems = relatedItems
    .filter(item => item._id !== currentItem._id)
    .slice(0, 6);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const imageProps = item?.image ? urlForImage(item.image) : null;
          const itemSlug = item.slug?.current;
          
          return (
            <Link 
              key={item._id} 
              href={itemSlug ? `/item/${itemSlug}` : "#"}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                {imageProps && (
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={imageProps.src}
                      alt={item.image?.alt || item.name || "Item image"}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  {item.description && (
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

