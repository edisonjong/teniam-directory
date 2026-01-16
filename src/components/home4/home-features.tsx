import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Search,
  Settings2,
  Sparkles,
  UserPlus,
  Wrench,
  Zap,
} from 'lucide-react';
import { ReactNode } from 'react';

export default function Features() {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mt-4">
            We've handpicked the best boilerplates, templates, AI tools, and
            software to help you build and scale quickly.
            <br />
            Newtools is your go-to platform for discovering tech that saves time
            and sparks innovation.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Wrench className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Handpicked Tools</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Discover top-tier technologies like Next.js,
                <br />
                Astro, and Vercel.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Search className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Seamless Navigation</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Browse and filter with ease to find the perfect solution.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <UserPlus className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Community Contributions</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Submit your favorite tools to share with the world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
