// import type { SiteConfig } from '@/types';

// const SITE_URL = process.env.NEXT_PUBLIC_APP_URL;

// export const siteConfig: SiteConfig = {
//   name: 'Teniam',
//   tagline:
//     'This is a Teniam site for Mkdirs, the best directory website template',
//   description:
//     'This is a Teniam site for Mkdirs template. Mkdirs is the ultimate directory website template. With Mkdirs, you can build any trending and profitable directory website in minutes, packed with Listings, Newsletter, Payment, CMS, Blog, Authentication, SEO, Themes and more',
//   keywords: [
//     'Directory',
//     'Template',
//     'Boilerplate',
//     'Next.js',
//     'Auth.js',
//     'Tailwindcss',
//     'Shadcn/ui',
//     'Resend',
//     'Sanity',
//     'Stripe',
//     'Vercel',
//   ],
//   author: 'Teniam',
//   url: SITE_URL,
//   // please increase the version number when you update the image
//   image: `${SITE_URL}/og.png?v=1`,
//   mail: 'support@teniam.com',
//   utm: {
//     source: 'teniam.com',
//     medium: 'referral',
//     campaign: 'navigation',
//   },
//   links: {
//     // leave it blank if you don't want to show the link (don't delete)
//     twitter: 'https://x.com/MkdirsHQ',
//     github: 'https://github.com/MkdirsHQ',
//     youtube: 'https://www.youtube.com/@MkdirsHQ',
//   },
// };

// site.config.ts
export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  author: string;
  url: string;
  image: string;
  mail: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
  };
  links: {
    twitter: string;
    github: string;
    youtube: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    bluesky: string;
    linkedin: string;
  };
  navLinks: { label: string; href: string }[];
  search: {
    enabled: boolean;
    provider: string;
    indexName?: string;
    apiKey?: string;
    placeholder?: string;
  };
  analytics: {
    provider: string;
    clientId?: string;
  };
  favicon: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: string;
    url: string;
  };
  twitter: {
    card: string;
    site: string;
    creator: string;
  };
  features: { title: string; description: string }[];
  pricing: { plan: string; price: string; features: string[] }[];
  categories: string[];
  tags: string[];
};

export const siteConfig: SiteConfig = {
  name: "Teniam",
  tagline: "Tech Hub for Startups & Solopreneurs",
  description:
    "Explore a curated collection of cutting-edge AI tools, frameworks, and boilerplates designed for developers, startups, and solopreneurs — all in one place.",
  keywords: [
    "Startup Tools",
    "Solopreneur Tools",
    "AI Tools",
    "Developer Frameworks",
    "Boilerplates",
    "Tech Directory",
    "Startups",
    "Solopreneurs",
    "Next.js",
    "Astro",
    "Vercel",
    "Google Gemini",
    "VSCodium",
    "Replit",
    "Magic UI",
    "MediaWiki",
    "Google PaLM",
    "Tailwind CSS",
    "Shadcn/ui",
    "Sanity CMS",
    "Stripe Payments",
    "Auth.js",
    "Resend",
  ],
  author: "Teniam Team",
  url: process.env.SITE_URL || "https://www.teniam.com",
  image: `${process.env.SITE_URL || "https://www.teniam.com"}/og.png?v=2`,
  mail: "support@teniam.com",
  utm: {
    source: "teniam.com",
    medium: "referral",
    campaign: "site_navigation",
  },
  links: {
    twitter: "https://x.com/teniamhub",
    github: "https://github.com/teniam",
    youtube: "https://www.youtube.com/@teniamhub",
    instagram: "https://www.instagram.com/teniamhub",
    facebook: "https://www.facebook.com/teniamhub",
    tiktok: "https://www.tiktok.com/@teniamhub",
    bluesky: "https://bsky.app/profile/teniam.bsky.social",
    linkedin: "https://www.linkedin.com/company/teniam",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Directory", href: "/directory" },

    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
  search: {
    enabled: true,
    provider: "algolia",
    indexName: "teniam_prod",
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY || "",
    placeholder: "Search AI tools, frameworks, or boilerplates...",
  },
  analytics: {
    provider: "openpanel",
    clientId: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID || "",
  },
  favicon: `${process.env.SITE_URL || "https://www.teniam.com"}/favicon.ico`,
  openGraph: {
    title: "Teniam: Tech Hub for Startups & Solopreneurs",
    description:
      "Explore a curated collection of AI tools, frameworks, and boilerplates for developers, startups, and solopreneurs.",
    image: `${process.env.SITE_URL || "https://www.teniam.com"}/og.png?v=2`,
    type: "website",
    url: "https://www.teniam.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@teniamhub",
    creator: "@teniamhub",
  },
  features: [
    {
      title: "Handpicked Tools",
      description:
        "Discover top-tier technologies like Next.js, Astro, and Vercel.",
    },
    {
      title: "Seamless Navigation",
      description: "Browse and filter with ease to find the perfect solution.",
    },
    {
      title: "Community Contributions",
      description: "Submit your favorite tools to share with the world.",
    },
  ],
  pricing: [
    {
      plan: "Free",
      price: "$0 / mo",
      features: [
        "Basic listing in the directory",
        "1 dofollow link to boost SEO",
        "Manual review process (3-5 business days)",
        "Limited visibility (no spotlight, side menu, or sidebar placement)",
        "Premium customer support",
      ],
    },
    {
      plan: "Featured",
      price: "$19 / wk",
      features: [
        ">= 3 dofollow links to boost SEO",
        "List right now, publish whenever you want",
        "Permanent link, no backlink required",
        "Featured placement at the top of listings with Shine Border",
        "Prominent sidebar placement",
        "Premium customer support",
      ],
    },
    {
      plan: "Sponsored",
      price: "$29 / wk",
      features: [
        "Everything in Pro plan",
        "Promote your product on almost every page",
        "Exclusive one advertisement per period for maximum exposure",
        "Only one advertisement per period",
        "Schedule your advertising period",
        "Premium customer support",
      ],
    },
  ],
  categories: [
    "Platform",
    "Featured",
    "Ads",
    "Bookmarks",
    "AI",
    "Apps",
    "Analytics",
    "APIs",
    "AR/VR",
    "Authentication",
    "Automation",
    "Boilerplates",
    "Browser",
    "Cloud Services",
    "Collaboration",
    "Community",
    "Compiler",
    "Config",
    "Crypto",
    "Cybersecurity",
    "Database",
    "Design",
    "Design Systems",
    "Devtool",
    "Documentation",
    "E-Commerce",
    "Education",
    "Entertainment",
    "Framework",
    "Gaming",
    "Green Tech",
    "Google",

    "Hardware",
    "Hosting",
    "IaC",
    "IoT",
    "Language",
    "Library",
    "Lifestyle",
    "Marketplace",
    "Metaverse",
    "Monorepo",
    "Music",
    "Neurotech",
    "No-Code/Low-Code",
    "Payment",
    "Password Management",
    "Prototyping",
    "Robotics",
    "SaaS",
    "Secrets",
    "Social",
    "Software",
    "Startups",
    "Templates",
    "Vercel",
    "VoidZero",
    "Web3",
  ],
  tags: [
    "Platform",
    "Featured",
    "Ads",
    "Bookmarks",
    "AI",
    "Apps",
    "Analytics",
    "APIs",
    "AR/VR",
    "Authentication",
    "Automation",
    "Boilerplates",
    "Browser",
    "Cloud Services",
    "Collaboration",
    "Community",
    "Compiler",
    "Config",
    "Crypto",
    "Cybersecurity",
    "Database",
    "Design",
    "Design Systems",
    "Devtool",
    "Documentation",
    "E-Commerce",
    "Education",
    "Entertainment",
    "Framework",

    "Gaming",
    "Green Tech",
    "Google",
    "Hardware",
    "Hosting",
    "IaC",
    "IoT",
    "Language",
    "Library",
    "Lifestyle",
    "Marketplace",
    "Metaverse",
    "Monorepo",
    "Music",
    "Neurotech",
    "No-Code/Low-Code",
    "Payment",
    "Password Management",
    "Prototyping",
    "Robotics",
    "SaaS",
    "Secrets",
    "Social",
    "Software",
    "Startups",
    "Templates",
    "Vercel",
    "VoidZero",
    "Web3",
  ],
};
