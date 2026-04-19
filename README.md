# Custom Design System Starter - WORK IN PROGRESS (April 2026)

A lightweight design system starter built on native Web Components with a token-first theme layer.
The goal is to keep the core framework-agnostic so React can sit on top later as a wrapper package,
not as the source of truth.

## What is included

- Design tokens for typography, spacing, radius, shadow, and color
- Semantic light and dark theme variables
- Simple starter components:
  - `ds-button`
  - `ds-card`
  - `ds-input`
  - `ds-badge`
- A demo page showing how the tokens and components work together

### Roadmap

- `ds-dialog` and `ds-toast` are shown on the demo page as static CSS previews only.
  They are not yet implemented as components.

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

Then use them in HTML:

```html
<ds-card elevated>
  <span slot="eyebrow">Status</span>
  <span slot="title">Design system ready</span>
  <p>Web Components stay reusable across frameworks.</p>
  <div slot="footer">
    <ds-badge tone="success">Light + dark mode</ds-badge>
  </div>
</ds-card>
```

## React as the second layer

The recommended direction is:

- Keep `src/index.ts` as the native design-system entrypoint
- Add a React wrapper package later that imports the native entrypoint and forwards props/events
- Let tokens and CSS variables remain shared between both layers

