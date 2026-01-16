"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQsTwo() {
  const faqItems = [
    {
      id: "item-1",
      question: "How do I submit a tool?",
      answer:
        "Choose a plan (Free, Featured, or Sponsored) and submit via our quick form. Free listings take 3-5 business days for review; Featured and Sponsored get priority (1-2 days).",
    },
    {
      id: "item-2",
      question: "What kinds of tools can I list?",
      answer:
        "We welcome innovative boilerplates, templates, AI tools, and software designed to help startups and solopreneurs build and scale.",
    },
    {
      id: "item-3",
      question: "What's included in the Free Plan?",
      answer:
        "Get a basic listing with 1 dofollow SEO link at no cost, ideal for trying New Tools with standard visibility.",
    },
    {
      id: "item-4",
      question: "How do dofollow links boost my SEO?",
      answer:
        "Our dofollow links improve your site's search engine ranking, driving more traffic to your boilerplate, template, or software.",
    },
    {
      id: "item-5",
      question: "What does the Featured Plan's spotlight shine border do?",
      answer:
        "The spotlight shine border highlights your listing with a visually striking design and includes side menu placement for greater visibility across New Tools.",
    },
    {
      id: "item-6",
      question: "How does the Sponsor Plan differ from Featured?",
      answer:
        "Sponsor includes all Featured benefits (spotlight shine border and side menu) plus exclusive sidebar promotion on nearly every page for maximum exposure.",
    },
    {
      id: "item-7",
      question: "Can I upgrade from the Free Plan?",
      answer:
        "Yes, upgrade to Featured or Sponsor anytime to unlock the spotlight shine border, side menu, or sidebar placement.",
    },
    {
      id: "item-8",
      question: "Can I edit my listing after submission?",
      answer:
        "Definitely, update your listing anytime via your account dashboard to keep your boilerplate, template, or AI tool current.",
    },
    {
      id: "item-9",
      question: "How long does my listing last?",
      answer:
        "Free and Featured listings are permanent with an active subscription; Sponsor listings run weekly with flexible scheduling.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            our platform, services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            Can't find what you're looking for? Contact our{" "}
            <Link
              href="/contact"
              className="text-primary font-medium hover:underline"
            >
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
