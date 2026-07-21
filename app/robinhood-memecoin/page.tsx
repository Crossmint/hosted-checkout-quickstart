"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CrossmintHostedCheckout } from "@crossmint/client-sdk-react-ui";
import { CollectionPreview } from "@/components/collection-preview";
import { TestPaymentsCard } from "@/components/test-card";
import { SuccessScreen } from "@/components/success-screen";
import { NextSteps } from "@/components/next-steps";
import {
  useTokenDeliveryWatcher,
  EXPLORER_BASE_URL,
  NETWORK_NAME,
} from "@/lib/token-delivery-watcher";

const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "";
const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS ?? "";
const recipientWalletAddress = process.env.NEXT_PUBLIC_RECIPIENT_WALLET_ADDRESS ?? "";

const ITEM = {
  name: "Robinhood Memecoin",
  price: "$5.00",
  imageUrl: "/ledger-pass.svg",
};

const USD_AMOUNT = "5";
const MAX_SLIPPAGE_BPS = "500";

const RECEIPT_EMAIL = "receipt@crossmint.com";

type View = "shop" | "success" | "next-steps";

export default function RobinhoodMemecoinHome() {
  const [view, setView] = useState<View>("shop");
  const { delivery, startWatching } = useTokenDeliveryWatcher({
    recipientWalletAddress,
  });

  useEffect(() => {
    if (delivery) {
      setView("success");
    }
  }, [delivery]);

  if (!tokenContractAddress || !recipientWalletAddress) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg border w-full max-w-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Setup required</h1>
          <p className="text-gray-600 mb-4">
            Add <code>NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS</code> and{" "}
            <code>NEXT_PUBLIC_RECIPIENT_WALLET_ADDRESS</code> to{" "}
            <code>.env.local</code> to run the Robinhood memecoin checkout demo.
          </p>
          <p className="text-sm text-gray-500">
            The token locator will be{" "}
            <code>robinhood-chain:YOUR_TOKEN_CONTRACT_ADDRESS</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      {view === "shop" && (
        <main className="flex flex-col items-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center gap-6 w-full max-w-6xl">
          <div className="hidden lg:block" />
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
                tokenLocator: `robinhood-chain:${tokenContractAddress}`,
                executionParameters: {
                  mode: "exact-in",
                  amount: USD_AMOUNT,
                  maxSlippageBps: MAX_SLIPPAGE_BPS,
                },
              }}
              appearance={{
                display: "popup",
                overlay: {
                  enabled: true,
                },
                theme: {
                  button: "dark",
                  checkout: "light",
                },
                rules: {
                  DestinationInput: {
                    display: "hidden",
                  },
                },
              }}
              payment={{
                crypto: {
                  enabled: false,
                },
                fiat: {
                  enabled: true,
                  defaultCurrency: "usd",
                },
                defaultMethod: "fiat",
                receiptEmail: RECEIPT_EMAIL,
              }}
              recipient={{
                walletAddress: recipientWalletAddress,
              }}
              locale="en-US"
            />
          </div>
          <div className="w-full max-w-md lg:w-80 lg:justify-self-start lg:ml-8">
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
            networkName={NETWORK_NAME}
            explorerBaseUrl={EXPLORER_BASE_URL}
          />
        </main>
      )}

      {view === "next-steps" && (
        <main className="flex justify-center w-full py-8">
          <NextSteps />
        </main>
      )}

      {view === "shop" && (
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
      )}
    </div>
  );
}
