"use client";

import { HeaderSection } from "../shared/header-section";
import { NewsletterForm } from "./newsletter-form";
import clsx from "clsx"; // or use `cn` if you're using tailwind-variants or another util

interface NewsletterCardProps {
  transparentBg?: boolean;
}

export function NewsletterCard({ transparentBg = false }: NewsletterCardProps) {
  return (
    <div
      className={clsx(
        "w-full px-4 py-8 md:p-12 rounded-lg",
        transparentBg ? "bg-transparent" : "bg-muted"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <HeaderSection
          id="newsletter"
          labelAs="h2"
          label="Newsletter"
          title="Stay Ahead of the Curve"
          titleAs="h3"
          subtitle="Subscribe to receive updates on the latest tools, frameworks, and tech trends."
        />

        <NewsletterForm />
      </div>
    </div>
  );
}
