import { PricePlans } from "@/lib/submission";
import type { PriceConfig } from "@/types";

export const priceConfig: PriceConfig = {
  plans: [
    {
      title: "Free",
      description: "For Beginners",
      benefits: [
        "Reviewed listing in the directory",
        "Live profile page with description + link",
        "Category placement",
        "Edit anytime after approval",
      ],
      // limitations: ["Backlink to our site is required", "No customer support"],
      limitations: [],

      price: 0,
      priceSuffix: "",
      stripePriceId: null,
    },
    {
      // title: "Featured",
      title: "pro",
      proTitle: "pro",
      description: "For Featured Users",
      isPopular: true,
      badgeStyle:
        "bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5",
      benefits: [
        "Featured badge",
        "Higher placement in category pages",
        "Included in featured sections",
        "Faster review",
      ],
      limitations: [],
      price: 19,
      priceSuffix: "/ wk",
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    },
    {
      // title: "Sponsored",
      title: "sponsor",

      sponsorTitle: "sponsor",
      description: "For Sponsors",
      benefits: [
        "Top placement in selected category",
        "Sponsored visibility across the directory",
        "Limited slots per period",
      ],
      limitations: [],
      price: 29,
      priceSuffix: "/ wk",
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_SPONSOR_PRICE_ID,
    },
  ],
};
