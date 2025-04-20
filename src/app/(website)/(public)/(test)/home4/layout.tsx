import Container from "@/components/container";
import HeroSection from "@/components/home4/hero-section";
// import HomeHero from "@/components/home2/home2-hero";
// import FooterSection from "@/components/home4/home4-footer";
// import HeroSection from "@/components/home4/home4-hero";
// import HeroSection from "@/components/home4/home4-hero";
// import { NewsletterCard } from "@/components/newsletter/newsletter-card";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "",
  canonicalUrl: `${siteConfig.url}/`,
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* <HomeHero /> */}
      <HeroSection />

      {children}
      {/* <FooterSection /> */}
      {/* <NewsletterCard /> */}
    </div>
  );
}
