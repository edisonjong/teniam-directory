"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TechDirectoryContext } from "./tech-directory-context";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
// import { Brain, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import sidebarCategories from "@/config/sidebar-categories.json";

// Function to generate a consistent color based on the tag name
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
}
type Category = string;
export function NavProjects({
  categories,
  setSelectedCategory,
  selectedCategory,
}: {
  categories: (
    | {
        name: string;
        url?: string;
        _id: string;
        avatar?: string;
        icon?: string;
        slug: { current: string };
      }
    | {
        name: string;
        slug: { current: string };
        _id: string;
        categories?: {
          name: string;
          slug: { current: string };
          _id: string;
          icon?: string;
        }[];
      }
  )[];
  setSelectedCategory: (category: Category) => void;
  selectedCategory: Category;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keys = Array.from(searchParams.keys());
  const selectedKey = keys[0] === "f" ? keys[1] : keys[0];
  const queryKey = selectedKey; // Now safe to assign
  const queryValue = searchParams.get(queryKey);

  const handleCategoryClick = (item: {
    _id: string;
    slug: { current: string };
    name: string;
    icon?: string;
  }) => {
    setSelectedCategory(item.slug.current);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("tag");
    // Set the 'category' query param
    newParams.set("category", item.slug.current);

    // Push the updated URL
    router.push(`?${newParams.toString()}`, { scroll: false });

    // Close mobile sidebar when a selection is made
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  // Flatten categories from groups if needed
  const flatCategories = categories.flatMap((item) => {
    // Check if this is a group with nested categories
    if ('categories' in item && Array.isArray(item.categories) && item.categories.length > 0) {
      return item.categories.map((cat) => ({
        _id: cat._id,
        name: cat.name || '',
        slug: cat.slug,
        icon: cat.icon,
      }));
    }
    // Otherwise it's already a flat category
    return [{
      _id: item._id,
      name: item.name || '',
      slug: item.slug,
      icon: 'icon' in item ? item.icon : undefined,
    }];
  });

  // Get category groups from JSON config (this is the source of truth)
  const toolboxCategories = sidebarCategories.toolbox;
  const buildAssetsCategories = sidebarCategories.buildAssets;

  // Helper function to find a category from Sanity that matches a JSON category name
  const findMatchingCategory = (jsonCategoryName: string): typeof flatCategories[0] | null => {
    const normalizedJson = jsonCategoryName.toLowerCase().trim();
    return flatCategories.find((item) => {
      const normalizedItem = (item.name || '').toLowerCase().trim();
      // Exact match
      if (normalizedItem === normalizedJson) return true;
      // Partial matches for variations
      if (normalizedItem.includes(normalizedJson) || normalizedJson.includes(normalizedItem)) {
        // Additional checks for common variations
        if (normalizedJson === 'ai tools' && normalizedItem.includes('ai') && !normalizedItem.includes('tool')) return false;
        if (normalizedJson === 'developer tools' && normalizedItem === 'devtool') return true;
        if (normalizedJson === 'design tools' && normalizedItem === 'design') return true;
        if (normalizedJson === 'marketing tools' && normalizedItem === 'marketing') return true;
        if (normalizedJson === 'hosting & infra' && (normalizedItem.includes('hosting') || normalizedItem.includes('infra'))) return true;
        if (normalizedJson === 'payments' && normalizedItem === 'payment') return true;
        if (normalizedJson === 'ui kits' && (normalizedItem.includes('ui kit') || normalizedItem === 'ui')) return true;
        return true;
      }
      return false;
    }) || null;
  };

  // Build items in the order specified in JSON (JSON is source of truth)
  const toolboxItems = toolboxCategories
    .map(findMatchingCategory)
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const buildAssetsItems = buildAssetsCategories
    .map(findMatchingCategory)
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Other categories not in the defined groups
  const allJsonCategories = [...toolboxCategories, ...buildAssetsCategories];
  const otherItems = flatCategories.filter((item) => {
    const itemName = (item.name || '').toLowerCase().trim();
    return !allJsonCategories.some((jsonCat) => {
      const jsonCatName = jsonCat.toLowerCase().trim();
      return itemName === jsonCatName || 
             itemName.includes(jsonCatName) || 
             jsonCatName.includes(itemName);
    });
  });

  const renderCategoryItem = (item: {
    _id: string;
    slug: { current: string };
    name: string;
    icon?: string;
  }) => {
    const Icon =
      ((item.icon &&
        Icons[item.icon as keyof typeof Icons]) as Icons.LucideIcon) ||
      Icons.Dot;

    return (
      <SidebarMenuItem key={item.name}>
        <SidebarMenuButton
          isActive={queryValue === item.slug.current}
          onClick={() => handleCategoryClick(item)}
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <>
      {toolboxItems.length > 0 && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Toolbox</SidebarGroupLabel>
          <SidebarMenu>
            {toolboxItems.map(renderCategoryItem)}
          </SidebarMenu>
        </SidebarGroup>
      )}

      {buildAssetsItems.length > 0 && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Build Assets</SidebarGroupLabel>
          <SidebarMenu>
            {buildAssetsItems.map(renderCategoryItem)}
          </SidebarMenu>
        </SidebarGroup>
      )}

      {otherItems.length > 0 && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {otherItems.map(renderCategoryItem)}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
