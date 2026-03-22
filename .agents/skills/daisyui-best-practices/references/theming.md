# Theming

Use this file for consistent multi-theme behavior.

## Apply Theme Globally

Set theme at the root element:

```html
<html data-theme="light">
```

Common built-in values include `light`, `dark`, and other named themes.

## Baseline CSS Config

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

This sets:
- default theme: `light`
- preferred dark theme: `dark`

## Custom Theme

```css
@import "tailwindcss";
@plugin "daisyui";

@plugin "daisyui/theme" {
  name: "mytheme";
  default: true;
  prefersdark: false;
  color-scheme: light;

  --color-base-100: oklch(98% 0.02 240);
  --color-base-content: oklch(20% 0.05 240);
  --color-primary: oklch(55% 0.3 240);
  --color-primary-content: oklch(98% 0.01 240);
  --color-secondary: oklch(70% 0.25 200);
  --color-accent: oklch(65% 0.25 160);
  --color-neutral: oklch(50% 0.05 240);
  --color-success: oklch(65% 0.25 140);
  --color-warning: oklch(80% 0.25 80);
  --color-error: oklch(65% 0.3 30);

  --radius-selector: 1rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  --border: 1px;
}
```

## Tailwind `dark:` Interop

If a specific daisyUI theme should drive `dark:` classes:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: winter --default, night --prefersdark;
}

@custom-variant dark (&:where([data-theme=night], [data-theme=night] *));
```

Then Tailwind classes like `dark:p-20` follow the chosen daisyUI dark theme.

## Theme Safety Rules

- Keep `data-theme` control centralized.
- Prefer semantic tokens (`bg-base-*`, `text-base-content`) over hardcoded colors.
- Validate readability in both default and dark-preferred themes.
