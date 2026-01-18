import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderSection } from "@/components/shared/header-section";
import { FAQSchema } from "@/components/seo/faq-schema";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
import { Check, Sparkles, Zap, Target } from "lucide-react";
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
      <div className="w-full mx-auto flex flex-col gap-16 py-16 md:py-32 max-w-6xl px-6">
        {/* Hero Section */}
        <section className="w-full flex flex-col gap-6">
          <HeaderSection
            labelAs="h1"
            title="Promote your product on Newtools"
            titleAs="h2"
            subtitle="Reach builders, startups, and creators actively searching for tools — with curated placement options designed for visibility."
            subtitleAs="p"
          />
          <p className="text-center text-muted-foreground text-lg">
            Newtools is not a spam directory. Every listing is reviewed.
          </p>
        </section>

        {/* What you can promote */}
        <section className="bg-zinc-50 dark:bg-transparent rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl mb-4">
              What you can promote
            </h2>
            <p className="text-muted-foreground text-lg">
              You can submit and promote:
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">AI tools</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Developer tools & software</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Design and marketing tools</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Automation and analytics platforms</span>
            </div>
            <div className="flex items-start gap-3 md:col-span-2">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Build assets like templates, boilerplates, themes, UI kits, and components
              </span>
            </div>
          </div>
        </section>

        {/* Promotion options */}
        <section className="w-full flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl mb-4">
              Promotion options
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Free listing */}
            <Card className="relative flex flex-col shadow-sm">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted">
                  <Target className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Free listing</CardTitle>
                <CardDescription className="text-base">
                  Best for early-stage tools.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Standard listing placement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Category + tag visibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Reviewed before publishing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href="/submit">Submit Free</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Featured listing */}
            <Card className="relative flex flex-col shadow-sm border-primary/20">
              <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow">
                Popular
              </span>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Featured listing</CardTitle>
                <CardDescription className="text-base">
                  Best for launches and faster discovery.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Featured badge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Higher placement in category pages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Included in featured sections</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href="/submit">Get Featured</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Sponsored placement */}
            <Card className="relative flex flex-col shadow-sm">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted">
                  <Zap className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Sponsored placement</CardTitle>
                <CardDescription className="text-base">
                  Best for serious visibility.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Top placement in selected category</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Sponsored exposure across the directory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" />
                    <span>Limited slots per period</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href="/submit">Sponsor a Spot</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* AI-assisted listing improvements */}
        <section className="bg-zinc-50 dark:bg-transparent rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-balance text-3xl font-semibold md:text-4xl mb-4">
                AI-assisted listing improvements
              </h2>
              <p className="text-muted-foreground text-lg">
                Newtools uses AI-assisted formatting guidelines to help listings
                look clean and consistent. To maximise quality and conversion, we
                may refine your listing content on your behalf — including:
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Check className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Rewriting the summary for clarity</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Tightening key feature bullets</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Improving category + tag accuracy</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Ensuring the listing follows our review format</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6 font-medium">
              Paid placement never replaces review standards.
            </p>
          </div>
        </section>

        {/* Why promote on Newtools */}
        <section className="w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl mb-4">
              Why promote on Newtools?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Because people don't come here to browse randomly — they come here
              looking for tools to use.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Visibility inside relevant categories</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">A builder-first audience</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Curated credibility (not clutter)</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Optional affiliate-friendly outbound links</span>
            </div>
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
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                Ready to submit?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Submit your tool for review or boost your placement for extra
                visibility.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/submit">Submit a Tool</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
