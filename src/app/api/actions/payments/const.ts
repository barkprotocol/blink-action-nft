import { PublicKey } from "@solana/web3.js";

// Default address for payment processing (set via environment variable)
export const DEFAULT_PAYMENT_ADDRESS: PublicKey = new PublicKey(
  process.env.DEFAULT_PAYMENT_ADDRESS || "PAYMENT_ADDRESS" // Use environment variable or default placeholder
);

// Default payment amount (e.g., 1.0 SOL)
export const DEFAULT_PAYMENT_AMOUNT: number = parseFloat(process.env.DEFAULT_PAYMENT_AMOUNT) || 1.0; // Use environment variable or default value

// Supported currencies
export const SUPPORTED_CURRENCIES = ["SOL", "BARK", "USDC"];

// SPL Token mint & Wrapped SOL addresses (set via environment variables)
export const TOKEN_MINT_ADDRESSES: { [key: string]: PublicKey } = {
  SOL: new PublicKey(process.env.SOL_MINT_ADDRESS || "So11111111111111111111111111111111111111112"),
  USDC: new PublicKey(process.env.USDC_MINT_ADDRESS || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  BARK: new PublicKey(process.env.BARK_MINT_ADDRESS || "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"),
};

// Currency icons (assumed static paths)
export const CURRENCY_ICONS: { [key: string]: string } = {
  SOL: "/icons/sol.png",
  BARK: "/icons/bark.png",
  USDC: "/icons/usdc.png",
};
