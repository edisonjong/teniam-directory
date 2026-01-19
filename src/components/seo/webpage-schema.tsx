import { siteConfig } from "@/config/site";

interface WebPageSchemaProps {
    name: string;
    description: string;
    url: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
}

export function WebPageSchema({
    name,
    description,
    url,
    image,
    datePublished,
    dateModified,
}: WebPageSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": name,
        "description": description,
        "url": url,
        "inLanguage": "en-US",
        "isPartOf": {
            "@type": "WebSite",
            "name": siteConfig.name,
            "url": siteConfig.url,
        },
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteConfig.url}/newtools_logo.png`,
            },
        },
        ...(image && {
            "image": {
                "@type": "ImageObject",
                "url": image,
                "width": 1200,
                "height": 630,
            },
        }),
        ...(datePublished && {
            "datePublished": datePublished,
        }),
        ...(dateModified && {
            "dateModified": dateModified,
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
