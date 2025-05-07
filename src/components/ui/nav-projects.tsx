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
  selectedTag,
}: {
  projects: {
    name: string;
    url: string;
    id: string;
    avatar?: string;
  }[];
  selectedTag: string | null;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { setSelectedTag } = React.useContext(TechDirectoryContext);

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId === selectedTag ? null : tagId);

    // Close mobile sidebar when a selection is made
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Tags</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const bgColor = stringToColor(item.name);
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                isActive={selectedTag === item.id}
                onClick={() => handleTagClick(item.id)}
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
