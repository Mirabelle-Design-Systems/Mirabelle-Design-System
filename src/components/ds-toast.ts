import { LitElement, html, css } from "lit";
import type { PropertyValues } from "lit";
import { sharedStyleSheet } from "./shared-style-sheet";

const toastStyles = css`
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

  :host([tone="success"]) .icon {
    background: var(--_success);
  }
  :host([tone="warning"]) .icon {
    background: var(--_warning);
  }
  :host([tone="danger"]) .icon {
    background: var(--_danger);
  }
  :host([tone="info"]) .icon {
    background: var(--ds-color-info);
  }

  :host([tone="success"]) .toast {
    border-color: color-mix(in srgb, var(--_success) 40%, var(--_border-color));
  }
  :host([tone="warning"]) .toast {
    border-color: color-mix(in srgb, var(--_warning) 40%, var(--_border-color));
  }
  :host([tone="danger"]) .toast {
    border-color: color-mix(in srgb, var(--_danger) 40%, var(--_border-color));
  }
  :host([tone="info"]) .toast {
    border-color: color-mix(in srgb, var(--ds-color-info) 40%, var(--_border-color));
  }

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

  .close:hover {
    color: var(--_text-primary);
    background: var(--_surface-subtle);
  }
  .close:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--ds-color-ring);
  }

  @media (prefers-reduced-motion: no-preference) {
    :host([open]) .toast {
      animation: mirabelle-ds-toast-in var(--ds-duration-normal) var(--ds-ease-emphasized);
    }
  }

  @keyframes mirabelle-ds-toast-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`;

const TONES = new Set(["neutral", "success", "warning", "danger", "info"]);

export class DsToast extends LitElement {
  static styles = [sharedStyleSheet, toastStyles];

  static properties = {
    toastOpen: { attribute: "open", type: Boolean, reflect: true },
    tone: { type: String, reflect: true },
    duration: { attribute: "duration", type: Number },
    heading: { type: String, reflect: true }
  };

  toastOpen = false;
  tone = "neutral";
  duration = 5000;
  heading = "";

  private dismissTimer: ReturnType<typeof setTimeout> | null = null;

  show(): void {
    if (!this.toastOpen) {
      this.toastOpen = true;
    }
  }

  close(): void {
    if (this.toastOpen) {
      this.toastOpen = false;
    }
  }

  private clearTimer(): void {
    if (this.dismissTimer !== null) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
  }

  private syncOpen(): void {
    this.clearTimer();
    const isOpen = this.toastOpen;
    this.hidden = !isOpen;
    if (isOpen) {
      this.dispatchEvent(new CustomEvent("mirabelle-ds-toast-open", { bubbles: true, composed: true }));
      const d = this.duration;
      if (Number.isFinite(d) && d > 0) {
        this.dismissTimer = window.setTimeout(() => this.close(), d);
      }
    } else {
      this.dispatchEvent(new CustomEvent("mirabelle-ds-toast-close", { bubbles: true, composed: true }));
    }
  }

  private applyA11yHost(): void {
    const rawTone = this.tone ?? "neutral";
    const tone = TONES.has(rawTone) ? rawTone : "neutral";
    if (this.getAttribute("tone") !== tone) {
      this.setAttribute("tone", tone);
    }
    const isDanger = tone === "danger" || tone === "warning";
    this.setAttribute("role", isDanger ? "alert" : "status");
    this.setAttribute("aria-live", isDanger ? "assertive" : "polite");
    this.setAttribute("aria-atomic", "true");
  }

  willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (changed.has("tone") || changed.has("toastOpen")) {
      this.applyA11yHost();
    }
  }

  updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has("toastOpen")) {
      this.syncOpen();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    const attr = this.getAttribute("duration");
    if (attr !== null) {
      const n = Number(attr);
      if (Number.isFinite(n)) this.duration = n;
    }
    this.applyA11yHost();
    this.syncOpen();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearTimer();
  }

  render() {
    const headingText = this.heading;

    return html`
      <div class="toast">
        <span class="icon" aria-hidden="true"></span>
        <div class="content">
          <div class="title">${headingText}</div>
          <div class="body"><slot></slot></div>
        </div>
        <button
          type="button"
          class="close"
          aria-label="Dismiss notification"
          @click=${() => this.close()}
        >
          ×
        </button>
      </div>
    `;
  }
}
