import { PublicKey, Transaction } from "@solana/web3.js";

// Represents a request to post an action
export interface ActionPostRequest {
  account: string; // Public key as a string (should be converted to PublicKey in usage)
}

// Represents the response for a GET action request
export interface ActionGetResponse {
  type: string; // Type of the action (e.g., 'action')
  title: string; // Title for the action
  icon: string; // URL to an icon representing the action
  description: string; // Description of the action
  label: string; // Label for the action
  links: {
    actions: {
      label: string; // Text label for the action link
      href: string; // URL for the action link
      parameters?: {
        name: string; // Parameter name
        label: string; // Parameter label for UI
        required: boolean; // Whether the parameter is required
      }[];
    }[];
  };
}

// Represents the response for a POST action request
export interface ActionPostResponse {
  fields: {
    transaction: Transaction; // Transaction to be signed and submitted
    message: string; // Message related to the action
  };
}

// Represents a payment request
export interface PaymentRequest {
  amount: number; // Amount to be transferred
  toPubkey: PublicKey; // Recipient's public key
  currency: string; // Currency type (e.g., SOL, USDC, BARK)
}
