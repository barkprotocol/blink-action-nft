// membership/const.ts

// Program ID for the token program
export const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx';

// Program ID for the NFT token program (replace with actual program ID if different)
export const NFT_PROGRAM_ID = 'gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR';

// Default values for NFT creation
export const DEFAULT_SELLER_FEE_BASIS_POINTS = 500; // 5% seller fee

// Error messages
export const ERROR_MESSAGES = {
  METADATA_UPLOAD: 'Failed to upload metadata. Please try again later.',
  NFT_CREATION: 'Failed to create NFT. Please check the input and try again.',
  METADATA_FETCH: 'Failed to retrieve metadata. Please try again later.',
  MEMBERSHIP_FETCH: 'Failed to retrieve membership details. Please try again later.',
};

// Constants for account validation
export const ACCOUNT_VALIDATION = {
  MIN_LENGTH: 32, // Minimum length for a valid public key (adjust if necessary)
  MAX_LENGTH: 44, // Maximum length for a valid public key (adjust if necessary)
};
