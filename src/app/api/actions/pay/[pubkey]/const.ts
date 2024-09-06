// const.ts

// URLs
export const BASE_URL = process.env.BASE_URL || "https://example.com"; // Set your base URL here

// Token Mint Addresses
export const USDC_MINT_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC token mint address
export const BARK_MINT_ADDRESS = "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"; // BARK token address

// Solana Network URL
export const SOLANA_NETWORK_URL = process.env.NEXT_PUBLIC_SOLANA_NETWORK_URL || "https://api.mainnet-beta.solana.com";

// Error Messages
export const ERROR_ORG_NOT_FOUND = "Organization not found";
export const ERROR_INVALID_SUBSCRIPTION_AMOUNT = "Invalid subscription amount";
export const ERROR_NO_USDC = "You don't have enough USDC";
export const ERROR_ORG_NO_USDC_ACCOUNT = "Organizer does not have a token account for USDC";

// Subscription Types
export const SUBSCRIPTION_MONTHLY = "month";
export const SUBSCRIPTION_YEARLY = "year";

// Headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// Fee Conversion
export const LAMPORTS_PER_SOL = 1_000_000_000; // 1 SOL in lamports

