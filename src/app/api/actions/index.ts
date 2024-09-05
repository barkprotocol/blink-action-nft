// pages/api/actions/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { donateRouteHandler } from "../../../actions/donate/route";
import { paymentsRouteHandler } from "../../../actions/payments/route";
import { stakeRouteHandler } from "../../../actions/stake/route";
import { transferSolRouteHandler } from "../../../actions/transfer-sol/route";
import { transferBarkRouteHandler } from "../../../actions/transfer-bark/route";
import { transferSplRouteHandler } from "../../../actions/transfer-spl/route";
import { walletRouteHandler } from "../../../actions/wallet/route";
import { memoRouteHandler } from "../../../actions/memo/route";
import { voteRouteHandler } from "../../../actions/vote/route";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.url) {
    case "/api/actions/donate":
      await donateRouteHandler(req, res);
      break;
    case "/api/actions/payments":
      await paymentsRouteHandler(req, res);
      break;
    case "/api/actions/stake":
      await stakeRouteHandler(req, res);
      break;
    case "/api/actions/transfer-sol":
      await transferSolRouteHandler(req, res);
      break;
    case "/api/actions/transfer-bark":
      await transferBarkRouteHandler(req, res);
      break;
    case "/api/actions/transfer-spl":
      await transferSplRouteHandler(req, res);
      break;
    case "/api/actions/wallet":
      await walletRouteHandler(req, res);
      break;
    case "/api/actions/memo":
      await memoRouteHandler(req, res);
      break;
    case "/api/actions/vote":
      await voteRouteHandler(req, res);
      break;
    default:
      res.status(404).json({ error: "Not found" });
      break;
  }
}
