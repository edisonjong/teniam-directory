"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { DashboardConfig, MarketingConfig } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "../layout/user-button";
import { ModeToggle } from "../layout/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NavBarProps {
  scroll?: boolean;
  config: DashboardConfig | MarketingConfig;
}

export const HeroHeader = ({ scroll = false, config }: NavBarProps) => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const user = useCurrentUser();
  const links = config.menus;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuState]);

  return (
    <header className=" mb-16">
      <nav
        data-state={menuState ? "active" : undefined}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Avatar>
                  <AvatarImage src="/logo.png" />
                  <AvatarFallback>{"tm"}</AvatarFallback>
                </Avatar>
                {/* <Logo className="rounded-full" src="/logo.png" /> */}
                <h4 className="font-bold ml-1">Teniam</h4>
              </Link>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                {menuState ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {links.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href || "#"}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "bg-background data-[state=active]:block lg:data-[state=active]:flex mb-6 hidden w-full max-h-[90vh] overflow-y-auto flex-wrap items-center justify-end space-y-8  border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
                menuState && "block"
              )}
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {links.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        // onClick={() => setMenuState(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {user ? (
                  <div className="flex items-center">
                    <UserButton />
                  </div>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className={cn(isScrolled && "lg:hidden")}
                    >
                      <Link href="/auth/login">
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn(isScrolled && "lg:hidden")}
                    >
                      <Link href="/auth/register">
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                    >
                      <Link href="/auth/register">
                        <span>Get Started</span>
                      </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                      <ModeToggle />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
