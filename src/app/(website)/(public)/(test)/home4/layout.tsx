import HeroSection from '@/components/home4/home-hero-section';
import { siteConfig } from '@/config/site';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: '',
  canonicalUrl: `${siteConfig.url}/`,
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <HeroSection />
      {children}
    </div>
  );
}
