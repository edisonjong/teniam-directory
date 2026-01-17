import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeaderSection } from "@/components/shared/header-section";
import { FAQSchema } from "@/components/seo/faq-schema";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Advertise",
  description:
    "Promote your product on Newtools. Reach builders, startups, and creators with curated placement options designed for visibility.",
  canonicalUrl: `${siteConfig.url}/advertise`,
});

const faqs = [
  {
    question: "Can I promote an affiliate offer?",
    answer:
      "Yes. Affiliate-friendly listings are allowed as long as the product is legitimate and relevant.",
  },
  {
    question: "Do you accept submissions from PartnerStack?",
    answer:
      "Yes — many tools listed on Newtools run affiliate programs. Quality always comes first.",
  },
  {
    question: "How fast do listings go live?",
    answer:
      "Most submissions are reviewed within 24–72 hours, depending on volume. Featured listings may be reviewed faster.",
  },
  {
    question: "Can you help improve my listing copy?",
    answer:
      "Yes. We may edit listings for clarity and accuracy so they perform better and match our format.",
  },
];

export default function AdvertisePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="w-full mx-auto flex flex-col gap-16 mt-8 pb-16 max-w-4xl px-6">
        {/* Hero Section */}
        <section className="w-full flex flex-col gap-6">
          <HeaderSection
            labelAs="h1"
            title="Promote your product on Newtools"
            titleAs="h2"
            subtitle="Reach builders, startups, and creators actively searching for tools — with curated placement options designed for visibility."
            subtitleAs="p"
          />
          <p className="text-center text-muted-foreground">
            Newtools is not a spam directory. Every listing is reviewed.
          </p>
        </section>

        {/* What you can promote */}
        <section className="w-full flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">What you can promote</h2>
          <p className="text-muted-foreground">
            You can submit and promote:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>AI tools</li>
            <li>developer tools & software</li>
            <li>design and marketing tools</li>
            <li>automation and analytics platforms</li>
            <li>
              build assets like templates, boilerplates, themes, UI kits, and
              components
            </li>
          </ul>
        </section>

        {/* Promotion options */}
        <section className="w-full flex flex-col gap-8">
          <h2 className="text-2xl font-semibold">Promotion options</h2>

          <div className="flex flex-col gap-8">
            {/* Free listing */}
            <div className="border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Free listing (reviewed)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Best for early-stage tools.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>standard listing placement</li>
                <li>category + tag visibility</li>
                <li>reviewed before publishing</li>
              </ul>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/submit">Submit Free</Link>
                </Button>
              </div>
            </div>

            {/* Featured listing */}
            <div className="border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Featured listing (boosted visibility)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Best for launches and faster discovery.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>featured badge</li>
                <li>higher placement in category pages</li>
                <li>included in featured sections</li>
              </ul>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/submit">Get Featured</Link>
                </Button>
              </div>
            </div>

            {/* Sponsored placement */}
            <div className="border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Sponsored placement (maximum exposure)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Best for serious visibility.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>top placement in selected category</li>
                <li>sponsored exposure across the directory</li>
                <li>limited slots per period</li>
              </ul>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/submit">Sponsor a Spot</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI-assisted listing improvements */}
        <section className="w-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">
            AI-assisted listing improvements
          </h2>
          <p className="text-muted-foreground">
            Newtools uses AI-assisted formatting guidelines to help listings
            look clean and consistent. To maximise quality and conversion, we
            may refine your listing content on your behalf — including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>rewriting the summary for clarity</li>
            <li>tightening key feature bullets</li>
            <li>improving category + tag accuracy</li>
            <li>ensuring the listing follows our review format</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Paid placement never replaces review standards.
          </p>
        </section>

        {/* Why promote on Newtools */}
        <section className="w-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Why promote on Newtools?</h2>
          <p className="text-muted-foreground">
            Because people don't come here to browse randomly — they come here
            looking for tools to use.
          </p>
          <div>
            <p className="font-medium mb-2">What you get:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>visibility inside relevant categories</li>
              <li>a builder-first audience</li>
              <li>curated credibility (not clutter)</li>
              <li>optional affiliate-friendly outbound links</li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full flex flex-col gap-8">
          <HeaderSection
            label="FAQ"
            title="Frequently asked questions"
            titleAs="h2"
          />

          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-dashed"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base text-muted-foreground">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full flex flex-col gap-6 items-center text-center py-8">
          <h2 className="text-2xl font-semibold">Ready to submit?</h2>
          <p className="text-muted-foreground max-w-2xl">
            Submit your tool for review or boost your placement for extra
            visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/submit">Submit a Tool</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
