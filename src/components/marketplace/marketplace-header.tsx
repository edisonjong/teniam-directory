'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { CommandSearch } from '@/components/ui/command-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  HomeIcon,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MarketplaceSearch } from './marketplace-search';

type BlogHeaderProps = {
  posts: any[];
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function MarketplaceHeader({
  posts,
  searchParams,
}: BlogHeaderProps) {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState('default');

  const getSortIcon = useCallback(() => {
    switch (sortOrder) {
      case 'newest':
        return <ArrowDown className="h-4 w-4" />;
      case 'oldest':
        return <ArrowUp className="h-4 w-4" />;
      case 'a-z':
        return <SortAsc className="h-4 w-4" />;
      case 'z-a':
        return <SortDesc className="h-4 w-4" />;
      default:
        return <ArrowUpDown className="h-4 w-4" />;
    }
  }, [sortOrder]);

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams as any);

      setSortOrder(value);

      if (value === 'default') {
        params.delete('sort');
      } else if (value === 'newest') {
        params.set('sort', 'date-desc');
      } else if (value === 'oldest') {
        params.set('sort', 'date-asc');
      } else if (value === 'a-z') {
        params.set('sort', 'name-asc');
      } else if (value === 'z-a') {
        params.set('sort', 'name-desc');
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <div className=" flex w-full flex-col items-center  gap-8">
      <header className="flex w-full justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Breadcrumb className="flex-1 min-w-0">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <div className="flex items-center gap-1">
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/marketplace');
                    }}
                  >
                    Marketplace
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate">
                    All Products
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <MarketplaceSearch items={posts} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 mobile-touch-feedback"
                  aria-label="Sort"
                >
                  {getSortIcon()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange('default')}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Default
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('newest')}>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Highest Price
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('oldest')}>
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Lowest Price
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('a-z')}>
                  <SortAsc className="h-4 w-4 mr-2" />
                  A-Z
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('z-a')}>
                  <SortDesc className="h-4 w-4 mr-2" />
                  Z-A
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}
