"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

export default function MintPage() {
  // Define the API path for minting functionality
  const apiPath = "/api/actions/mint";
  const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Construct the full API endpoint URL
      const endpoint = new URL(apiPath, window.location.origin).toString();
      setApiEndpoint(endpoint);
    } catch (err) {
      console.error("Error constructing API URL:", err);
      setError("Failed to construct the minting API URL.");
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  if (loading) {
    return (
      <section
        id="mint"
        className="container flex items-center justify-center py-8 dark:bg-transparent"
      >
        <p className="text-muted-foreground text-lg">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="mint"
        className="container flex items-center justify-center py-8 dark:bg-transparent"
      >
        <p className="text-red-500 text-lg">{error}</p>
      </section>
    );
  }

  return (
    <section
      id="mint"
      className="container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-tight sm:text-3xl md:text-6xl">
          Mint Tokens
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Use this page to mint new tokens directly on the blockchain. Follow the instructions and scan the QR code to get started.
        </p>
      </div>

      {apiEndpoint && (
        <Card className="rounded overflow-hidden text-center flex items-center justify-center mx-auto max-w-[400px]">
          <SolanaQRCode
            url={apiEndpoint}
            color="white"
            background="black"
            size={400}
            className="rounded-lg w-full max-w-[400px]"
            aria-label="QR code for minting endpoint"
          />
        </Card>
      )}

      <div className="mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          View the{" "}
          <Button variant="link" asChild>
            <Link
              href={`${siteConfig.links.github}/src/app${apiPath}/route.ts`}
              target="_blank"
              rel="noopener noreferrer"
            >
              source code for this minting Action
            </Link>
          </Button>{" "}
          on GitHub.
        </p>
      </div>

      {apiEndpoint && (
        <Card className="rounded">
          <CardHeader>
            <CardTitle className="space-y-3">Action Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">
              <Link
                href={apiEndpoint}
                target="_blank"
                className="underline hover:text-primary"
                rel="noopener noreferrer"
              >
                {apiEndpoint}
              </Link>
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
