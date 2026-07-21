"use client";

import { CrossmintProvider } from "@crossmint/client-sdk-react-ui";

const crossmintApiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "";

export function Providers({ children }: { children: React.ReactNode }) {
  if (!crossmintApiKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg border w-full max-w-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Setup required</h1>
          <p className="text-gray-600">
            Add your <code>NEXT_PUBLIC_CROSSMINT_API_KEY</code> to{" "}
            <code>.env.local</code> to run this demo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CrossmintProvider apiKey={crossmintApiKey}>{children}</CrossmintProvider>
  );
}
