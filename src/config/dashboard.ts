import { DashboardConfig } from "@/types";

// Define available icons to ensure consistency
const icons = {
  collection: "collection",
  mint: "mint",
  donate: "donate",
  vote: "vote",
  stake: "stake",
  membership: "membership",
  settings: "settings",
};

// Define the dashboard configuration
export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Home",
      href: "/",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Collection",
      href: "/dashboard/collection",
      icon: icons.collection,
    },
    {
      title: "Mint",
      href: "/dashboard/mint",
      icon: icons.mint,
    },
    {
      title: "Donate",
      href: "/dashboard/donate",
      icon: icons.donate,
    },
    {
      title: "Vote",
      href: "/dashboard/vote",
      icon: icons.vote,
    },
    {
      title: "Stake NFTs",
      href: "/dashboard/stake",
      icon: icons.stake,
    },
    {
      title: "Membership",
      href: "/dashboard/membership",
      icon: icons.membership,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: icons.settings,
    },
  ],
};
