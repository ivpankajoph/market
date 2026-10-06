# Chinaindiasourcing

A standard Next.js application for the Chinaindiasourcing website.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to the shared
SellersLogin backend URL. The value must include `/api/v1`.

## Checks

```bash
npm run lint
npm run build
```

## URL registry

[`url.ts`](./url.ts) is the central registry for route builders, relative paths,
and absolute website URLs. It includes homepage sections, market service pages,
state pages, city pages, and regional service pages.

Deployment is intentionally not configured in this repository.
