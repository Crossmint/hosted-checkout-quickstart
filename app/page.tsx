"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CrossmintHostedCheckout } from "@crossmint/client-sdk-react-ui";
import { CollectionPreview } from "@/components/collection-preview";
import { TestPaymentsCard } from "@/components/test-card";
import { SuccessScreen } from "@/components/success-screen";
import { NextSteps } from "@/components/next-steps";
import { useDeliveryWatcher } from "@/lib/delivery-watcher";

const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "";
const collectionId = process.env.NEXT_PUBLIC_CROSSMINT_COLLECTION_ID ?? "";
if (!collectionId) {
  throw new Error("NEXT_PUBLIC_CROSSMINT_COLLECTION_ID is not set");
}

const RECIPIENT_EMAIL = "buyer@crossmint.com";
const ITEM = {
  name: "Sonic Ledger Pass",
  price: "$2.00",
  imageUrl: "/ledger-pass.svg",
};

type View = "shop" | "success" | "next-steps";

export default function Home() {
  const [view, setView] = useState<View>("shop");
  const { delivery, startWatching } = useDeliveryWatcher({
    apiKey,
    collectionId,
    recipientEmail: RECIPIENT_EMAIL,
  });

  useEffect(() => {
    if (delivery) {
      setView("success");
    }
  }, [delivery]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      {view === "shop" && (
        <main className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 w-full max-w-5xl">
          <div className="bg-white rounded-2xl shadow-lg border w-full max-w-md p-6">
            <CollectionPreview
              title={ITEM.name}
              price={ITEM.price}
              imageUrl={ITEM.imageUrl}
              imageSize={360}
              imageAlt={ITEM.name}
            />
            <CrossmintHostedCheckout
              className="w-full"
              onClick={startWatching}
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
                email: RECIPIENT_EMAIL, // NFTs will be delivered to this email's wallet
                // Or use walletAddress: "0x..." for direct delivery
              }}
              locale="en-US" // Set interface language
            />
          </div>
          <div className="w-full max-w-md lg:max-w-sm">
            <TestPaymentsCard />
          </div>
        </main>
      )}

      {view === "success" && delivery && (
        <main className="flex justify-center w-full py-8">
          <SuccessScreen
            delivery={delivery}
            itemName={ITEM.name}
            itemPrice={ITEM.price}
            itemImageUrl={ITEM.imageUrl}
            onContinue={() => setView("next-steps")}
          />
        </main>
      )}

      {view === "next-steps" && (
        <main className="flex justify-center w-full py-8">
          <NextSteps />
        </main>
      )}

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
            href="https://www.crossmint.com/quickstarts"
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
