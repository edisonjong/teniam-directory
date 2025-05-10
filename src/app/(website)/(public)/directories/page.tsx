import { getItems } from "@/data/item";
import { DEFAULT_SORT, SORT_FILTER_LIST } from "@/lib/constants";
import React from "react";
import ClientComponent from "./ClientComponent";
import { sanityFetch } from "@/sanity/lib/fetch";
import { GroupListQueryResult, TagListQueryResult } from "@/sanity.types";
import { groupListQuery, tagListQuery } from "@/sanity/lib/queries";

const Page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const {
    category,
    tag,
    sort,
    page,
    q: query,
    f: filter,
  } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    SORT_FILTER_LIST.find((item) => item.slug === sort) || DEFAULT_SORT;
  const currentPage = page ? Number(page) : 1;
  const sponsorItems = [];
  const showSponsor = false;
  const hasSponsorItem = true;

  const { items } = await getItems({
    category,
    tag,
    sortKey,
    reverse,
    query,
    filter,
    currentPage,
    hasSponsorItem,
  });
  const [groupList, tagList] = await Promise.all([
    sanityFetch<GroupListQueryResult>({
      query: groupListQuery,
    }),
    sanityFetch<TagListQueryResult>({
      query: tagListQuery,
    }),
  ]);

  return (
    <div>
      <ClientComponent items={items} groupList={groupList} tagList={tagList} />
    </div>
  );
};

export default Page;
