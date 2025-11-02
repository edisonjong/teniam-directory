import "@/styles/globals.css";

import {
  fontBricolageGrotesque as fontBricolage,
  fontSourceSans,
  fontSourceSerif,
  fontWorkSans,
} from "@/assets/fonts";
import { auth } from "@/auth";
import { Analytics } from "@/components/analytics/analytics";
import { WebVitals } from "@/components/analytics/web-vitals";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { TailwindIndicator } from "@/components/tailwind-indicator";
// import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { BookmarkProvider } from "@/components/ui/bookmark-context";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata();

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // https://youtu.be/1MTyCvS05V4?t=21464
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="dns-prefetch" href="//v0.blob.com" />
        <link rel="dns-prefetch" href="//icons.lobehub.com" />
        {/* Organization Schema */}
        <OrganizationSchema />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased"
          // fontBricolage.className,
          // // fontSourceSans.className,
          // // fontSourceSerif.className,
          // // fontWorkSans.className,
          // fontSourceSerif.variable,
          // fontSourceSans.variable,
          // fontWorkSans.variable,
          // fontBricolage.variable,
        )}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BookmarkProvider>
              {children}

              {/* https://sonner.emilkowal.ski/toaster */}
              <Toaster richColors position="top-right" offset={64} />
              {/* <Toaster /> */}

              <TailwindIndicator />

              <Analytics />
              <WebVitals />
            </BookmarkProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
