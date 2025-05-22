"use client";

import { CrossmintProvider } from "@crossmint/client-sdk-react-ui";

const crossmintApiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "";

if (!crossmintApiKey) {
  throw new Error("NEXT_PUBLIC_CROSSMINT_API_KEY is not set");
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CrossmintProvider apiKey={crossmintApiKey}>{children}</CrossmintProvider>
  );
}
