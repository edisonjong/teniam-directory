import Container from "@/components/container";
import { PricingPlans } from "@/components/dashboard/pricing-plans";
import FAQsTwo from "@/components/home4/home-faqs";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { FAQSchema } from "@/components/seo/faq-schema";
import { HeaderSection } from "@/components/shared/header-section";
import { faqConfig } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Pricing | Newtools",
  description: "Choose a pricing plan to submit your product to Newtools. Free and paid submission options available. Reach founders, developers, and creators.",
  canonicalUrl: `${siteConfig.url}/pricing`,
});

export default async function PricingPage() {
  // Convert FAQ config to schema format
  const faqs = faqConfig.items.map((item) => ({
    question: item.question,
    answer: item.answer.replace(/<[^>]*>/g, ""), // Strip HTML tags for schema
  }));

  return (
    <>
      <FAQSchema faqs={faqs} />
      {/* <Container className="mt-8 pb-16 max-w-6xl"> */}
      <div className="w-full mx-auto flex flex-col gap-16 mt-8 pb-16 max-w-6xl px-6">
      <section className="w-full flex flex-col gap-8 justify-center">
        <HeaderSection
          labelAs="h1"
          label="Pricing"
          titleAs="h2"
          title="Choose a pricing plan"
        />

        <div className="w-full mx-auto">
          <PricingPlans />
        </div>

        {/* add tips only for Mkdirs demo directory website */}
        {siteConfig.name === "Directory" && (
          <p className="text-center text-sm text-muted-foreground leading-normal">
            This is in <span className="font-bold">TEST</span> environment.
            <br />
            You can use Stripe test card to simulate the paid submission
            process.
            <br />
            Stripe test card number: 4242 4242 4242 4242
          </p>
        )}
      </section>

      <section className="w-full flex flex-col gap-8 justify-center">
        {/* <HeaderSection
          label="FAQ"
          titleAs="h2"
          title="Frequently Asked Questions"
        /> */}

        <div className="w-full max-w-4xl mx-auto">
          <FAQsTwo />
          {/* <PricingFaq /> */}
        </div>
      </section>
    </div>
    {/* </Container> */}
    </>
  );
}
