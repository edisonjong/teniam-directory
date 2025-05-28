"use server";

import { sanityClient } from "@/sanity/lib/client";

export async function toggleBookmarkById(id: string): Promise<boolean> {
  // Get current document
  const item = await sanityClient.getDocument(id);

  if (!item) {
    throw new Error("Document not found");
  }

  // Toggle the bookmark field
  const updated = await sanityClient
    .patch(id)
    .set({ bookmark: !item.bookmark })
    .commit();

  // Publish the updated document
  await sanityClient
    .patch(id)
    .set({}) // no changes, just to trigger publish
    .commit({ visibility: "async" });

  // Alternatively, you can use `sanityClient`'s publish method if available:
  // await sanityClient.publish(id);

  return updated.bookmark;
}
// Fetch filtered items based on query param
export async function fetchFilteredItems(filter?: string) {
  let query = `*[_type == "item"]`; // Example query for product type

  if (filter === "bookmark") {
    query = `*[_type == "item" && bookmark == true]`;
  }

  const items = await sanityClient.fetch(query);
  return items;
}
