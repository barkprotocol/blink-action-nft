import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";

const iconSrc = "/icon.png";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "bg-sand text-black border-t border-gray-200 shadow-md")}>
      <div className="container flex flex-col items-center justify-between gap-8 py-6 md:flex-row md:py-8">
        
        {/* Site Info */}
        <div className="flex flex-col items-center gap-6 px-6 md:flex-row md:gap-8 md:px-0">
          {/* Site icon */}
          <Image
            src={iconSrc}
            alt="Site Icon"
            width={34}
            height={34}
            className="text-sand"
            aria-hidden="true"
          />
          <p className="text-center text-sm leading-relaxed md:text-left">
            © 2024 BARK Protocol.{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sand hover:text-orange-600 hover:underline transition-colors"
              aria-label="Follow BARK Protocol on Twitter"
            >
              All rights reserved
            </a>
            . Source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sand hover:text-orange-600 hover:underline transition-colors"
              aria-label="View the BARK Protocol source code on GitHub"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        {/* Footer Navigation */}
        <nav className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Button asChild>
            <Link
              href={siteConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4 py-2 rounded-md"
              )}
            >
              Terms of Use
            </Link>
          </Button>
          <ThemeModeToggle />
        </nav>
      </div>
    </footer>
  );
}
