// components/HeroSection.tsx

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Define color variables for consistent styling
const colors = {
  sand: "#CBB5A7",
  grey: "#6B7280",
  black: "#000000",
  white: "#FFFFFF",
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className={`container flex flex-col items-center justify-center space-y-6 py-16 text-center md:py-24 ${colors.sand} dark:bg-transparent`}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-black dark:text-white drop-shadow-lg">
        Revolutionize Your Blockchain Experience with BARK
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-grey sm:text-xl sm:leading-8 dark:text-white">
        Discover the full potential of Solana’s speed and security through BARK Actions & Blinks. Seamlessly manage your assets, engage in governance, and more with cutting-edge solutions designed for the modern blockchain user.
      </p>
      <div className="flex gap-4">
        <Link href="/get-started" className={cn(buttonVariants({ size: "lg", variant: "primary" }))}>
          Start Your Journey
        </Link>
        <Link href="/learn-more" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
          Explore Features
        </Link>
      </div>
    </section>
  );
}
