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

// Function to generate a consistent color based on the tag name
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

export function NavProjects({
  projects,
  selectedCategory,
}: {
  projects: {
    name: string;
    url?: string;
    _id: string;
    avatar?: string;
    slug: { current: string };
  }[];
  selectedCategory: string | null;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { setSelectedCategory } = React.useContext(TechDirectoryContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (item: {
    _id: string;
    slug: { current: string };
    name: string;
  }) => {
    debugger;
    const newSelectedCategory =
      item.slug.current === selectedCategory ? null : item.slug.current;
    setSelectedCategory(newSelectedCategory);

    const newParams = new URLSearchParams(searchParams.toString());

    if (newSelectedCategory) {
      newParams.set("category", item.slug.current);
    } else {
      newParams.delete("category");
    }

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
        {projects.map((item) => {
          const bgColor = stringToColor(item.name);
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                isActive={selectedCategory === item.slug.current}
                onClick={() => handleCategoryClick(item)}
              >
                <Avatar className="mr-2 h-6 w-6 rounded-md overflow-hidden">
                  <AvatarImage
                    src={item.avatar ? item.avatar : undefined}
                    alt={item.name}
                    className="rounded-md object-cover w-full h-full"
                  />
                  <AvatarFallback
                    className="rounded-md text-xs flex items-center justify-center"
                    style={{ backgroundColor: bgColor }}
                  >
                    {item.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
