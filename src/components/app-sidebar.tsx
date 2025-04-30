"use client";

import * as React from "react";
import { Cpu, Globe, Boxes, Settings2 } from "lucide-react";
import {
  Building,
  LineChart,
  Lightbulb,
  Rocket,
  Star,
  Bookmark,
  Megaphone,
} from "lucide-react";

// import { NavMain } from "./nav-main";
// import { NavProjects } from "./nav-projects";
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
// import { NavMain } from "./nav-main";
// import { TechDirectoryContext } from "./tech-directory-context";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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
  navMain: [
    {
      title: "Build",
      url: "#",
      icon: Building,
      id: "build",
      items: [
        {
          title: "Code Frameworks",
          url: "#",
          id: "code-frameworks",
        },
        {
          title: "Design Systems",
          url: "#",
          id: "design-systems",
        },
        {
          title: "No-Code Solutions",
          url: "#",
          id: "no-code-solutions",
        },
        {
          title: "SaaS Boilerplates",
          url: "#",
          id: "saas-boilerplates",
        },
        {
          title: "Selling Templates",
          url: "#",
          id: "selling-templates",
        },
      ],
    },
    {
      title: "Grow",
      url: "#",
      icon: LineChart,
      id: "grow",
      items: [
        {
          title: "Automation Tools",
          url: "#",
          id: "automation-tools",
        },
        {
          title: "Collaboration Hubs",
          url: "#",
          id: "collaboration-hubs",
        },
        {
          title: "E-Commerce Platforms",
          url: "#",
          id: "e-commerce-platforms",
        },
        {
          title: "Marketing & Analytics",
          url: "#",
          id: "marketing-analytics",
        },
        {
          title: "SEO & Performance",
          url: "#",
          id: "seo-performance",
        },
      ],
    },
    {
      title: "Innovate",
      url: "#",
      icon: Lightbulb,
      id: "innovate",
      items: [
        {
          title: "AI Tools",
          url: "#",
          id: "ai-tools",
        },
        {
          title: "AR/VR & Gaming",
          url: "#",
          id: "ar-vr-gaming",
        },
        {
          title: "Data & Insights",
          url: "#",
          id: "data-insights",
        },
        {
          title: "IoT & Robotics",
          url: "#",
          id: "iot-robotics",
        },
        {
          title: "Web3 & Blockchain",
          url: "#",
          id: "web3-blockchain",
        },
      ],
    },
    {
      title: "Future Tech",
      url: "#",
      icon: Rocket,
      id: "future-tech",
      items: [
        {
          title: "Green Tech",
          url: "#",
          id: "green-tech",
        },
        {
          title: "Neurotech Interfaces",
          url: "#",
          id: "neurotech-interfaces",
        },
        {
          title: "Quantum Computing",
          url: "#",
          id: "quantum-computing",
        },
        {
          title: "Space Tech",
          url: "#",
          id: "space-tech",
        },
        {
          title: "Synthetic Media",
          url: "#",
          id: "synthetic-media",
        },
      ],
    },
    {
      title: "Featured",
      url: "#",
      icon: Star,
      id: "featured",
      items: [],
    },
    {
      title: "Ads",
      url: "#",
      icon: Megaphone,
      id: "ads",
      items: [],
    },
    {
      title: "Bookmarks",
      url: "#",
      icon: Bookmark,
      id: "bookmarks",
      items: [],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      id: "settings",
      items: [],
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { selectedCategory, selectedTag } =
    React.useContext(TechDirectoryContext);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} selectedCategory={selectedCategory} />
        <NavProjects projects={data.projects} selectedTag={selectedTag} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
