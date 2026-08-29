# Deadsaint — Web

Next.js (App Router + TypeScript) storefront for Deadsaint, backed by Medusa.

## Structure

```
deadsaint-web/
├── app/                    # App Router pages
│   ├── layout.tsx
│   ├── page.tsx             # Home
│   ├── shop/
│   │   ├── page.tsx          # Product listing
│   │   └── [handle]/page.tsx # Product detail (Medusa's handle, not "slug")
│   ├── cart/page.tsx         # Placeholder until checkout is wired up
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/              # Header, Footer, ProductCard
├── lib/
│   ├── medusa.ts            # Medusa SDK client + fetch functions
│   └── format.ts            # Price formatting helpers
├── styles/globals.css
├── .env.example             # Required Medusa connection env vars
└── package.json
```

No custom domain types — pages and components work directly with Medusa's
own data shapes (`HttpTypes.StoreProduct` from `@medusajs/types`). There's
only one backend, so there's nothing to abstract away.

## Getting started

1. Have a Medusa backend running (Postgres + Redis + `medusa` server).
2. Copy `.env.example` to `.env.local` and fill in your backend URL,
   publishable API key, and a region ID from the Medusa Admin.
3. `npm install`
4. `npm run dev`

The app has no fallback data — without a running, reachable Medusa
backend, product pages will fail to load.
