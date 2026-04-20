import { LitElement, html, css } from "lit";
import { sharedStyleSheet } from "./shared-style-sheet";

const buttonStyles = css`
  :host {
    display: inline-block;
  }

  :host([block]) {
    display: block;
  }

  :host([block]) button {
    width: 100%;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ds-space-2);
    min-height: 2.75rem;
    padding: 0 var(--ds-space-4);
    border: 1px solid transparent;
    border-radius: var(--ds-radius-pill);
    font-family: inherit;
    font-size: var(--ds-font-size-300);
    font-weight: var(--ds-font-weight-semibold);
    line-height: 1;
    cursor: pointer;
    transition: transform var(--ds-duration-fast) var(--ds-ease-standard),
      background-color var(--ds-duration-fast) var(--ds-ease-standard),
      border-color var(--ds-duration-fast) var(--ds-ease-standard),
      color var(--ds-duration-fast) var(--ds-ease-standard),
      box-shadow var(--ds-duration-fast) var(--ds-ease-standard);
  }

  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--ds-color-ring);
  }

  button:hover:not([disabled]) {
    transform: translateY(-1px);
  }

  button:active:not([disabled]) {
    transform: translateY(0);
  }

  button[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
  }

  button[data-variant="primary"] {
    background: var(--_accent);
    color: var(--_accent-contrast);
    box-shadow: var(--ds-shadow-sm);
  }

  button[data-variant="primary"]:hover:not([disabled]) {
    background: var(--_accent-hover);
  }

  button[data-variant="secondary"] {
    background: var(--_surface);
    color: var(--_text-primary);
    border-color: var(--_border-color);
  }

  button[data-variant="secondary"]:hover:not([disabled]) {
    background: var(--_surface-subtle);
  }

  button[data-variant="ghost"] {
    background: transparent;
    color: var(--_accent);
  }

  button[data-variant="ghost"]:hover:not([disabled]) {
    background: color-mix(in srgb, var(--_accent) 10%, transparent);
  }

  button[data-variant="danger"] {
    background: var(--_danger);
    color: var(--ds-color-text-inverse);
  }

  button[data-variant="danger"]:hover:not([disabled]) {
    background: color-mix(in srgb, var(--_danger) 88%, black);
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

const VARIANTS = new Set(["primary", "secondary", "ghost", "danger"]);
const SIZES = new Set(["sm", "md", "lg"]);
const TYPES = new Set(["button", "submit", "reset"]);

export class DsButton extends LitElement {
  static formAssociated = true;

  static styles = [sharedStyleSheet, buttonStyles];

  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    buttonType: { attribute: "type", type: String, reflect: true },
    block: { type: Boolean, reflect: true }
  };

  variant = "primary";
  size = "md";
  disabled = false;
  buttonType = "button";
  block = false;

  private readonly internals: ElementInternals | null;

  constructor() {
    super();
    this.internals = typeof this.attachInternals === "function" ? this.attachInternals() : null;
  }

  get form(): HTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  get effectiveType(): string {
    return TYPES.has(this.buttonType) ? this.buttonType : "button";
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const form = this.form;
    if (!form) return;
    const t = this.effectiveType;
    if (t === "submit") {
      form.requestSubmit();
    } else if (t === "reset") {
      form.reset();
    }
  }

  render() {
    const variant = VARIANTS.has(this.variant) ? this.variant : "primary";
    const size = SIZES.has(this.size) ? this.size : "md";
    const ariaLabel = this.getAttribute("aria-label");
    return html`
      <button
        type="button"
        data-variant=${variant}
        data-size=${size}
        ?disabled=${this.disabled}
        aria-label=${ariaLabel || undefined}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}
