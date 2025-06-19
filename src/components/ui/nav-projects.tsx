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
  categories: {
    name: string;
    url?: string;
    _id: string;
    avatar?: string;
    icon?: string;
    slug: { current: string };
  }[];
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

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Categories</SidebarGroupLabel>
      <SidebarMenu>
        {categories.map((item) => {
          const Icon =
            ((item.icon &&
              Icons[item.icon as keyof typeof Icons]) as Icons.LucideIcon) ||
            Icons.Dot;

          const bgColor = stringToColor(item.name);
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
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
