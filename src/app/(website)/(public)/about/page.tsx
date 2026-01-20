import { WebPageSchema } from "@/components/seo/webpage-schema";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "About | Newtools",
  description: "Learn about Newtools — a curated hub for discovering tools that help builders ship faster. AI-assisted, human-reviewed directory of high-quality tools.",
  canonicalUrl: `${siteConfig.url}/about`,
  keywords: [
    ...siteConfig.keywords,
    "about newtools",
    "tool directory",
    "curated tools",
    "AI tools directory",
  ],
});

export default function About() {
  return (
    <>
      <WebPageSchema
        name="About Newtools"
        description="Learn about Newtools — a curated hub for discovering tools that help builders ship faster. AI-assisted, human-reviewed directory of high-quality tools."
        url={`${siteConfig.url}/about`}
      />
    <main className="max-w-3xl mx-auto px-5 py-8 font-sans leading-relaxed bg-white dark:bg-transparent">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          About Newtools
      </h1>

        <p className="mb-6 text-gray-800 dark:text-gray-300">
          Newtools is a curated hub for discovering tools that help builders ship faster — from AI tools and developer software to templates, boilerplates, and build assets.
      </p>

      <p className="mb-6 text-gray-800 dark:text-gray-300">
          We don't aim to list everything. We aim to list what matters.
        </p>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          What we do
        </h2>

        <p className="mb-4 text-gray-800 dark:text-gray-300">
          Newtools helps you:
        </p>

        <ul className="list-disc list-inside mb-6 text-gray-800 dark:text-gray-300 space-y-2">
          <li>discover high-quality tools faster</li>
          <li>compare options with less noise</li>
          <li>find build assets like templates and boilerplates in one place</li>
          <li>submit products to reach founders, developers, and creators</li>
        </ul>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Why Newtools exists
        </h2>

        <p className="mb-4 text-gray-800 dark:text-gray-300">
          The internet has endless lists of tools — but most directories are unfiltered, outdated, or filled with duplicates.
        </p>

        <p className="mb-4 text-gray-800 dark:text-gray-300">
          Newtools was built to be the opposite:
        </p>

        <ul className="list-disc list-inside mb-6 text-gray-800 dark:text-gray-300 space-y-2">
          <li>curated, not cluttered</li>
          <li>useful, not spammy</li>
          <li>simple to browse and easy to trust</li>
        </ul>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          AI-assisted, human-reviewed
      </h2>

        <p className="mb-4 text-gray-800 dark:text-gray-300">
          Newtools uses AI-assisted formatting guidelines to help standardise submissions and improve clarity — including summaries, key features, and category suggestions.
        </p>

        <p className="mb-4 text-gray-800 dark:text-gray-300">
          However, every listing is still reviewed before it goes live. We may edit and adjust submissions on your behalf to:
        </p>

        <ul className="list-disc list-inside mb-4 text-gray-800 dark:text-gray-300 space-y-2">
          <li>improve readability</li>
          <li>correct categories or tags</li>
          <li>remove misleading claims</li>
          <li>keep the directory clean and trustworthy</li>
      </ul>

        <p className="mb-6 text-gray-800 dark:text-gray-300">
          If a listing can't be verified or doesn't meet our quality standard, it won't be published.
        </p>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Affiliate transparency
      </h2>

        <p className="mb-4 text-gray-800 dark:text-gray-300">
          Some listings include affiliate links. You never pay extra — it simply helps support Newtools and keep the platform running.
        </p>

      <p className="mb-6 text-gray-800 dark:text-gray-300">
          We do not accept payment to approve low-quality listings. Visibility upgrades never replace quality review.
        </p>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Who Newtools is for
        </h2>

        <p className="mb-4 text-gray-800 dark:text-gray-300">
          Newtools is built for:
        </p>

        <ul className="list-disc list-inside mb-6 text-gray-800 dark:text-gray-300 space-y-2">
          <li>founders and indie hackers</li>
          <li>developers and builders</li>
          <li>startups launching products</li>
          <li>marketers and creators</li>
          <li>anyone who wants better tools with less searching</li>
        </ul>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Contact
      </h2>

      <p className="mb-6 text-gray-800 dark:text-gray-300">
          For partnerships, featured placements, or corrections, contact us via our{" "}
        <a
            href="/contact"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
            contact page
          </a>
          .
      </p>
    </main>
    </>
  );
}
