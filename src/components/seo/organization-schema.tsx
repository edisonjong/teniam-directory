import { siteConfig } from "@/config/site";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/newtools logo.png`,
    "description": siteConfig.description,
    "sameAs": [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.youtube,
      siteConfig.links.instagram,
      siteConfig.links.facebook,
    ].filter(Boolean),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

