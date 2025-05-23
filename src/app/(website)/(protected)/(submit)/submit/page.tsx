import { SubmitForm } from "@/components/submit/submit-form";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
import type {
  CategoryListQueryResult,
  CoreTechnologyListQueryResult,
  TagListQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  categoryListQuery,
  coreTechnologyListQuery,
  tagListQuery,
} from "@/sanity/lib/queries";

export const metadata = constructMetadata({
  title: "Submit your product (1/3)",
  description: "Submit your product (1/3) – Enter product details",
  canonicalUrl: `${siteConfig.url}/submit`,
});

export default async function SubmitPage() {
  const [categoryList, tagList, coreTechnologyList] = await Promise.all([
    sanityFetch<CategoryListQueryResult>({
      query: categoryListQuery,
    }),
    sanityFetch<TagListQueryResult>({
      query: tagListQuery,
    }),
    sanityFetch<CoreTechnologyListQueryResult>({
      query: coreTechnologyListQuery,
    }),
  ]);

  return (
    <SubmitForm
      tagList={tagList}
      categoryList={categoryList}
      coreTechnologyList={coreTechnologyList}
    />
  );
}
