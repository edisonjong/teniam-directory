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

  // Get category groups from JSON config
  const toolboxCategories = sidebarCategories.toolbox;
  const buildAssetsCategories = sidebarCategories.buildAssets;

  // Helper function to match category names (exact match first, then partial)
  const matchesCategory = (categoryName: string, targetNames: string[]): boolean => {
    const normalized = categoryName.toLowerCase().trim();
    return targetNames.some((target) => {
      const normalizedTarget = target.toLowerCase().trim();
      // Exact match
      if (normalized === normalizedTarget) return true;
      // Partial matches for variations
      if (normalized.includes(normalizedTarget) || normalizedTarget.includes(normalized)) {
        // Additional checks for common variations
        if (normalizedTarget === 'ai tools' && normalized.includes('ai') && !normalized.includes('tool')) return false;
        if (normalizedTarget === 'developer tools' && normalized === 'devtool') return true;
        if (normalizedTarget === 'design tools' && normalized === 'design') return true;
        if (normalizedTarget === 'marketing tools' && normalized === 'marketing') return true;
        if (normalizedTarget === 'hosting & infra' && (normalized.includes('hosting') || normalized.includes('infra'))) return true;
        if (normalizedTarget === 'payments' && normalized === 'payment') return true;
        if (normalizedTarget === 'ui kits' && (normalized.includes('ui kit') || normalized === 'ui')) return true;
        return true;
      }
      return false;
    });
  };

  // Filter categories into groups
  const toolboxItems = flatCategories.filter((item) =>
    matchesCategory(item.name || '', toolboxCategories)
  );

  const buildAssetsItems = flatCategories.filter((item) =>
    matchesCategory(item.name || '', buildAssetsCategories)
  );

  // Other categories not in the defined groups
  const otherItems = flatCategories.filter(
    (item) =>
      !matchesCategory(item.name || '', toolboxCategories) &&
      !matchesCategory(item.name || '', buildAssetsCategories)
  );

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
