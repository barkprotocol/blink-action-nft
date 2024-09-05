"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define types for endpoints
type Endpoint = {
  title: string;
  apiPath: string;
};

const endpoints: Endpoint[] = [
  { title: "SPL Token Transfer", apiPath: "/api/actions/transfer-token" },
  { title: "NFT Transfer", apiPath: "/api/actions/transfer-nft" },
];

export default function TransferTokenPage() {
  // State to store the API endpoint URLs
  const [apiEndpoints, setApiEndpoints] = useState<Record<string, string | null>>({});

  // Effect to set the API endpoint URLs
  useEffect(() => {
    const fetchApiEndpoints = async () => {
      try {
        const endpointsMap: Record<string, string | null> = {};
        for (const endpoint of endpoints) {
          endpointsMap[endpoint.title] = new URL(endpoint.apiPath, window.location.origin).toString();
        }
        setApiEndpoints(endpointsMap);
      } catch (err) {
        console.error("Error constructing API URLs:", err);
        setApiEndpoints(endpoints.reduce((acc, { title }) => ({ ...acc, [title]: null }), {}));
      }
    };

    fetchApiEndpoints();
  }, []);

  // Function to render transfer section
  const renderTransferSection = (title: string, endpoint: string | null) => (
    <>
      {endpoint ? (
        <>
          <Card className="group-hover:border-primary rounded overflow-hidden text-center flex items-center justify-center mx-auto max-w-[400px]">
            <SolanaQRCode
              url={endpoint}
              color="white"
              background="black"
              size={400}
              className="rounded-lg w-full"
              aria-label={`QR code for ${title} endpoint`}
            />
          </Card>

          <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Use the following endpoint for {title.toLowerCase()}:
            </p>
          </div>

          <Card className="group-hover:border-primary">
            <CardHeader>
              <CardTitle className="space-y-3">{title} Endpoint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                <Link
                  href={endpoint}
                  target="_blank"
                  className="underline hover:text-primary"
                  rel="noopener noreferrer"
                  aria-label={`${title} API endpoint URL`}
                >
                  {endpoint}
                </Link>
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <p className="text-center text-red-500">
          Failed to load {title} API endpoint. Please try again later.
        </p>
      )}
    </>
  );

  return (
    <section
      id="transfer"
      className="container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-tight sm:text-3xl md:text-6xl">
          Transfer Tokens and NFTs
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Learn how to transfer SPL tokens and NFTs using our API actions. Select the appropriate transfer method below.
        </p>
      </div>

      {endpoints.map(({ title, apiPath }) => (
        <div key={title} className="mb-12">
          {renderTransferSection(title, apiEndpoints[title])}
        </div>
      ))}
    </section>
  );
}
