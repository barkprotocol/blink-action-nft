// const.ts

import { PublicKey } from "@solana/web3.js";

// Default values for the SPL token transfer
export const DEFAULT_SPL_ADDRESS: PublicKey = new PublicKey("2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"); // BARK SPL token
export const DEFAULT_SPL_AMOUNT: number = 1; // Default amount in token units (not lamports)

// The SPL Token Program ID
export const SPL_TOKEN_PROGRAM_ID: string = "TokenkegQfeZyiNwAJbNbGKPFXoC7uR4D9E6J7fW1LvS";
