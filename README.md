# Mirabelle DS — WORK IN PROGRESS (April 2026)

Mirabelle DS is a design system starter built with native Web Components, shared CSS, and a
token-first light/dark theme layer. The core stays framework-agnostic; an optional React layer in
`src/react/` wraps the same custom elements for use in React apps.

**North star:** design tokens describe what the system *means*; custom elements are what users
(and assistive tech) *interact with*; Storybook documents component states; React is a thin
adapter, not a second UI implementation.

## Documentation

- **Storybook:** `npm run storybook` — component states under **Mirabelle DS/** in the sidebar.
- **[CHANGELOG.md](CHANGELOG.md)** — breaking changes and releases.
- **Pull requests** — checklist in [`.github/pull_request_template.md`](.github/pull_request_template.md) (accessibility, keyboard, tokens).

A local `docs/` folder is **gitignored**: use it for private notes or contracts on your machine; it is not part of the shared repository.

## What is included

- Design tokens for color, typography, spacing, radius, shadow, motion (durations and easings),
  layout-oriented primitives (container widths, breakpoints, z-index), and more
- Semantic light and dark theme variables
- Web Component implementations (**Lit** `LitElement`, shadow DOM, shared **`CSSStyleSheet`** for token bridge + per-component `css` blocks):
  - `mirabelle-ds-button`, `mirabelle-ds-card`, `mirabelle-ds-input`, `mirabelle-ds-badge`, `mirabelle-ds-dialog`, `mirabelle-ds-toast`
- Optional thin React wrappers around those tags (`src/react/`)
- A Vite demo page (`src/main.ts`) and **Storybook** stories grouped under **Mirabelle DS/**

```bash
npm run storybook
```

## Project structure

```txt
src/
  components/
  react/
  styles/
  index.ts
  main.ts
```

## Token model

The system uses two layers:

1. Primitive tokens in [`src/styles/tokens.css`](src/styles/tokens.css)
2. Semantic theme tokens in [`src/styles/themes.css`](src/styles/themes.css)

Components only consume semantic tokens like `--ds-color-bg-elevated` or
`--ds-color-text-secondary`. That means you can refine the palette later without rewriting every
component.

## Getting started

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

## Using the components

Register the components once:

```ts
import { defineDesignSystem } from "./src";

defineDesignSystem();
```

`defineDesignSystem()` walks the internal registry and calls `customElements.define` for each
`mirabelle-ds-*` tag exactly once per name, so your bundle can import side-effect CSS and then register
tags before any markup uses them. The Vite demo (`src/main.ts`) calls it before injecting the
showcase, which uses live components for every primitive including dialog and toast.

Then use them in HTML:

```html
<mirabelle-ds-card elevated>
  <span slot="eyebrow">Status</span>
  <span slot="title">Design system ready</span>
  <p>Web Components stay reusable across frameworks.</p>
  <div slot="footer">
    <mirabelle-ds-badge tone="success">Light + dark mode</mirabelle-ds-badge>
  </div>
</mirabelle-ds-card>
```

## React as the second layer

The recommended direction is:

- Keep `src/index.ts` as the native design-system entrypoint
- Add a React wrapper package later that imports the native entrypoint and forwards props/events
- Let tokens and CSS variables remain shared between both layers

