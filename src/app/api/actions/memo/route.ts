/**
 * Solana Actions Example - Sending On-chain Memo
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
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

// Create standard headers for this route (including CORS)
const headers = createActionHeaders();

// Handle GET requests to provide action metadata
export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    type: "action",
    title: "Actions Example - Simple On-chain Memo",
    icon: new URL("/solana_devs.jpg", new URL(req.url).origin).toString(),
    description: "Send a message on-chain using a Memo",
    label: "Send Memo",
  };

  return new Response(JSON.stringify(payload), { headers });
};

// Handle OPTIONS requests to support CORS
export const OPTIONS = async () => new Response(null, { headers });

// Handle POST requests to create and send a memo transaction
export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const body: ActionPostRequest = await req.json();

    // Validate and construct the account PublicKey
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch {
      return new Response('Invalid "account" provided', { status: 400, headers });
    }

    // Establish a connection to the Solana cluster
    const connection = new Connection(process.env.SOLANA_RPC || clusterApiUrl("devnet"));

    // Create a transaction with a memo instruction
    const transaction = new Transaction().add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000, // Adjust the compute unit price if necessary
      }),
      new TransactionInstruction({
        programId: new PublicKey("MemoProgramID"), // Replace with the actual Memo Program ID
        data: Buffer.from("this is a simple memo message", "utf8"),
        keys: [], // Memo Program does not require accounts
      })
    );

    // Set the end user as the fee payer and add recent blockhash
    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // Create and return the post response with the transaction and a message
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Post this memo on-chain",
      },
      // No additional signers are required for this transaction
    });

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error("An error occurred:", err);
    return new Response("An unknown error occurred", { status: 500, headers });
  }
};
