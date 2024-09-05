import { Connection, PublicKey } from "@solana/web3.js";
import { WalletRequest, WalletResponse } from "./types";

// Example wallet management function
export async function handleWallet(
  request: WalletRequest,
  connection: Connection
): Promise<WalletResponse> {
  try {
    // Destructure walletAddress from request
    const { walletAddress } = request;

    // Validate walletAddress to ensure it's a valid Solana public key
    let walletPublicKey: PublicKey;
    try {
      walletPublicKey = new PublicKey(walletAddress);
    } catch (error) {
      throw new Error("Invalid wallet address format.");
    }

    // Fetch the balance of the wallet
    const balance = await connection.getBalance(walletPublicKey);

    // Return response with balance in SOL
    return {
      success: true,
      balance: balance / 1e9, // Convert lamports to SOL
    };
  } catch (error) {
    console.error("Wallet management error:", error);
    return {
      success: false,
      errorMessage: error.message || "An error occurred while fetching wallet information.",
    };
  }
}
