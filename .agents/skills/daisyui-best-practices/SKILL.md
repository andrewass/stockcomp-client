---
name: daisyui-best-practices
description: Build and maintain daisyUI interfaces across Tailwind-based apps with standalone setup, component, theme, migration, and troubleshooting guidance.
---

# daisyUI Best Practices

Use this skill when requests involve daisyUI setup, component work, theming, migration, or UI refactoring.

This skill is self-contained. Start with the local references in `references/`.

## Reference Index

- [references/setup-and-config.md](./references/setup-and-config.md)
- [references/components-and-patterns.md](./references/components-and-patterns.md)
- [references/theming.md](./references/theming.md)
- [references/migration-and-troubleshooting.md](./references/migration-and-troubleshooting.md)
- [references/doc-sources.md](./references/doc-sources.md)

## Execution Workflow

1. Inspect integration points
- `package.json`
- PostCSS/build config
- global stylesheet entry point (`globals.css`, `index.css`, `app.css`, etc.)
- framework entry/layout files where styles are imported

2. Pick setup pattern from installed versions
- Tailwind v4 + daisyUI v5: prefer CSS plugin setup (`@plugin "daisyui"` in global CSS).
- Older stacks: use compatible `tailwind.config.*` plugin style unless migrating intentionally.

3. Build UI with semantic daisyUI classes first
- Prefer classes like `btn`, `card`, `input`, `table`, `menu`, `tabs`, `modal`, `alert`, `badge`, `stats`.
- Add Tailwind utilities mainly for layout and spacing.

4. Keep architecture aligned with the app
- Keep interactivity in the framework's client/runtime component boundary.
- Keep data-loading and side effects in the appropriate server/API layer for that stack.

5. Apply theme strategy centrally
- Use `data-theme` at app/root/layout level.
- Reuse semantic theme tokens (`bg-base-*`, `text-base-content`, status/brand classes).

6. Final quality pass
- Accessibility basics intact (labels, semantic buttons/links, focus visibility).
- No unnecessary cross-library styling conflicts.
- Do not run tests/lint/build unless user asks.

## Optional Freshness Check

If user asks for latest changes, refresh from docs before editing. Otherwise, use this skill's local references as the source of truth.
