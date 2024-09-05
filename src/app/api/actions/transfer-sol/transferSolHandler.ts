import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { TransferSolRequest, TransferSolResponse } from "./types";

// Example SOL transfer function
export async function handleTransferSol(
  request: TransferSolRequest,
  connection: Connection
): Promise<TransferSolResponse> {
  try {
    const { amount, senderAddress, recipientAddress } = request;
    const senderPublicKey = new PublicKey(senderAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Example logic for SOL transfer
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports: amount * 1e9, // Convert SOL to lamports
      })
    );

    const signature = await connection.sendTransaction(transaction, [/* Signers here */], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return {
      success: true,
      transactionSignature: signature,
    };
  } catch (error) {
    console.error("Transfer SOL error:", error);
    return {
      success: false,
      errorMessage: error.message || "An error occurred while processing the SOL transfer.",
    };
  }
}
