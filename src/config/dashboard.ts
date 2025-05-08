import type { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  menus: [
    {
      title: "Home",
      href: "/",
      icon: "home",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
    {
      title: "Submit",
      href: "/submit",
      icon: "submit",
    },
  ],
};
