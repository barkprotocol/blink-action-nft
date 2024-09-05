import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { MintRequest, MintResponse } from "./types";

// Example minting function
export async function handleMint(
  request: MintRequest,
  connection: Connection,
  payer: Keypair, // Added payer for transaction fees
  mintAuthority: Keypair // Added mintAuthority for minting tokens
): Promise<MintResponse> {
  try {
    const { amount, mintAddress, recipientAddress } = request;
    const mintPublicKey = new PublicKey(mintAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Initialize Token instance with Token Program ID
    const token = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, mintAuthority);

    // Create MintTo instruction
    const transaction = new Transaction().add(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        mintPublicKey,
        recipientPublicKey,
        mintAuthority.publicKey, // Mint Authority
        [], // Signers, if any
        amount
      )
    );

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, [payer, mintAuthority], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return {
      success: true,
      transactionSignature: signature,
    };
  } catch (error) {
    console.error("Minting error:", error);
    return {
      success: false,
      errorMessage: error.message || "An error occurred while minting the token.",
    };
  }
}
