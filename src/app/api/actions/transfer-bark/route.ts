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
import { DEFAULT_BARK_ADDRESS, DEFAULT_BARK_AMOUNT } from "./const";

// Create headers for the API response
const headers = createActionHeaders();

/**
 * GET handler for the Solana transfer action
 * Provides a list of actions for transferring BARK tokens.
 */
export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);

    // Base URL for action links
    const baseHref = new URL(
      `/api/actions/transfer-bark?to=${toPubkey.toBase58()}`,
      requestUrl.origin
    ).toString();

    // Response payload for GET request
    const payload: ActionGetResponse = {
      type: "action",
      title: "Action - Transfer BARK Tokens",
      icon: new URL("/bark.png", requestUrl.origin).toString(),
      description: "Transfer BARK to another Solana wallet",
      label: "Transfer",
      links: {
        actions: [
          { label: "Send 1,000,000 BARK", href: `${baseHref}&amount=1000000` },
          { label: "Send 5,000,000 BARK", href: `${baseHref}&amount=5000000` },
          { label: "Send 10,000,000 BARK", href: `${baseHref}&amount=10000000` },
          {
            label: "Send BARK",
            href: `${baseHref}&amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of BARK to send",
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
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(message, { status: 400, headers });
  }
};

/**
 * OPTIONS method to handle CORS
 */
export const OPTIONS = async () => new Response(null, { headers });

/**
 * POST handler for the Solana transfer action
 * Processes the transfer of BARK tokens based on user input.
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
      process.env.SOLANA_RPC || clusterApiUrl("devnet")
    );

    // Check for rent exemption
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      return new Response(`Account ${toPubkey.toBase58()} may not be rent exempt for the given amount.`, { status: 400, headers });
    }

    // Create a transfer instruction
    const transferBarkInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    // Create and sign the transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferBarkInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} BARK to ${toPubkey.toBase58()}`,
      },
    });

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error("Error processing POST request:", err);
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(message, { status: 400, headers });
  }
};

/**
 * Helper function to validate and parse query parameters
 * @param requestUrl - The request URL containing query parameters
 * @returns - An object containing the validated amount and destination public key
 */
function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_BARK_ADDRESS;
  let amount: number = DEFAULT_BARK_AMOUNT;

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

    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount parameter: must be a positive number");
    }
  } catch {
    throw new Error("Invalid input query parameter: amount");
  }

  return {
    amount,
    toPubkey,
  };
}
