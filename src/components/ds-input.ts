import { LitElement, html, css } from "lit";
import type { PropertyValues } from "lit";
import { sharedStyleSheet } from "./shared-style-sheet";

const inputStyles = css`
  .field {
    display: grid;
    gap: var(--ds-space-2);
  }

  label {
    font-size: var(--ds-font-size-200);
    font-weight: var(--ds-font-weight-semibold);
    color: var(--_text-primary);
  }

  .required-marker {
    color: var(--_danger);
    margin-inline-start: var(--ds-space-1);
  }

  input {
    width: 100%;
    min-height: 3rem;
    padding: 0 var(--ds-space-4);
    border-radius: var(--ds-radius-md);
    border: 1px solid var(--_border-color);
    background: var(--_surface);
    color: var(--_text-primary);
    font-family: inherit;
    font-size: var(--ds-font-size-300);
    transition: border-color var(--ds-duration-fast) var(--ds-ease-standard),
      box-shadow var(--ds-duration-fast) var(--ds-ease-standard),
      background-color var(--ds-duration-fast) var(--ds-ease-standard);
  }

  input::placeholder {
    color: var(--_text-secondary);
  }

  input:focus-visible {
    outline: none;
    border-color: var(--_accent);
    box-shadow: 0 0 0 3px var(--ds-color-ring);
  }

  input:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  input[aria-invalid="true"] {
    border-color: var(--_danger);
  }

  input[aria-invalid="true"]:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--_danger) 28%, transparent);
  }

  .helper {
    color: var(--_text-secondary);
    font-size: var(--ds-font-size-200);
    line-height: var(--ds-line-height-normal);
  }

  .helper[data-variant="error"] {
    color: var(--_danger);
  }
`;

const TYPE_WHITELIST = new Set([
  "text",
  "email",
  "password",
  "number",
  "search",
  "tel",
  "url"
]);

let idCounter = 0;
const nextId = () => `mirabelle-ds-input-${++idCounter}`;

export class DsInput extends LitElement {
  static formAssociated = true;

  static styles = [sharedStyleSheet, inputStyles];

  static properties = {
    label: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    value: { type: String, reflect: true },
    helper: { type: String, reflect: true },
    error: { type: String, reflect: true },
    inputType: { attribute: "type", type: String, reflect: true },
    required: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    name: { type: String, reflect: true }
  };

  label = "";
  placeholder = "";
  value = "";
  helper = "";
  error = "";
  inputType = "text";
  required = false;
  disabled = false;
  name = "";

  private defaultValue = "";
  private readonly internals: ElementInternals | null;
  private readonly fieldId: string;
  private readonly helperId: string;
  private readonly errorId: string;

  constructor() {
    super();
    this.internals = typeof this.attachInternals === "function" ? this.attachInternals() : null;
    this.fieldId = nextId();
    this.helperId = `${this.fieldId}-helper`;
    this.errorId = `${this.fieldId}-error`;
  }

  get form(): HTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  get validity(): ValidityState | undefined {
    return this.internals?.validity;
  }

  checkValidity(): boolean {
    return this.internals?.checkValidity() ?? true;
  }

  reportValidity(): boolean {
    return this.internals?.reportValidity() ?? true;
  }

  connectedCallback(): void {
    super.connectedCallback();
    const initial = this.getAttribute("value") ?? "";
    this.value = initial;
    this.defaultValue = initial;
    this.syncFormState();
  }

  formResetCallback(): void {
    this.value = this.defaultValue;
  }

  formStateRestoreCallback(state: string | FormData | File | null): void {
    if (typeof state === "string") {
      this.value = state;
    }
  }

  private syncFormState(inputEl: HTMLInputElement | null = null): void {
    if (!this.internals) return;
    this.internals.setFormValue(this.value);

    const required = this.required;
    const hasError = !!this.error;
    const valueMissing = required && !this.value;

    const input = inputEl ?? (this.renderRoot?.querySelector("input") as HTMLInputElement | null);

    if (hasError) {
      this.internals.setValidity(
        { customError: true },
        this.error,
        input ?? undefined
      );
    } else if (valueMissing) {
      this.internals.setValidity(
        { valueMissing: true },
        "Please fill out this field.",
        input ?? undefined
      );
    } else {
      this.internals.setValidity({});
    }
  }

  private onInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.syncFormState(input);
    this.dispatchEvent(
      new CustomEvent("mirabelle-ds-field-input", {
        bubbles: true,
        composed: true,
        detail: { value: input.value }
      })
    );
  }

  private onChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent("mirabelle-ds-change", {
        bubbles: true,
        composed: true,
        detail: { value: input.value }
      })
    );
  }

  updated(changed: PropertyValues): void {
    super.updated(changed);
    if (
      changed.has("value") ||
      changed.has("error") ||
      changed.has("required") ||
      changed.has("disabled")
    ) {
      this.syncFormState();
    }
  }

  render() {
    const type = TYPE_WHITELIST.has(this.inputType) ? this.inputType : "text";
    const describedBy: string[] = [];
    if (this.error) {
      describedBy.push(this.errorId);
    } else if (this.helper) {
      describedBy.push(this.helperId);
    }
    const ariaLabel = this.getAttribute("aria-label");

    return html`
      <div class="field">
        ${this.label
          ? html`<label for=${this.fieldId}>
              ${this.label}
              ${this.required
                ? html`<span class="required-marker" aria-hidden="true">*</span>`
                : null}
            </label>`
          : null}
        <input
          id=${this.fieldId}
          type=${type}
          .value=${this.value}
          placeholder=${this.placeholder || undefined}
          name=${this.name || undefined}
          ?required=${this.required}
          ?disabled=${this.disabled}
          aria-label=${!this.label && ariaLabel ? ariaLabel : undefined}
          aria-invalid=${this.error ? "true" : undefined}
          aria-describedby=${describedBy.length ? describedBy.join(" ") : undefined}
          @input=${this.onInput}
          @change=${this.onChange}
        />
        ${this.error
          ? html`<div class="helper" data-variant="error" id=${this.errorId} role="alert">
              ${this.error}
            </div>`
          : this.helper
            ? html`<div class="helper" id=${this.helperId}>${this.helper}</div>`
            : null}
      </div>
    `;
  }
}
