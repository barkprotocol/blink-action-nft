import { PublicKey } from "@solana/web3.js";
import { DONATION_AMOUNT_MIN, DONATION_AMOUNT_MAX } from "./const";
import { DonationRequest, ValidationError } from "./types";

/**
 * Validates the donation request data.
 * @param request - The donation request object to be validated.
 * @returns A validation error message or null if the request is valid.
 */
export function validateDonationRequest(request: DonationRequest): ValidationError {
  // Validate recipient address
  try {
    new PublicKey(request.recipientAddress);
  } catch {
    return "Invalid recipient address format.";
  }

  // Validate donor address
  try {
    new PublicKey(request.donorAddress);
  } catch {
    return "Invalid donor address format.";
  }

  // Validate donation amount
  if (typeof request.amount !== 'number' || isNaN(request.amount)) {
    return "Donation amount must be a valid number.";
  }

  if (request.amount <= 0) {
    return "Donation amount must be greater than zero.";
  }

  if (request.amount < DONATION_AMOUNT_MIN) {
    return `Donation amount must be at least ${DONATION_AMOUNT_MIN} SOL.`;
  }

  if (request.amount > DONATION_AMOUNT_MAX) {
    return `Donation amount must not exceed ${DONATION_AMOUNT_MAX} SOL.`;
  }

  // Validate optional token mint address if provided
  if (request.tokenMintAddress) {
    try {
      new PublicKey(request.tokenMintAddress);
    } catch {
      return "Invalid token mint address format.";
    }
  }

  return null; // No validation errors
}
