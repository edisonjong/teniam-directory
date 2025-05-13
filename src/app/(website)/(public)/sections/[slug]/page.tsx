import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UrlPreview } from '@/components/shared/url-preview';
import { TailwindLogo } from '@/components/logo';
import SubscribeSection from '../subscribe-section';
import IntegrationsSection from '../integrations-section';
import { sanityFetch } from '@/sanity/lib/fetch';
import { ItemFullInfo } from '@/types';
import ShareButton from '@/components/shared/share-button';
import {
  itemFullInfoBySlugQuery,
  sponsorItemListQuery,
} from '@/sanity/lib/queries';
import { SponsorItemListQueryResult } from '@/sanity.types';
import { notFound } from 'next/navigation';
import {
  MotionHeading,
  MotionWrapper,
} from '@/components/shared/motion-animation';
import { urlForIcon, urlForImage } from '@/lib/image';
import { cn, getItemTargetLinkInWebsite, getLocaleDate } from '@/lib/utils';
import Image from 'next/image';
import ItemCustomMdx from '@/components/item/item-custom-mdx';

interface ItemPageProps {
  params: { slug: string };
}

export default async function SimplifiedHero({ params }: ItemPageProps) {
  const [item, sponsorItems] = await Promise.all([
    sanityFetch<ItemFullInfo>({
      query: itemFullInfoBySlugQuery,
      params: { slug: params.slug },
    }),
    sanityFetch<SponsorItemListQueryResult>({
      query: sponsorItemListQuery,
    }),
  ]);

  if (!item) {
    console.error('ItemPage, item not found');
    return notFound();
  }

  const imageProps = item?.image ? urlForImage(item.image) : null;
  const imageBlurDataURL = item?.image?.blurDataURL || null;
  const iconProps = item?.icon ? urlForIcon(item.icon) : null;
  const iconBlurDataURL = item?.icon?.blurDataURL || null;
  const publishDate = item.publishDate || item._createdAt;
  const date = getLocaleDate(publishDate);
  const itemLink = getItemTargetLinkInWebsite(item);
  const sponsorItem = sponsorItems?.length
    ? sponsorItems[Math.floor(Math.random() * sponsorItems.length)]
    : null;

  return (
    <main className="overflow-x-hidden">
      <section>
        <div className="relative pt-12 md:pt-24">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex justify-end mb-6">
              <ShareButton />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="flex flex-col">
                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <Link href={itemLink}>
                    <div className="flex w-full items-center gap-4">
                      {iconProps?.src && (
                        <Image
                          src={iconProps.src}
                          alt={item.icon?.alt || `icon of ${item.name}`}
                          title={item.icon?.alt || `icon of ${item.name}`}
                          width={32}
                          height={32}
                          className="object-cover image-scale"
                          {...(iconBlurDataURL && {
                            placeholder: 'blur',
                            blurDataURL: iconBlurDataURL,
                          })}
                        />
                      )}
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

                <div className="border-t border-dashed my-8" />

                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://avatars.githubusercontent.com/u/46175697?v=4"
                      alt="Mubashir Hussan"
                      className="h-10 w-10 rounded-full object-cover border border-border"
                    />
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

              {/* Right Column */}
              <div className="flex flex-col">
                <MotionWrapper
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative w-full overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                    <UrlPreview
                      url={itemLink}
                      className="w-full"
                      imageProps={imageProps}
                      item={item}
                    />
                  </div>
                </MotionWrapper>

                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="mt-8"
                >
                  <h3 className="mb-6 text-lg font-medium">
                    Core Technologies
                  </h3>
                  <div className="grid grid-cols-1 gap-4 gap-y-6">
                    {item?.coreTechnologies?.map((tech, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {tech?.icon && (
                          <div className="bg-background size-10 rounded-full border p-0.5 shadow shadow-zinc-950/5 flex-shrink-0">
                            <Image
                              src={urlForIcon(tech.icon)?.src || ''}
                              alt={tech.icon.alt || `icon of ${tech.name}`}
                              title={tech.icon.alt || `icon of ${tech.name}`}
                              height={40}
                              width={40}
                              className="object-cover image-scale"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div>
                          <span className="block text-sm font-medium">
                            {tech.name}
                          </span>
                          <span className="text-muted-foreground block text-xs">
                            {tech.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </MotionWrapper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
      <IntegrationsSection />
    </main>
  );
}
