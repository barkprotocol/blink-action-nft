// Define the structure of a staking request
export interface StakeRequest {
    amount: number; // Amount of SOL to stake
    stakeAccount: string; // Stake account public key
    validator: string; // Validator public key
  }
  
  // Define the structure of a staking response
  export interface StakeResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Define the structure of a voting request
  export interface VoteRequest {
    voteAccount: string; // Vote account public key
    validator: string; // Validator public key
    vote: string; // Vote value
  }
  
  // Define the structure of a voting response
  export interface VoteResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Define the structure of a SOL transfer request
  export interface TransferSolRequest {
    amount: number; // Amount of SOL to transfer
    senderAddress: string; // Sender's public key address
    recipientAddress: string; // Recipient's public key address
  }
  
  // Define the structure of a SOL transfer response
  export interface TransferSolResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Define the structure of a BARK token transfer request
  export interface TransferBarkRequest {
    amount: number; // Amount of BARK tokens to transfer
    senderAddress: string; // Sender's public key address
    recipientAddress: string; // Recipient's public key address
    tokenMintAddress: string; // BARK token mint address
  }
  
  // Define the structure of a BARK token transfer response
  export interface TransferBarkResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Define the structure of an SPL token transfer request
  export interface TransferSplRequest {
    amount: number; // Amount of SPL tokens to transfer
    senderAddress: string; // Sender's public key address
    recipientAddress: string; // Recipient's public key address
    tokenMintAddress: string; // SPL token mint address
  }
  
  // Define the structure of an SPL token transfer response
  export interface TransferSplResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Define the structure of a mint request
  export interface MintRequest {
    amount: number; // Amount of tokens to mint
    mintAddress: string; // Mint address of the token
    recipientAddress: string; // Recipient's public key address
  }
  
  // Define the structure of a mint response
  export interface MintResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Define the structure of a wallet request
  export interface WalletRequest {
    walletAddress: string; // Wallet public key address
  }
  
  // Define the structure of a wallet response
  export interface WalletResponse {
    success: boolean;
    balance?: number; // Balance in SOL
    errorMessage?: string;
  }
  