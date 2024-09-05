import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { siteConfig } from "@/config/site";

// Import Inter font
const inter = Inter({ subsets: ["latin"] });

// Define viewport settings
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Metadata for the page
export const metadata: Metadata = {
  title: "BARK",
  description: "Explore example code snippets for Solana actions and blinks.",
};

// Color variables for consistent styling
const colors = {
  grey: "#6B7280", // Modern grey
  lightGrey: "#D1D5DB", // Light grey
  darkGrey: "#374151", // Dark grey
  white: "#FFFFFF", // Pure white
  black: "#010101", // Black
  sand: "#CBB5A7", // Sand color
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to improve font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} style={{ backgroundColor: colors.sand }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            {/* Header Section */}
            <header className="container z-40 bg-white text-black">
              <div className="flex h-20 items-center justify-between py-6">
                {/* Main Navigation */}
                <MainNav items={marketingConfig.mainNav} />

                <nav className="flex items-center gap-2">
                  {/* Connect Button */}
                  <Button asChild>
                    <Link
                      href={siteConfig.links.docs}
                      target="_blank"
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "sm" }),
                        "px-4"
                      )}
                      style={{ backgroundColor: colors.sand, color: colors.white }}
                    >
                      Connect Wallet
                    </Link>
                  </Button>

                  {/* Theme Toggle with Accessible Label */}
                  <ThemeModeToggle aria-label="Toggle theme mode" />
                </nav>
              </div>
            </header>

            {/* Background Effects */}
            <div
              className={cn(
                "before:absolute z-[-1] before:h-[300px] before:w-full before:translate-x-1/4 before:translate-y-52 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-5 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
              )}
              style={{ backgroundColor: colors.grey }}
            ></div>

            {/* Main Content */}
            <main className="flex-1 space-y-10 max-w-screen-xl mx-auto">
              {children}
            </main>

            {/* Footer Section */}
            <SiteFooter style={{ backgroundColor: colors.white, color: colors.black }} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
