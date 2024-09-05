import { PublicKey } from "@solana/web3.js";

// Default validator public key for staking
export const DEFAULT_VALIDATOR_VOTE_PUBKEY: PublicKey = new PublicKey(
  process.env.DEFAULT_VALIDATOR_VOTE_PUBKEY || "5ZWgXcyqrrNpQHCme5SdC5hCeYb2o3fEJhF7Gok3bTVN" // Replace with actual default if necessary
);

// Default stake amount in SOL
export const DEFAULT_STAKE_AMOUNT: number = (() => {
  // Parse the stake amount from the environment variable
  const amount = parseFloat(process.env.DEFAULT_STAKE_AMOUNT || "0.5"); // Default to 0.5 SOL

  // Validate the amount to ensure it's a positive number
  if (isNaN(amount) || amount <= 0) {
    console.warn(`Invalid DEFAULT_STAKE_AMOUNT environment variable. Falling back to default value of 0.5 SOL.`);
    return 0.5; // Default value if the environment variable is invalid
  }

  return amount;
})();
