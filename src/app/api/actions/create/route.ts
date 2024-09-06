import { NextRequest, NextResponse } from "next/server";
import {
  Transaction,
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  ActionGetResponse,
} from "@solana/actions";
import { connectToDatabase } from "../../../(mongo)/db"; // Adjust path as needed
import { BlinksightsClient } from 'blinksights-sdk';

// Ensure environment variables are set
const BLINKSIGHTS_API_KEY = process.env.BLINKSIGHTS_API_KEY ?? '';
const BARK_PUB_KEY = process.env.BARK_PUBLIC_KEY ?? '';
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? "devnet";

// Initialize clients and connections
const client = new BlinksightsClient(BLINKSIGHTS_API_KEY);
const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed");

export const GET = async (req: NextRequest) => {
  const payload = await client.createActionGetResponseV1(req.url, {
    icon: `${process.env.BASE_URL}/logo.png`,
    title: "Create your own subscription BARK Blink",
    description: "Enter the details of your organisation/business/project to create a blink",
    label: "Create One",
    links: {
      actions: [
        {
          label: "Create One",
          href: `/api/actions/create?name={name}&email={email}&website={website}&discord={discord}&x={x}&choice={choice}&month={month}&year={year}`,
          parameters: [
            { type: "text", name: "name", label: "Enter Name", required: true },
            { type: "email", name: "email", label: "Enter Email", required: true },
            { type: "url", name: "website", label: "Enter Your website" },
            { type: "url", name: "discord", label: "Enter Your Discord" },
            { type: "url", name: "x", label: "Enter Your X" },
            {
              type: "radio",
              name: "choice",
              label: "Choose the coin for fees",
              options: [
                { label: "SOL", value: "sol" },
                { label: "BARK", value: "bark" },
                { label: "USDC (Make sure you have USDC)", value: "usdc" },
              ],
            },
            { type: "number", name: "month", label: "Enter Monthly Price", required: true },
            { type: "number", name: "year", label: "Enter Yearly Price", required: true },
          ],
        },
      ],
    },
    type: "action",
  }) as ActionGetResponse;

  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
};

// Add OPTIONS handler for CORS
export const OPTIONS = GET;

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const body = (await req.json()) as { account: string; signature: string };
    client.trackActionV2(body.account, req.url);

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") ?? "";
    const email = searchParams.get("email") ?? "";
    const website = searchParams.get("website") ?? "";
    const discord = searchParams.get("discord") ?? "";
    const x = searchParams.get("x") ?? "";
    const month = parseFloat(searchParams.get("month") ?? "0");
    const year = parseFloat(searchParams.get("year") ?? "0");
    const feestype = searchParams.get("choice") ?? "sol";
    const orgKey = body.account;
    const orgPubKey = new PublicKey(orgKey);

    if (!BARK_PUB_KEY) {
      throw new Error("PUBLIC_KEY environment variable is not set");
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: orgPubKey,
        toPubkey: new PublicKey(BARK_PUB_KEY),
        lamports: 0.01 * LAMPORTS_PER_SOL, 
      })
    );

    transaction.feePayer = orgPubKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload = await createPostResponse({
      fields: {
        transaction,
        message: "",
        links: {
          next: {
            type: "post",
            href: `/api/actions/saveOrgData?name=${name}&email=${email}&website=${website}&discord=${discord}&x=${x}&month=${month}&year=${year}&orgPubKey=${orgPubKey}&feesType=${feestype}`,
          },
        },
      },
    });

    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
