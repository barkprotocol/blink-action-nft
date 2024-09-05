"use client";

import Link from "next/link";
import HeroSection from "@/components/ui/hero-section";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileTextIcon,
  GiftIcon,
  CoinsIcon,
  ImageIcon,
  ImagesIcon,
  HeartIcon,
  TrophyIcon,
  VoteIcon,
  UserIcon,
} from "lucide-react"; // Ensure icons exist
import { FaTwitter, FaTelegram, FaDiscord, FaMedium, FaGithub } from "react-icons/fa"; // Social icons

// Define color variables for consistent styling
const colors = {
  grey: "#6B7280", // Modern grey
  lightGrey: "#9CA3AF", // Lighter gray for text
  white: "#FFFFFF", // Pure white
  black: "#000000", // Pure black
  orange: "#F97316", // Modern orange
  sand: "#CBB5A7", // Sand color
};

// Array of action cards with title, href, description, and icon
const actionCards = [
  {
    title: "On-chain Memo",
    href: "/memo",
    description: "Send and record messages directly on the Solana blockchain using SPL Memo.",
    icon: <FileTextIcon className="w-8 h-8" />,
    badge: "New",
  },
  {
    title: "Staking NFT",
    href: "/stake",
    description: "Stake NFT or SPL tokens and earn rewards from trusted validators.",
    icon: <GiftIcon className="w-8 h-8" />,
    badge: "Popular",
  },
  {
    title: "Transfer Tokens",
    href: "/transfer-token",
    description: "Transfer SPL tokens and NFTs between wallets securely.",
    icon: <CoinsIcon className="w-8 h-8" />,
    badge: "Essential",
  },
  {
    title: "Mint an NFT",
    href: "/mint",
    description: "Create and mint unique NFTs on Solana.",
    icon: <ImageIcon className="w-8 h-8" />,
    badge: "New",
  },
  {
    title: "View NFT Collection",
    href: "/collection",
    description: "Explore and manage your NFT collection.",
    icon: <ImagesIcon className="w-8 h-8" />,
    badge: "Essential",
  },
  {
    title: "Donate",
    href: "/donate",
    description: "Support meaningful causes via Solana donations.",
    icon: <HeartIcon className="w-8 h-8" />,
    badge: "Support",
  },
  {
    title: "Claim Rewards",
    href: "/claim",
    description: "Easily claim your rewards.",
    icon: <TrophyIcon className="w-8 h-8" />,
    badge: "New",
  },
  {
    title: "Governance",
    href: "/vote",
    description: "Participate in governance by voting on proposals in the BARK Protocol.",
    icon: <VoteIcon className="w-8 h-8" />,
    badge: "Governance",
  },
  {
    title: "Membership",
    href: "/membership",
    description: "Access BARK Club membership and treasury benefits.",
    icon: <UserIcon className="w-8 h-8" />,
    badge: "Essential",
  },
];

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section
        id="about"
        className="container flex flex-col items-center space-y-6 py-16 text-center dark:bg-black dark:text-white md:py-24"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">
          About Us
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-grey sm:text-xl sm:leading-8">
          We harness the power of Solana’s blockchain to offer innovative solutions for managing digital assets, creating NFTs, and more.
        </p>
        <div className="flex gap-4">
          <Link href="/collection" className={cn(buttonVariants({ size: "lg", variant: "primary" }))}>
            View Collection
          </Link>
          <Link href="https://doc.marketplace.barkprotocol.net" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
            Documentation
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container space-y-12 py-8 dark:bg-black dark:text-white md:py-12 lg:py-24"
      >
        <div className="text-center">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white">
            Features
          </h3>
        </div>

        {/* Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <h4 className="text-3xl sm:text-4xl font-semibold text-sand">
            Explore Our Key Features
          </h4>
          <p className="text-lg leading-relaxed text-grey dark:text-sand sm:text-xl sm:leading-8">
            Discover how our tools enhance your digital experience on Solana, from NFTs to governance.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {actionCards.map((item, key) => (
            <Link key={key} href={item.href} className="group">
              <Card className="group-hover:border-sand transition-colors duration-300 border-2 rounded-lg shadow-md hover:shadow-lg dark:border-white dark:hover:border-sand h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    {item.icon}
                    <span className="block font-semibold group-hover:text-sand">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="ml-2 inline-block rounded-full bg-orange px-2 py-1 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lightGrey dark:text-sand">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center md:max-w-3xl mx-auto mt-12">
          <h5 className="text-2xl font-semibold text-lightGrey dark:text-sand">
            Follow Us
          </h5>
          <div className="flex justify-center space-x-4 mt-4">
            <Button variant={"link"} asChild>
              <Link href="https://x.com/bark_protocol" target="_blank" className="text-sand">
                <FaTwitter className="w-6 h-6" />
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="https://telegram.com/t/me/bark-protocol" target="_blank" className="text-sand">
                <FaTelegram className="w-6 h-6" />
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="https://discord.com/invite/bark-protocol" target="_blank" className="text-sand">
                <FaDiscord className="w-6 h-6" />
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="https://medium.com/@bark_protocol" target="_blank" className="text-sand">
                <FaMedium className="w-6 h-6" />
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="https://github.com/bark-protocol" target="_blank" className="text-sand">
                <FaGithub className="w-6 h-6" />
              </Link>
            </Button>
          </div>

          <p className="text-lightGrey dark:text-sand text-lg leading-relaxed sm:text-sm sm:leading-8 mt-4">
            <Link href="https://solana.com/actions" className="text-sand">
              Powered by Solana
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
