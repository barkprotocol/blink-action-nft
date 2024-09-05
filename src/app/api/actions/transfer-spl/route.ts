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
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
  } from "@solana/web3.js";
  import { DEFAULT_SPL_ADDRESS, DEFAULT_SPL_AMOUNT, SPL_TOKEN_PROGRAM_ID } from "./const";
  
  // Create headers for the API responses
  const headers = createActionHeaders();
  
  /**
   * GET handler for the SPL token transfer action
   * Provides a list of actions for transferring SPL tokens.
   */
  export const GET = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { toPubkey } = validatedQueryParams(requestUrl);
  
      // Base URL for action links
      const baseHref = new URL(
        `/api/actions/transfer-spl?to=${toPubkey.toBase58()}`,
        requestUrl.origin
      ).toString();
  
      // Response payload for GET request
      const payload: ActionGetResponse = {
        type: "action",
        title: "Action - Transfer SPL Tokens",
        icon: new URL("/splatokens.png", requestUrl.origin).toString(),
        description: "Transfer SPL tokens to another Solana wallet",
        label: "Transfer",
        links: {
          actions: [
            { label: "Send 100 SPL", href: `${baseHref}&amount=100` },
            { label: "Send 500 SPL", href: `${baseHref}&amount=500` },
            { label: "Send 1000 SPL", href: `${baseHref}&amount=1000` },
            {
              label: "Send SPL",
              href: `${baseHref}&amount={amount}`,
              parameters: [
                {
                  name: "amount",
                  label: "Enter the amount of SPL tokens to send",
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
  export const OPTIONS = async () => {
    return new Response(null, { headers });
  };
  
  /**
   * POST handler for the SPL token transfer action
   * Processes the transfer of SPL tokens based on user input.
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
  
      // Create SPL token transfer instruction
      const transferSPLInstruction = new TransactionInstruction({
        programId: new PublicKey(SPL_TOKEN_PROGRAM_ID),
        keys: [
          { pubkey: account, isSigner: true, isWritable: true },
          { pubkey: toPubkey, isSigner: false, isWritable: true },
        ],
        data: Buffer.from(Uint8Array.of(1, ...new BN(amount).toArray('le', 8))),
      });
  
      // Get latest blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  
      // Create and sign the transaction
      const transaction = new Transaction({
        feePayer: account,
        blockhash,
        lastValidBlockHeight,
      }).add(transferSPLInstruction);
  
      const payload: ActionPostResponse = await createPostResponse({
        fields: {
          transaction,
          message: `Send ${amount} SPL tokens to ${toPubkey.toBase58()}`,
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
   * Helper function to validate query parameters
   * @param requestUrl - The request URL containing query parameters
   * @returns - An object containing the validated amount and destination public key
   */
  function validatedQueryParams(requestUrl: URL) {
    let toPubkey: PublicKey = DEFAULT_SPL_ADDRESS;
    let amount: number = DEFAULT_SPL_AMOUNT;
  
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
  