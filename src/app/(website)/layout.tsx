import "@/styles/globals.css";

import {
  fontBricolageGrotesque as fontBricolage,
  fontSourceSans,
  fontSourceSerif,
  fontWorkSans,
} from "@/assets/fonts";
import { auth } from "@/auth";
import { Analytics } from "@/components/analytics/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { BookmarkProvider } from "@/components/ui/bookmark-context";

export const metadata = constructMetadata();

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // https://youtu.be/1MTyCvS05V4?t=21464
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
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
              {/* <Toaster richColors position="top-right" offset={64} /> */}
              <Toaster />

              <TailwindIndicator />

              <Analytics />
            </BookmarkProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
