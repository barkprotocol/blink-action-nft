import { PublicKey } from "@solana/web3.js";
import { SUPPORTED_CURRENCIES, DEFAULT_PAYMENT_ADDRESS, DEFAULT_PAYMENT_AMOUNT } from "./const";
import { PaymentRequest } from "./types";

// Validate and parse query parameters from the request URL
export function validateQueryParams(requestUrl: URL): PaymentRequest {
  // Validate and get currency
  const currency = requestUrl.searchParams.get("currency") || "SOL";
  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    throw new Error(`Unsupported currency type: ${currency}. Supported currencies are: ${SUPPORTED_CURRENCIES.join(", ")}`);
  }

  // Validate and get recipient public key
  const toPubkeyParam = requestUrl.searchParams.get("to");
  let toPubkey: PublicKey;
  try {
    toPubkey = toPubkeyParam ? new PublicKey(toPubkeyParam) : DEFAULT_PAYMENT_ADDRESS;
  } catch {
    throw new Error('Invalid "to" public key provided');
  }

  // Validate and get amount
  const amountParam = requestUrl.searchParams.get("amount");
  const amount = amountParam ? parseFloat(amountParam) : DEFAULT_PAYMENT_AMOUNT;
  
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Amount must be a positive number");
  }

  return { amount, toPubkey, currency };
}

// Validate and parse the provided account public key
export function validateAccount(accountStr: string): PublicKey {
  try {
    return new PublicKey(accountStr);
  } catch {
    throw new Error('Invalid "account" public key provided');
  }
}
