"use client";

import { useEffect } from "react";

export function DatadogAnalytics() {
  useEffect(() => {
    // only initialize if we're in the browser and have the required env variables
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID &&
      process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN
    ) {
      // dynamic import to ensure it only runs on client side
      import("@/lib/datadog").catch(() => {
        // silently handle any import errors to prevent breaking the app
      });
    }
  }, []);

  return null; // this component doesn't render anything
}
