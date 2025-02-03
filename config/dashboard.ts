import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Files",
      href: "/dashboard",
      icon: "post",
      preview: false,
    },
    {
      title: "Analytics & Shares",
      href: "/dashboard/analytics",
      icon: "barchart",
      preview: false,
    },
    {
      title: "Logs",
      href: "/dashboard/logs",
      icon: "logs",
      preview: false,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
      preview: false,
    },
    {
      title: "API Keys",
      href: "/dashboard/api-key",
      icon: "key",
      preview: false,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      preview: false,
    },
    {
      title: "Favorites",
      href: "/dashboard/favorites",
      icon: "love",
      preview: false,
    },
    {
      title: "Teams",
      href: "/dashboard/teams",
      icon: "users",
      preview: true,
    },
  ],
};
