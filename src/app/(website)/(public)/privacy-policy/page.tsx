// app/privacy-policy/page.tsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-gray-800 dark:text-gray-100 dark:bg-transparent">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 font-medium">Last Updated: June 3, 2025</p>

      <p className="mb-4">
        Welcome to Teniam (“we,” “us,” or “our”). At Teniam, we are committed to
        protecting your privacy... By accessing our website, you agree to the
        terms of this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Personal Information</strong>: Information you provide
          directly...{" "}
          <a
            href="mailto:support@teniam.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@teniam.com
          </a>
        </li>
        <li>
          <strong>Usage Data</strong>: Info about your interactions with our
          site.
        </li>
        <li>
          <strong>Cookies</strong>: We use cookies to enhance experience.
        </li>
        <li>
          <strong>Third-Party Data</strong>: Collected from analytics/social
          platforms.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide and improve our services.</li>
        <li>Personalize user experience.</li>
        <li>
          Communicate with you via{" "}
          <a
            href="mailto:support@teniam.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@teniam.com
          </a>
        </li>
        <li>Analyze usage.</li>
        <li>Comply with laws and protect rights.</li>
      </ul>

      {/* Repeat this pattern for sections 3 to 12... */}

      <h2 className="text-2xl font-semibold mt-8 mb-2">12. Contact Us</h2>
      <p className="mb-4">
        If you have questions about this Privacy Policy, please contact us at:
      </p>
      <p className="mb-2">
        <strong>Email</strong>:{" "}
        <a
          href="mailto:support@teniam.com"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          support@teniam.com
        </a>
      </p>
      <p>
        <strong>Website</strong>:{" "}
        <a
          href="https://www.teniam.com"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          teniam.com
        </a>
      </p>
    </main>
  );
}
