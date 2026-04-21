---
name: tanstack-query-best-practices
description: Use TanStack Query v5 for React and Next.js server-state work such as useQuery, polling, refetchInterval, hydration, prefetching, cache invalidation, pagination, optimistic updates, and dashboard or market-data refresh flows. Trigger this skill when users mention TanStack Query, React Query, query keys, staleTime, initialData, HydrationBoundary, or when deciding between Server Components and client-side query caching.
---

# TanStack Query Best Practices

Use TanStack Query for client-owned server state that benefits from cache sharing, background refetching, invalidation, pagination, or optimistic updates.

Prefer Server Components for reads that render once on the server and do not need client-side revalidation or interaction-aware freshness.

Read [references/official-v5-notes.md](./references/official-v5-notes.md) when the task depends on exact v5 behavior around staleness, polling, hydration, or initial data semantics.

## Decision Guide

Choose TanStack Query when the UI needs one or more of these:

- Polling or periodic refresh
- Shared cached data across multiple client components
- Background revalidation after mutations
- Pagination, infinite queries, or optimistic updates
- Manual invalidation and refetch control

Choose plain Server Components when the page can fetch on the server and render static or request-scoped data without client-owned freshness rules.

Do not add TanStack Query just to replace a simple server-only read in Next.js App Router.

## Core Practices

Use stable, narrow query keys that match the invalidation boundary. Include only the parameters that change the result.

Prefer colocated query helpers or feature hooks that hide `queryKey`, `queryFn`, and option defaults for a feature.

Treat `staleTime` and `refetchInterval` as separate controls:

- Use `staleTime` to define how long cached data is considered fresh.
- Use `refetchInterval` to force periodic synchronization regardless of staleness.

Use `refetchInterval` for polling instead of manual `setInterval` plus `refetch`.

Override `refetchOnWindowFocus`, `refetchOnReconnect`, and `refetchOnMount` intentionally. Do not disable them by habit across the entire app unless the product semantics clearly require it.

Use `enabled` to gate dependent or conditional queries instead of branching inside `queryFn`.

Use `placeholderData` to preserve UX continuity during key changes such as pagination. Do not treat it as canonical fetched data.

Use `initialData` only when you already have real data at render time and understand its freshness semantics. When the timestamp matters, pair it with `initialDataUpdatedAt`.

Prefer prefetching with `prefetchQuery` or `fetchQuery` plus hydration when the first paint should already contain the data. This avoids treating prefetched data like freshly-created local initial data.

Keep polling scoped to the smallest practical client island. Prefer polling a grid or widget over refreshing an entire route tree every few seconds.

Invalidate by feature boundary after mutations. Favor predictable `queryKey` design over broad cache resets.

## Polling Pattern

For frequently-updating grids, dashboards, or market data:

- Keep the page mostly server-rendered.
- Move the live section into a small client component.
- Use `useQuery` with a clear `queryKey`, a focused `queryFn`, and `refetchInterval`.
- Set `refetchIntervalInBackground` only if background-tab freshness is a real product requirement.
- Choose `staleTime` deliberately. A short `refetchInterval` does not automatically make the data fresh between polls.

Default polling checklist:

- Avoid polling the whole page if only one widget changes.
- Avoid query keys that cause unrelated rows or panels to refetch.
- Avoid mixing manual timers with TanStack Query timers.
- Prefer hydration or server-provided initial state so the widget renders immediately on first load.

## Next.js App Router Patterns

Place `QueryClientProvider` in a client provider near the app root.

When first render should already have query data, prefetch in a Server Component, dehydrate the client, and wrap the client subtree in `HydrationBoundary`.

Hydrate into client components that call `useQuery`. Let those components own ongoing refetching, invalidation, and optimistic updates after hydration.

Prefer server prefetch plus hydration when the same data should be visible immediately and stay query-managed on the client.

Prefer plain Server Components when the data does not need client-side query features after render.

Avoid importing server-only fetch helpers directly into client query functions. If client-side querying needs authenticated or protected data, add an appropriate route handler or hydrate from a server-prefetched query instead.

## Project Overlay

For this repository:

- `QueryClientProvider` already lives in [src/app/providers/AppProviders.tsx](../../../../src/app/providers/AppProviders.tsx).
- `src/app/api/apiWrapper.ts` is server-only and is the preferred boundary for authenticated resource-server reads on the server.
- When a client component needs TanStack Query for authenticated resource-server data, prefer server prefetch plus hydration, or query through a route handler designed for client access.
- Keep business rules in `src/domain/**`, not inside query hooks, client components, or route entry files.

## Review Checklist

When reviewing TanStack Query code, check for:

- Query keys that are broader than the actual data dependency
- Global defaults that disable useful refetch behavior without a product reason
- Polling on large route trees instead of focused client islands
- `initialData` used without a freshness timestamp when freshness matters
- Client components importing server-only code
- Query usage where a plain Server Component would be simpler
