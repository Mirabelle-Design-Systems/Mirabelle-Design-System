export const sharedStyles = `
  :host {
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

  * {
    box-sizing: border-box;
  }
`;
