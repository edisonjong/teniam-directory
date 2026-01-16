"use client";

import * as React from "react";
import { Cpu, Globe, Boxes, Settings2, LucideIcon, Tags } from "lucide-react";
import {
  Building,
  LineChart,
  Lightbulb,
  Rocket,
  Star,
  Bookmark,
  Megaphone,
} from "lucide-react";

import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TechDirectoryContext } from "./ui/tech-directory-context";
import { NavMain } from "./ui/nav-main";
import { NavProjects } from "./ui/nav-projects";

// This is sample data.
const data = {
  user: {
    name: "New Tools",
    email: "support@newtools.io",
    avatar: "/logo.jpeg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: Boxes,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Globe,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Cpu,
      plan: "Free",
    },
  ],
  projects: [
    { name: "A-Frame", url: "#", id: "a-frame" },
    { name: "Adalo", url: "#", id: "adalo" },
    { name: "Adobe XD", url: "#", id: "adobe-xd" },
    { name: "Ahrefs", url: "#", id: "ahrefs" },
    { name: "Angular", url: "#", id: "angular" },
    { name: "Arduino", url: "#", id: "arduino" },
    { name: "Astro", url: "#", id: "astro" },
    { name: "BigCommerce", url: "#", id: "bigcommerce" },
    { name: "Bubble", url: "#", id: "bubble" },
    { name: "CarbonChain", url: "#", id: "carbonchain" },
    { name: "Carrd", url: "#", id: "carrd" },
    { name: "Chainlink", url: "#", id: "chainlink" },
    { name: "Cirq", url: "#", id: "cirq" },
    { name: "D3.js", url: "#", id: "d3-js" },
    { name: "Descript", url: "#", id: "descript" },
    { name: "Discord", url: "#", id: "discord" },
    { name: "Django", url: "#", id: "django" },
    { name: "Elementor", url: "#", id: "elementor" },
    { name: "ElevenLabs", url: "#", id: "elevenlabs" },
    { name: "Ethereum", url: "#", id: "ethereum" },
    { name: "Express", url: "#", id: "express" },
    { name: "Figma", url: "#", id: "figma" },
    { name: "Flask", url: "#", id: "flask" },
    { name: "Framer", url: "#", id: "framer" },
    { name: "Free", url: "#", id: "free" },
    { name: "Glide", url: "#", id: "glide" },
    { name: "Godot", url: "#", id: "godot" },
    { name: "Google Analytics", url: "#", id: "google-analytics" },
    { name: "Greenly", url: "#", id: "greenly" },
    { name: "GTmetrix", url: "#", id: "gtmetrix" },
    { name: "Home Assistant", url: "#", id: "home-assistant" },
    { name: "Hotjar", url: "#", id: "hotjar" },
    { name: "HubSpot", url: "#", id: "hubspot" },
    { name: "Hugging Face", url: "#", id: "hugging-face" },
    { name: "Java", url: "#", id: "java" },
    { name: "LangChain", url: "#", id: "langchain" },
    { name: "Laravel", url: "#", id: "laravel" },
    { name: "Lighthouse", url: "#", id: "lighthouse" },
    { name: "Looker", url: "#", id: "looker" },
    { name: "Magento", url: "#", id: "magento" },
    { name: "Mailchimp", url: "#", id: "mailchimp" },
    { name: "Make (Integromat)", url: "#", id: "make-integromat" },
    { name: "Miro", url: "#", id: "miro" },
    { name: "Mixpanel", url: "#", id: "mixpanel" },
    { name: "MQTT", url: "#", id: "mqtt" },
    { name: "n8n", url: "#", id: "n8n" },
    { name: "Neuralink", url: "#", id: "neuralink" },
    { name: "Next.js", url: "#", id: "nextjs" },
    { name: "Notion", url: "#", id: "notion" },
    { name: "Nuxt", url: "#", id: "nuxt" },
    { name: "OpenAI", url: "#", id: "openai" },
    { name: "Polygon", url: "#", id: "polygon" },
    { name: "Power BI", url: "#", id: "power-bi" },
    { name: "Puppeteer", url: "#", id: "puppeteer" },
    { name: "Python", url: "#", id: "python" },
    { name: "Qiskit", url: "#", id: "qiskit" },
    { name: "Raspberry Pi", url: "#", id: "raspberry-pi" },
    { name: "React", url: "#", id: "react" },
    { name: "Remix", url: "#", id: "remix" },
    { name: "ROS", url: "#", id: "ros" },
    { name: "Ruby on Rails", url: "#", id: "ruby-on-rails" },
    { name: "RunwayML", url: "#", id: "runwayml" },
    { name: "Rust", url: "#", id: "rust" },
    { name: "SatelliteKit", url: "#", id: "satellitekit" },
    { name: "Semrush", url: "#", id: "semrush" },
    { name: "Shadcn", url: "#", id: "shadcn" },
    { name: "Sketch", url: "#", id: "sketch" },
    { name: "Slack", url: "#", id: "slack" },
    { name: "Snowflake", url: "#", id: "snowflake" },
    { name: "Softr", url: "#", id: "softr" },
    { name: "Solana", url: "#", id: "solana" },
    { name: "Solidity", url: "#", id: "solidity" },
    { name: "Squarespace", url: "#", id: "squarespace" },
    { name: "SvelteKit", url: "#", id: "sveltekit" },
    { name: "Synthesia", url: "#", id: "synthesia" },
    { name: "Tableau", url: "#", id: "tableau" },
    { name: "Tailwind", url: "#", id: "tailwind" },
    { name: "Three.js", url: "#", id: "three-js" },
    { name: "Trello", url: "#", id: "trello" },
    { name: "UiPath", url: "#", id: "uipath" },
    { name: "Unity", url: "#", id: "unity" },
    { name: "Unreal Engine", url: "#", id: "unreal-engine" },
    { name: "Vertex AI", url: "#", id: "vertex-ai" },
    { name: "Wasp", url: "#", id: "wasp" },
    { name: "Webflow", url: "#", id: "webflow" },
    { name: "WooCommerce", url: "#", id: "woocommerce" },
    { name: "WordPress", url: "#", id: "wordpress" },
    { name: "Yoast", url: "#", id: "yoast" },
    { name: "Zapier", url: "#", id: "zapier" },
  ],
};
type Category = string;
type Platform = string;
export function AppSidebar({
  categoryList,
  setSelectedCategory,
  selectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  // tagList,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  categoryList: {
    name: string;
    slug: { current: string };
    _id: string;
    categories: {
      name: string;
      slug: { current: string };
      _id: string;
    }[];
  }[];
  setSelectedCategory: (category: Category) => void;
  selectedCategory: Category;
  setSelectedPlatform: (platform: Platform) => void;
  selectedPlatform: Platform;
}) {
  const staticItems = [
    {
      title: "Featured",
      url: "#featured",
      icon: Star,
      id: "featured",
      items: [],
    },
    {
      title: "Ads",
      url: "#ads",
      icon: Megaphone,
      id: "sponsor",
      items: [],
    },
    {
      title: "Bookmarks",
      url: "#bookmarks",
      icon: Bookmark,
      id: "bookmark",
      items: [],
    },
    // {
    //   title: "Tags",
    //   url: "#tags",
    //   icon: Tags,
    //   id: "tags",
    //   items: [],
    // },
  ];
  const navMainItems = [...staticItems];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navMainItems}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
        />
        <NavProjects
          categories={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
