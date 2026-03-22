# Source Notes (Context7 Extraction)

This file lists the external docs pulled via Context7 to build this local skill.

Extraction date: 2026-03-22

## Libraries Used

- `/saadeghi/daisyui`
- `/websites/daisyui`

## Topics Extracted

- Installation and setup
- Tailwind integration patterns
- CSS plugin syntax (`@plugin "daisyui"`)
- Theme configuration (`themes`, `--default`, `--prefersdark`)
- Custom themes via `@plugin "daisyui/theme"`
- `data-theme` usage
- Component examples (drawer, menu, footer, validator form, table)
- Migration notes and breaking-change areas

## Primary Source URLs Returned by Context7

- https://daisyui.com/docs/v5
- https://daisyui.com/docs/themes
- https://daisyui.com/components/menu
- https://daisyui.com/components/footer
- https://daisyui.com/components/table
- https://daisyui.com/components/validator
- https://daisyui.com/pages/easy-css-library
- https://daisyui.com/pages/css-library-for-html
- https://github.com/saadeghi/daisyui/blob/master/packages/docs/src/routes/(routes)/blog/(posts)/install-daisyui-and-tailwindcss-in-nextjs/+page.md

## How to Refresh This Skill

When behavior or syntax appears outdated:

1. Re-run Context7 queries for daisyUI install, themes, and migration docs.
2. Update local references in this skill folder.
3. Keep local guidance self-contained after refresh.
