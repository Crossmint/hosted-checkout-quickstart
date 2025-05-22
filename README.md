<div align="center">
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/8b617791-cd37-4a5a-8695-a7c9018b7c70" />
<br>
<br>
<h1>Embedded Checkout Quickstart</h1>

<div align="center">
<a href="https://embedded-checkout.demos-crossmint.com/">Live Demo</a> | <a href="https://docs.crossmint.com/payments/embedded/overview">Docs</a> | <a href="https://github.com/crossmint">See all quickstarts</a>
</div>

<br>
<br>
<img src="https://github.com/user-attachments/assets/bcb689ab-8991-4d25-905f-aac75b2946e0" alt="Image" width="full">
</div>

## Introduction

Allow your customers to buy NFTs with credit card and crypto payments, using Crossmint's embedded checkout. This quickstart provides a seamless integration for accepting payments in your dApp.

**Learn how to:**

- Showcase and sell your unique NFTs
- Seamlessly accept both credit card and cryptocurrency payments
- Deliver NFTs directly to a buyer's wallet or email address

## Deploy

Easily deploy the template to Vercel with the button below. You will need to set the required environment variables in the Vercel dashboard.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCrossmint%2Fembedded-checkout-quickstart&env=NEXT_PUBLIC_CROSSMINT_API_KEY&env=NEXT_PUBLIC_CROSSMINT_COLLECTION_ID)

## Setup

1. Clone the repository and navigate to the project folder:
```bash
git clone https://github.com/crossmint/embedded-checkout-quickstart.git && cd embedded-checkout-quickstart
```

2. Install all dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up the environment variables:
```bash
cp .env.template .env
```

4. Create a developer account in the [Staging Console](https://staging.crossmint.com/signin?callbackUrl=/console).
5. Create a new collection in the console following [this guide](https://docs.crossmint.com/payments/guides/create-collection) or import yours using [this guide](https://docs.crossmint.com/payments/guides/register-collection), and have your `collectionId` ready.
6. Make sure you follow the maximum prices for collections set in staging outlined [here](https://docs.crossmint.com/payments/advanced/testing-tips#limits-in-staging).
7. Add your Crossmint `collectionId` to the `.env` file.
```bash
NEXT_PUBLIC_CROSSMINT_COLLECTION_ID=your_collection_id
```

8. Get your client-side development key from the [Crossmint Console Overview](https://staging.crossmint.com/console/overview) and add it to the `.env` file. Make sure your API key has the following scope: `orders.create`.
```bash
NEXT_PUBLIC_CROSSMINT_API_KEY=your_api_key
```

9. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Using in production

1. Create a [production API key](https://docs.crossmint.com/introduction/platform/api-keys/client-side). Make sure your API key has the following scope: `orders.create`. Get your client-side production key from [https://staging.crossmint.com/console/overview](https://staging.crossmint.com/console/overview).
2. Create your production collection on Crossmint.  
3. Update the `NEXT_PUBLIC_CROSSMINT_API_KEY` with your production API key.
4. Update the `NEXT_PUBLIC_CROSSMINT_COLLECTION_ID` with your production collection ID.
5. Deploy your application to a production environment.

## Advanced Usage

For advanced usage, refer to the Crossmint documentation:

- Add Apple Pay: [https://docs.crossmint.com/payments/embedded/guides/apple-pay](https://docs.crossmint.com/payments/embedded/guides/apple-pay)
- Customize the UI: [https://docs.crossmint.com/payments/embedded/guides/ui-customization](https://docs.crossmint.com/payments/embedded/guides/ui-customization)
- Edit payment methods: [https://docs.crossmint.com/payments/embedded/guides/payment-methods](https://docs.crossmint.com/payments/embedded/guides/payment-methods)