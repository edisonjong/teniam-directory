import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    // Since product data is client-side, we'll use a generic metadata
    // In a real scenario, you'd fetch product data here
    return constructMetadata({
        title: "Product | Newtools",
        description: "View product details on Newtools. Discover features, pricing, and use cases for this tool.",
        canonicalUrl: `${siteConfig.url}/product/${params.id}`,
    });
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
