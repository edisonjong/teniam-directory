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
      <div className="w-full mx-auto flex flex-col gap-8 sm:gap-10 md:gap-12 py-8 sm:py-12 md:py-16 lg:py-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="w-full flex flex-col gap-4 sm:gap-6">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
            <HeaderSection
              labelAs="h1"
              title="Promote your product on Newtools"
              titleAs="h2"
              subtitle="Reach builders, startups, and creators actively searching for tools — with curated placement options designed for visibility."
              subtitleAs="p"
            />
            <p className="text-center text-muted-foreground text-base sm:text-lg mt-4 sm:mt-6">
              Newtools is not a spam directory. Every listing is reviewed.
            </p>
          </div>
        </section>

        {/* What you can promote */}
        <section className="w-full flex flex-col gap-4 sm:gap-6">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-balance text-2xl sm:text-3xl font-semibold md:text-4xl mb-3 sm:mb-4">
                What you can promote
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                You can submit and promote:
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto">
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">AI tools</span>
              </div>
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Developer tools & software</span>
              </div>
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Design and marketing tools</span>
              </div>
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Automation and analytics platforms</span>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Build assets like templates, boilerplates, themes, UI kits, and components
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion options */}
        <section className="w-full flex flex-col gap-6 sm:gap-8">
          <div className="text-center">
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold md:text-4xl mb-3 sm:mb-4">
              Promotion options
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Free listing */}
            <Card className="relative flex flex-col border-2 shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
              <CardHeader className="p-6 sm:p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted border border-border">
                  <Target className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Free listing</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Best for early-stage tools.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 sm:p-6 pt-0">
                <hr className="border-dashed border-border" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Standard listing placement</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Category + tag visibility</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Reviewed before publishing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6 border-t border-border p-6 sm:p-6">
                <Button asChild className="w-full">
                  <Link href="/submit">Submit Free</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Featured listing */}
            <Card className="relative flex flex-col border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
              <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-md">
                Popular
              </span>
              <CardHeader className="p-6 sm:p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Featured listing</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Best for launches and faster discovery.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 sm:p-6 pt-0">
                <hr className="border-dashed border-border" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Featured badge</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Higher placement in category pages</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Included in featured sections</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6 border-t border-border p-6 sm:p-6">
                <Button asChild className="w-full">
                  <Link href="/submit">Get Featured</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Sponsored placement */}
            <Card className="relative flex flex-col border-2 shadow-md hover:shadow-lg transition-shadow duration-200 h-full md:col-span-2 lg:col-span-1">
              <CardHeader className="p-6 sm:p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted border border-border">
                  <Zap className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Sponsored placement</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Best for serious visibility.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 sm:p-6 pt-0">
                <hr className="border-dashed border-border" />
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Top placement in selected category</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Sponsored exposure across the directory</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="size-4 sm:size-5 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Limited slots per period</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6 border-t border-border p-6 sm:p-6">
                <Button asChild className="w-full">
                  <Link href="/submit">Sponsor a Spot</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* AI-assisted listing improvements */}
        <section className="w-full flex flex-col gap-4 sm:gap-6">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-balance text-2xl sm:text-3xl font-semibold md:text-4xl mb-3 sm:mb-4">
                AI-assisted listing improvements
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
                Newtools uses AI-assisted formatting guidelines to help listings
                look clean and consistent. To maximise quality and conversion, we
                may refine your listing content on your behalf — including:
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                  <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Rewriting the summary for clarity</span>
                </div>
                <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                  <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Tightening key feature bullets</span>
                </div>
                <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                  <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Improving category + tag accuracy</span>
                </div>
                <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                  <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Ensuring the listing follows our review format</span>
                </div>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-center text-muted-foreground text-sm sm:text-base font-medium">
                  Paid placement never replaces review standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why promote on Newtools */}
        <section className="w-full flex flex-col gap-4 sm:gap-6">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-balance text-2xl sm:text-3xl font-semibold md:text-4xl mb-3 sm:mb-4">
                Why promote on Newtools?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Because people don't come here to browse randomly — they come here
                looking for tools to use.
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto">
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Visibility inside relevant categories</span>
              </div>
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">A builder-first audience</span>
              </div>
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Curated credibility (not clutter)</span>
              </div>
              <div className="flex items-start gap-3 p-4 sm:p-5 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-border transition-all">
                <Check className="size-5 sm:size-6 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">Optional affiliate-friendly outbound links</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full flex flex-col gap-6 sm:gap-8">
          <div className="text-center">
            <HeaderSection
              label="FAQ"
              title="Frequently asked questions"
              titleAs="h2"
            />
          </div>

          <div className="w-full">
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <Accordion
                type="single"
                collapsible
                className="w-full"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-border last:border-b-0 px-4 sm:px-6 py-2"
                  >
                    <AccordionTrigger className="cursor-pointer text-sm sm:text-base hover:no-underline py-3 sm:py-4 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 sm:pb-4">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-4 sm:py-6 md:py-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
              <div className="text-center">
                <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl font-semibold lg:text-5xl mb-3 sm:mb-4">
                  Ready to submit?
                </h2>
                <p className="mt-3 sm:mt-4 text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
                  Submit your tool for review or boost your placement for extra
                  visibility.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <Button asChild size="lg" className="shadow-md w-full sm:w-auto">
                    <Link href="/submit">Submit a Tool</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="shadow-sm w-full sm:w-auto">
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
