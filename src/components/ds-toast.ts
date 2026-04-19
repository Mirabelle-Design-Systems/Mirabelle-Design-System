import { BaseElement } from "./base-element";
import { sharedStyles } from "./shared-styles";

const styles = `
  ${sharedStyles}

  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  .toast {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: start;
    gap: var(--ds-space-3);
    padding: var(--ds-space-3) var(--ds-space-4);
    border-radius: var(--ds-radius-md);
    border: 1px solid var(--_border-color);
    background: var(--_surface);
    color: var(--_text-primary);
    box-shadow: var(--ds-shadow-lg);
    min-width: 16rem;
    max-width: 24rem;
  }

  .icon {
    width: 0.625rem;
    height: 0.625rem;
    margin-top: 0.4rem;
    border-radius: var(--ds-radius-pill);
    background: var(--_text-secondary);
  }

  :host([tone="success"]) .icon { background: var(--_success); }
  :host([tone="warning"]) .icon { background: var(--_warning); }
  :host([tone="danger"]) .icon { background: var(--_danger); }
  :host([tone="info"]) .icon { background: var(--ds-color-info); }

  :host([tone="success"]) .toast { border-color: color-mix(in srgb, var(--_success) 40%, var(--_border-color)); }
  :host([tone="warning"]) .toast { border-color: color-mix(in srgb, var(--_warning) 40%, var(--_border-color)); }
  :host([tone="danger"]) .toast { border-color: color-mix(in srgb, var(--_danger) 40%, var(--_border-color)); }
  :host([tone="info"]) .toast { border-color: color-mix(in srgb, var(--ds-color-info) 40%, var(--_border-color)); }

  .content {
    display: grid;
    gap: var(--ds-space-1);
    font-size: var(--ds-font-size-200);
    line-height: var(--ds-line-height-normal);
  }

  .title {
    font-weight: var(--ds-font-weight-semibold);
    color: var(--_text-primary);
  }

  .title:empty {
    display: none;
  }

  .body {
    color: var(--_text-secondary);
  }

  .close {
    appearance: none;
    background: transparent;
    border: none;
    border-radius: var(--ds-radius-xs);
    padding: var(--ds-space-1);
    color: var(--_text-secondary);
    cursor: pointer;
    font-size: var(--ds-font-size-300);
    line-height: 1;
  }

  .close:hover { color: var(--_text-primary); background: var(--_surface-subtle); }
  .close:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--ds-color-ring);
  }

  @media (prefers-reduced-motion: no-preference) {
    :host([open]) .toast {
      animation: ds-toast-in var(--ds-duration-normal) var(--ds-ease-emphasized);
    }
  }

  @keyframes ds-toast-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }
`;

const TONES = new Set(["neutral", "success", "warning", "danger", "info"]);

export class DsToast extends BaseElement {
  static observedAttributes = ["open", "tone", "duration", "heading"];

  private dismissTimer: number | null = null;

  show(): void {
    if (!this.hasAttribute("open")) {
      this.setAttribute("open", "");
    }
  }

  close(): void {
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
    }
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (name === "open") {
      this.syncOpen();
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  private syncOpen() {
    this.clearTimer();
    const isOpen = this.hasAttribute("open");
    this.hidden = !isOpen;
    if (isOpen) {
      this.dispatchEvent(new CustomEvent("ds-toast-open", { bubbles: true, composed: true }));
      const durationAttr = this.getAttribute("duration");
      const duration = durationAttr === null ? 5000 : Number(durationAttr);
      if (Number.isFinite(duration) && duration > 0) {
        this.dismissTimer = window.setTimeout(() => this.close(), duration);
      }
    } else {
      this.dispatchEvent(new CustomEvent("ds-toast-close", { bubbles: true, composed: true }));
    }
  }

  private clearTimer() {
    if (this.dismissTimer !== null) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.syncOpen();
  }

  disconnectedCallback() {
    this.clearTimer();
  }

  protected render() {
    const rawTone = this.getAttribute("tone") ?? "neutral";
    const tone = TONES.has(rawTone) ? rawTone : "neutral";
    this.setAttribute("tone", tone);

    const isDanger = tone === "danger" || tone === "warning";
    const role = isDanger ? "alert" : "status";
    const live = isDanger ? "assertive" : "polite";

    this.setAttribute("role", role);
    this.setAttribute("aria-live", live);
    this.setAttribute("aria-atomic", "true");

    this.root.innerHTML = `<style>${styles}</style>`;

    const toast = document.createElement("div");
    toast.className = "toast";

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.setAttribute("aria-hidden", "true");
    toast.append(icon);

    const content = document.createElement("div");
    content.className = "content";

    const headingText = this.getAttribute("heading") ?? "";
    const headingEl = document.createElement("div");
    headingEl.className = "title";
    if (headingText) headingEl.textContent = headingText;
    content.append(headingEl);

    const body = document.createElement("div");
    body.className = "body";
    body.append(document.createElement("slot"));
    content.append(body);

    toast.append(content);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "close";
    closeBtn.setAttribute("aria-label", "Dismiss notification");
    closeBtn.textContent = "\u00D7";
    closeBtn.addEventListener("click", () => this.close());
    toast.append(closeBtn);

    this.root.append(toast);
  }
}
