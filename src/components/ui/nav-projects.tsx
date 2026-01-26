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
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
// import { Brain, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

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
  const pathname = usePathname();
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
  type FlatCategory = {
    _id: string;
    name: string;
    slug: { current: string };
    icon?: string;
  };

  const flatCategories: FlatCategory[] = categories.flatMap((item) => {
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

  // Category groups (hardcoded)
  const toolboxCategories = [
    "AI Tools",
    "Developer Tools",
    "Design Tools",
    "Marketing Tools",
    "Automation",
    "Analytics",
    "Hosting & Infra",
    "Payments",
  ];

  const buildAssetsCategories = [
    "Boilerplates",
    "Templates",
    "Themes",
    "UI Kits",
    "Components",
  ];

  // Helper function to find a category from Sanity that matches a category name
  // Use exact slug matching for consistency
  const findMatchingCategory = (categoryName: string): FlatCategory | null => {
    const normalizedTarget = categoryName.toLowerCase().trim();

    // First try exact name match
    const exactMatch = flatCategories.find((item) => {
      const normalizedItem = (item.name || '').toLowerCase().trim();
      return normalizedItem === normalizedTarget;
    });

    if (exactMatch) return exactMatch;

    // Fallback to slug match if name doesn't match
    return flatCategories.find((item) => {
      const slugMatch = item.slug.current.toLowerCase() === normalizedTarget.replace(/\s+/g, '-');
      if (slugMatch) return true;

      // Additional checks for common variations
      const normalizedItem = (item.name || '').toLowerCase().trim();
      if (normalizedTarget === 'ai tools' && normalizedItem.includes('ai') && !normalizedItem.includes('tool')) return false;
      if (normalizedTarget === 'developer tools' && normalizedItem === 'devtool') return true;
      if (normalizedTarget === 'design tools' && normalizedItem === 'design') return true;
      if (normalizedTarget === 'marketing tools' && normalizedItem === 'marketing') return true;
      if (normalizedTarget === 'hosting & infra' && (normalizedItem.includes('hosting') || normalizedItem.includes('infra'))) return true;
      if (normalizedTarget === 'payments' && normalizedItem === 'payment') return true;
      if (normalizedTarget === 'ui kits' && (normalizedItem.includes('ui kit') || normalizedItem === 'ui')) return true;

      return false;
    }) || null;
  };

  // Build items in the order specified (hardcoded categories are source of truth)
  // Store both the display name (from hardcoded list) and the matched Sanity category
  type CategoryItem = {
    displayName: string;
    sanityCategory: FlatCategory;
  };

  const toolboxItems: CategoryItem[] = toolboxCategories
    .map((displayName) => {
      const matched = findMatchingCategory(displayName);
      return matched ? { displayName, sanityCategory: matched } : null;
    })
    .filter((item): item is CategoryItem => item !== null);

  const buildAssetsItems: CategoryItem[] = buildAssetsCategories
    .map((displayName) => {
      const matched = findMatchingCategory(displayName);
      return matched ? { displayName, sanityCategory: matched } : null;
    })
    .filter((item): item is CategoryItem => item !== null);

  // Other categories not in the defined groups
  const allDefinedCategories = [...toolboxCategories, ...buildAssetsCategories];
  const otherItems = flatCategories.filter((item) => {
    const itemName = (item.name || '').toLowerCase().trim();
    return !allDefinedCategories.some((definedCat) => {
      const definedCatName = definedCat.toLowerCase().trim();
      return itemName === definedCatName ||
        itemName.includes(definedCatName) ||
        definedCatName.includes(itemName);
    });
  });

  const renderCategoryItem = (item: CategoryItem) => {
    const Icon =
      ((item.sanityCategory.icon &&
        Icons[item.sanityCategory.icon as keyof typeof Icons]) as Icons.LucideIcon) ||
      Icons.Dot;

    return (
      <SidebarMenuItem key={item.sanityCategory._id}>
        <SidebarMenuButton
          isActive={queryValue === item.sanityCategory.slug.current}
          onClick={() => handleCategoryClick(item.sanityCategory)}
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item.displayName}</span>
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

      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Resources</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/blogs">
                <Icons.BookOpen className="h-4 w-4" />
                <span>Blogs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {otherItems.length > 0 && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {otherItems.map((item) => {
              const Icon =
                ((item.icon &&
                  Icons[item.icon as keyof typeof Icons]) as Icons.LucideIcon) ||
                Icons.Dot;

              return (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton
                    isActive={queryValue === item.slug.current}
                    onClick={() => handleCategoryClick(item)}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
