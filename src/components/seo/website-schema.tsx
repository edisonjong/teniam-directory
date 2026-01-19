import { siteConfig } from "@/config/site";

export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "description": siteConfig.description,
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteConfig.url}/newtools_logo.png`,
            },
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
        "sameAs": [
            siteConfig.links.twitter,
            siteConfig.links.linkedin,
            siteConfig.links.github,
            siteConfig.links.youtube,
            siteConfig.links.instagram,
            siteConfig.links.facebook,
        ].filter(Boolean),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
