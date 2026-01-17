"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();
  const user = useCurrentUser();
  function gettingStarted() {
    if (!user) {
      router.push("/login");
      return;
    }
  }
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Find the right tool faster.
          </h2>
          <p className="mt-4">Explore curated software and build assets — updated weekly.</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/directories">
                <span>Browse Toolbox</span>
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/submit">
                <span>Submit a Tool</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
