'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { subscribeToNewsletter } from '@/actions/subscribe-to-newsletter';
import { NewsletterFormSchema, type NewsletterFormData } from '@/lib/schemas';
import { Icons } from '@/components/icons/icons';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

export default function SubscribeSection() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: NewsletterFormData) {
    startTransition(async () => {
      subscribeToNewsletter({ email: data.email })
        .then((result) => {
          switch (result.status) {
            case 'success':
              toast.success('Subscription sent successfully!');
              form.reset();
              break;
            case 'error':
              toast.error(result.message || 'Something went wrong, please try again');
              break;
            default:
              toast.error('Something went wrong, please try again');
          }
        })
        .catch((error) => {
          console.error('SubscribeSection, onSubmit, error:', error);
          toast.error(error?.message || 'Something went wrong');
        });
    });
  }

  return (
    <section className="py-16 md:py-32">
      {/* <div className="mx-auto max-w-7xl px-6">
        <div className="border-t border-dashed"></div>
      </div> */}

      <div className="mx-auto max-w-5xl px-6 mt-16">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Subscribe to Updates
          </h2>
          <p className="mt-4 text-muted-foreground">
            Stay informed about new features and product updates.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-10 max-w-sm lg:mt-12"
          >
            <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
              <Mail className="text-muted-foreground pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

              <input
                {...form.register('email')}
                placeholder="Your email address"
                className="h-14 w-full bg-transparent pl-12 focus:outline-none"
                type="email"
              />

              <div className="md:pr-1.5 lg:pr-0">
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
        </div>
      </div>
    </section>
  );
}
