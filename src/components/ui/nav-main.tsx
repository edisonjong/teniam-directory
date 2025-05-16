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
import { useRouter, useSearchParams } from "next/navigation";

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
      _id: string;
      slug: string;
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
  const router = useRouter();
  const searchParams = useSearchParams();
  // Initialize open state for categories with items
  // close existing tab if new one open
  // React.useEffect(() => {
  //   const initialState: Record<string, boolean> = {};
  //   items.forEach((item) => {
  //     if (item.items?.length) {
  //       initialState[item.id] = false;
  //     }
  //   });
  //   setOpenCategories(initialState);
  // }, [items]);

  const handleCategoryClick = (categoryId: string) => {
    const item = items.find((item) => item.id === categoryId);
    const newParams = new URLSearchParams(searchParams.toString());

    if (!item?.items?.length) {
      if (categoryId === "featured") {
        setViewMode("featured");
        setSelectedCategory(null);
        newParams.delete("category");
        newParams.set("f", "featured");
      } else if (categoryId === "bookmarks") {
        setViewMode("bookmarks");
        setSelectedCategory(null);
        newParams.delete("category");
        newParams.set("view", "bookmarks");
      } else if (categoryId === "ads") {
        setViewMode("sponsor");
        setSelectedCategory(null);
        newParams.delete("category");
        newParams.set("f", "sponsor");
      } else {
        setViewMode("all");
        const newCategory = categoryId === selectedCategory ? null : categoryId;
        setSelectedCategory(newCategory);

        if (newCategory) {
          newParams.set("category", newCategory);
        } else {
          newParams.delete("category");
        }
      }

      router.push(`?${newParams.toString()}`);
      if (isMobile) setOpenMobile(false);
    }
  };

  const handleSubCategoryClick = (slug: string) => {
    setViewMode("all");
    const newCategory = slug === selectedCategory ? null : slug;
    setSelectedCategory(newCategory);

    const newParams = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      newParams.set("category", newCategory);
    } else {
      newParams.delete("category");
    }

    router.push(`?${newParams.toString()}`);
    if (isMobile) setOpenMobile(false);
  };

  const toggleCategory = (categoryId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <SidebarGroup>
      <Button asChild disabled className="group whitespace-nowrap mb-2">
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

                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openCategories[item.id] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.slug}>
                          <SidebarMenuSubButton
                            isActive={selectedCategory === subItem.slug}
                            onClick={() => handleSubCategoryClick(subItem.slug)}
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
