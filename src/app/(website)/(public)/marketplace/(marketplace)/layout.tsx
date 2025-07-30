import { BlogCategoryFilter } from "@/components/blog/blog-category-filter";
import BlogNewsLetter from "@/components/blog/blog-newslwtter";
import Container from "@/components/container";
import { NewsletterCard } from "@/components/newsletter/newsletter-card";
import { HeaderSection } from "@/components/shared/header-section";

export default async function BlogListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" mx-auto max-w-6xl md:px-0 px-4 pt-8 pb-16 lg:pt-16">
      <div className="">{children}</div>

      {/* <Container className="mt-8">
        <NewsletterCard />
      </Container> */}
    </div>
  );
}
