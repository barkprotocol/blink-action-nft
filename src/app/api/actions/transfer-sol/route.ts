/**
 * Solana Actions Example - Transfer SOL
 */

import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { DEFAULT_SOL_ADDRESS, DEFAULT_SOL_AMOUNT } from "./const";

// Create headers for the API responses
const headers = createActionHeaders();

/**
 * GET handler for the Solana transfer action
 * Provides a list of actions for transferring SOL.
 */
export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);

    // Base URL for the action links
    const baseHref = new URL(
      `/api/actions/transfer-sol?to=${toPubkey.toBase58()}`,
      requestUrl.origin,
    ).toString();

    // Response payload with action links
    const payload: ActionGetResponse = {
      type: "action",
      title: "Actions Example - Transfer SOL",
      icon: new URL("/solana_devs.jpg", requestUrl.origin).toString(),
      description: "Transfer SOL to another Solana wallet",
      label: "Transfer",
      links: {
        actions: [
          {
            label: "Send 1 SOL",
            href: `${baseHref}&amount=1`,
          },
          {
            label: "Send 5 SOL",
            href: `${baseHref}&amount=5`,
          },
          {
            label: "Send 10 SOL",
            href: `${baseHref}&amount=10`,
          },
          {
            label: "Send SOL",
            href: `${baseHref}&amount={amount}`, // Input for user-defined amount
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of SOL to send",
                required: true,
              },
            ],
          },
        ],
      },
    };

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error("Error processing GET request:", err);
    const message = typeof err === "string" ? err : "An unknown error occurred";
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
 * POST handler for the Solana transfer action
 * Processes the transfer of SOL tokens based on user input.
 */
export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, toPubkey } = validatedQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();

    // Validate the provided account public key
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch {
      return new Response('Invalid "account" provided', { status: 400, headers });
    }

    const connection = new Connection(
      process.env.SOLANA_RPC || clusterApiUrl("devnet"),
    );

    // Ensure the receiving account is rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      return new Response(`Account ${toPubkey.toBase58()} may not be rent exempt for the given amount.`, { status: 400, headers });
    }

    // Create a transaction instruction for transferring SOL
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // Get the latest blockhash and block height for the transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    // Create and sign the transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} SOL to ${toPubkey.toBase58()}`,
      },
    });

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error("Error processing POST request:", err);
    const message = typeof err === "string" ? err : "An unknown error occurred";
    return new Response(message, { status: 400, headers });
  }
};

/**
 * Helper function to validate and parse query parameters
 * @param requestUrl - The request URL containing query parameters
 * @returns - An object containing the validated amount and destination public key
 */
function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
  let amount: number = DEFAULT_SOL_AMOUNT;

  try {
    const toParam = requestUrl.searchParams.get("to");
    if (toParam) {
      toPubkey = new PublicKey(toParam);
    }
  } catch {
    throw new Error("Invalid input query parameter: to");
  }

  try {
    const amountParam = requestUrl.searchParams.get("amount");
    if (amountParam) {
      amount = parseFloat(amountParam);
    }

    if (amount <= 0) throw new Error("Amount is too small");
  } catch {
    throw new Error("Invalid input query parameter: amount");
  }

  return {
    amount,
    toPubkey,
  };
}
