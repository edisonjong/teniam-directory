import EmptyGrid from '@/components/shared/empty-grid';
import CustomPagination from '@/components/shared/pagination';
import { siteConfig } from '@/config/site';
import { getBlogs } from '@/data/blog';
import { POSTS_PER_PAGE } from '@/lib/constants';
import { constructMetadata } from '@/lib/metadata';
import { BlogCategoryFilter } from '@/components/marketplace/blog-category-filter';
import React from 'react';
import MarketplaceHeader from '@/components/marketplace/marketplace-header';
import MarketPlaceGrid from '@/components/marketplace/marketplace-grid';
export const metadata = constructMetadata({
  title: 'Marketplace',
  //   description: 'Read our latest blog posts',
  canonicalUrl: `${siteConfig.url}/marketplace`,
});

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log('BlogIndexPage, searchParams', searchParams);
  const { page } = searchParams as { [key: string]: string };
  const currentPage = page ? Number(page) : 1;
  const { posts, totalCount } = await getBlogs({ currentPage });
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  console.log(
    'BlogIndexPage, totalCount',
    totalCount,
    ', totalPages',
    totalPages
  );

  return (
    <div>
      <div className=" w-full flex flex-col items-center justify-center gap-8">
        <MarketplaceHeader posts={posts} searchParams={searchParams || {}} />
        <BlogCategoryFilter />
      </div>
      {/* when no posts are found */}
      {posts?.length === 0 && <EmptyGrid />}

      {/* when posts are found */}
      {posts && posts?.length > 0 && (
        <div>
          <MarketPlaceGrid posts={posts} />

          <div className="mt-8 flex items-center justify-center">
            <CustomPagination routePreix="/blog" totalPages={totalPages} />
          </div>
        </div>
      )}
    </div>
  );
}
