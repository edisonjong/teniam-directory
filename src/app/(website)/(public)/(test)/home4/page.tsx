// import { HomeContent } from "@/components/home2/home2-content";
import HomeContent from "@/components/home4/home4-content";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "",
  canonicalUrl: `${siteConfig.url}/`,
});

export default async function LandingPage() {
  return <HomeContent />;
}
