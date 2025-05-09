// import SimplifiedHero from "@/components/sections/simplified-hero"
import type { Metadata } from "next";
import SimplifiedHero from "./simplified-hero";

export const metadata: Metadata = {
  title: "Tailwind CSS: Revolutionizing Web Development",
  description:
    "Learn how Tailwind CSS is transforming the way developers build interfaces with its utility-first approach.",
  openGraph: {
    title: "Tailwind CSS: Revolutionizing Web Development",
    description:
      "Learn how Tailwind CSS is transforming the way developers build interfaces with its utility-first approach.",
    images: [
      {
        url: "https://tailwindcss.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tailwind CSS",
      },
    ],
  },
};

export default function Home() {
  return <SimplifiedHero />;
}
