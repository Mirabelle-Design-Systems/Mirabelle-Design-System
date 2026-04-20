## Summary

<!-- What changed and why (1–3 sentences). -->

## Type of change

- [ ] Bug fix
- [ ] New component or feature
- [ ] Token / theme change
- [ ] Documentation only
- [ ] Chore / tooling

## Accessibility and keyboard (required for UI, tokens, or docs that affect UX)

Check what applies. If something is out of scope, say so in a comment.

### Keyboard and focus

- [ ] All new or changed interactive UI is reachable and operable with **keyboard only** (Tab / Shift+Tab, Enter / Space where appropriate, Escape for dismissible overlays if applicable).
- [ ] **Focus order** is logical; no keyboard traps except intentional modal traps using native dialog semantics.
- [ ] **Focus visible** on custom controls (focus ring or equivalent matches system tokens).
- [ ] **Dialogs:** opening restores expectation; **closing returns focus** to a sensible element (native `dialog` / component behavior).

### Screen readers and semantics

- [ ] Images or decorative icons that should be ignored use **`aria-hidden`** (or equivalent); meaningful controls have **accessible names** (`label`, `aria-label`, or visible text).
- [ ] **Forms:** labels associated with inputs; **errors** exposed (`aria-invalid`, described-by, or live region as implemented).
- [ ] **Toasts / alerts:** live region **role** / **aria-live** matches severity (polite vs assertive) per implementation.
- [ ] **Motion:** meaningful animation respects **`prefers-reduced-motion`** where this PR touches motion.

### Visual and Storybook

- [ ] **Storybook:** new or changed stories run under **Mirabelle DS/** with states that match real usage (default, error, disabled, open, etc. as relevant).
- [ ] **Storybook a11y** (or equivalent) checked for this PR; violations either fixed or **documented** with follow-up issue.

### Manual spot-check (high-risk areas only)

If this PR touches **dialog, toast, forms, or focus management**, confirm with a quick manual pass:

- [ ] VoiceOver (macOS) or NVDA/Windows: **one** happy path + dismiss path
- [ ] Or note: “Not tested — reason: …”

## Tokens and naming

- [ ] Components use **semantic** tokens (`--ds-color-*`, etc.), not raw palette, unless the change is explicitly in the token layer.
- [ ] Any change to **`mirabelle-ds-*` tags** or **custom event names** is called out as **breaking** and noted in **`CHANGELOG.md`**.

## Checklist

- [ ] `npm run build` passes
- [ ] `CHANGELOG.md` updated if user-facing or breaking
