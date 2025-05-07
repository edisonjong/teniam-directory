"use client";

import * as React from "react";
import { ChevronDown, UploadIcon, type LucideIcon } from "lucide-react";

import { TechDirectoryContext } from "./tech-directory-context";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./button";
import Link from "next/link";

export function NavMain({
  items,
  selectedCategory,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    id: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      id: string;
    }[];
  }[];
  selectedCategory: string | null;
}) {
  const { setSelectedCategory, setViewMode } =
    React.useContext(TechDirectoryContext);
  const { isMobile, setOpenMobile } = useSidebar();
  const [openCategories, setOpenCategories] = React.useState<
    Record<string, boolean>
  >({});

  // Initialize open state for categories with items
  React.useEffect(() => {
    const initialState: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.items?.length) {
        initialState[item.id] = false;
      }
    });
    setOpenCategories(initialState);
  }, [items]);

  const handleCategoryClick = (categoryId: string) => {
    const item = items.find((item) => item.id === categoryId);

    if (!item?.items?.length) {
      // Special handling for Featured, Bookmarks, and Ads
      if (categoryId === "featured") {
        setViewMode("featured");
        setSelectedCategory(null);
      } else if (categoryId === "bookmarks") {
        setViewMode("bookmarks");
        setSelectedCategory(null);
      } else if (categoryId === "ads") {
        setViewMode("ads");
        setSelectedCategory(null);
      } else {
        // Regular category
        setViewMode("all");
        setSelectedCategory(
          categoryId === selectedCategory ? null : categoryId
        );
      }

      // Close mobile sidebar when a selection is made
      if (isMobile) {
        setOpenMobile(false);
      }
    }
  };

  const handleSubCategoryClick = (categoryId: string) => {
    setViewMode("all");
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);

    // Close mobile sidebar when a selection is made
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const toggleCategory = (categoryId: string, event: React.MouseEvent) => {
    // Prevent the click from also triggering the parent's onClick
    event.stopPropagation();

    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <SidebarGroup>
      {/* <Button asChild size="lg" className="rounded-xl px-5 text-base">
        <Link href="#link">
          <span className="text-nowrap">Submit</span>
        </Link>
      </Button> */}
      <Button asChild disabled className="group whitespace-nowrap">
        <Link
          href="/submit"
          prefetch={false}
          className="flex items-center justify-center space-x-2"
        >
          <UploadIcon className="w-4 h-4" />
          <span>Submit</span>
        </Link>
      </Button>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const hasSubItems = item.items && item.items.length > 0;

          // Check if this is a special category (featured, bookmarks, or ads)
          const isSpecialCategory =
            item.id === "featured" ||
            item.id === "bookmarks" ||
            item.id === "ads";

          return (
            <SidebarMenuItem key={item.title}>
              {hasSubItems ? (
                <div className="w-full">
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={(e) => toggleCategory(item.id, e)}
                    className="w-full"
                    isActive={selectedCategory === item.id}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        openCategories[item.id] ? "rotate-180" : ""
                      }`}
                    />
                  </SidebarMenuButton>

                  {/* Only render the submenu if the category is open */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openCategories[item.id] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={selectedCategory === subItem.id}
                            onClick={() => handleSubCategoryClick(subItem.id)}
                          >
                            {subItem.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </div>
                </div>
              ) : (
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={
                    isSpecialCategory ? false : selectedCategory === item.id
                  }
                  onClick={() => handleCategoryClick(item.id)}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
