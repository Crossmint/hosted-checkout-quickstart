"use client";

import type { ReactNode } from "react";

interface NextStepCard {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  icon: ReactNode;
  featured?: boolean;
}

const CARDS: NextStepCard[] = [
  {
    title: "Implement it",
    description: "Clone the quickstart and run it with your own collection.",
    linkLabel: "Get the code",
    href: "https://github.com/Crossmint/hosted-checkout-quickstart",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    title: "Talk to our team",
    description: "Get pricing and guidance for your use case.",
    linkLabel: "Contact sales",
    href: "https://www.crossmint.com/contact",
    featured: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Explore the docs",
    description: "The full payments suite, from checkout to API.",
    linkLabel: "Payments overview",
    href: "https://docs.crossmint.com/payments/overview",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

export function NextSteps() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-3xl flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-balance mb-10">
        Ship this in your app
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {CARDS.map((card, index) => (
          <a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${150 + index * 100}ms` }}
            className={`animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards animation-duration-500 group flex flex-col items-center text-center rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
              card.featured
                ? "border-accent/60 ring-1 ring-accent/40 hover:ring-accent"
                : "hover:border-gray-300"
            }`}
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
                card.featured
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {card.icon}
            </div>
            <h2 className="font-semibold text-gray-900">{card.title}</h2>
            <p className="mt-1.5 text-sm text-gray-500 flex-1 text-balance">
              {card.description}
            </p>
            <span
              className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${
                card.featured ? "text-accent" : "text-gray-900"
              }`}
            >
              {card.linkLabel}
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
