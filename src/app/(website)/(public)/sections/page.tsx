// import SimplifiedHero from "@/components/sections/simplified-hero"
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
import SimplifiedHero from "./simplified-hero";

export const metadata = constructMetadata({
  title: siteConfig.openGraph.title,
  description: siteConfig.openGraph.description,
  canonicalUrl: `${siteConfig.url}/sections`,
});

export default function Home() {
  return <SimplifiedHero />;
}
