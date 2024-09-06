import { connectToDatabase } from "@/app/(mongo)/db";
import OrgData from "@/app/(mongo)/OrgSchema";
import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  CompletedAction,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { randomBytes } from "crypto";
import { customAlphabet } from "nanoid";
import nodemailer from "nodemailer";

// Setup
const generateRandomId = customAlphabet(`${process.env.SECRET_KEY}`, 10);
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// GET and OPTIONS requests
export const GET = async (req: Request) => {
  return new Response(
    JSON.stringify({ message: "Method not supported" } as ActionError),
    {
      status: 403,
      headers: ACTIONS_CORS_HEADERS,
    }
  );
};
export const OPTIONS = GET;

// POST request handler
export const POST = async (req: Request) => {
  await connectToDatabase();
  try {
    const body: NextActionPostRequest = await req.json();
    const url = new URL(req.url);
    
    // Input validation (consider adding express-validator)
    const name = url.searchParams.get("name") ?? "";
    const email = url.searchParams.get("email") ?? "";
    const website = url.searchParams.get("website") ?? "";
    const discord = url.searchParams.get("discord") ?? "";
    const x = url.searchParams.get("x") ?? "";
    const month = parseFloat(url.searchParams.get("month") ?? "0");
    const year = parseFloat(url.searchParams.get("year") ?? "0");
    const orgPubKey = url.searchParams.get("orgPubKey") ?? "";
    const feesType = url.searchParams.get("feesType") ?? "";

    // Validate signature
    let signature: string;
    try {
      signature = body.signature;
      if (!signature) throw "Invalid signature";
    } catch (err) {
      throw 'Invalid "signature" provided';
    }

    // Solana transaction status
    let status = await connection.getSignatureStatus(signature);
    if (!status) throw "Unknown signature status";

    if (
      status.value?.confirmationStatus != "confirmed" &&
      status.value?.confirmationStatus != "finalized"
    ) {
      let actionError: ActionError = {
        message: "Signature not confirmed or finalized",
      };
      return new Response(JSON.stringify(actionError), {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    // Create organization data
    const org = generateRandomId();
    const orgPrivateId = randomBytes(16).toString("hex");
    const newOrgData = new OrgData({
      org,
      orgPrivateId,
      name,
      email,
      website,
      discord,
      twitter: x, // Assume `x` refers to the Twitter handle
      feesType,
      month,
      year,
      orgPubKey,
    });

    await newOrgData.save();

    // Get transaction details
    const transaction = await connection.getParsedTransaction(signature, "confirmed");

    // Blink URL and sharing
    const blinkUrl = `https://dial.to/?action=solana-action:${process.env.BASE_URL}/api/actions/pay/${org}`;
    const xShareUrl = `https://x.com/intent/tweet?text=Check%20out%20my%20new%20Blink%20link:%20${encodeURIComponent(blinkUrl)}`;

    // Generate QR code URL
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(xShareUrl)}`;

    // Send email notification
    await transporter.sendMail({
      from: `"BARK BLINK" <${process.env.EMAIL}>`,
      to: email,
      subject: `Thanks ${name} for using BARK BLINK`,
      text: `Hello ${name},

Thank you for choosing SUBSLINK!

We are excited to inform you that your subscription Blink has been created successfully. You can share the below blink link on your socials:

Your Private ID: ${orgPrivateId}. This will be used to send information, messages, and contents to your users, so keep it safe.
Blink URL: ${blinkUrl}
To send emails to your subscriber: ${process.env.BASE_URL}/send-email

Best regards,
The SUBSLINK Team`,
    });

    // Response payload
    const payload: CompletedAction = {
      type: "completed",
      title: "Subscription created successfully. Check your email.",
      icon: qrCodeUrl,
      label: "Subscription Created",
      description: `Your Blink URL to share is ${blinkUrl}, or just scan the QR code to share. Check your email for more info.`,
    };

    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.error("General error:", err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return new Response(JSON.stringify(actionError), {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
