import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hosted Checkout Quickstart",
  description:
    "Allow your customers to buy NFTs with credit card and crypto payments, using Crossmint's hosted checkout. This quickstart provides a seamless integration for accepting payments in your dApp.",
  creator: "Crossmint",
  publisher: "Crossmint",
  metadataBase: new URL("https://hosted-checkout.demos-crossmint.com"),
  openGraph: {
    title: "Hosted Checkout Quickstart",
    description:
      "Allow your customers to buy NFTs with credit card and crypto payments, using Crossmint's hosted checkout. This quickstart provides a seamless integration for accepting payments in your dApp.",
    images: [
      {
        url: "/ledger-pass.svg",
        width: 1200,
        height: 630,
        alt: "Crossmint Hosted Checkout Quickstart",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hosted Checkout Quickstart",
    description:
      "Allow your customers to buy NFTs with credit card and crypto payments, using Crossmint's hosted checkout. This quickstart provides a seamless integration for accepting payments in your dApp.",
    images: ["/ledger-pass.svg"],
    creator: "@crossmint",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
