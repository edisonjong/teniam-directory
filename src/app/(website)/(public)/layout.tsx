"use client";
import { HeroHeader } from "@/components/home4/hero5-header";
import { BannerAd } from "@/components/layout/banner-ad";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/components/ui/footer";
import { marketingConfig } from "@/config/marketing";
import { usePathname } from "next/navigation";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const pathname = usePathname();
  // Hide navbar on /home4
  const hideNavbar = pathname === "/directories";
  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="sticky top-0 z-50">
        <BannerAd />
        <Navbar scroll={true} config={marketingConfig} />
      </div> */}
      {/* <HeroHeader scroll={true} config={marketingConfig} /> */}
      {!hideNavbar && <HeroHeader scroll={true} config={marketingConfig} />}

      {/* {!hideNavbar && <Navbar scroll={true} config={marketingConfig} />} */}

      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
      {!hideNavbar && <FooterSection />}
    </div>
  );
}
