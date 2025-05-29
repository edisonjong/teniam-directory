'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

export default function FAQsTwo() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'How do I submit a tool?',
      answer: 'Click “Submit a Tool” and complete the quick submission form.',
    },
    {
      id: 'item-2',
      question: 'What types of tools are accepted?',
      answer:
        'We welcome developer tools, frameworks, platforms, and services that empower tech projects.',
    },
    {
      id: 'item-3',
      question: ' Is there a cost to list a tool?',
      answer:
        'Listings are free, with optional paid featured placements. Check our pricing guide for details.',
    },
    {
      id: 'item-4',
      question: 'Can I update my listing after submission?',
      answer: 'Yes, you can edit your listing anytime via your dashboard.',
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
            Can't find what you're looking for? Contact our{' '}
            <Link href="#" className="text-primary font-medium hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
