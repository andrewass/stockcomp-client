# AGENTS.md

## Purpose
This file describes the project conventions for AI/code agents working in this repository.

## Tech stack
- Next.js with App Router (`src/app`) - active product
- TypeScript (`strict: true`)
- React 19
- Tailwind CSS v4 + DaisyUI
- Better Auth (Google OAuth)
- TanStack React Query
- better-sqlite3 (local SQLite token/session storage)
- Biome for formatting/linting
- pnpm as package manager

## Product boundaries and migration status
- `src/app/**` is the active product surface and primary place for all new work.
- `src/pages/**` contains legacy MUI/react-router-era code kept for reference/migration.
- Do not add new features in `src/pages/**` unless explicitly requested.
- Legacy modules should be left untouched by default unless the task explicitly asks for migration or legacy fixes.
- Do not introduce new MUI or `@tanstack/react-router` usage.

## Domain-driven boundaries
- Treat `src/domain/**` as the source of truth for domain behavior: business rules, invariants, domain services, and domain types.
- Keep `src/app/**` as delivery/application layer: routing, UI composition, server actions, and framework-specific orchestration.
- Do not put business rules in `page.tsx`, `layout.tsx`, client components, or route handlers; call domain/application functions instead.
- Enforce dependency direction: `app -> domain` is allowed, `domain -> app` is not. Domain code must not import Next.js/React/browser APIs.
- Keep transport mapping at the edges: map API/resource-server DTOs to domain shapes in adapter modules (`src/app/**/api`, `src/*/api`, or feature adapter files), not inside core domain logic.
- Server actions should orchestrate auth/session/API calls and delegate business decisions to domain/application modules.

## Domain extraction template (incremental)
- Use incremental migration by domain entity: extract one domain at a time, keep behavior unchanged, then move to the next entity.
- First extraction target: `contests` as a shared domain across `(admin)` and `(main)` experiences.
- For shared backend transport code, prefer `src/app/<domain>/api/*` (for example `src/app/contests/api/*`) as the adapter boundary.
- Keep domain-owned logic/types in `src/domain/<domain>/**`; app adapters map transport DTOs to/from domain shapes.
- Feature UIs in both admin and main must depend on the same domain contracts, not duplicate per-route-group models.
- During migration, temporary compatibility wrappers are acceptable, but remove them once all imports use the stable target paths.

## Core rules
- Use `pnpm` for all package and script commands.
- Keep code TypeScript-first and type-safe; avoid `any` unless unavoidable.
- Follow existing import style with `@/...` aliases and explicit `.ts`/`.tsx` file extensions in internal imports.
- Do not import through route-group paths such as `@/(admin)/...`; import feature modules via stable aliases like `@/admin/...`, `@/auth/...`, `@/components/...`.
- For component props types, use an `interface` named `Props`.
- Prefer server components by default; add `"use client"` only when hooks/browser APIs are required.
- Put server-only mutations/loaders in server actions (`"use server"`) when appropriate.
- Use Next.js routing/navigation primitives for new code (`next/link`, `next/navigation`), not legacy router APIs.
- Commit messages must start with an uppercase letter and must not use conventional-commit prefixes like `feat:`, `fix:`, or `chore:`.

## Skills
- Skills under `.agents/skills/**` should be repo-agnostic by default so they can be reused across projects.
- Do not hardcode repository names, repo-specific paths, or project-only assumptions in reusable skills.
- If project-specific behavior is needed, keep it clearly marked as optional project overlay guidance.

## Skill update guardrails
- Treat every skill listed in `skills-lock.json` as read-only.
- When asked to update skills, only modify skills not listed in `skills-lock.json`.
- If a requested skill is listed in `skills-lock.json`, do not edit it unless the user explicitly says `override lock for <skill-name>`.
- Do not modify `skills-lock.json` unless explicitly requested.
- If lock status is unclear, stop and ask before editing.

## Skill routing
- If the user says `use relevant skills`, automatically select and apply all matching skills from `.agents/skills/**`.
- If the user names a skill explicitly (for example `$daisyui-best-practices`), always include it.
- Activate `better-auth-best-practices` for Better Auth setup/config, OAuth, sessions, auth client/server wiring, and auth route handler work.
- Activate `daisyui-best-practices` for daisyUI components, Tailwind+daisyUI setup, theming, modal/forms/layout UI work, and daisyUI migration/troubleshooting.
- Activate `frontend-design` for visual redesign, page/component styling upgrades, landing pages, dashboards, and requests emphasizing look/feel quality.
- Activate `next-best-practices` for App Router architecture, RSC boundaries, route handlers, metadata, async API patterns, navigation, and Next.js framework conventions.
- Activate `vercel-react-best-practices` for performance-focused React/Next.js work: waterfalls, re-renders, bundle size, client/server fetch strategy, and rendering optimization.
- Activate `web-design-guidelines` for UI/UX/accessibility review and compliance checks, including prompts like "review my UI", "audit design", "review UX", or "check best practices".
- For mixed tasks, combine all relevant skills rather than choosing only one.
- Use this priority when guidance conflicts: correctness/security (`better-auth-best-practices`, `next-best-practices`) before performance (`vercel-react-best-practices`) before UI/design (`daisyui-best-practices`, `frontend-design`, `web-design-guidelines`).

## Server action placement
- Place feature actions in stable feature modules (for example `src/app/admin/<feature>/actions.ts`) rather than inside route-group paths.
- Route `page.tsx` files should call feature actions; avoid defining endpoint URLs/config inline in page files.
- In files with `"use server"`, all exported functions must be `async` (Next.js Server Actions requirement).
- Keep server actions focused on server-side orchestration and auth-aware API calls, not UI logic.
- Use explicit `"use server"` and keep action inputs/outputs strongly typed.
- Avoid action re-export/shim files unless there is a concrete migration need.

## API access and auth
- Use the exported functions from [`src/app/api/apiWrapper.ts`](src/app/api/apiWrapper.ts) for resource-server API calls: `apiGet`, `apiPost`, `apiPut`, `apiDelete`.
- Do not bypass `apiWrapper` for resource-server calls unless there is a clear reason, since it centralizes token exchange/caching behavior.
- Better Auth is configured in [`src/lib/auth.ts`](src/lib/auth.ts) (server) and [`src/lib/auth-client.ts`](src/lib/auth-client.ts) (client).
- Auth route handler is in [`src/app/api/auth/[...all]/route.ts`](src/app/api/auth/[...all]/route.ts).
- Prefer `apiWrapper` from server actions, route handlers, and server components when calling the resource server.
- Keep Better Auth secure defaults intact: require `BETTER_AUTH_SECRET`, keep secure cookies in production, and do not weaken origin/CSRF protections.
- Avoid auth-flow/config changes unless the task explicitly requests them.

## Styling and UI
- Use Tailwind utility classes and DaisyUI components/patterns.
- Global styles/plugins are configured in [`src/app/globals.css`](src/app/globals.css) and [`postcss.config.mjs`](postcss.config.mjs).
- Keep styling consistent with existing pages/components before introducing new design patterns.
- Do not add new MUI-based UI in active product code.

## Data fetching and state
- React Query provider is set up in [`src/app/providers/AppProviders.tsx`](src/app/providers/AppProviders.tsx).
- Use React Query for client-side async state; keep server-side data loading in server components/actions where possible.
- Reuse existing domain/api modules under `src/domain` and `src/*/api` before adding new API clients.
- Prefer parallel data fetching (`Promise.all`) for independent requests and avoid sequential await waterfalls.
- Keep heavy/expensive work on the server where possible and minimize client component payloads.
- Use dynamic imports selectively for heavy or rarely-needed client-only widgets (for example charts/editors/devtools), not as a blanket rule.

## Route and layout structure
- App Router route groups are in `src/app/(main)`, `src/app/(auth)`, and `src/app/(admin)`.
- Keep route-group folders focused on routing entry files (`page.tsx`, `layout.tsx`, and other Next file-convention files when needed).
- Do not place shared feature components/actions under route-group paths; keep them in non-group feature folders like `src/app/admin/**`, `src/app/auth/**`, `src/app/components/**`.
- Shared layout and metadata are in [`src/app/layout.tsx`](src/app/layout.tsx).
- Route guarding/proxy logic is in [`src/proxy.ts`](src/proxy.ts).

## Environment variables used by this app
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `RESOURCE_SERVER_BASE_URL`
- `RESOURCE_SERVER_AUDIENCE`
- `TOKEN_EXCHANGE_URL`

## Quality checks
- Biome is used in CI (`biome ci .`).
- Default local agent behavior: do not run `biome`, tests, or builds unless explicitly requested by the user.
- If verification is skipped due to this rule, state that clearly in the final update.

## Notes for safe changes
- Prefer incremental edits and keep behavior consistent unless a change request says otherwise.
- Do not log tokens, secrets, or sensitive auth/session data.
- For token expiry comparisons, prefer UTC-safe handling and explicit buffer/skew logic.
