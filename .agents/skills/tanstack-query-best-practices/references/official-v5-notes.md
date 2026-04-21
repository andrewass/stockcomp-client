# TanStack Query v5 Official Notes

Distilled from TanStack Query v5.90.3 documentation retrieved through Context7.

## Important Defaults

- `staleTime` defaults to `0`, so cached query data is stale immediately unless configured otherwise.
- `gcTime` defaults to `5 minutes`, which controls how long inactive queries stay in cache.
- Stale queries refetch automatically in the background when:
  - a new instance mounts
  - the window regains focus
  - the network reconnects

## Polling And Automatic Refetching

- Use `refetchInterval` to poll on a fixed cadence.
- Use `refetchIntervalInBackground` only when polling should continue while the tab is in the background.
- `refetchInterval` is independent of `staleTime`.
- Use per-query `refetchOnMount`, `refetchOnWindowFocus`, and `refetchOnReconnect` overrides when product behavior requires it.

## Initial Data Semantics

- `initialData` is treated as fresh at mount time.
- With the default `staleTime: 0`, a query with `initialData` will still refetch immediately after mount.
- When freshness matters, pass `initialDataUpdatedAt` so TanStack Query can compare the real data timestamp against `staleTime`.
- If the data was actually prefetched for query-cache use, prefer `prefetchQuery` or `fetchQuery` over modeling it as ad hoc initial data.

## Next.js App Router Hydration

- Prefetch on the server with `queryClient.prefetchQuery(...)` or `queryClient.fetchQuery(...)`.
- Pass dehydrated state through `dehydrate(queryClient)`.
- Wrap the client subtree in `HydrationBoundary`.
- Let the hydrated client component call `useQuery` with the same query key.

## Practical Guidance

- Prefer TanStack Query for client-owned server state, polling, cache sharing, invalidation, pagination, and optimistic updates.
- Prefer Server Components for simple server-rendered reads with no client-owned revalidation requirement.
- For frequently-updating widgets, poll the smallest client island that needs live data instead of refreshing the whole route.

## Sources

- `docs/framework/react/guides/important-defaults.md`
- `docs/framework/react/guides/initial-query-data.md`
- `docs/framework/react/guides/advanced-ssr.md`
- `docs/framework/react/reference/useQuery.md`

Primary source set: TanStack Query v5.90.3 via Context7 (`/tanstack/query/v5.90.3`).
