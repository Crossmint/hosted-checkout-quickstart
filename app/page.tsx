"use client";

import Image from "next/image";
import { CrossmintHostedCheckout } from "@crossmint/client-sdk-react-ui";
import { CollectionPreview } from "@/components/collection-preview";
import { TestPaymentsCard } from "@/components/test-card";

const collectionId = process.env.NEXT_PUBLIC_CROSSMINT_COLLECTION_ID ?? "";
if (!collectionId) {
  throw new Error("NEXT_PUBLIC_CROSSMINT_COLLECTION_ID is not set");
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      <main className="flex flex-col lg:grid lg:grid-cols-3 items-center lg:items-start gap-8 w-full max-w-6xl">
        <div className="lg:col-start-2 flex justify-center lg:justify-start lg:pt-12">
          <div className="flex items-center justify-center py-8 md:pt-4">
            <div className="bg-white rounded-2xl shadow-lg border max-w-4xl w-full gap-0">
              <div className="flex items-center justify-center p-6">
                <div className="rounded-l-2xl">
                  <CollectionPreview
                    title="Sonic Ledger Pass"
                    price="$2.00"
                    imageUrl="/ledger-pass.svg"
                    imageSize={360}
                    imageAlt="Sonic Ledger Pass"
                  />
                  <div className="flex items-center w-full justify-center">
                    <CrossmintHostedCheckout
                      lineItems={{
                        collectionLocator: `crossmint:${collectionId}`, // Collection identifier: crossmint:<YOUR_COLLECTION_ID>[:TEMPLATE_ID] or <blockchain>:<contract-address>
                        callData: {
                          totalPrice: "2", // Total price in your contract's currency (e.g., 0.001 ETH, 2 USDC)
                          // Arguments for your contract's mint function (names must match exactly, don't pass recipient)
                        },
                      }}
                      appearance={{
                        display: "popup", // Open in a popup
                        overlay: {
                          enabled: true, // Enable overlay
                        },
                        theme: {
                          button: "dark", // Dark button theme
                          checkout: "light", // Light checkout theme
                        },
                      }}
                      payment={{
                        crypto: {
                          enabled: true, // Enable crypto payments
                          defaultChain: "base-sepolia", // Default chain for crypto payments
                          defaultCurrency: "usdc", // Default currency for crypto payments
                        },
                        fiat: {
                          enabled: true, // Enable fiat payments
                          defaultCurrency: "usd", // Default currency for fiat payments
                        },
                        receiptEmail: "receipt@crossmint.com", // Optional: Set receipt email
                      }}
                      recipient={{
                        email: "buyer@crossmint.com", // NFTs will be delivered to this email's wallet
                        // Or use walletAddress: "0x..." for direct delivery
                      }}
                      locale="en-US" // Set interface language
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-start-3 flex justify-center">
          <TestPaymentsCard />
        </div>
      </main>
      <footer className="flex flex-col gap-4 items-center justify-center mt-8">
        <div className="flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/Crossmint/hosted-checkout-quickstart"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            View code
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/crossmint"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            See all quickstarts
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://crossmint.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to crossmint.com →
          </a>
        </div>
        <div className="flex">
          <Image
            src="/crossmint-leaf.svg"
            alt="Powered by Crossmint"
            priority
            width={152}
            height={100}
          />
        </div>
      </footer>
    </div>
  );
}
