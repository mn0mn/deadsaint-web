# Deadsaint — Web

Next.js (App Router + TypeScript) storefront for Deadsaint, backed by Medusa.

## Features

- English and Persian storefronts with `/en/*` and `/fa/*` routes
- Persistent language selection with RTL support for Persian
- Localized navigation, homepage, shop, cart, authentication, account, product UI, and footer
- Locale-aware page metadata and product SEO metadata
- Medusa-powered product listing and product detail pages
- Product and variant selection with inventory-aware purchasing
- Cart management and shared customer/cart state across locales
- Customer authentication with login, registration, and account pages
- Customer order history with localized date and currency formatting
- Branded store-unavailable and application error states when storefront services cannot be reached
- Custom 404/not-found experience
- ZarinPal payment integration in the Medusa backend, including payment verification/callback handling

## Structure

```text
deadsaint-web/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout, locale + document direction
│   ├── page.tsx                 # Home
│   ├── shop/
│   │   ├── page.tsx             # Product listing
│   │   └── [handle]/page.tsx    # Product detail (Medusa handle)
│   ├── cart/page.tsx            # Cart
│   ├── account/page.tsx         # Customer account + orders
│   ├── login/page.tsx           # Customer login
│   ├── register/page.tsx        # Customer registration
│   ├── about/page.tsx           # About
│   ├── contact/page.tsx         # Contact
│   ├── error.tsx                # Application error boundary
│   └── not-found.tsx            # Custom 404
├── components/                  # Shared storefront components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── LocaleProvider.tsx
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx
│   └── StoreUnavailable.tsx     # Backend/store availability state
├── lib/
│   ├── i18n.ts                  # Locale configuration + translations
│   ├── medusa.ts                # Medusa SDK client + data fetching
│   └── format.ts                # Formatting helpers
├── medusa_deadsaint/            # Medusa backend
│   └── apps/backend/             # Backend application + custom modules
├── styles/globals.css            # Global + RTL styles
├── middleware.ts                 # Locale routing / locale cookie
├── .env.example                  # Required environment variables
└── package.json
```

The storefront uses Medusa's own data shapes (`HttpTypes.StoreProduct` from
`@medusajs/types`) rather than introducing a separate product domain model.

## Internationalization

The storefront supports two locales:

- `en` — English
- `fa` — Persian

Locale-prefixed routes are handled by middleware while the existing App Router
structure remains shared. The selected locale is persisted in a cookie, and
Persian pages use RTL document direction and locale-aware formatting.

Static storefront copy is currently maintained through the i18n layer. Product
content can additionally use Medusa product metadata for Persian fields such as
`title_fa` and `description_fa`.

## Backend and payments

The storefront communicates with a Medusa backend. The repository also contains
the Medusa backend application and a custom ZarinPal payment provider.

The ZarinPal integration supports payment initiation and verification and
handles the provider callback on the backend. Payment state should always be
validated server-side rather than trusted from the browser.

## Error handling

The storefront includes dedicated UI for unavailable store/backend states as
well as the Next.js application error boundary and custom not-found page.

A running Medusa backend is still required for live catalog, customer, cart,
order, inventory, and payment operations. The unavailable-store UI is a graceful
failure state, not an offline catalog or mock-data fallback.

## Getting started

1. Have a Medusa backend running with its required infrastructure (including
   Postgres and Redis where configured).
2. Copy `.env.example` to `.env.local` and configure the required Medusa
   connection values, publishable API key, and storefront region.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the storefront:

   ```bash
   npm run dev
   ```

The storefront is intended to run alongside the Medusa backend during local
 development.

## Scripts

```bash
npm run dev      # Start Next.js development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run Next.js linting
```

## Current scope

The core storefront, bilingual routing, customer area, cart experience, error
states, and ZarinPal backend integration are in place. Checkout/order flows and
production deployment should still be validated end-to-end against the running
Medusa environment before launch.
