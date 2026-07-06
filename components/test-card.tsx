"use client";

import Image from "next/image";

export function TestPaymentsCard() {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5 w-full flex flex-col items-start">
      <div className="flex items-center gap-2 mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <title>Test payments</title>
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="9" x2="22" y2="9" />
        </svg>
        <span className="text-lg font-semibold text-gray-900">
          Test payments
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        This is a test environment. No real money is charged.
      </p>

      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-sm text-gray-500">Card number</span>
        <button
          type="button"
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-800 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={async (event) => {
            const button = event.currentTarget;
            const image = button.querySelector("img");
            const span = button.querySelector("span");

            await navigator.clipboard.writeText("4242 4242 4242 4242");

            button.disabled = true;
            button.style.color = "var(--accent)";
            if (image) {
              image.src = "/check.svg";
              image.alt = "Copied";
            }
            if (span) {
              span.textContent = "Copied";
            }

            setTimeout(() => {
              button.disabled = false;
              button.style.color = "";
              if (image) {
                image.src = "/copy.svg";
                image.alt = "Copy";
              }
              if (span) {
                span.textContent = "Copy";
              }
            }, 2000);
          }}
        >
          <Image src="/copy.svg" alt="Copy" width={14} height={14} />
          <span className="w-10 text-left">Copy</span>
        </button>
      </div>
      <span className="font-mono text-base bg-gray-50 px-3 py-2 rounded-md border select-all w-full mb-4">
        4242 4242 4242 4242
      </span>

      <div className="w-full text-sm divide-y divide-gray-100">
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-500">Expiry</span>
          <span className="text-gray-900">
            Any future date, e.g.{" "}
            <span className="font-mono select-all">12/30</span>
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-500">CVC</span>
          <span className="text-gray-900">
            Any 3 digits, e.g. <span className="font-mono select-all">123</span>
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-500">Name and address</span>
          <span className="text-gray-900">Any values work</span>
        </div>
      </div>
    </div>
  );
}
