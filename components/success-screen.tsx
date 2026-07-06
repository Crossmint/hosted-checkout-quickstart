"use client";

import Image from "next/image";
import { EXPLORER_BASE_URL, type Delivery } from "@/lib/delivery-watcher";

function shortenHash(hash: string, chars = 6) {
  return `${hash.slice(0, chars + 2)}…${hash.slice(-chars)}`;
}

function ExternalLinkIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

interface SuccessScreenProps {
  delivery: Delivery;
  itemName: string;
  itemPrice: string;
  itemImageUrl: string;
  onContinue: () => void;
}

export function SuccessScreen({
  delivery,
  itemName,
  itemPrice,
  itemImageUrl,
  onContinue,
}: SuccessScreenProps) {
  const txUrl = `${EXPLORER_BASE_URL}/tx/${delivery.txHash}`;
  const walletUrl = `${EXPLORER_BASE_URL}/address/${delivery.walletAddress}`;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 bg-white rounded-2xl shadow-lg border w-full max-w-md p-8 flex flex-col items-center">
      <div className="success-check-wrapper mb-5">
        <svg
          className="h-20 w-20"
          viewBox="0 0 52 52"
          fill="none"
          aria-hidden
        >
          <circle
            className="success-check-circle"
            cx="26"
            cy="26"
            r="24"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path
            className="success-check-mark"
            d="M15 27l7.5 7.5L37 20"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-center">Payment complete</h1>
      <p className="text-gray-500 text-center mt-2 mb-6 text-balance">
        Your {itemName} was minted and delivered on-chain. Verify it yourself
        on the block explorer.
      </p>

      <div className="w-full rounded-xl border bg-gray-50 divide-y divide-gray-200/70 text-sm">
        <div className="flex items-center gap-3 p-3.5">
          <Image
            src={itemImageUrl}
            alt={itemName}
            width={40}
            height={40}
            className="rounded-lg border bg-white"
          />
          <span className="font-medium text-gray-900 flex-1">{itemName}</span>
          <span className="font-semibold text-gray-900">{itemPrice}</span>
        </div>
        <div className="flex items-center justify-between p-3.5">
          <span className="text-gray-500">Network</span>
          <span className="font-medium text-gray-900">Base Sepolia</span>
        </div>
        <div className="flex items-center justify-between p-3.5">
          <span className="text-gray-500">Delivered to</span>
          <a
            href={walletUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900"
          >
            {shortenHash(delivery.walletAddress, 4)}
            <ExternalLinkIcon />
          </a>
        </div>
        <div className="flex items-center justify-between p-3.5">
          <span className="text-gray-500">Transaction</span>
          <a
            href={txUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900"
          >
            {shortenHash(delivery.txHash)}
            <ExternalLinkIcon />
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
