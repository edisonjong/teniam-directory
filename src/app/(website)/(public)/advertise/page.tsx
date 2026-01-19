import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Check,
  Sparkles,
  Globe,
  List,
  Tag,
  Settings,
  Zap,
  Users,
  Shield,
  Clock,
  Link2,
  Wand2,
  FileText,
  Layers,
  HelpCircle,
  Hourglass,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur'

const faqs = [
  {
    question: "Can I promote an affiliate offer?",
    answer:
      "Yes. Affiliate-friendly listings are allowed as long as the product is legitimate and relevant.",
    icon: FileText,
  },
  {
    question: "Do you accept submissions from PartnerStack?",
    answer:
      "Yes — many tools listed on Newtools run affiliate programs. Quality always comes first.",
    icon: Globe,
  },
  {
    question: "How fast do listings go live?",
    answer:
      "Most submissions are reviewed within 24–72 hours, depending on volume. Featured listings may be reviewed faster.",
    icon: Hourglass,
  },
  {
    question: "Can you help improve my listing copy?",
    answer:
      "Yes. We may edit listings for clarity and accuracy so they perform better and match our format.",
    icon: MessageSquare,
  },
]

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto flex flex-col gap-24 py-16 lg:py-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 max-w-xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Promote your product on Newtools
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Reach builders, startups, and creators actively searching for
                tools — with curated placement options designed for visibility.
              </p>
              <div className="flex flex-row gap-4">
                <Button asChild size="lg" className="px-6">
                  <Link href="/submit">Submit a Tool</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="px-6">
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full lg:w-auto">
              <div className="aspect-[4/3] w-full max-w-lg ml-auto rounded-lg border border-border bg-background flex items-center justify-center">
                <div className="w-8 h-8 rounded border-2 border-orange-400 bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 text-xs font-bold">N</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Bar */}
        <section className="bg-background overflow-hidden py-16">
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Discover the best teams</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider
                  speedOnHover={20}
                  speed={40}
                  gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="/deepseek.svg"
                      alt="DeepSeek Logo"
                      height={20}
                      width={120}
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="/claude.svg"
                      alt="Claude Logo"
                      height={16}
                      width={120}
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="/gemini.svg"
                      alt="Gemini Logo"
                      height={16}
                      width={120}
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="/copilot.svg"
                      alt="Copilot Logo"
                      height={20}
                      width={120}
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="/groq.svg"
                      alt="Groq Logo"
                      height={20}
                      width={120}
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="/inflection.svg"
                      alt="Inflection Logo"
                      height={16}
                      width={120}
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="/perplexity.svg"
                      alt="Perplexity Logo"
                      height={28}
                      width={120}
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>

        {/* What you can promote */}
        <section className="w-full flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              What you can promote
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              You can submit and promote AI tools, developer tools & software, design and
              marketing tools, automation and analytics platforms, and build assets like
              templates, boilerplates, themes, UI kits, and components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
            <div className="bg-background p-8">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold">Visibility Inside Categories</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get discovered where people are actually looking for solutions.
              </p>
            </div>
            <div className="bg-background p-8">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold">Builder-First Audience</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reach the creators and entrepreneurs who need your tool.
              </p>
            </div>
            <div className="bg-background p-8">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold">Curated Credibility</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every listing is reviewed, not spam or clutter.
              </p>
            </div>
            <div className="bg-background p-8">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold">Fast Review Process</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most submissions reviewed within 24-72 hours.
              </p>
            </div>
            <div className="bg-background p-8">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold">Affiliate Friendly</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Optional affiliate-friendly outbound links supported.
              </p>
            </div>
            <div className="bg-background p-8">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold">AI-Assisted Improvements</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We refine listings for clarity and better performance.
              </p>
            </div>
          </div>
        </section>

        {/* Promotion options */}
        <section id="pricing" className="w-full flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Promotion options
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the placement tier that fits your visibility goals. Every listing is reviewed before
              publishing.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Free listing */}
            <Card className="relative flex flex-col border bg-background h-full">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-base font-medium text-foreground">Free listing</CardTitle>
                <div className="text-4xl font-bold mt-2">$0</div>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  Best for early-stage tools
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1">
                <div className="border-t border-dashed border-border my-4" />
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Standard listing placement</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Category + tag visibility</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Reviewed before publishing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/submit">Submit Free</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Featured listing */}
            <Card className="relative flex flex-col border bg-background h-full">
              <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-400 px-3 py-1 text-xs font-medium text-white">
                Popular
              </span>
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-base font-medium text-foreground">Featured listing</CardTitle>
                <div className="text-4xl font-bold mt-2">Contact</div>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  Best for launches and faster discovery
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1">
                <div className="border-t border-dashed border-border my-4" />
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Featured badge</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Higher placement in category pages</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Included in featured sections</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href="/contact">Get Featured</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Sponsored placement */}
            <Card className="relative flex flex-col border bg-background h-full">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-base font-medium text-foreground">Sponsored placement</CardTitle>
                <div className="text-4xl font-bold mt-2">Contact</div>
                <CardDescription className="text-sm text-muted-foreground mt-2">
                  Best for serious visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1">
                <div className="border-t border-dashed border-border my-4" />
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Top placement in selected category</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Sponsored exposure across directory</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span>Limited slots per period</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/contact">Sponsor a Spot</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* AI-assisted listing improvements */}
        <section className="w-full flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold">
                AI-assisted listing
                <br />
                improvements
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground text-base leading-relaxed">
                Newtools uses AI-assisted formatting guidelines to help listings look clean and consistent. We may
                refine your listing content on your behalf to maximize quality and conversion.
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="w-full rounded-lg border border-border bg-muted/30 aspect-[16/6] overflow-hidden">
            <Image
              src="/ai_assisted.jpeg"
              alt="AI-assisted listing improvements"
              width={1200}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-foreground" />
                <h3 className="font-semibold text-sm">Rewriting Summary</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We refine your summary for clarity and impact.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-foreground" />
                <h3 className="font-semibold text-sm">Feature Bullets</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Tightening key feature bullets for better readability.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-foreground" />
                <h3 className="font-semibold text-sm">Category Accuracy</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Improving category and tag accuracy for discoverability.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-foreground" />
                <h3 className="font-semibold text-sm">Review Format</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ensuring listings follow our review standards.
              </p>
            </div>
          </div>
        </section>

        {/* Why promote on Newtools */}
        <section className="w-full flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why promote
              <br />
              on Newtools?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Because people don't come here to browse randomly — they come here looking for tools to
              use.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FAQ Accordion */}
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="py-4 hover:no-underline text-left">
                      <div className="flex items-center gap-3">
                        <faq.icon className="h-4 w-4 text-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-7">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Data visualization */}
            <div className="rounded-xl bg-zinc-900 p-8 aspect-[4/3] flex items-center justify-center overflow-hidden">
              <Image
                src="/data_visual.svg"
                alt="Data visualization"
                width={800}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full">
          <div className="rounded-2xl border border-border bg-background p-12 md:p-16">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Ready to submit?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Submit your tool for review or boost your placement for extra visibility.
              </p>
              <div className="flex flex-row justify-center gap-4">
                <Button asChild size="lg" className="px-6">
                  <Link href="/submit">Submit a Tool</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6 bg-transparent">
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
