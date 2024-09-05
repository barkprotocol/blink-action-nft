// errorHandler.ts

export function handleError(err: unknown): Response {
    console.error(err);
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(`Error: ${message}`, { status: 400, headers: createActionHeaders() });
  }
  
  // Create standard headers for responses
  export function createActionHeaders(): Headers {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    return headers;
  }
  