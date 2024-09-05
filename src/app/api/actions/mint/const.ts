import { PublicKey } from "@solana/web3.js";

// Default address for payment processing
export const DEFAULT_PAYMENT_ADDRESS: PublicKey = new PublicKey(
  process.env.DEFAULT_PAYMENT_ADDRESS || "BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo" // Replace with your actual default payment address
);

// Default payment amount (e.g., 1.0 SOL)
export const DEFAULT_PAYMENT_AMOUNT: number = parseFloat(process.env.DEFAULT_PAYMENT_AMOUNT || "1.0"); // Amount in SOL

// Supported currencies
export const SUPPORTED_CURRENCIES: string[] = ["SOL", "BARK", "USDC"];

// SPL Token mint addresses (replace with actual addresses)
export const TOKEN_MINT_ADDRESSES: { [key: string]: PublicKey } = {
  SOL: new PublicKey(process.env.SOL_MINT_ADDRESS || "So11111111111111111111111111111111111111112"),
  USDC: new PublicKey(process.env.USDC_MINT_ADDRESS || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  BARK: new PublicKey(process.env.BARK_MINT_ADDRESS || "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"),
};

// Currency icons (ensure these paths are correct)
export const CURRENCY_ICONS: { [key: string]: string } = {
  SOL: "/icons/sol.png",
  BARK: "/icons/bark.png",
  USDC: "/icons/usdc.png",
};

// HTTP status codes for API responses
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

// Messages for minting operations
export const MINTING_SUCCESS_MESSAGE = "Mint request was successful.";
export const MINTING_ERROR_MESSAGE = "Mint request failed. Please try again.";

// API Endpoints for minting operations
export const MINT_CREATE_ENDPOINT = "/api/mint/create";
export const MINT_STATUS_ENDPOINT = "/api/mint/status";
export const MINT_CANCEL_ENDPOINT = "/api/mint/cancel";

// Request type for minting
export const MINT_REQUEST_TYPE = "mint";
