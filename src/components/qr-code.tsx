"use client";

import { createSolanaQR, encodeURL } from "@solana/actions";
import { useEffect, useRef, useCallback } from "react";

type ComponentProps = {
  url: string | URL;
  className?: string;
  background?: string;
  color?: string;
  size?: number;
};

export function SolanaQRCode({
  url,
  className,
  background = "transparent",
  color = "#080808", // Default color
  size = 400, // Default size
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Function to validate and resolve the URL
  const resolveURL = useCallback((url: string | URL): URL => {
    try {
      return new URL(url, window.location.href);
    } catch {
      console.error("Invalid URL provided:", url);
      throw new Error("Invalid URL provided.");
    }
  }, []);

  useEffect(() => {
    try {
      // Resolve and encode the URL
      const resolvedUrl = resolveURL(url);
      const encodedUrl = encodeURL({ link: resolvedUrl }, "solana:");

      console.log("Encoded URL:", encodedUrl.toString());

      // Create and append the QR code
      const qr = createSolanaQR(encodedUrl, size, background, color);
      if (ref.current) {
        ref.current.innerHTML = ''; // Clear previous QR code
        ref.current.appendChild(qr); // Append new QR code
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, [url, background, color, size, resolveURL]);

  // Ensure the size is a positive number
  const validSize = Math.max(size, 100);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: validSize, height: validSize }}
    />
  );
}
