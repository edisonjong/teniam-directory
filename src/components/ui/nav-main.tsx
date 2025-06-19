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
type Platform = string;
export function NavMain({
  items,
  selectedPlatform,
  setSelectedPlatform,
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
  setSelectedPlatform: (platform: Platform) => void;
  selectedPlatform: Platform;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  // const [openCategories, setOpenCategories] = React.useState<
  //   Record<string, boolean>
  // >({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("f");
  const handlePlatformClick = (platformId: string) => {
    const item = items.find((item) => item.id === platformId);
    const newParams = new URLSearchParams(searchParams.toString());
    if (!item?.items?.length) {
      if (platformId === "featured") {
        newParams.delete("category");
        newParams.delete("tag");
        newParams.set("f", "featured");
      } else if (platformId === "bookmarks") {
        newParams.delete("category");
        newParams.delete("tag");
        newParams.set("f", "bookmark");
      } else if (platformId === "ads") {
        newParams.delete("category");
        newParams.delete("tag");
        newParams.set("f", "sponsor");
      } else if (platformId === "tags") {
        newParams.delete("category");
        newParams.delete("f");
        newParams.set("tag", "all");
      }
      setSelectedPlatform(platformId);
      router.push(`?${newParams.toString()}`);
      if (isMobile) setOpenMobile(false);
    }
  };

  // const handleSubCategoryClick = (slug: string) => {
  //   const newParams = new URLSearchParams(searchParams.toString());

  //   router.push(`?${newParams.toString()}`);
  //   if (isMobile) setOpenMobile(false);
  // };

  // const togglePlatform = (platformId: string, event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   setSelectedPlatform(platformId);
  // };

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
          // const hasSubItems = item.items && item.items.length > 0;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={filterParam === item.id}
                onClick={() => handlePlatformClick(item.id)}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{item.title}</span>
              </SidebarMenuButton>

              {/* {hasSubItems ? (
                <div className="w-full">
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={(e) => togglePlatform(item.id, e)}
                    className="w-full"
                    isActive={selectedPlatform === item.id}
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
                            // isActive={selectedCategory === subItem.slug}
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
                  // isActive={
                  //   isSpecialCategory ? false : selectedCategory === item.id
                  // }
                  onClick={() => handleCategoryClick(item.id)}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )} */}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
