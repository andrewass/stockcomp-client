# Setup and Config

This file covers practical setup for Tailwind + daisyUI in common app stacks.

## Install

Use `pnpm` (or your app's package manager convention):

```bash
pnpm add -D tailwindcss @tailwindcss/postcss daisyui
```

## Tailwind v4 + daisyUI v5 (recommended default)

PostCSS config example:

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;
```

Global stylesheet entry example (`globals.css` / `index.css` / `app.css`):

```css
@import "tailwindcss";
@plugin "daisyui";
```

Theme preset example:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

Component inclusion example:

```css
@plugin "daisyui" {
  include: button, input, select, card, table, modal, alert, badge;
}
```

## Legacy-Compatible Pattern (older stacks)

Use when project versions require `tailwind.config.*` plugin registration:

```ts
import daisyui from 'daisyui'

export default {
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
    prefix: "",
    root: ":root",
    include: ["button", "card", "modal"],
    exclude: ["carousel"],
  },
}
```

## Decision Rules

- If project already uses v4/v5 CSS plugin style and works, keep it.
- If project is older and stable, do not force migration without user request.
- Prefer minimal diffs over wholesale rewrites.

## Quick Verification

- `daisyui` exists in dependencies/devDependencies.
- Tailwind PostCSS plugin is present.
- Global stylesheet has Tailwind import and daisyUI plugin.
- Global stylesheet is imported by the app entry/layout.
- A sample component with `btn` or `card` renders expected styles.
