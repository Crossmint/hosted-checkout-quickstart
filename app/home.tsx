"use client";

import { CrossmintHostedCheckout } from "@crossmint/client-sdk-react-ui";
import { CollectionPreview } from "@/components/collection-preview";

const collectionId = process.env.NEXT_PUBLIC_CROSSMINT_COLLECTION_ID ?? "";
if (!collectionId) {
  throw new Error("NEXT_PUBLIC_CROSSMINT_COLLECTION_ID is not set");
}

export function HomeContent() {
  return (
    <div className="flex items-center justify-center py-8 md:pt-4">
      <div className="bg-white rounded-2xl shadow-lg border max-w-4xl w-full gap-0 overflow-hidden">
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
  );
}
