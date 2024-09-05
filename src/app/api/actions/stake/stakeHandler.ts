import { Connection, PublicKey, Transaction, StakeProgram, Keypair } from "@solana/web3.js";
import { StakeRequest, StakeResponse } from "./types";

// Example staking function
export async function handleStake(
  request: StakeRequest,
  connection: Connection
): Promise<StakeResponse> {
  try {
    const { amount, stakeAccount, validator, signers } = request;

    // Convert the provided keys to PublicKey instances
    const stakePublicKey = new PublicKey(stakeAccount);
    const validatorPublicKey = new PublicKey(validator);

    // Convert SOL to lamports
    const lamports = amount * 1e9; 

    // Create a transaction
    const transaction = new Transaction().add(
      StakeProgram.delegate({
        stakePubkey: stakePublicKey,
        votePubkey: validatorPublicKey,
        lamports,
      })
    );

    // Set the fee payer (typically, it's the first signer)
    if (signers.length > 0) {
      transaction.feePayer = signers[0].publicKey;
    } else {
      throw new Error("No signers provided");
    }

    // Get the latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;

    // Sign the transaction
    await Promise.all(signers.map(signer => transaction.sign(signer)));

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, signers, { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return {
      success: true,
      transactionSignature: signature,
    };
  } catch (error) {
    console.error("Staking error:", error);
    return {
      success: false,
      errorMessage: error.message || "An error occurred while processing the staking.",
    };
  }
}
