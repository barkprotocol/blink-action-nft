import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  DEFAULT_PAYMENT_ADDRESS,
  DEFAULT_PAYMENT_AMOUNT,
  TOKEN_MINT_ADDRESSES,
  CURRENCY_ICONS,
} from "./const";
import { validateQueryParams, validateAccount } from "./validate";
import { handleError, createActionHeaders } from "./errorHandler";

const headers = createActionHeaders();

// Handle GET requests
export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey, currency } = validateQueryParams(requestUrl);

    const baseHref = new URL(`/api/actions/payments?to=${toPubkey.toBase58()}&currency=${currency}`, requestUrl.origin).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: `Action - Transfer ${currency}`,
      icon: new URL(CURRENCY_ICONS[currency] || "/icons/default.png", requestUrl.origin).toString(),
      description: `Transfer ${currency} to another wallet`,
      label: "Transfer",
      links: {
        actions: [
          { label: `Send 0.1 ${currency}`, href: `${baseHref}&amount=0.1` },
          { label: `Send 0.5 ${currency}`, href: `${baseHref}&amount=0.5` },
          { label: `Send 1.0 ${currency}`, href: `${baseHref}&amount=1.0` },
          {
            label: `Send ${currency}`,
            href: `${baseHref}&amount={amount}`,
            parameters: [{ name: "amount", label: `Enter the amount of ${currency} to send`, required: true }],
          },
        ],
      },
    };

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    return handleError(err);
  }
};

// Handle OPTIONS requests for CORS
export const OPTIONS = async () => new Response(null, { headers });

// Handle POST requests
export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, toPubkey, currency } = validateQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();
    const account = validateAccount(body.account);

    const connection = new Connection(process.env.SOLANA_RPC || clusterApiUrl("devnet"));

    if (currency === "SOL") {
      await ensureAccountRentExempt(connection, toPubkey, amount);
      const transaction = await createSolTransferTransaction(connection, account, toPubkey, amount);

      const payload: ActionPostResponse = await createPostResponse({
        fields: { transaction, message: `Send ${amount} SOL to ${toPubkey.toBase58()}` },
      });

      return new Response(JSON.stringify(payload), { headers });

    } else if (currency === "USDC" || currency === "BARK") {
      const transaction = await createTokenTransferTransaction(connection, account, toPubkey, amount, currency);
      const payload: ActionPostResponse = await createPostResponse({
        fields: { transaction, message: `Send ${amount} ${currency} to ${toPubkey.toBase58()}` },
      });

      return new Response(JSON.stringify(payload), { headers });

    } else {
      return new Response("Unsupported currency type", { status: 400, headers });
    }
  } catch (err) {
    return handleError(err);
  }
};

// Ensure the receiving account is rent exempt
async function ensureAccountRentExempt(connection: Connection, toPubkey: PublicKey, amount: number) {
  const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
  if (amount * LAMPORTS_PER_SOL < minimumBalance) {
    throw new Error(`Account ${toPubkey.toBase58()} may not be rent exempt for this amount.`);
  }
}

// Create a transaction to transfer SOL
async function createSolTransferTransaction(connection: Connection, account: PublicKey, toPubkey: PublicKey, amount: number) {
  const transferSolInstruction = SystemProgram.transfer({
    fromPubkey: account,
    toPubkey: toPubkey,
    lamports: amount * LAMPORTS_PER_SOL,
  });

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  return new Transaction({
    feePayer: account,
    blockhash,
    lastValidBlockHeight,
  }).add(transferSolInstruction);
}

// Create a transaction to transfer SPL tokens (USDC or BARK)
async function createTokenTransferTransaction(connection: Connection, account: PublicKey, toPubkey: PublicKey, amount: number, currency: string) {
  const tokenMint = TOKEN_MINT_ADDRESSES[currency];
  if (!tokenMint) {
    throw new Error("Unsupported token mint address");
  }

  const token = new Token(connection, tokenMint, TOKEN_PROGRAM_ID, Keypair.generate());
  const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(account);
  const toTokenAccount = await token.getOrCreateAssociatedAccountInfo(toPubkey);

  const transferTokenInstruction = Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    fromTokenAccount.address,
    toTokenAccount.address,
    account,
    [],
    amount * 1e6 // Convert to the smallest unit (e.g., USDC uses 6 decimal places)
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  return new Transaction({
    feePayer: account,
    blockhash,
    lastValidBlockHeight,
  }).add(transferTokenInstruction);
}
