// import ItemBreadCrumb from "@/components/item/item-bread-crumb";
// import SponsorItemCard from "@/components/item/item-card-sponsor";
// import ItemCustomMdx from "@/components/item/item-custom-mdx";
// import ItemGrid from "@/components/item/item-grid";
// import TechnologyStack from "@/components/item/technology-stack";
// import BackButton from "@/components/shared/back-button";
// import { UserAvatar } from "@/components/shared/user-avatar";
// import { useBookmarks } from "@/components/ui/bookmark-context";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import { siteConfig } from "@/config/site";
// import { urlForIcon, urlForImage } from "@/lib/image";
// import { constructMetadata } from "@/lib/metadata";
// import { cn, getItemTargetLinkInWebsite, getLocaleDate } from "@/lib/utils";
// import type {
//   ItemInfoBySlugQueryResult,
//   SponsorItemListQueryResult,
// } from "@/sanity.types";
// import { sanityFetch } from "@/sanity/lib/fetch";
// import {
//   itemFullInfoBySlugQuery,
//   itemInfoBySlugQuery,
//   sponsorItemListQuery,
// } from "@/sanity/lib/queries";
// import type { ItemFullInfo } from "@/types";
// import {
//   ArrowLeft,
//   Bookmark,
//   GlobeIcon,
//   HashIcon,
//   LayoutGridIcon,
//   Share2,
// } from "lucide-react";
// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata | undefined> {
//   const item = await sanityFetch<ItemInfoBySlugQueryResult>({
//     query: itemInfoBySlugQuery,
//     params: { slug: params.slug },
//   });
//   if (!item) {
//     console.warn(`generateMetadata, item not found for slug: ${params.slug}`);
//     return;
//   }

//   const imageProps = item?.image ? urlForImage(item?.image) : null;
//   return constructMetadata({
//     title: `${item.name}`,
//     description: item.description,
//     canonicalUrl: `${siteConfig.url}/item/${params.slug}`,
//     image: imageProps?.src,
//   });
// }

// interface ItemPageProps {
//   params: { slug: string };
// }

// export default async function ItemPage({ params }: ItemPageProps) {
//   // if you do not support sponsor item, you can use this code
//   // const item = await sanityFetch<ItemFullInfo>({
//   //   query: itemFullInfoBySlugQuery,
//   //   params: { slug: params.slug },
//   // });

//   // if you support sponsor item, you can use this code
//   const [item, sponsorItems] = await Promise.all([
//     sanityFetch<ItemFullInfo>({
//       query: itemFullInfoBySlugQuery,
//       params: { slug: params.slug },
//     }),
//     sanityFetch<SponsorItemListQueryResult>({
//       query: sponsorItemListQuery,
//     }),
//   ]);

//   if (!item) {
//     console.error("ItemPage, item not found");
//     return notFound();
//   }
//   const members = [
//     {
//       name: "Mubashir Hussan",
//       role: "Sanity Developer",
//       avatar: "https://avatars.githubusercontent.com/u/46175697?v=4",
//     },
//   ];
//   const imageProps = item?.image ? urlForImage(item?.image) : null;
//   console.log("item", imageProps);

//   const imageBlurDataURL = item?.image?.blurDataURL || null;
//   const iconProps = item?.icon ? urlForIcon(item.icon) : null;
//   const iconBlurDataURL = item?.icon?.blurDataURL || null;
//   const publishDate = item.publishDate || item._createdAt;
//   const date = getLocaleDate(publishDate);
//   const itemLink = getItemTargetLinkInWebsite(item);
//   const sponsorItem = sponsorItems?.length
//     ? sponsorItems[Math.floor(Math.random() * sponsorItems.length)]
//     : null;
//   // Format category or tag names for display
//   const formatName = (name: string) => {
//     return name
//       .split("-")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };
//   return (
//     <div className="flex flex-col gap-8">
//       {/* Header section */}
//       {/* Basic information */}
//       {/* <ItemBreadCrumb item={item} /> */}
//       {/* <div className="mb-6">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/directories">
//                 Tech Directory
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink
//                 href={`/directories?category=${item.category}`}
//               >
//                 {formatName(item.category)}
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink
//                 href={`/directories?subcategory=${item.subcategory}`}
//               >
//                 {formatName(item.subcategory)}
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <span>{item.title}</span>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div> */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
//         <Button variant="outline" size="sm" asChild>
//           <Link href="/directories">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Directory
//           </Link>
//         </Button>

//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" className="mobile-touch-feedback">
//             <Share2 className="mr-2 h-4 w-4" />
//             Share
//           </Button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//         {/* Left column */}

//         <div className="lg:col-span-3 gap-8 flex flex-col">
//           {/* icon + name + description */}
//           <div className="flex flex-1 items-center">
//             <div className="flex flex-col gap-8">
//               <div className="flex w-full items-center gap-4">
//                 {iconProps && (
//                   <Image
//                     src={iconProps?.src}
//                     alt={item.icon.alt || `icon of ${item.name}`}
//                     title={item.icon.alt || `icon of ${item.name}`}
//                     width={32}
//                     height={32}
//                     className="object-cover image-scale"
//                     {...(iconBlurDataURL && {
//                       placeholder: "blur",
//                       blurDataURL: iconBlurDataURL,
//                     })}
//                   />
//                 )}
//                 <h1
//                   className={cn(
//                     "text-4xl tracking-wider font-bold flex items-center gap-2",
//                     item.featured && "text-gradient_indigo-purple font-semibold"
//                   )}
//                 >
//                   {item.name}
//                 </h1>
//               </div>
//               <p className="text-muted-foreground text-balance leading-relaxed">
//                 {item.description}
//               </p>
//             </div>
//           </div>

//           {/* action buttons */}
//           <div className="flex gap-4">
//             <Button size="lg" variant="default" asChild className="group">
//               <Link
//                 href={itemLink}
//                 target="_blank"
//                 prefetch={false}
//                 className="flex items-center justify-center space-x-2"
//               >
//                 <GlobeIcon className="w-4 h-4 icon-scale" />
//                 <span>Visit Website</span>
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Right column */}
//         <div className="lg:col-span-2">
//           {/* image */}
//           <div className="relative group overflow-hidden rounded-lg aspect-[16/9] bg-black">
//             <Link
//               href={itemLink}
//               target="_blank"
//               prefetch={false}
//               className="relative block w-full h-full"
//             >
//               {imageProps ? (
//                 <Image
//                   src={imageProps.src}
//                   alt={item.image?.alt || `image for ${item.name}`}
//                   title={item.image?.alt || `image for ${item.name}`}
//                   loading="eager"
//                   fill
//                   className="border w-full shadow-lg object-cover image-scale z-0"
//                   {...(imageBlurDataURL && {
//                     placeholder: "blur",
//                     blurDataURL: imageBlurDataURL,
//                   })}
//                 />
//               ) : (
//                 <div className="absolute inset-0 bg-black z-0"></div>
//               )}
//               <div
//                 className="absolute inset-0 flex items-center justify-center bg-black/0
//                group-hover:bg-black/50 transition-all duration-300 z-10"
//               >
//                 <span
//                   className="text-white text-lg font-semibold
//                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 >
//                   Visit Website
//                 </span>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Content section */}
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//         {/* Left column */}
//         <div className="lg:col-span-3 flex flex-col">
//           {/* Detailed content */}
//           <div className="bg-muted/50 rounded-lg p-6 mr-0 lg:mr-8">
//             <h2 className="text-lg font-semibold mb-4">Introduction</h2>
//             <ItemCustomMdx source={item.introduction} />
//           </div>
//           {/* Author section - responsive design */}
//           <div className="mt-6 space-y-3 md:mt-8 mr-0 lg:mr-8">
//             {members.map((member, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
//               >
//                 <div className="flex items-center gap-3 text-left">
//                   <img
//                     src={member.avatar || "/placeholder.svg"}
//                     alt={member.name}
//                     className="h-10 w-10 rounded-full object-cover border border-border md:h-12 md:w-12"
//                   />
//                   <div>
//                     <h3 className="text-sm font-medium md:text-base">
//                       {member.name}
//                     </h3>
//                     <p className="text-xs text-muted-foreground md:text-sm">
//                       {member.role}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-xs text-muted-foreground">
//                   <time>Published April 25, 2023</time>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center justify-start mt-16">
//             <BackButton />
//           </div>
//         </div>

//         {/* Right column */}
//         <div className="lg:col-span-2">
//           <div className="flex flex-col space-y-8">
//             <div className="flex flex-col space-y-4">
//               {/* information */}
//               {/* <div className="bg-muted/50 rounded-lg p-6">
//                 <h2 className="text-lg font-semibold mb-4">Information</h2>
//                 <ul className="space-y-4 text-sm">
//                   {item.submitter && (
//                     <li className="flex justify-between">
//                       <span className="text-muted-foreground">Publisher</span>
//                       <div className="flex items-center gap-2">
//                         <UserAvatar
//                           className="w-5 h-5"
//                           name={item.submitter.name}
//                           image={item.submitter.image}
//                         />

//                         {(item.submitter.link && (
//                           <Link
//                             href={item.submitter.link}
//                             target="_blank"
//                             prefetch={false}
//                             rel="nofollow noopener noreferrer"
//                             className="font-medium link-underline"
//                           >
//                             {item.submitter.name}
//                           </Link>
//                         )) || <span>{item.submitter.name}</span>}
//                       </div>
//                     </li>
//                   )}

//                   <li className="flex justify-between space-x-4">
//                     <span className="text-muted-foreground">Website</span>
//                     <Link
//                       href={itemLink}
//                       target="_blank"
//                       prefetch={false}
//                       className="font-medium link-underline line-clamp-1"
//                     >
//                       {new URL(item.link).hostname}
//                     </Link>
//                   </li>

//                   <li className="flex justify-between">
//                     <span className="text-muted-foreground">
//                       Published date
//                     </span>
//                     <span className="font-medium">{date}</span>
//                   </li>
//                 </ul>
//               </div> */}

//               {/* categories */}
//               {/* <div className="bg-muted/50 rounded-lg p-6">
//                 <h2 className="text-lg font-semibold mb-4">Categories</h2>
//                 <ul className="flex flex-wrap gap-4">
//                   {item.categories?.map((category) => (
//                     <li key={category._id}>
//                       <Link
//                         href={`/category/${category.slug.current}`}
//                         className="text-sm link-underline"
//                       >
//                         {category.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div> */}

//               {/* tags */}
//               {/* <div className="bg-muted/50 rounded-lg p-6">
//                 <h2 className="text-lg font-semibold mb-4">Tags</h2>
//                 <ul className="flex flex-wrap gap-4">
//                   {item.tags?.map((tag) => (
//                     <li key={tag._id}>
//                       <Link
//                         href={`/tag/${tag.slug.current}`}
//                         className="text-sm link-underline
//                           flex items-center justify-center space-x-0.5 group"
//                       >
//                         <HashIcon className="w-3 h-3 text-muted-foreground icon-scale" />
//                         <span className="">{tag.name}</span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div> */}

//               {/* core technologies */}
//               <div className="bg-muted/50 rounded-lg p-6">
//                 <TechnologyStack />
//               </div>

//               {/* sponsor */}
//               {sponsorItem && <SponsorItemCard item={sponsorItem} />}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer section shows related items */}
//       {item.related && item.related.length > 0 && (
//         <div className="flex flex-col gap-4 mt-8">
//           <div className="flex items-center gap-2">
//             <LayoutGridIcon className="w-4 h-4 text-indigo-500" />
//             <h2 className="text-lg tracking-wider font-semibold text-gradient_indigo-purple">
//               Related Products
//             </h2>
//           </div>

//           <div className="mt-4">
//             <ItemGrid
//               items={item.related}
//               sponsorItems={sponsorItems}
//               showSponsor={false}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import Link from "next/link";
import { ArrowLeft, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UrlPreview } from "@/components/shared/url-preview";
import { Logo, TailwindLogo } from "@/components/logo";
// import SubscribeSection from "../subscribe-section";
// import IntegrationsSection from "../integrations-section";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ItemFullInfo } from "@/types";
import ShareButton from "@/components/shared/share-button";
import {
  itemFullInfoBySlugQuery,
  itemInfoBySlugQuery,
  sponsorItemListQuery,
} from "@/sanity/lib/queries";
import {
  ItemInfoBySlugQueryResult,
  SponsorItemListQueryResult,
} from "@/sanity.types";
import { notFound } from "next/navigation";
import {
  MotionHeading,
  MotionWrapper,
} from "@/components/shared/motion-animation";
import { urlForIcon, urlForImage } from "@/lib/image";
import { cn, getItemTargetLinkInWebsite, getLocaleDate } from "@/lib/utils";
import Image from "next/image";
import ItemCustomMdx from "@/components/item/item-custom-mdx";
import SubscribeSection from "../../sections/subscribe-section";
import IntegrationsSection from "../../sections/integrations-section";
// import { Avatar } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoImage, ProductCard } from "@/components/ui/product-card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Safari } from "@/components/magicui/safari";
import SponsorItemCard from "@/components/item/item-card-sponsor";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const item = await sanityFetch<ItemInfoBySlugQueryResult>({
    query: itemInfoBySlugQuery,
    params: { slug: params.slug },
  });
  if (!item) {
    console.warn(`generateMetadata, item not found for slug: ${params.slug}`);
    return;
  }

  const imageProps = item?.image ? urlForImage(item?.image) : null;
  return constructMetadata({
    title: `${item.name}`,
    description: item.description,
    canonicalUrl: `${siteConfig.url}/item/${params.slug}`,
    image: imageProps?.src,
  });
}
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
  console.log("item", item);
  if (!item) {
    console.error("ItemPage, item not found");
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
        <div className="relative pt-8 md:pt-16">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex justify-between mb-8">
              <Button variant="outline" size="sm" asChild>
                <Link href="/directories">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Directory
                </Link>
              </Button>

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
                    <div className="flex  items-center space-x-3">
                      <div className="flex items-center justify-center w-16 h-16 rounded-lg border border-gray-300">
                        {iconProps?.src ? (
                          <Image
                            src={iconProps.src}
                            alt={item.icon?.alt || `icon of ${item.name}`}
                            title={item.icon?.alt || `icon of ${item.name}`}
                            width={28}
                            height={28}
                            className="object-contain"
                            {...(iconBlurDataURL && {
                              placeholder: "blur",
                              blurDataURL: iconBlurDataURL,
                            })}
                          />
                        ) : (
                          <span className="text-gray-600 text-3xl font-bold">{`<>`}</span>
                        )}
                      </div>
                      <div>
                        <h1
                          className={cn(
                            "text-4xl tracking-wider font-bold flex items-center gap-2",
                            item.featured &&
                              "text-gradient_indigo-purple font-semibold"
                          )}
                        >
                          {item.name}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </MotionWrapper>

                <MotionHeading
                  initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
                        alt={item?.submitter?.name || "Anonymous"}
                      />
                      <AvatarFallback>
                        {(item?.submitter?.name || "Anonymous")
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-sm font-medium md:text-base">
                        {item?.submitter?.name || "Anonymous"}
                      </h3>
                      <p className="text-xs text-muted-foreground md:text-sm">
                        {item?.submitter?.role || "Contributor"}
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
                  <div className="relative">
                    <Safari
                      url={itemLink}
                      className="size-full"
                      imageSrc={imageProps?.src}
                    />
                  </div>
                  {/* <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative w-full overflow-hidden rounded-2xl border  shadow-lg shadow-zinc-950/15 ring-1">
                    <UrlPreview
                      url={itemLink}
                      className="w-full"
                      imageProps={imageProps}
                      item={item}
                    />
                  </div> */}
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

                  {item?.coreTechnologies &&
                  item.coreTechnologies.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 gap-y-6">
                      {item.coreTechnologies.map((tech, index) => (
                        <div key={index} className="flex items-start gap-3">
                          {tech?.icon && (
                            <Avatar>
                              <AvatarImage
                                src={urlForIcon(tech.icon)?.src || ""}
                              />
                              <AvatarFallback>{tech.name}</AvatarFallback>
                            </Avatar>
                            // <div className="bg-background size-10 rounded-full border p-0.5 shadow shadow-zinc-950/5 flex-shrink-0">
                            //   <Image
                            //     src={urlForIcon(tech.icon)?.src || ''}
                            //     alt={tech.icon.alt || `icon of ${tech.name}`}
                            //     title={tech.icon.alt || `icon of ${tech.name}`}
                            //     height={40}
                            //     width={40}
                            //     className="object-cover image-scale"
                            //     loading="lazy"
                            //   />
                            // </div>
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
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No core technologies added.
                    </p>
                  )}
                </MotionWrapper>
                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="mt-8"
                >
                  {sponsorItem && <SponsorItemCard item={sponsorItem} />}
                </MotionWrapper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 md:py-32">
        <div className="mx-auto  px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Related Products
            </h2>
            <p className="text-muted-foreground mt-6">
              Discover curated tech tools, resources, and insights to enhance
              your digital experience.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {item.related.length > 0 ? (
              item.related.map((product, index) => (
                <AnimatedCard
                  key={product._id}
                  delay={index * 50}
                  threshold={0.1}
                  rootMargin="20px"
                >
                  <ProductCard
                    id={product._id || null}
                    title={product.name}
                    description={product.description}
                    color={product.color || "#0070f3"}
                    logo={product.icon as LogoImage}
                    featured={product.featured}
                    isAd={product.sponsor}
                    // isHighlighted={true}
                    slug={product.slug.current}
                  />
                </AnimatedCard>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-xl font-medium">
                  No related products found
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <IntegrationsSection relatedItems={item.related} /> */}
    </main>
  );
}
