"use client";
import Link from "next/link";
import { Globe, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import { UrlPreview } from "@/components/shared/url-preview"
// import SubscribeSection from "@/components/sections/subscribe-section"
// import IntegrationsSection from "@/components/sections/integrations-section"
import { useState } from "react";
// import { TailwindLogo } from "@/components/icons/logos";
import { UrlPreview } from "@/components/shared/url-preview";
import SubscribeSection from "./subscribe-section";
import IntegrationsSection from "./integrations-section";
import { TailwindLogo } from "@/components/logo";

export default function SimplifiedHero() {
  const [shareStatus, setShareStatus] = useState<{
    message: string;
    copied: boolean;
  }>({ message: "", copied: false });

  const handleShare = async () => {
    const shareData = {
      title: "Tailwind CSS: Revolutionizing Web Development",
      text: "Check out this amazing product for customer engagement solutions!",
      url: window.location.href,
    };

    try {
      // Check if we're in an iframe
      const isInIframe = window !== window.parent;

      // Only try to use navigator.share if we're not in an iframe
      if (
        !isInIframe &&
        navigator.share &&
        typeof navigator.canShare === "function" &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        setShareStatus({ message: "Shared successfully!", copied: false });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title} - ${shareData.text} ${shareData.url}`
        );
        setShareStatus({ message: "Link copied to clipboard!", copied: true });
      }
    } catch (err) {
      console.error("Error sharing:", err);

      // Try clipboard as fallback for any error
      try {
        await navigator.clipboard.writeText(
          `${shareData.title} - ${shareData.text} ${shareData.url}`
        );
        setShareStatus({ message: "Link copied to clipboard!", copied: true });
      } catch (clipboardErr) {
        setShareStatus({
          message: "Unable to share or copy link",
          copied: false,
        });
      }
    }

    // Clear the message after 2 seconds
    setTimeout(() => {
      setShareStatus({ message: "", copied: false });
    }, 2000);
  };

  return (
    <>
      <main className="overflow-x-hidden">
        <section>
          <div className="relative pt-12 md:pt-24">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
            <div className="mx-auto max-w-7xl px-6">
              {/* Share button at top right */}
              <div className="flex justify-end mb-6">
                <div className="relative">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                  {shareStatus.message && (
                    <div className="absolute -bottom-8 right-0 whitespace-nowrap rounded bg-background px-2 py-1 text-xs shadow-md border">
                      {shareStatus.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side content */}
                <div className="md:col-span-1">
                  <div className="flex flex-col">
                    {/* 1. Logo */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <Link
                        href="https://tailwindcss.com/"
                        className="inline-block"
                      >
                        <TailwindLogo />
                      </Link>
                    </motion.div>

                    {/* 2. Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="relative z-10 max-w-xl text-3xl font-medium sm:text-4xl lg:text-5xl"
                    >
                      Tailwind CSS: Revolutionizing Web Development
                    </motion.h2>

                    {/* 3. Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="mt-8 flex flex-wrap gap-3"
                    >
                      <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                        <Button
                          asChild
                          size="lg"
                          className="rounded-xl px-5 text-base"
                        >
                          <Link href="#link">
                            <Globe className="mr-2 h-4 w-4" />
                            <span className="text-nowrap">Visit Website</span>
                          </Link>
                        </Button>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        variant="ghost"
                        className="h-10.5 rounded-xl px-5"
                      >
                        <Link href="#link">
                          <span className="text-nowrap">Submit</span>
                        </Link>
                      </Button>
                    </motion.div>

                    {/* 4. Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="relative space-y-4 mt-8"
                    >
                      <p className="text-muted-foreground">
                        Tailwind is more than just a CSS framework.{" "}
                        <span className="text-accent-foreground font-bold">
                          It supports an entire ecosystem
                        </span>{" "}
                        — from components to plugins that enhance productivity
                        and design consistency.
                      </p>
                      <p className="text-muted-foreground">
                        It supports an entire ecosystem — from comprehensive
                        documentation to the tools and extensions helping
                        developers and businesses create beautiful, responsive
                        websites efficiently.
                      </p>
                    </motion.div>

                    {/* Dash line above Author */}
                    <div className="border-t border-dashed my-8"></div>

                    {/* 5. Author (on the left below dash line) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="https://avatars.githubusercontent.com/u/46175697?v=4"
                          alt="Mubashir Hussan"
                          className="h-10 w-10 rounded-full object-cover border border-border"
                        />
                        <div>
                          <h3 className="text-sm font-medium md:text-base">
                            Mubashir Hussan
                          </h3>
                          <p className="text-xs text-muted-foreground md:text-sm">
                            Sanity Developer
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <time dateTime="2023-04-25">
                          Published April 25, 2023
                        </time>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right side column */}
                <div className="md:col-span-1 flex flex-col">
                  {/* URL Preview at the top */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex items-start"
                  >
                    <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative w-full overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                      <UrlPreview
                        url="https://tailwindcss.com/"
                        className="w-full"
                      />
                    </div>
                  </motion.div>

                  {/* Core Technologies section (now on the right side) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="mt-8"
                  >
                    <h3 className="mb-6 text-lg font-medium">
                      Core Technologies
                    </h3>
                    <div className="grid grid-cols-1 gap-4 gap-y-6">
                      {coreTechnologies.map((tech, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-background size-10 rounded-full border p-0.5 shadow shadow-zinc-950/5 flex-shrink-0">
                            <img
                              className="aspect-square rounded-full object-contain p-1 dark:invert"
                              src={tech.logo || "/placeholder.svg"}
                              alt={`${tech.name} logo`}
                              height="40"
                              width="40"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <span className="block text-sm font-medium">
                              {tech.name}
                            </span>
                            <span className="text-muted-foreground block text-xs">
                              {tech.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SubscribeSection />
        <IntegrationsSection relatedItems={undefined} />
      </main>
    </>
  );
}

// Core Technologies data with updated descriptions and additional technologies
const coreTechnologies = [
  {
    name: "React",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
    description:
      "Component-based UI library for building interactive interfaces",
  },
  {
    name: "Next.js",
    logo: "https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png",
    description: "React framework with server-side rendering and routing",
  },
  {
    name: "TypeScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png",
    description: "Strongly typed programming language built on JavaScript",
  },
  {
    name: "Tailwind CSS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/320px-Tailwind_CSS_Logo.svg.png",
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    name: "Supabase",
    logo: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
    description: "Open source Firebase alternative with PostgreSQL",
  },
  {
    name: "Shadcn/UI",
    logo: "https://ui.shadcn.com/favicon.ico",
    description:
      "Beautifully designed components built with Radix UI and Tailwind",
  },
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png",
    description: "Platform for frontend frameworks and static sites",
  },
];
