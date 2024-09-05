"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

export default function WalletPage() {
  // Define the API path for wallet functionality
  const apiPath = "/api/actions/wallet";
  const [apiEndpoint, setApiEndpoint] = useState<string>("");

  useEffect(() => {
    // Construct the full API endpoint URL
    const endpoint = new URL(apiPath, window.location.origin).toString();
    setApiEndpoint(endpoint);
  }, [apiPath]);

  return (
    <section
      id="wallet"
      className="container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-tight sm:text-3xl md:text-6xl">
          Wallet
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Manage your Solana wallet and view your balances directly from the platform.
        </p>
      </div>

      {apiEndpoint && (
        <Card className="group-hover:border-primary rounded overflow-hidden text-center flex items-center justify-center mx-auto max-w-[400px]">
          <SolanaQRCode
            url={apiEndpoint}
            color="white"
            background="black"
            size={400}
            className="rounded-lg"
            aria-label="QR code for wallet endpoint"
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
              source code for this wallet Action
            </Link>
          </Button>{" "}
          on GitHub.
        </p>
      </div>

      {apiEndpoint && (
        <Card className="group-hover:border-primary">
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
