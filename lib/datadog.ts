import { datadogRum } from "@datadog/browser-rum";

// prevent multiple initializations
let isInitialized = false;

const initializeDatadog = () => {
  // only run on client side
  if (typeof window === "undefined") {
    return;
  }

  //pPrevent multiple initializations
  if (isInitialized) {
    return;
  }

  const applicationId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
  const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;

  if (applicationId && clientToken) {
    console.log("Initializing Datadog RUM");
    datadogRum.init({
      applicationId,
      clientToken,
      env: "production",
      site: "datadoghq.com",
      service: "hosted-checkout-quickstart",
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      defaultPrivacyLevel: "mask-user-input",
    });
    isInitialized = true;
  }
};

// initialize when the module loads (client-side only)
initializeDatadog();
