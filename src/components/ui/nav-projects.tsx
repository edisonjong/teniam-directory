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

export function NavProjects({
  projects,
  selectedCategory,
}: {
  projects: {
    name: string;
    url?: string;
    _id: string;
    avatar?: string;
    icon?: string;
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
    icon?: string;
  }) => {
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
          const Icon =
            ((item.icon &&
              Icons[item.icon as keyof typeof Icons]) as Icons.LucideIcon) ||
            Icons.Dot;

          const bgColor = stringToColor(item.name);
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                isActive={selectedCategory === item.slug.current}
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
