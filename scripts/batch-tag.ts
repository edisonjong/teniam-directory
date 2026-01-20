import { slugify } from "@/lib/utils";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
const envPath = resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

// Validate required environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("❌ Missing required environment variables!");
  console.error("\nPlease ensure your .env file contains:");
  console.error("  - NEXT_PUBLIC_SANITY_PROJECT_ID");
  console.error("  - NEXT_PUBLIC_SANITY_DATASET");
  console.error("  - SANITY_API_TOKEN");
  console.error(`\nLooking for .env file at: ${envPath}`);
  process.exit(1);
}

// Create Sanity client
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-08-01",
  useCdn: false,
  perspective: "published",
  token,
});

/**
 * Demo: Tag Management
 *
 * This script manages the tag system in Sanity database.
 *
 * Operations:
 * 1. Remove all existing tags
 * 2. Import predefined tags
 * 3. (Optional) Update existing tags
 *
 * Features:
 * - Automatic slug generation from tag names
 * - Descriptive metadata for each tag
 * - Batch processing capabilities
 *
 * Data Structure:
 * - name: Tag display name
 * - slug: URL-friendly identifier
 * - description: Detailed tag explanation
 *
 * Example Usage:
 * ```
 * // Clean and import
 * removeTags();
 * importTags();
 *
 * // Update existing tags
 * updateTags();
 * ```
 *
 * Note: This script requires proper environment variables in .env
 */
const data = [
  // 🤖 AI
  { name: "AI", description: "AI-powered tools and assistants." },
  { name: "LLM", description: "Tools built around large language models." },
  { name: "Chatbot", description: "Chat-based assistants and support tools." },
  { name: "Prompting", description: "Prompt libraries, workflows, and prompt tooling." },
  { name: "AI Agents", description: "Agentic automation tools that can run tasks end-to-end." },
  { name: "RAG", description: "Retrieval-augmented generation and knowledge search tooling." },
  { name: "Fine-tuning", description: "Tools for training, tuning, and adapting AI models." },
  { name: "Model Hosting", description: "Platforms to deploy, run, or host AI models." },
  { name: "Image Generation", description: "AI tools for generating images, graphics, and visuals." },
  { name: "Video Generation", description: "AI tools for generating or editing video content." },
  { name: "Voice & Audio", description: "AI voice, audio editing, and transcription tools." },
  { name: "OCR", description: "Text extraction and document scanning tools." },

  // 👨‍💻 Developer / Engineering
  { name: "Developer Tools", description: "Tools built for software development workflows." },
  { name: "API", description: "API platforms, tools, and integrations." },
  { name: "SDK", description: "SDKs and dev kits for building apps faster." },
  { name: "CLI", description: "Command-line tools for developers." },
  { name: "Open Source", description: "Open-source tools, libraries, and platforms." },
  { name: "Framework", description: "Frameworks for building web apps and software products." },
  { name: "Library", description: "Reusable code libraries and packages." },
  { name: "Documentation", description: "Documentation platforms and knowledge base tools." },
  { name: "Code Search", description: "Tools for searching and understanding codebases." },
  { name: "Testing", description: "Testing, QA, and reliability tooling." },
  { name: "CI/CD", description: "Continuous integration and delivery pipelines." },
  { name: "Monitoring", description: "Monitoring, observability, and incident tools." },
  { name: "Logging", description: "Log management and diagnostics tools." },
  { name: "Performance", description: "Speed, optimisation, and performance tools." },
  { name: "Security", description: "Security tooling for apps and infrastructure." },
  { name: "Authentication", description: "Login, identity, and access management tools." },
  { name: "Secrets Management", description: "Secrets, keys, and environment management tools." },

  // 🎨 Design
  { name: "Design", description: "Tools for UI design, branding, and visuals." },
  { name: "UI", description: "User interface tools, components, and layouts." },
  { name: "UX", description: "UX research and product design tools." },
  { name: "Prototyping", description: "Prototyping tools for demos and clickable mockups." },
  { name: "Figma", description: "Figma plugins, UI kits, and design resources." },
  { name: "Branding", description: "Branding, logos, and identity tools." },
  { name: "Icons", description: "Icon libraries and design assets." },
  { name: "Illustrations", description: "Illustration libraries and visual assets." },
  { name: "3D", description: "3D assets, modeling, and rendering tools." },

  // 📈 Marketing / Growth
  { name: "Marketing", description: "Tools for marketing and growth." },
  { name: "SEO", description: "SEO tools for content and search optimisation." },
  { name: "Content Marketing", description: "Content planning, writing, and publishing tools." },
  { name: "Email Marketing", description: "Email newsletters, campaigns, and automations." },
  { name: "Social Media", description: "Social scheduling and content tools." },
  { name: "Ads", description: "Paid ads tools and tracking platforms." },
  { name: "Copywriting", description: "Copywriting and content generation tools." },
  { name: "CRM", description: "CRM platforms for leads and customers." },
  { name: "Sales", description: "Sales tools and outbound platforms." },
  { name: "Lead Gen", description: "Lead capture, enrichment, and prospecting tools." },

  // ⚙️ Automation & Productivity
  { name: "Automation", description: "Workflow automation and productivity tools." },
  { name: "Integrations", description: "Tools that connect apps and services together." },
  { name: "Workflows", description: "Automated workflows, triggers, and pipelines." },
  { name: "No-Code", description: "No-code and low-code app builders." },
  { name: "Productivity", description: "Tools to save time and work faster." },
  { name: "Scheduling", description: "Scheduling, booking, and calendar tools." },

  // 📊 Analytics & Data
  { name: "Analytics", description: "Analytics tools for product and business data." },
  { name: "Tracking", description: "Event tracking and user behaviour platforms." },
  { name: "Dashboards", description: "Reporting and dashboard platforms." },
  { name: "Heatmaps", description: "Heatmaps, session replay, and user insights tools." },
  { name: "A/B Testing", description: "Experimentation and A/B testing platforms." },
  { name: "Product Analytics", description: "Funnels, cohorts, retention, and product analytics." },

  // ☁️ Hosting & Infrastructure
  { name: "Hosting", description: "Hosting providers and deployment tools." },
  { name: "Cloud", description: "Cloud platforms and infrastructure services." },
  { name: "Deployment", description: "Deployment pipelines and release automation tools." },
  { name: "DevOps", description: "DevOps tooling for infrastructure and scaling." },
  { name: "Infrastructure as Code", description: "Infrastructure as code and environment automation." },
  { name: "Database", description: "Databases and data storage platforms." },
  { name: "Storage", description: "File storage and asset hosting tools." },
  { name: "CDN", description: "CDN and performance delivery tools." },
  { name: "Serverless", description: "Serverless and edge compute platforms." },
  { name: "Containers", description: "Container tooling and orchestration platforms." },

  // 💳 Payments
  { name: "Payments", description: "Payment processors and checkout tools." },
  { name: "Billing", description: "Billing, subscriptions, and invoicing tools." },
  { name: "Subscriptions", description: "Subscription and recurring revenue platforms." },
  { name: "Invoicing", description: "Invoicing and payment collection software." },
  { name: "Fintech", description: "Finance and payment infrastructure products." },
  { name: "Fraud Prevention", description: "Fraud detection, risk scoring, and chargeback tools." },

  // 🧱 Build Assets
  { name: "Boilerplate", description: "Starter codebases to launch projects faster." },
  { name: "Starter Kit", description: "Prebuilt foundations for new apps and products." },
  { name: "SaaS", description: "SaaS-ready templates, starters, and setups." },
  { name: "Auth Ready", description: "Projects with authentication included by default." },
  { name: "Payments Ready", description: "Projects that include billing or payments prebuilt." },
  { name: "Templates", description: "Templates for websites and digital products." },
  { name: "Landing Page", description: "Landing page templates and marketing layouts." },
  { name: "Dashboard", description: "Dashboard and admin UI templates." },
  { name: "Themes", description: "Themes and pre-styled UI layouts." },
  { name: "UI Kit", description: "Reusable UI kits and design systems." },
  { name: "Components", description: "Component libraries and UI building blocks." },
  { name: "Assets", description: "Icons, illustrations, and reusable visual assets." },
  { name: "Tailwind", description: "Tailwind CSS templates and UI kits." },
  { name: "Shadcn", description: "shadcn/ui templates and components." },
  { name: "React", description: "React-based tools, templates, and UI libraries." },
  { name: "Next.js", description: "Next.js starters, templates, and boilerplates." },
  { name: "Astro", description: "Astro templates and starter projects." },
  { name: "Vue", description: "Vue templates, UI kits, and component libraries." },

  // 🔮 Meta / Future‑Proof Tags
  { name: "B2B", description: "Business tools for teams and companies." },
  { name: "B2C", description: "Consumer tools for individuals and creators." },
  { name: "Mobile", description: "Mobile-first apps and tools." },
  { name: "Web", description: "Web apps and browser-based products." },
  { name: "Chrome Extension", description: "Browser extensions and add-ons." },
  { name: "Desktop App", description: "Native desktop apps and cross-platform software." },
  { name: "Integrates With", description: "Tools known for integrations and extensibility." },
  { name: "API First", description: "Products designed with APIs as the primary interface." },

  // ✅ Universal Qualifiers (Optional)
  { name: "Free", description: "Free tools or free tier available." },
  { name: "Paid", description: "Paid tools and premium software." },
  { name: "Freemium", description: "Free plan with paid upgrades available." },
  { name: "Self Hosted", description: "Tools you can host and run yourself." },
  { name: "Enterprise", description: "Enterprise-ready software and platforms." },
  { name: "Developer Friendly", description: "Built with developers in mind." },
  { name: "Beginner Friendly", description: "Easy to use for beginners and new builders." },
  { name: "Team", description: "Tools designed for teams and collaboration." },
];

export const removeTags = async () => {
  const data = await client.delete({
    query: "*[_type == 'tag']",
  });
  console.log("removeTags:", data);
};

export const importTags = async () => {
  try {
    console.log("importTags start");

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log("index: ", i, "item:", item.name);
      await client.create({
        // _id: item._id,
        // _createdAt: item._createdAt,
        // _updatedAt: item._updatedAt,
        _type: "tag",
        name: item.name,
        slug: {
          _type: "slug",
          // current: item.slug,
          current: slugify(item.name),
        },
        description: item.description,
      });
    }

    console.log("importTags success");
  } catch (error) {
    console.error(error);
  }
};

export const updateTags = async () => {
  const tags = await client.fetch(`*[_type == "tag"]`);

  for (const tag of tags) {
    const result = await client
      .patch(tag._id)
      .set({
        // do what you want to update here
      })
      .commit();

    console.log(`Updated tag ${tag.name}:`, result);
  }

  console.log(`Updated ${tags.length} tags`);
};

// Get operation from command line
const operation = process.argv[2];

// Run operation based on command line argument
const runOperation = async () => {
  switch (operation) {
    case "remove":
      await removeTags();
      break;
    case "import":
      await importTags();
      break;
    case "update":
      await updateTags();
      break;
    default:
      console.log(`
Available commands:
- remove: Remove all tags
- import: Import all tags
- update: Update all tags

Usage: tsx scripts/batch-tag.ts [remove|import|update]
      `);
  }
};

// Run operation
runOperation().catch(console.error);
