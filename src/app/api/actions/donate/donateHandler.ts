import { Connection, PublicKey, Transaction, SystemProgram, TransactionSignature } from "@solana/web3.js";
import { DonationRequest, DonationResponse } from "./types";

/**
 * Handles a donation request by creating and sending a Solana transaction.
 * @param request - The donation request object containing amount, recipient, donor, and optional token details.
 * @param connection - The Solana connection object used to interact with the blockchain.
 * @returns A Promise that resolves to a DonationResponse object indicating the success or failure of the donation.
 */
export async function handleDonation(
  request: DonationRequest,
  connection: Connection
): Promise<DonationResponse> {
  try {
    const { amount, recipientAddress, donorAddress, tokenMintAddress } = request;

    // Convert addresses to PublicKey objects
    const donorPublicKey = new PublicKey(donorAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Convert SOL to lamports (1 SOL = 1e9 lamports)
    const lamports = amount * 1e9;

    // Create a transaction to transfer SOL
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: donorPublicKey,
        toPubkey: recipientPublicKey,
        lamports,
      })
    );

    // Send the transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = donorPublicKey;

    // Signers array is required here
    // Note: You must add the necessary signers to the transaction
    const signers = []; // Replace with actual signers if necessary

    // Send the transaction and await confirmation
    const signature: TransactionSignature = await connection.sendTransaction(transaction, signers, { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return {
      success: true,
      transactionSignature: signature,
    };
  } catch (error) {
    console.error("Donation error:", error);
    return {
      success: false,
      errorMessage: error.message || "An error occurred while processing the donation.",
    };
  }
}
