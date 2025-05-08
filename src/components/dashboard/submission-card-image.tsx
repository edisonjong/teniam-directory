"use client";

import { urlForImage } from "@/lib/image";
import type { ItemInfo } from "@/types";
import { HashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SubmissionCardImageProps = {
  item: ItemInfo;
};

export default function SubmissionCardImage({
  item,
}: SubmissionCardImageProps) {
  // console.log('SubmissionCard, item:', item);
  const imageProps = item?.image ? urlForImage(item.image) : null;
  const imageBlurDataURL = item?.image?.blurDataURL || null;
  // console.log(`SubmissionCard, imageBlurDataURL:${imageBlurDataURL}`);

  return (
    <div className="relative group overflow-hidden rounded-lg aspect-[16/9] bg-black">
      {/* Image with fallback */}
      <div className="relative w-full h-full">
        {imageProps ? (
          <Image
            src={imageProps.src}
            alt={item.image?.alt || `image for ${item.name}`}
            loading="eager"
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            priority
            {...(imageBlurDataURL && {
              placeholder: "blur",
              blurDataURL: imageBlurDataURL,
            })}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Bottom-left tags/categories */}
      {(item.categories?.length > 0 || item.tags?.length > 0) && (
        <div className="absolute left-2 bottom-2 z-10">
          <div className="flex flex-col gap-2">
            {item.categories?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.categories.map((category) => (
                  <span
                    key={category._id}
                    className="text-xs font-medium text-white bg-black/70 px-2 py-1 rounded-md backdrop-blur-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {item.tags.slice(0, 5).map((tag) => (
                  <Link
                    key={tag._id}
                    href={`/tag/${tag.slug.current}`}
                    className="flex items-center hover:text-white transition-colors"
                  >
                    <HashIcon className="w-3 h-3 text-gray-300 mr-1" />
                    <span className="text-xs text-gray-300">{tag.name}</span>
                  </Link>
                ))}
                {item.tags.length > 5 && (
                  <span className="text-xs text-gray-300">
                    +{item.tags.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <Link
        href={item.publishDate ? `/item/${item.slug.current}` : "#"}
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          item.publishDate
            ? "bg-black/0 group-hover:bg-black/50 cursor-pointer"
            : "bg-black/50 cursor-default"
        }`}
      >
        <span
          className={`text-white text-lg font-semibold transition-opacity duration-300 ${
            item.publishDate
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-100"
          }`}
        >
          {item.publishDate ? "View  on site" : "Coming Soon"}
        </span>
      </Link>
    </div>
  );
}
