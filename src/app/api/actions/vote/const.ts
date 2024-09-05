import { PublicKey } from "@solana/web3.js";

// Default values for the voting action

// Default validator public key for voting actions
export const DEFAULT_VALIDATOR_VOTE_PUBKEY: PublicKey = new PublicKey("2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg");

// Default voting amount in lamports (50000000 BARK)
// 1 BARK is assumed to be represented as 1 lamport here; adjust if necessary.
export const DEFAULT_VOTE_AMOUNT: number = 50000000; // Default amount in lamports (50,000,000 BARK)

// SPL Token Program ID for the BARK token
// Ensure this is the correct SPL token program ID for your BARK token
export const SPL_TOKEN_PROGRAM_ID: PublicKey = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXoC7uR4D9E6J7fW1LvS");
