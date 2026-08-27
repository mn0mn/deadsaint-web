# Deadsaint — Web

Next.js (App Router + TypeScript) storefront for Deadsaint. Backend/commerce
provider is not chosen yet — the app is structured so that decision only
touches `lib/`, not the pages or components.

## Structure

```
deadsaint-web/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout (Header/Footer wrap every page)
│   ├── page.tsx            # Home
│   ├── shop/
│   │   ├── page.tsx        # Product listing
│   │   └── [slug]/page.tsx # Product detail (dynamic route)
│   ├── cart/page.tsx       # Cart (placeholder until checkout is chosen)
│   ├── about/page.tsx      # Manifesto/about
│   ├── contact/page.tsx
│   └── not-found.tsx
├── components/             # Shared UI (Header, Footer, ProductCard)
├── lib/
│   ├── types.ts            # Product/Cart types
│   ├── products.ts         # Data access layer — THIS is what changes
│   │                          when you pick a backend (Shopify, custom
│   │                          API, etc). Mock data lives here for now.
│   └── format.ts           # Small helpers (price formatting)
├── public/images/          # Static assets
├── styles/globals.css      # Brand tokens (colors) + base styles
├── .env.example            # Documents env vars for whichever backend you pick
└── package.json
```

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Next decisions

- **Backend/commerce**: Shopify (headless via Hydrogen/Storefront API),
  a custom API, or another headless commerce provider. Once decided,
  only `lib/products.ts` (and a new `lib/cart.ts`/checkout module) need
  to change.
- **Real product images**: drop into `public/images/` or point at a CDN
  once one exists, then update `next.config.ts` `images.remotePatterns`.
- **Payments/checkout**: depends on the backend choice above.
