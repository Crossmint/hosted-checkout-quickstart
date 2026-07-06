"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Detects the on-chain delivery of the purchased NFT.
 *
 * The hosted checkout runs on Crossmint's page (popup), so the demo can't
 * receive a callback when the order completes. Instead, we watch Base Sepolia
 * directly: the demo pins the recipient email, so we resolve its custodial
 * wallet address and poll public RPCs for an incoming ERC-721 Transfer.
 * The matching log gives us the real mint transaction hash.
 */

const RPC_URLS = [
  "https://sepolia.base.org",
  "https://base-sepolia.drpc.org",
  "https://base-sepolia.gateway.tenderly.co",
];

// keccak256("Transfer(address,address,uint256)")
const TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

const POLL_INTERVAL_MS = 3_000;
const WATCH_TIMEOUT_MS = 10 * 60 * 1_000;

// Rendered by the SDK while the checkout popup is open (internal id).
const SDK_OVERLAY_ID = "crossmint-hosted-checkout-v3-overlay";

export const CHAIN = "base-sepolia";
export const EXPLORER_BASE_URL = "https://sepolia.basescan.org";

export interface Delivery {
  txHash: string;
  walletAddress: string;
}

type JsonRpcLog = {
  topics: string[];
  transactionHash: string;
  blockNumber: string;
};

async function rpcCall<T>(method: string, params: unknown[]): Promise<T> {
  let lastError: unknown;
  for (const url of RPC_URLS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      });
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error.message);
      }
      return json.result as T;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

function apiBaseUrl(apiKey: string) {
  return apiKey.startsWith("ck_production") || apiKey.startsWith("sk_production")
    ? "https://www.crossmint.com"
    : "https://staging.crossmint.com";
}

let cachedWalletPromise: Promise<string> | null = null;

/**
 * Resolves the custodial wallet behind the recipient email by creating a
 * draft (unpaid) order, the same quote call the checkout itself performs.
 * Works with the public client-side API key; no server key needed.
 */
function resolveRecipientWallet(
  apiKey: string,
  collectionId: string,
  recipientEmail: string
): Promise<string> {
  if (cachedWalletPromise) {
    return cachedWalletPromise;
  }
  cachedWalletPromise = (async () => {
    const res = await fetch(`${apiBaseUrl(apiKey)}/api/2022-06-09/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": apiKey },
      body: JSON.stringify({
        lineItems: {
          collectionLocator: `crossmint:${collectionId}`,
          callData: { totalPrice: "2" },
        },
        payment: { method: CHAIN, currency: "usdc" },
        recipient: { email: recipientEmail },
      }),
    });
    if (!res.ok) {
      throw new Error(`Failed to resolve recipient wallet (${res.status})`);
    }
    const json = await res.json();
    const walletAddress: string | undefined =
      json?.order?.lineItems?.[0]?.delivery?.recipient?.walletAddress;
    if (!walletAddress) {
      throw new Error("Recipient wallet address missing from order quote");
    }
    return walletAddress;
  })();
  cachedWalletPromise.catch(() => {
    cachedWalletPromise = null;
  });
  return cachedWalletPromise;
}

async function findDeliveryLog(
  walletAddress: string,
  fromBlock: number
): Promise<JsonRpcLog | undefined> {
  const paddedWallet = `0x${walletAddress.slice(2).toLowerCase().padStart(64, "0")}`;
  const logs = await rpcCall<JsonRpcLog[]>("eth_getLogs", [
    {
      fromBlock: `0x${fromBlock.toString(16)}`,
      toBlock: "latest",
      topics: [TRANSFER_TOPIC, null, paddedWallet],
    },
  ]);
  // ERC-721 Transfer has 4 topics (tokenId indexed); ERC-20 only has 3.
  return logs.find((log) => log.topics.length === 4);
}

export interface UseDeliveryWatcherOptions {
  apiKey: string;
  collectionId: string;
  recipientEmail: string;
}

export function useDeliveryWatcher({
  apiKey,
  collectionId,
  recipientEmail,
}: UseDeliveryWatcherOptions) {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const watchingRef = useRef(false);
  const stoppedRef = useRef(false);
  const popupRef = useRef<Window | null>(null);

  useEffect(() => {
    stoppedRef.current = false;
    return () => {
      stoppedRef.current = true;
    };
  }, []);

  // The SDK doesn't expose a handle to the checkout popup, so keep one by
  // intercepting window.open. It lets us close the popup (and the SDK's
  // page overlay) the moment the delivery lands, handing the user straight
  // to the success screen.
  useEffect(() => {
    const originalOpen = window.open.bind(window);
    window.open = ((...args: Parameters<typeof window.open>) => {
      const opened = originalOpen(...args);
      popupRef.current = opened;
      return opened;
    }) as typeof window.open;
    return () => {
      window.open = originalOpen;
    };
  }, []);

  const closeCheckoutPopup = useCallback(() => {
    try {
      popupRef.current?.close();
    } catch {
      // Cross-origin popups can throw on access; the overlay cleanup below
      // still runs and the popup simply stays open in the background.
    }
    popupRef.current = null;
    document.getElementById(SDK_OVERLAY_ID)?.remove();
  }, []);

  const startWatching = useCallback(() => {
    if (watchingRef.current) {
      return;
    }
    watchingRef.current = true;

    (async () => {
      try {
        const [walletAddress, blockNumberHex] = await Promise.all([
          resolveRecipientWallet(apiKey, collectionId, recipientEmail),
          rpcCall<string>("eth_blockNumber", []),
        ]);
        // Small back-buffer so a fast payment isn't missed while resolving.
        const fromBlock = Math.max(Number.parseInt(blockNumberHex, 16) - 2, 0);
        const deadline = Date.now() + WATCH_TIMEOUT_MS;

        while (!stoppedRef.current && Date.now() < deadline) {
          try {
            const log = await findDeliveryLog(walletAddress, fromBlock);
            if (log) {
              setDelivery({ txHash: log.transactionHash, walletAddress });
              closeCheckoutPopup();
              return;
            }
          } catch (error) {
            console.warn("Delivery watcher poll failed, retrying:", error);
          }
          await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
        }
      } catch (error) {
        console.error("Delivery watcher could not start:", error);
      } finally {
        watchingRef.current = false;
      }
    })();
  }, [apiKey, collectionId, recipientEmail, closeCheckoutPopup]);

  const reset = useCallback(() => {
    setDelivery(null);
  }, []);

  return { delivery, startWatching, reset };
}
