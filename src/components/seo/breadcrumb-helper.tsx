import type { ItemFullInfo } from "@/types";
import { siteConfig } from "@/config/site";
import type { BreadcrumbItem } from "./breadcrumb-schema";

export function buildBreadcrumbItems(item: ItemFullInfo): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
  ];

  // Add directory/category section
  items.push({ name: "Directory", url: "/directories" });

  // Add category if exists
  if (item.categories && item.categories.length > 0) {
    const firstCategory = item.categories[0];
    if (firstCategory.slug?.current) {
      items.push({
        name: firstCategory.name || "Category",
        url: `/category/${firstCategory.slug.current}`,
      });
    }
  }

  // Add current item
  if (item.name && item.slug?.current) {
    items.push({
      name: item.name,
      url: `/item/${item.slug.current}`,
    });
  }

  return items;
}

