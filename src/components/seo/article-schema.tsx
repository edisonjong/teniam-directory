import { siteConfig } from "@/config/site";

export interface BlogPost {
  title: string;
  excerpt?: string;
  image?: {
    src?: string;
    alt?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    image?: string;
  };
  slug: string;
}

interface ArticleSchemaProps {
  post: BlogPost;
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  const postUrl = `${siteConfig.url}/blogs/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || post.title,
    ...(post.image?.src && {
      "image": post.image.src,
    }),
    "datePublished": post.publishedAt,
    ...(post.updatedAt && {
      "dateModified": post.updatedAt,
    }),
    "author": {
      "@type": "Person",
      "name": post.author.name,
      ...(post.author.image && {
        "image": post.author.image,
      }),
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/newtools_logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "url": postUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

