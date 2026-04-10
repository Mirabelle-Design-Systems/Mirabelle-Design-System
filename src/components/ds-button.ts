import { BaseElement } from "./base-element";
import { sharedStyles } from "./shared-styles";

const styles = `
  ${sharedStyles}

  :host {
    display: inline-block;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ds-space-2);
    width: 100%;
    min-height: 2.75rem;
    padding: 0 var(--ds-space-4);
    border: 1px solid transparent;
    border-radius: var(--ds-radius-pill);
    font-size: var(--ds-font-size-300);
    font-weight: var(--ds-font-weight-semibold);
    line-height: 1;
    cursor: pointer;
    transition: transform 140ms ease, background-color 140ms ease, border-color 140ms ease,
      color 140ms ease, box-shadow 140ms ease;
  }

  button:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--_accent) 60%, white);
    outline-offset: 2px;
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0);
  }

  button[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  button[data-variant="primary"] {
    background: var(--_text-primary);
    color: var(--ds-color-text-inverse);
    box-shadow: var(--ds-shadow-sm);
  }

  button[data-variant="primary"]:hover {
    background: color-mix(in srgb, var(--_text-primary) 88%, white);
  }

  button[data-variant="secondary"] {
    background: var(--_surface);
    color: var(--_text-primary);
    border-color: var(--_border-color);
  }

  button[data-variant="secondary"]:hover {
    background: var(--_surface-subtle);
  }

  button[data-variant="ghost"] {
    background: transparent;
    color: var(--_accent);
  }

  button[data-size="sm"] {
    min-height: 2.375rem;
    padding: 0 var(--ds-space-3);
    font-size: var(--ds-font-size-200);
  }

  button[data-size="lg"] {
    min-height: 3.25rem;
    padding: 0 var(--ds-space-5);
    font-size: var(--ds-font-size-400);
  }
`;

export class DsButton extends BaseElement {
  static observedAttributes = ["variant", "size", "disabled"];

  protected render() {
    const variant = this.getAttribute("variant") ?? "primary";
    const size = this.getAttribute("size") ?? "md";
    const disabled = this.hasAttribute("disabled");

    this.root.innerHTML = `
      <style>${styles}</style>
      <button data-variant="${variant}" data-size="${size}" ${disabled ? "disabled" : ""}>
        <slot></slot>
      </button>
    `;
  }
}
