"use client";

import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

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
  color = "#080808",
  size = 400,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Helper function to validate and resolve the URL
    const resolveURL = (url: string | URL) => {
      try {
        return new URL(url, window.location.href);
      } catch {
        console.error("Invalid URL provided:", url);
        throw new Error("Invalid URL provided.");
      }
    };

    try {
      // Resolve and encode the URL
      const resolvedUrl = resolveURL(url);
      const qrCode = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg", // You can change this based on your requirements
        data: resolvedUrl.toString(),
        image: null, // If you need to add a logo, configure this
        dotsOptions: {
          color: color,
          // Additional dot options here
        },
        backgroundOptions: {
          color: background,
        },
      });

      // Render the QR code into the ref element
      if (ref.current) {
        ref.current.innerHTML = ''; // Clear previous content
        qrCode.append(ref.current);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, [url, background, color, size]);

  // Ensure size is a positive number
  const validSize = Math.max(size, 100);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: validSize, height: validSize }}
    />
  );
}
