import { CustomMdx } from "@/components/shared/custom-mdx";
import { siteConfig } from "@/config/site";
import { portableTextToMarkdown } from "@/lib/mdx";
import { constructMetadata } from "@/lib/metadata";
import type { PageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pageQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const page = await sanityFetch<PageQueryResult>({
    query: pageQuery,
    params: { slug: params.slug },
  });
  if (!page) {
    console.warn(`generateMetadata, page not found for slug: ${params.slug}`);
    return;
  }

  return constructMetadata({
    title: page.title,
    description: page.excerpt,
    canonicalUrl: `${siteConfig.url}/${params.slug}`,
  });
}

interface CustomPageProps {
  params: { slug: string };
}

export default async function CustomPage({ params }: CustomPageProps) {
  console.log(`CustomPage, params: ${JSON.stringify(params)}`);
  const page = await sanityFetch<PageQueryResult>({
    query: pageQuery,
    params: { slug: params.slug },
  });

  if (!page) {
    return notFound();
  }

  console.log(`CustomPage, page title: ${page.title}`);
  // console.log('CustomPage, page body: ', page.body);
  const markdownContent = portableTextToMarkdown(page.body);
  // console.log("markdownContent", markdownContent);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          {page.excerpt && (
            <p className="text-lg text-muted-foreground leading-relaxed">{page.excerpt}</p>
          )}
        </div>
      </div>
      <article className="rounded-lg border border-border bg-card p-8 shadow-sm">
        {markdownContent && <CustomMdx source={markdownContent} />}
      </article>
    </main>
  );
}
