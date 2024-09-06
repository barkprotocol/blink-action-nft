import { NextApiRequest, NextApiResponse } from "next";
import { 
  donateRouteHandler, 
  paymentsRouteHandler, 
  payRouteHandler, 
  mintRouteHandler, 
  stakeRouteHandler, 
  transferSolRouteHandler, 
  transferBarkRouteHandler, 
  transferSplRouteHandler, 
  walletRouteHandler, 
  memoRouteHandler, 
  voteRouteHandler, 
  createRouteHandler, 
  emailSendRouteHandler, 
  updateRouteHandler, 
  membershipRouteHandler, 
  saveOrgDataRouteHandler, 
  saveUserDataRouteHandler 
} from "../../../actions";

// Define a type for route handlers
type RouteHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

// Map URL paths to their corresponding route handlers
const routeHandlers: Record<string, RouteHandler> = {
  "/api/actions/donate": donateRouteHandler,
  "/api/actions/payments": paymentsRouteHandler,
  "/api/actions/pay": payRouteHandler,
  "/api/actions/stake": stakeRouteHandler,
  "/api/actions/mint": mintRouteHandler,
  "/api/actions/transfer-sol": transferSolRouteHandler,
  "/api/actions/transfer-bark": transferBarkRouteHandler,
  "/api/actions/transfer-spl": transferSplRouteHandler,
  "/api/actions/wallet": walletRouteHandler,
  "/api/actions/memo": memoRouteHandler,
  "/api/actions/vote": voteRouteHandler,
  "/api/actions/create": createRouteHandler,
  "/api/actions/email-send": emailSendRouteHandler,
  "/api/actions/update": updateRouteHandler,
  "/api/actions/membership": membershipRouteHandler,
  "/api/actions/save-org-data": saveOrgDataRouteHandler,
  "/api/actions/save-user-data": saveUserDataRouteHandler,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req;
  
  // Check if URL is defined and map it to a route handler
  if (!url || !routeHandlers[url]) {
    return res.status(404).json({ error: "Not found" });
  }

  const routeHandler = routeHandlers[url];
  
  try {
    await routeHandler(req, res);
  } catch (error) {
    console.error(`Error handling request to ${url}:`, error);

    // Provide detailed error messages for debugging
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
