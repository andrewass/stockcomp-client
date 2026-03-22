# Migration and Troubleshooting

Use this guide for upgrades and broken styling issues.

## Major v5 Migration Notes

When migrating from older setups, account for these changes:

- Configuration can be moved to CSS via `@plugin "daisyui"`.
- Theme selection uses `themes: ...` with flags like `--default` and `--prefersdark`.
- `darkTheme` is replaced by the `--prefersdark` theme flag.
- `themeRoot` was renamed to `root`.
- Older toggles like `styled`, `base`, and `utils` were removed in favor of component-level include/exclude strategies.

## Migration Procedure

1. Inspect current state
- versions in `package.json`
- PostCSS/build config
- global stylesheet
- any `tailwind.config.*`

2. Pick target
- Keep existing style if stable and migration was not requested.
- If migrating to v5 pattern, do it incrementally.

3. Apply changes
- Enable `@tailwindcss/postcss`.
- Ensure `@import "tailwindcss";` exists.
- Add `@plugin "daisyui";`.
- Move/trim legacy config after replacement is working.

## Troubleshooting Matrix

## daisyUI classes not styled

- Confirm `daisyui` is installed.
- Confirm `@plugin "daisyui";` is in the global stylesheet.
- Confirm the global stylesheet is imported by the app entry/layout.

## Tailwind utilities missing

- Confirm `@import "tailwindcss";` exists.
- Confirm `@tailwindcss/postcss` is active.
- Check for CSS pipeline overrides.

## Theme switch does nothing

- Ensure `data-theme` is applied on root or a containing scope.
- Ensure theme names are valid and configured.
- Avoid fixed color overrides that mask theme tokens.

## Mixed visuals across pages

- Remove duplicated style wrappers.
- Avoid mixing multiple UI systems for the same component role.
- Standardize on daisyUI semantic classes for shared primitives.

## Refactor Safety Checklist

- Preserve semantics and keyboard behavior.
- Keep edits focused and incremental.
- Minimize cross-library styling conflicts.
