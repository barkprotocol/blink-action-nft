import { NextApiRequest, NextApiResponse } from "next";
import { createMintRequest, checkMintStatus, cancelMintRequest } from "./operations";

// Define the body type for mint requests
export type MintRequestBody = {
  requestId: string;
  amount?: number; // Optional, needed only for creating requests
  currency?: string; // Optional, needed only for creating requests
  recipient?: string; // Optional, needed only for creating requests
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        return await handleMintRequest(req, res);
      case "GET":
        return await handleMintStatus(req, res);
      case "DELETE":
        return await handleCancelMintRequest(req, res);
      default:
        return res.status(400).json({ error: "Invalid request method" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleMintRequest(req: NextApiRequest, res: NextApiResponse) {
  const body: MintRequestBody = req.body;

  const result = await createMintRequest(body);
  if (result.success) {
    return res.status(200).json({ message: "Mint request created successfully." });
  } else {
    return res.status(400).json({ error: result.message });
  }
}

async function handleMintStatus(req: NextApiRequest, res: NextApiResponse) {
  const { requestId } = req.query;

  if (typeof requestId !== "string") {
    return res.status(400).json({ error: "Invalid request ID" });
  }

  try {
    const status = await checkMintStatus(requestId);
    return res.status(200).json(status);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving mint status" });
  }
}

async function handleCancelMintRequest(req: NextApiRequest, res: NextApiResponse) {
  const body: MintRequestBody = req.body;

  const result = await cancelMintRequest(body);
  if (result.success) {
    return res.status(200).json({ message: "Mint request canceled successfully." });
  } else {
    return res.status(400).json({ error: result.message });
  }
}

export default handler;
