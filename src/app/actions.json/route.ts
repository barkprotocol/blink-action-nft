import { ActionsJson } from "./types"; // Adjust import if necessary
import { ACTIONS_CORS_HEADERS } from "./const"; // Adjust import if necessary

// Handle GET requests to provide action metadata
export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/pay/*",
        apiPath: "/api/actions/pay/*",
      },
      {
        pathPattern: "/create",
        apiPath: "/api/actions/create",
      },
      {
        pathPattern: "/mint",
        apiPath: "/api/actions/mint",
      },
      {
        pathPattern: "/stake",
        apiPath: "/api/actions/stake",
      },
      {
        pathPattern: "/update",
        apiPath: "/api/actions/update",
      },
      {
        pathPattern: "/transfer-spl",
        apiPath: "/api/actions/transfer-spl",
      },
      {
        pathPattern: "/donate",
        apiPath: "/api/actions/donate",
      },
      {
        pathPattern: "/send-mail",
        apiPath: "/api/actions/send-mail",
      },
      {
        pathPattern: "/vote",
        apiPath: "/api/actions/vote",
      },
      {
        pathPattern: "/wallet",
        apiPath: "/api/actions/wallet",
      },
      {
        pathPattern: "/memo",
        apiPath: "/api/actions/memo",
      },
    ],
  };

  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
};

// Handle OPTIONS requests to support CORS
export const OPTIONS = GET;
