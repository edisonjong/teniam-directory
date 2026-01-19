import ItemGrid from "@/components/item/item-grid";
import EmptyGrid from "@/components/shared/empty-grid";
import CustomPagination from "@/components/shared/pagination";
import { ItemListSchema } from "@/components/seo/itemlist-schema";
import { siteConfig } from "@/config/site";
import { getItems } from "@/data/item";
import {
  DEFAULT_SORT,
  ITEMS_PER_PAGE,
  SORT_FILTER_LIST,
} from "@/lib/constants";
import { constructMetadata, getOgImageIfExists } from "@/lib/metadata";
import type { CategoryQueryResult, SponsorItemListQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { categoryQuery, sponsorItemListQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const category = await sanityFetch<CategoryQueryResult>({
    query: categoryQuery,
    params: { slug: params.slug },
  });
  if (!category) {
    console.warn(
      `generateMetadata, category not found for slug: ${params.slug}`,
    );
    return;
  }

  // Check for category-specific OG image, fallback to default
  const categoryOgImage = getOgImageIfExists(`og/category/${params.slug}.png`);
  const ogImage = categoryOgImage || siteConfig.image;

  // Build description template: "Curated {category} tools and resources — updated regularly. Browse top picks, tags, and alternatives."
  const description = category.description || `Curated ${category.name} tools and resources — updated regularly. Browse top picks, tags, and alternatives.`;

  return constructMetadata({
    title: `${category.name} | Newtools`,
    description,
    canonicalUrl: `${siteConfig.url}/category/${params.slug}`,
    image: ogImage,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const sponsorItems = (await sanityFetch<SponsorItemListQueryResult>({
    query: sponsorItemListQuery,
  })) || [];
  // console.log("CategoryPage, sponsorItems", sponsorItems);
  const showSponsor = true;
  const hasSponsorItem = showSponsor && sponsorItems.length > 0;
  
  const { sort, page } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    SORT_FILTER_LIST.find((item) => item.slug === sort) || DEFAULT_SORT;
  const currentPage = page ? Number(page) : 1;
  const { items, totalCount } = await getItems({
    category: params.slug,
    sortKey,
    reverse,
    currentPage,
    hasSponsorItem,
  });
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  console.log(
    "CategoryPage, totalCount",
    totalCount,
    ", totalPages",
    totalPages,
  );

  const category = await sanityFetch<CategoryQueryResult>({
    query: categoryQuery,
    params: { slug: params.slug },
  });

  const categoryName = category?.name || params.slug;
  const categoryDescription = category?.description || `Curated ${categoryName} tools and resources`;

  return (
    <>
      {items && items.length > 0 && (
        <ItemListSchema
          items={items}
          name={`${categoryName} Tools`}
          description={categoryDescription}
          url={`${siteConfig.url}/category/${params.slug}`}
        />
      )}
      <div>
        {/* when no items are found */}
        {items?.length === 0 && <EmptyGrid />}

        {/* when items are found */}
        {items && items.length > 0 && (
          <section className="">
            <ItemGrid items={items} sponsorItems={sponsorItems} showSponsor={showSponsor} />

            <div className="mt-8 flex items-center justify-center">
              <CustomPagination
                routePreix={`/category/${params.slug}`}
                totalPages={totalPages}
              />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
