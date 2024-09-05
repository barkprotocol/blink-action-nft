"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

export default function DonatePage() {
  const apiPath = "/api/actions/donate";
  const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constructApiUrl = async () => {
      try {
        const fullApiUrl = new URL(apiPath, window.location.origin).toString();
        setApiEndpoint(fullApiUrl);
      } catch (err) {
        console.error("Error constructing API URL:", err);
        setError("Failed to construct the donation API URL. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    constructApiUrl();
  }, [apiPath]);

  return (
    <section
      id="donate"
      className="container py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground text-lg">Loading...</p>
          {/* Optionally, add a spinner or loading animation here */}
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : (
        <>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
            <h2 className="font-heading text-3xl leading-tight sm:text-3xl md:text-6xl">
              Donate
            </h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg sm:leading-7">
              Support your favorite causes by making a donation directly on the Solana blockchain.
            </p>
          </div>

          {apiEndpoint && (
            <Card className="rounded overflow-hidden text-center mx-auto">
              <SolanaQRCode
                url={apiEndpoint}
                color="white"
                background="black"
                size={400}
                className="rounded-lg w-full max-w-[400px]"
                aria-label="QR code for donation endpoint"
              />
            </Card>
          )}

          <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="text-muted-foreground sm:text-lg sm:leading-7">
              View the{" "}
              <Button variant="link" asChild>
                <Link
                  href={`${siteConfig.links.github}/src/app${apiPath}/route.ts`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source code for this donation action
                </Link>
              </Button>{" "}
              on GitHub.
            </p>
          </div>

          {apiEndpoint && (
            <Card className="rounded">
              <CardHeader>
                <CardTitle>Action Endpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <Link
                    href={apiEndpoint}
                    target="_blank"
                    className="underline hover:text-primary"
                    rel="noopener noreferrer"
                    aria-label="API endpoint URL"
                  >
                    {apiEndpoint}
                  </Link>
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </section>
  );
}
