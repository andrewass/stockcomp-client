# AGENTS.md

## Purpose
This file describes the project conventions for AI/code agents working in this repository.

## Tech stack
- Next.js with App Router (`src/app`)
- TypeScript (`strict: true`)
- React 19
- Tailwind CSS v4 + DaisyUI
- Better Auth (Google OAuth)
- TanStack React Query
- better-sqlite3 (local SQLite token/session storage)
- Biome for formatting/linting
- pnpm as package manager

## Core rules
- Use `pnpm` for all package and script commands.
- Keep code TypeScript-first and type-safe; avoid `any` unless unavoidable.
- Follow existing import style with `@/...` aliases and explicit `.ts`/`.tsx` file extensions in internal imports.
- For component props types, use an `interface` named `Props`.
- Prefer server components by default; add `"use client"` only when hooks/browser APIs are required.
- Put server-only mutations/loaders in server actions (`"use server"`) when appropriate.

## API access and auth
- Use the exported functions from [`src/app/api/apiWrapper.ts`](src/app/api/apiWrapper.ts) for resource-server API calls: `apiGet`, `apiPost`, `apiPut`, `apiDelete`.
- Do not bypass `apiWrapper` for resource-server calls unless there is a clear reason, since it centralizes token exchange/caching behavior.
- Better Auth is configured in [`src/lib/auth.ts`](src/lib/auth.ts) (server) and [`src/lib/auth-client.ts`](src/lib/auth-client.ts) (client).
- Auth route handler is in [`src/app/api/auth/[...all]/route.ts`](src/app/api/auth/[...all]/route.ts).

## Styling and UI
- Use Tailwind utility classes and DaisyUI components/patterns.
- Global styles/plugins are configured in [`src/app/globals.css`](src/app/globals.css) and [`postcss.config.mjs`](postcss.config.mjs).
- Keep styling consistent with existing pages/components before introducing new design patterns.

## Data fetching and state
- React Query provider is set up in [`src/app/providers/AppProviders.tsx`](src/app/providers/AppProviders.tsx).
- Use React Query for client-side async state; keep server-side data loading in server components/actions where possible.
- Reuse existing domain/api modules under `src/domain` and `src/*/api` before adding new API clients.

## Route and layout structure
- App Router route groups are in `src/app/(main)`, `src/app/(auth)`, and `src/app/(admin)`.
- Shared layout and metadata are in [`src/app/layout.tsx`](src/app/layout.tsx).
- Route guarding/proxy logic is in [`src/proxy.ts`](src/proxy.ts).

## Environment variables used by this app
- `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `RESOURCE_SERVER_BASE_URL`
- `RESOURCE_SERVER_AUDIENCE`
- `TOKEN_EXCHANGE_URL`

## Quality checks
- Biome is used in CI (`biome ci .`).
- Before finishing meaningful changes, run `pnpm exec biome ci .` and `pnpm exec tsc --noEmit`.

## Notes for safe changes
- Prefer incremental edits and keep behavior consistent unless a change request says otherwise.
- Do not log tokens, secrets, or sensitive auth/session data.
- For token expiry comparisons, prefer UTC-safe handling and explicit buffer/skew logic.
