import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  createActionHeaders,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { DEFAULT_WALLET_ADDRESS } from "./const";

// Create standard headers for this route (including CORS)
const headers = createActionHeaders();

/**
 * GET handler to retrieve wallet details
 * Provides balance information for the specified Solana wallet.
 */
export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { walletPubkey } = validatedQueryParams(requestUrl);

    const connection = new Connection(
      process.env.SOLANA_RPC || clusterApiUrl("devnet"),
    );

    // Get the balance of the wallet in lamports
    const balanceLamports = await connection.getBalance(walletPubkey);
    const balanceSOL = balanceLamports / LAMPORTS_PER_SOL; // Convert lamports to SOL

    // Prepare the response payload with wallet details
    const payload: ActionGetResponse = {
      type: "action",
      title: "Action - Wallet Details",
      icon: new URL("/wallet.png", requestUrl.origin).toString(),
      description: `Details for wallet ${walletPubkey.toBase58()}`,
      label: "Wallet Details",
      links: {
        actions: [
          {
            label: `View Balance`,
            href: `${requestUrl.origin}/api/actions/wallet?wallet=${walletPubkey.toBase58()}`,
          },
        ],
      },
      details: {
        balance: balanceSOL.toFixed(6), // Show balance with precision
      },
    };

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error("Error in GET handler:", err);
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(message, { status: 400, headers });
  }
};

/**
 * OPTIONS handler to handle CORS preflight requests.
 */
export const OPTIONS = async () => {
  return new Response(null, { headers });
};

/**
 * POST handler - Not implemented
 * This endpoint can be used to add additional functionality if needed.
 */
export const POST = async () => {
  return new Response("POST method is not implemented", { status: 501, headers });
};

/**
 * Helper function to validate and parse query parameters
 * @param requestUrl - The request URL containing query parameters
 * @returns - An object containing the validated wallet public key
 */
function validatedQueryParams(requestUrl: URL) {
  let walletPubkey: PublicKey = DEFAULT_WALLET_ADDRESS;

  try {
    const walletParam = requestUrl.searchParams.get("wallet");
    if (walletParam) {
      walletPubkey = new PublicKey(walletParam);
    }
  } catch {
    throw new Error("Invalid input query parameter: wallet");
  }

  return {
    walletPubkey,
  };
}
