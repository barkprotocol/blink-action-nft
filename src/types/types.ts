import { Icons } from "@/components/icons";

// Site configuration including name, description, and URLs
export type SiteConfig = {
  name: string;           // Name of the site
  description: string;    // Description of the site
  url: string;            // Base URL of the site
  ogImage: string;        // URL for the Open Graph image
  logoUrl?: string;       // Optional URL for the site's logo
  links: {
    twitter: string;      // Twitter profile URL
    github: string;       // GitHub repository URL
    docs: string;         // Documentation URL
    medium?: string;      // Optional Medium profile URL
    instagram?: string;   // Optional Instagram profile URL
    telegram?: string;    // Optional Telegram profile URL
    contact?: string;     // Contact email or form URL (optional)
    privacyPolicy?: string; // Privacy policy URL (optional)
    termsOfService?: string; // Terms of service URL (optional)
    support?: string;     // Support or help resources URL (optional)
  };
};
