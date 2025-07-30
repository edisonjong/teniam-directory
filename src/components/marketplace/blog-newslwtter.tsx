"use client";
import { Mail, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "../ui/text-effect";
import { AnimatedGroup } from "../ui/animated-group";
import { useTransition } from "react";
import { NewsletterFormData, NewsletterFormSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeToNewsletter } from "@/actions/subscribe-to-newsletter";
import { toast } from "sonner";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function BlogNewsLetter() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: NewsletterFormData) {
    startTransition(() => {
      subscribeToNewsletter({ email: data.email })
        .then((data) => {
          switch (data.status) {
            case "success":
              toast.success("Thank you for subscribing to our newsletter");
              form.reset();
              break;
            default:
              toast.error("Something went wrong, please try again");
          }
        })
        .catch((error) => {
          console.error("SubscribeSection, onSubmit, error:", error);
          toast.error("Something went wrong");
        });
    });
  }
  return (
    <>
      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section>
          <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-16 lg:pt-32">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-5xl font-medium md:text-6xl"
              >
                Tech Trends Unlocked
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-6 max-w-2xl text-pretty text-lg"
              >
                Get the latest tech news & insights. Subscribe for FREE updates,
                delivered straight to your inbox.
              </TextEffect>
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12"
              >
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mx-auto mt-10 max-w-sm lg:mt-12"
                >
                  <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                    <Mail className="text-muted-foreground pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

                    <input
                      {...form.register("email")}
                      placeholder="Your email address"
                      className="h-12 w-full bg-transparent pl-12 focus:outline-none"
                      type="email"
                    />

                    <div className="md:pr-1.5 lg:pr-0 py-2">
                      <Button
                        type="submit"
                        aria-label="submit"
                        className="rounded-lg sm:min-w-[100px] w-auto"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <div className="flex items-center justify-center space-x-1 mx-auto">
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                          </div>
                        ) : (
                          <>
                            <span className="hidden md:inline-block">
                              Get Started
                            </span>
                            <SendHorizonal
                              className="relative mx-auto size-5 md:hidden"
                              strokeWidth={2}
                            />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {form.formState.errors.email && (
                    <div className="mt-2 text-center text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </div>
                  )}
                </form>
              </AnimatedGroup>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
