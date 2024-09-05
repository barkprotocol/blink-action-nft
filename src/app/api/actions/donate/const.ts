import { PublicKey } from "@solana/web3.js";

// Define the API path for donation actions
export const DONATE_API_PATH = "/api/actions/donate";

// Define the default public key or address used for donations
export const DEFAULT_DONATION_ADDRESS: PublicKey = new PublicKey(
  "BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo"
);

// Define the minimum and maximum donation amounts in SOL
export const DONATION_AMOUNT_MIN = 0.01; // Minimum amount in SOL
export const DONATION_AMOUNT_MAX = 1000; // Maximum amount in SOL

// Define the donation token details if applicable
export const DONATION_TOKEN_MINT_ADDRESS: PublicKey = new PublicKey(
  "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
); // Address for a specific token, if used
export const DONATION_TOKEN_DECIMALS = 9; // Number of decimals for the token

// Define messages and labels
export const DONATION_MESSAGE = "Thank you for your generosity! Your donation helps support the platform.";

// Optional: Define any other constants related to the donation process
export const MINIMUM_FEE = 0.0005; // Minimum transaction fee in SOL (if applicable)

// Define default values for environment configurations
export const DEFAULT_RPC_URL = process.env.RPC_URL_MAINNET || "https://api.mainnet-beta.solana.com";
export const DEFAULT_TITLE = process.env.TITLE || "Support Our Project with SOL";
export const DEFAULT_AVATAR = process.env.AVATAR || "https://example.com/default-avatar.png";
export const DEFAULT_DESCRIPTION = process.env.DESCRIPTION || "Contribute to the development of our Solana projects.";

// Define default values for API and request timeouts
export const API_TIMEOUT_MS = parseInt(process.env.API_TIMEOUT_MS || "5000", 10); // Default API request timeout in milliseconds
