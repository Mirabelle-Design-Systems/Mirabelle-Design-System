import { BaseElement } from "./base-element";
import { sharedStyles } from "./shared-styles";

const styles = `
  ${sharedStyles}

  .field {
    display: grid;
    gap: var(--ds-space-2);
  }

  label {
    font-size: var(--ds-font-size-200);
    font-weight: var(--ds-font-weight-semibold);
    color: var(--_text-primary);
  }

  input {
    width: 100%;
    min-height: 3rem;
    padding: 0 var(--ds-space-4);
    border-radius: var(--ds-radius-md);
    border: 1px solid var(--_border-color);
    background: var(--_surface);
    color: var(--_text-primary);
    font-size: var(--ds-font-size-300);
    transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
  }

  input::placeholder {
    color: var(--_text-secondary);
  }

  input:focus {
    outline: none;
    border-color: color-mix(in srgb, var(--_accent) 48%, white);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--_accent) 18%, transparent);
  }

  .helper {
    color: var(--_text-secondary);
    font-size: var(--ds-font-size-200);
    line-height: var(--ds-line-height-normal);
  }
`;

export class DsInput extends BaseElement {
  static observedAttributes = ["label", "placeholder", "value", "helper", "type"];

  private internalValue = "";

  connectedCallback() {
    this.internalValue = this.getAttribute("value") ?? "";
    super.connectedCallback();
  }

  get value() {
    return this.internalValue;
  }

  set value(nextValue: string) {
    this.internalValue = nextValue;

    if (this.getAttribute("value") !== nextValue) {
      this.setAttribute("value", nextValue);
    }
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === "value" && oldValue !== newValue) {
      this.internalValue = newValue ?? "";
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }

  protected render() {
    const label = this.getAttribute("label") ?? "";
    const placeholder = this.getAttribute("placeholder") ?? "";
    const helper = this.getAttribute("helper") ?? "";
    const value = this.value;
    const type = this.getAttribute("type") ?? "text";

    this.root.innerHTML = `
      <style>${styles}</style>
      <div class="field">
        ${label ? `<label>${label}</label>` : ""}
        <input type="${type}" value="${value}" placeholder="${placeholder}" />
        ${helper ? `<div class="helper">${helper}</div>` : ""}
      </div>
    `;

    const input = this.root.querySelector("input");

    input?.addEventListener("input", () => {
      this.internalValue = input.value;
      this.dispatchEvent(
        new CustomEvent("ds-input", {
          bubbles: true,
          composed: true,
          detail: { value: input.value }
        })
      );
    });

    input?.addEventListener("change", () => {
      this.setAttribute("value", input.value);
      this.dispatchEvent(
        new CustomEvent("ds-change", {
          bubbles: true,
          composed: true,
          detail: { value: input.value }
        })
      );
    });
  }
}
