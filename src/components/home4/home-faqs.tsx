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
      question: "How do I submit a tool or build asset?",
      answer:
        "Submit your link with a short description, category, and tags. Every listing is reviewed before it goes live so the directory stays clean and useful.",
    },
    {
      id: "item-2",
      question: "What kinds of tools can I list?",
      answer:
        "You can submit: AI tools, Developer tools & frameworks, Design and marketing tools, Automation and analytics platforms, Build assets like templates, themes, UI kits, and boilerplates. If it helps people build faster, it belongs here.",
    },
    {
      id: "item-3",
      question: "Do you approve every submission?",
      answer:
        "No. We reject low-effort clones, spam submissions, broken links, and anything misleading. The goal is quality over quantity.",
    },
    {
      id: "item-4",
      question: "Is it free to be listed?",
      answer:
        "Yes. Free listings are available and reviewed. Paid plans only exist to boost visibility — not to bypass quality checks.",
    },
    {
      id: "item-5",
      question: "What's the difference between Featured and Sponsored?",
      answer:
        "Featured listings get a visibility boost in category pages and appear in featured areas. Sponsored listings get top placement and stronger exposure across the directory for a limited time.",
    },
    {
      id: "item-6",
      question: "How long does a listing stay live?",
      answer:
        "Listings stay live unless they become outdated, unsafe, or misleading. We may update categories and tags over time to keep the directory accurate.",
    },
    {
      id: "item-7",
      question: "Can I edit my listing after approval?",
      answer:
        "Yes. You can request updates to your listing details (description, tags, screenshots, links). This helps keep everything fresh and accurate.",
    },
    {
      id: "item-8",
      question: "Do you use affiliate links?",
      answer:
        "Some listings include affiliate links. You never pay extra — it simply helps support Newtools and keep the platform running.",
    },
    {
      id: "item-9",
      question: "How do categories and tags work?",
      answer:
        "Each listing belongs to one main category, and can include multiple tags (like free-plan, open-source, or shopify) to make searching easier.",
    },
    {
      id: "item-10",
      question: "How fast is the review process?",
      answer:
        "Most submissions are reviewed within 24–72 hours, depending on volume. Featured listings may be reviewed faster.",
    },
    {
      id: "item-11",
      question: "Do you accept tools from PartnerStack / affiliate programs?",
      answer:
        "Yes — as long as the tool is legitimate and useful. Affiliate links are welcome, but quality and relevance come first.",
    },
    {
      id: "item-12",
      question: "I can't find what I'm looking for — can I request a category or tool?",
      answer:
        "Yes. If enough people request it, we'll add it to our curated roadmap or publish a comparison post.",
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
