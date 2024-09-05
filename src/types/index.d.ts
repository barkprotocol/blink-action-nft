import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

// Defines a basic navigation item with an optional disabled state
export type NavItem = {
  title: string;   // Title of the navigation item
  href: string;    // URL or path the navigation item links to
  disabled?: boolean; // Optional flag to disable the navigation item
};

// Main navigation item, extending the basic NavItem
export type MainNavItem = NavItem;

// Sidebar navigation item with optional icon, external flag, and nested items
export type SidebarNavItem = {
  title: string;     // Title of the sidebar item
  disabled?: boolean; // Optional flag to disable the sidebar item
  external?: boolean; // Optional flag indicating if the link is external
  icon?: keyof typeof Icons; // Optional icon key from Icons
} & (
  | {
      href: string;    // Required href if no nested items
      items?: never;    // No nested items allowed if href is present
    }
  | {
      href?: string;   // Optional href if nested items are present
      items: NavLink[]; // Array of nested navigation items
    }
);

// Site configuration including name, description, and URLs
export type SiteConfig = {
  name: string;         // Name of the site
  description: string;  // Description of the site
  url: string;          // Base URL of the site
  ogImage: string;      // URL for the Open Graph image
  logoUrl?: string;     // Optional URL for the site's logo
  links: {
    twitter: string;    // Twitter profile URL
    github: string;     // GitHub repository URL
    docs: string;       // Documentation URL
  };
};

// Configuration for documentation pages
export type DocsConfig = {
  mainNav: MainNavItem[];  // Main navigation items for documentation
  sidebarNav: SidebarNavItem[]; // Sidebar navigation items for documentation
};

// Configuration for marketing pages
export type MarketingConfig = {
  mainNav: MainNavItem[];  // Main navigation items for marketing
};

// Configuration for dashboard pages
export type DashboardConfig = {
  mainNav: MainNavItem[];  // Main navigation items for dashboard
  sidebarNav: SidebarNavItem[]; // Sidebar navigation items for dashboard
};

// Defines a subscription plan with Stripe price ID
export type SubscriptionPlan = {
  name: string;          // Name of the subscription plan
  description: string;   // Description of the subscription plan
  stripePriceId: string; // Stripe price ID for the subscription plan
};

// User-specific subscription plan including Stripe details
export type UserSubscriptionPlan = SubscriptionPlan & {
  stripeCustomerId: string; // Stripe customer ID
  stripeSubscriptionId: string; // Stripe subscription ID
  stripeCurrentPeriodEnd: number; // End timestamp of the current Stripe billing period
  isPro: boolean; // Indicates if the user has a Pro subscription
};

// Define the NavLink type for nested navigation items
export type NavLink = {
  title: string; // Title of the link
  href: string;  // URL or path for the link
  icon?: keyof typeof Icons; // Optional icon key from Icons
};
