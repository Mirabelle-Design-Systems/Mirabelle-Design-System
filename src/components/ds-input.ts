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
const nextId = () => `ds-input-${++idCounter}`;

export class DsInput extends BaseElement {
  static observedAttributes = [
    "label",
    "placeholder",
    "value",
    "helper",
    "type",
    "error",
    "required",
    "disabled",
    "name"
  ];

  private internalValue = "";
  private readonly fieldId = nextId();
  private readonly helperId = `${this.fieldId}-helper`;
  private readonly errorId = `${this.fieldId}-error`;

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
    const rawType = this.getAttribute("type") ?? "text";
    const type = TYPE_WHITELIST.has(rawType) ? rawType : "text";

    const label = this.getAttribute("label") ?? "";
    const placeholder = this.getAttribute("placeholder") ?? "";
    const helper = this.getAttribute("helper") ?? "";
    const error = this.getAttribute("error") ?? "";
    const required = this.hasAttribute("required");
    const disabled = this.hasAttribute("disabled");
    const name = this.getAttribute("name") ?? "";

    this.root.innerHTML = `<style>${styles}</style>`;

    const field = document.createElement("div");
    field.className = "field";

    if (label) {
      const labelEl = document.createElement("label");
      labelEl.setAttribute("for", this.fieldId);
      labelEl.textContent = label;
      if (required) {
        const marker = document.createElement("span");
        marker.className = "required-marker";
        marker.setAttribute("aria-hidden", "true");
        marker.textContent = "*";
        labelEl.append(marker);
      }
      field.append(labelEl);
    }

    const input = document.createElement("input");
    input.id = this.fieldId;
    input.type = type;
    input.value = this.internalValue;
    if (placeholder) input.placeholder = placeholder;
    if (name) input.name = name;
    if (required) input.required = true;
    if (disabled) input.disabled = true;
    if (!label) {
      const ariaLabel = this.getAttribute("aria-label");
      if (ariaLabel) input.setAttribute("aria-label", ariaLabel);
    }

    const describedBy: string[] = [];
    if (error) {
      input.setAttribute("aria-invalid", "true");
      describedBy.push(this.errorId);
    } else if (helper) {
      describedBy.push(this.helperId);
    }
    if (describedBy.length) {
      input.setAttribute("aria-describedby", describedBy.join(" "));
    }

    field.append(input);

    if (error) {
      const errorEl = document.createElement("div");
      errorEl.className = "helper";
      errorEl.dataset.variant = "error";
      errorEl.id = this.errorId;
      errorEl.setAttribute("role", "alert");
      errorEl.textContent = error;
      field.append(errorEl);
    } else if (helper) {
      const helperEl = document.createElement("div");
      helperEl.className = "helper";
      helperEl.id = this.helperId;
      helperEl.textContent = helper;
      field.append(helperEl);
    }

    this.root.append(field);

    input.addEventListener("input", () => {
      this.internalValue = input.value;
      this.dispatchEvent(
        new CustomEvent("ds-input", {
          bubbles: true,
          composed: true,
          detail: { value: input.value }
        })
      );
    });

    input.addEventListener("change", () => {
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
