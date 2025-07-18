'use client';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MotionHeading, MotionWrapper } from '../shared/motion-animation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn, getItemTargetLinkInWebsite, getLocaleDate } from '@/lib/utils';
import ItemCustomMdx from './item-custom-mdx';
import { Safari } from '../magicui/safari';
import SponsorItemCard from './item-card-sponsor';
import { urlForIcon, urlForImage } from '@/lib/image';
import BackToDirectoryButton from '../ui/back-to-directory-button';

export default function OverviewSection({ item, sponsorItem }) {
  const imageProps = item?.image ? urlForImage(item.image) : null;
  const imageBlurDataURL = item?.image?.blurDataURL || null;
  const iconProps = item?.icon ? urlForIcon(item.icon) : null;
  const iconBlurDataURL = item?.icon?.blurDataURL || null;
  const publishDate = item.publishDate || item._createdAt;
  const date = getLocaleDate(publishDate);
  const itemLink = getItemTargetLinkInWebsite(item as any);
  return (
    <section>
      <div className="relative ">
        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Link href={itemLink}>
                  <div className="flex  items-center space-x-3">
                    <div className="flex items-center justify-center p-[2px] w-12 h-12 bg-white dark:bg-white rounded-lg border border-gray-300">
                      {iconProps?.src ? (
                        <Avatar className="bg-transparent rounded">
                          <div className=" ">
                            <AvatarImage
                              src={iconProps?.src}
                              alt={item.icon?.alt || `icon of ${item.name}`}
                              title={item.icon?.alt || `icon of ${item.name}`}
                              className="object-contain "
                            />
                          </div>
                          <AvatarFallback>
                            {item.icon?.alt?.[0]?.toUpperCase() || 'CN'}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <span className="text-gray-600 text-3xl font-bold">{`<>`}</span>
                      )}
                    </div>
                    <div>
                      <h1
                        className={cn(
                          'text-4xl tracking-wider font-bold flex items-center gap-2',
                          item.featured &&
                            'text-gradient_indigo-purple font-semibold'
                        )}
                      >
                        {item.name}
                      </h1>
                    </div>
                  </div>
                </Link>
              </MotionWrapper>

              <MotionHeading
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10 max-w-xl text-3xl font-medium sm:text-4xl lg:text-5xl"
              >
                {item.description}
              </MotionHeading>

              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl px-5 text-base"
                  >
                    <Link href={itemLink}>
                      <Globe className="mr-2 h-4 w-4" />
                      <span className="text-nowrap">Visit Website</span>
                    </Link>
                  </Button>
                </div>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-10.5 rounded-xl px-5"
                >
                  <Link href="/submit">Submit</Link>
                </Button>
              </MotionWrapper>

              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="relative space-y-4 mt-8"
              >
                <ItemCustomMdx source={item.introduction} />
              </MotionWrapper>
              <h3 className="mt-6 mb-2 text-lg font-medium">Tags</h3>
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className=" flex flex-wrap gap-2 items-baseline"
              >
                {item?.tags && item?.tags?.length > 0 ? (
                  item?.tags?.map((tag, index: number) => (
                    <Link href={`/directories?tag=${tag.name}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        key={index}
                        className="gap-1 pr-2 shadow-none transition-all duration-300 pointer-events-none cursor-default"
                      >
                        #{tag.name}
                      </Button>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No tags added.
                  </p>
                )}
              </MotionWrapper>

              <div className="border-t border-dashed my-8" />

              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-full border border-border">
                    <AvatarImage
                      src={item?.submitter?.avatar}
                      alt={item?.submitter?.name || 'Anonymous'}
                    />
                    <AvatarFallback>
                      {(item?.submitter?.name || 'Anonymous')
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-sm font-medium md:text-base">
                      {item?.submitter?.name || 'Anonymous'}
                    </h3>
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {item?.submitter?.role || 'Contributor'}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <time dateTime={publishDate}> {date}</time>
                </div>
              </MotionWrapper>
            </div>
            <div className="flex flex-col">
              <MotionWrapper
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="relative">
                  <Safari
                    url={itemLink}
                    className="size-full"
                    imageSrc={imageProps?.src}
                  />
                </div>
              </MotionWrapper>

              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mt-8"
              >
                {sponsorItem &&
                  sponsorItem.map((item, idx) => (
                    <SponsorItemCard key={idx} item={item as any} />
                  ))}
              </MotionWrapper>
            </div>
          </div>
        </div>
        <div className="pt-8 md:pt-16 px-6">
          <BackToDirectoryButton />
        </div>
      </div>
    </section>
  );
}
