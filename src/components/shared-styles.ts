/**
 * I inject this CSS fragment into every component’s shadow stylesheet.
 *
 * The `--ds-*` variables live on the document (tokens + themes); inside shadow trees they still
 * resolve from `:root`. I map them here to shorter `--_*` aliases on `:host` so each component’s
 * styles read consistently (“my surface”, “my border”) without repeating long token names everywhere.
 *
 * I also set default `color` and `font-family` on `:host` so slotted light-DOM content inherits a
 * sensible baseline when I do not wrap it in an inner element.
 */
/** String source for `sharedStyleSheet` in `shared-style-sheet.ts` (parsed once, adopted by all components). */
export const sharedStyles = `
  :host {
    /* I bridge global semantic tokens into “local” names for shadow-only CSS. */
    --_font-family: var(--ds-font-family-sans);
    --_font-size: var(--ds-font-size-300);
    --_radius: var(--ds-radius-md);
    --_border-color: var(--ds-color-border-subtle);
    --_surface: var(--ds-color-bg-elevated);
    --_surface-subtle: var(--ds-color-bg-inset);
    --_text-primary: var(--ds-color-text-primary);
    --_text-secondary: var(--ds-color-text-secondary);
    --_accent: var(--ds-color-accent);
    --_accent-hover: var(--ds-color-accent-hover);
    --_accent-contrast: var(--ds-color-accent-contrast);
    --_success: var(--ds-color-success);
    --_warning: var(--ds-color-warning);
    --_danger: var(--ds-color-danger);
    color: var(--_text-primary);
    font-family: var(--_font-family);
  }

  /* I keep box sizing predictable inside the shadow tree regardless of page resets. */
  * {
    box-sizing: border-box;
  }
`;
