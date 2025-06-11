import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Code } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { getItems } from "@/data/item";
import { AnimatedCard } from "../ui/animated-card";
import { LogoImage, ProductCard } from "../ui/product-card";
import { DEFAULT_SORT, SORT_FILTER_LIST } from "@/lib/constants";
// import { Gemini, Replit, MagicUI, VSCodium, MediaWiki, GooglePaLM } from '@/components/logos'

export default async function Products() {
  const { items } = await getItems({
    currentPage: 1,
    filter: "featured == true",
  });

  console.log("items", items);
  return (
    <section>
      <div className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Explore directory
            </h2>
            <p className="text-muted-foreground mt-6">
              Explore our Directory to find trusted contacts and resources.
              Discover essential details and connect swiftly with the solutions
              you need, all in one place.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {items.length > 0 ? (
              items?.slice(0, 6)?.map((product, index) => (
                <AnimatedCard
                  key={product._id}
                  delay={index * 50}
                  threshold={0.1}
                  rootMargin="20px"
                >
                  <ProductCard
                    id={product._id ? product._id : null}
                    title={product.name}
                    description={product.description}
                    color={product.color || "#0070f3"}
                    logo={product.icon as LogoImage}
                    featured={product.featured}
                    isAd={product.sponsor}
                    //  isHighlighted={product.id === highlightedProductId}
                    slug={product.slug.current}
                    bookmark={product.bookmark}
                    homeBookmark={true}
                    //  onBookmarkToggle={handleBookmarkToggle}
                  />
                </AnimatedCard>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-xl font-medium">No products found</h3>
                <p className="text-muted-foreground mt-2">
                  Try selecting a different category
                </p>
              </div>
            )}
          </div>
          {/* <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="Google Gemini"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <Gemini />
            </IntegrationCard>

            <IntegrationCard
              title="Replit"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <Replit />
            </IntegrationCard>

            <IntegrationCard
              title="Magic UI"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <MagicUI />
            </IntegrationCard>

            <IntegrationCard
              title="VSCodium"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <VSCodium />
            </IntegrationCard>

            <IntegrationCard
              title="MediaWiki"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <MediaWiki />
            </IntegrationCard>

            <IntegrationCard
              title="Google PaLM"
              description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente."
            >
              <GooglePaLM />
            </IntegrationCard>
          </div> */}
        </div>
      </div>
      {items.length > 0 && (
        <div className=" flex justify-center">
          <Button asChild size="lg">
            <Link href="/directories" className="cursor-pointer">
              <span>View More</span>
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  children,
  link = "https://github.com/meschacirung/cnblocks",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}) => {
  return (
    <Card className="p-6">
      <div className="relative">
        <div className="*:size-10">{children}</div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="gap-1 pr-2 shadow-none"
          >
            <Link href={link}>
              Learn More
              <ChevronRight className="ml-0 !size-3.5 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
