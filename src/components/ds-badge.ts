import { BaseElement } from "./base-element";
import { sharedStyles } from "./shared-styles";

const styles = `
  ${sharedStyles}

  :host {
    display: inline-flex;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
    min-height: 1.75rem;
    padding: 0 var(--ds-space-3);
    border-radius: var(--ds-radius-pill);
    font-size: var(--ds-font-size-100);
    font-weight: var(--ds-font-weight-semibold);
    letter-spacing: 0.02em;
    border: 1px solid transparent;
  }

  span[data-tone="neutral"] {
    background: var(--_surface-subtle);
    color: var(--_text-secondary);
    border-color: var(--_border-color);
  }

  span[data-tone="accent"] {
    background: color-mix(in srgb, var(--_accent) 12%, transparent);
    color: var(--_accent);
    border-color: color-mix(in srgb, var(--_accent) 22%, transparent);
  }

  span[data-tone="success"] {
    background: color-mix(in srgb, var(--_success) 14%, transparent);
    color: var(--_success);
    border-color: color-mix(in srgb, var(--_success) 20%, transparent);
  }

  span[data-tone="warning"] {
    background: color-mix(in srgb, var(--_warning) 12%, transparent);
    color: var(--_warning);
    border-color: color-mix(in srgb, var(--_warning) 18%, transparent);
  }
`;

export class DsBadge extends BaseElement {
  static observedAttributes = ["tone"];

  protected render() {
    const tone = this.getAttribute("tone") ?? "neutral";

    this.root.innerHTML = `
      <style>${styles}</style>
      <span data-tone="${tone}">
        <slot></slot>
      </span>
    `;
  }
}
