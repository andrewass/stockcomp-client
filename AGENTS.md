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

## Core rules
- Use `pnpm` for all package and script commands.
- Keep code TypeScript-first and type-safe; avoid `any` unless unavoidable.
- Follow existing import style with `@/...` aliases and explicit `.ts`/`.tsx` file extensions in internal imports.
- For component props types, use an `interface` named `Props`.
- Prefer server components by default; add `"use client"` only when hooks/browser APIs are required.
- Put server-only mutations/loaders in server actions (`"use server"`) when appropriate.
- Use Next.js routing/navigation primitives for new code (`next/link`, `next/navigation`), not legacy router APIs.
- Commit messages must start with an uppercase letter and must not use conventional-commit prefixes like `feat:`, `fix:`, or `chore:`.

## Skills
- Skills under `.agents/skills/**` should be repo-agnostic by default so they can be reused across projects.
- Do not hardcode repository names, repo-specific paths, or project-only assumptions in reusable skills.
- If project-specific behavior is needed, keep it clearly marked as optional project overlay guidance.

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
- Co-locate route-specific server actions in an `actions.ts` file inside the relevant `src/app/**` route segment.
- For shared feature actions, place them in a feature-scoped module under `src/app/<feature>/actions.ts`.
- Keep server actions focused on server-side orchestration and auth-aware API calls, not UI logic.
- Use explicit `"use server"` and keep action inputs/outputs strongly typed.

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
