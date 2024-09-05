// General types for API request and response
export interface ActionRequest {
    actionType: string;
    data: any; // Use a more specific type if possible
  }
  
  export interface ActionResponse {
    success: boolean;
    message?: string;
    data?: any; // Use a more specific type if possible
  }
  
  // Pay Action
  export interface PayRequest {
    amount: number;
    recipientAddress: string;
    payerAddress: string;
    tokenMintAddress?: string; // Optional, if using SPL tokens
  }
  
  export interface PayResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Transaction Bark Action
  export interface TransactionBarkRequest {
    amount: number;
    fromAddress: string;
    toAddress: string;
    tokenMintAddress: string;
  }
  
  export interface TransactionBarkResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Transaction SOL Action
  export interface TransactionSOLRequest {
    amount: number;
    fromAddress: string;
    toAddress: string;
  }
  
  export interface TransactionSOLResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Stake Action
  export interface StakeRequest {
    amount: number;
    stakerAddress: string;
    validatorAddress: string;
  }
  
  export interface StakeResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Wallet Action
  export interface WalletRequest {
    walletAddress: string;
  }
  
  export interface WalletResponse {
    success: boolean;
    balance?: number; // The balance in SOL or the relevant token
    errorMessage?: string;
  }
  
  // Payments Action
  export interface PaymentsRequest {
    amount: number;
    payerAddress: string;
    paymentDetails: string; // Additional details for the payment
  }
  
  export interface PaymentsResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Memo Action
  export interface MemoRequest {
    message: string;
    senderAddress: string;
    receiverAddress: string;
  }
  
  export interface MemoResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Donate Action
  export interface DonateRequest {
    amount: number;
    donorAddress: string;
    recipientAddress: string;
    tokenMintAddress?: string; // Optional, if using SPL tokens
    message?: string; // Optional message to include with the donation
  }
  
  export interface DonateResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Mint Action
  export interface MintRequest {
    amount: number;
    recipientAddress: string;
    tokenMintAddress: string;
    metadata?: any; // Optional metadata for the NFT or token being minted
  }
  
  export interface MintResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  
  // Create Action
  export interface CreateRequest {
    type: string; // Type of entity being created (e.g., NFT, token)
    data: any; // Data necessary for creation
  }
  
  export interface CreateResponse {
    success: boolean;
    transactionSignature?: string;
    errorMessage?: string;
  }
  