import { BlogCategoryFilter } from '@/components/blog/blog-category-filter';
import BlogNewsLetter from '@/components/blog/blog-newslwtter';
import Container from '@/components/container';
import { NewsletterCard } from '@/components/newsletter/newsletter-card';
import { HeaderSection } from '@/components/shared/header-section';

export default async function BlogListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" mx-auto max-w-6xl px-6 pt-8 pb-16 lg:pt-16">
      <div className=" w-full flex flex-col items-center justify-center gap-8">
        {/* <BlogNewsLetter /> */}
        {/* <HeaderSection
          labelAs="h1"
          label="Blog"
          titleAs="h2"
          title="Read our latest blog posts"
        /> */}

        <BlogCategoryFilter />
      </div>

      <Container className="mt-8">{children}</Container>

      {/* <Container className="mt-8">
        <NewsletterCard />
      </Container> */}
    </div>
  );
}
