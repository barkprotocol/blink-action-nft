import { PublicKey } from "@solana/web3.js";

// Default wallet address
export const DEFAULT_WALLET_ADDRESS: PublicKey = new PublicKey(
  process.env.DEFAULT_WALLET_ADDRESS || "gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR" // Default wallet address or use an environment variable
);
