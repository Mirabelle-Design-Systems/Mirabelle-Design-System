import { LitElement, html, css, nothing } from "lit";
import type { PropertyValues } from "lit";
import { sharedStyleSheet } from "./shared-style-sheet";

const dialogStyles = css`
  :host {
    display: contents;
  }

  dialog {
    margin: auto;
    padding: 0;
    max-width: min(32rem, calc(100vw - var(--ds-space-8)));
    width: 100%;
    border: 1px solid var(--_border-color);
    border-radius: var(--ds-radius-lg);
    background: var(--_surface);
    color: var(--_text-primary);
    box-shadow: var(--ds-shadow-xl);
  }

  dialog::backdrop {
    background: var(--ds-color-overlay);
    backdrop-filter: blur(2px);
  }

  dialog:not([open]) {
    display: none;
  }

  .body-wrapper {
    display: grid;
    gap: var(--ds-space-4);
    padding: var(--ds-space-6);
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--ds-space-4);
  }

  .title {
    margin: 0;
    font-size: var(--ds-font-size-500);
    font-weight: var(--ds-font-weight-semibold);
    line-height: var(--ds-line-height-snug);
    color: var(--_text-primary);
  }

  .close {
    appearance: none;
    background: transparent;
    border: none;
    border-radius: var(--ds-radius-sm);
    padding: var(--ds-space-1);
    color: var(--_text-secondary);
    cursor: pointer;
    font-size: var(--ds-font-size-400);
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

  .body {
    color: var(--_text-secondary);
    line-height: var(--ds-line-height-normal);
  }

  .body:empty {
    display: none;
  }

  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--ds-space-2);
  }

  footer:empty {
    display: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    dialog[open] {
      animation: mirabelle-ds-dialog-in var(--ds-duration-normal) var(--ds-ease-emphasized);
    }
    dialog[open]::backdrop {
      animation: mirabelle-ds-backdrop-in var(--ds-duration-normal) var(--ds-ease-standard);
    }
  }

  @keyframes mirabelle-ds-dialog-in {
    from {
      opacity: 0;
      transform: translateY(6px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes mirabelle-ds-backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HEADING_LEVELS = new Set(["1", "2", "3", "4", "5", "6"]);

let dialogCounter = 0;

export class DsDialog extends LitElement {
  static styles = [sharedStyleSheet, dialogStyles];

  static properties = {
    dialogOpen: { attribute: "open", type: Boolean, reflect: true },
    headingLevel: { attribute: "heading-level", type: String, reflect: true },
    label: { type: String, reflect: true }
  };

  dialogOpen = false;
  headingLevel = "2";
  label = "";

  private previousActive: Element | null = null;
  private dialogEl: HTMLDialogElement | null = null;
  private readonly titleId = `mirabelle-ds-dialog-title-${++dialogCounter}`;
  private dialogListenersBound = false;

  open(): void {
    if (!this.dialogOpen) {
      this.dialogOpen = true;
    }
  }

  close(returnValue?: string): void {
    if (this.dialogEl?.open) {
      this.dialogEl.close(returnValue ?? "");
    }
    this.dialogOpen = false;
  }

  private handleClose = (): void => {
    if (this.dialogOpen) {
      this.dialogOpen = false;
    }
    const restore = this.previousActive;
    this.previousActive = null;
    if (restore instanceof HTMLElement) {
      restore.focus({ preventScroll: true });
    }
    this.dispatchEvent(
      new CustomEvent("mirabelle-ds-close", {
        bubbles: true,
        composed: true,
        detail: { returnValue: this.dialogEl?.returnValue ?? "" }
      })
    );
  };

  private handleCancel = (event: Event): void => {
    if (!this.isDismissible()) {
      event.preventDefault();
    }
  };

  private handleBackdropClick = (event: MouseEvent): void => {
    if (!this.isDismissible() || !this.dialogEl) return;
    if (event.target === this.dialogEl) {
      this.close();
    }
  };

  private isDismissible(): boolean {
    const raw = this.getAttribute("dismissible");
    if (raw === null) return true;
    return raw !== "false";
  }

  private syncOpenState(): void {
    if (!this.dialogEl) return;
    const shouldBeOpen = this.dialogOpen;

    if (shouldBeOpen && !this.dialogEl.open) {
      this.previousActive = (this.getRootNode() as Document | ShadowRoot).activeElement;
      this.dialogEl.showModal();
      this.dispatchEvent(new CustomEvent("mirabelle-ds-open", { bubbles: true, composed: true }));
    } else if (!shouldBeOpen && this.dialogEl.open) {
      this.dialogEl.close();
    }
  }

  firstUpdated(): void {
    this.dialogEl = this.renderRoot.querySelector("dialog");
    if (this.dialogEl && !this.dialogListenersBound) {
      this.dialogEl.addEventListener("close", this.handleClose);
      this.dialogEl.addEventListener("cancel", this.handleCancel);
      this.dialogEl.addEventListener("click", this.handleBackdropClick);
      this.dialogListenersBound = true;
    }
    if (this.dialogOpen) {
      queueMicrotask(() => this.syncOpenState());
    }
  }

  updated(changed: PropertyValues): void {
    super.updated(changed);
    this.dialogEl = this.renderRoot.querySelector("dialog");
    if (changed.has("dialogOpen")) {
      this.syncOpenState();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.dialogEl?.open) {
      this.dialogEl.close();
    }
  }

  private headingSlot(level: string) {
    const slot = html`<slot name="title"></slot>`;
    switch (level) {
      case "1":
        return html`<h1 class="title" id=${this.titleId}>${slot}</h1>`;
      case "3":
        return html`<h3 class="title" id=${this.titleId}>${slot}</h3>`;
      case "4":
        return html`<h4 class="title" id=${this.titleId}>${slot}</h4>`;
      case "5":
        return html`<h5 class="title" id=${this.titleId}>${slot}</h5>`;
      case "6":
        return html`<h6 class="title" id=${this.titleId}>${slot}</h6>`;
      default:
        return html`<h2 class="title" id=${this.titleId}>${slot}</h2>`;
    }
  }

  render() {
    const rawLevel = this.headingLevel ?? "2";
    const level = HEADING_LEVELS.has(rawLevel) ? rawLevel : "2";
    const ariaLabel = this.label;

    return html`
      <dialog
        role="dialog"
        aria-modal="true"
        aria-label=${ariaLabel || nothing}
        aria-labelledby=${ariaLabel ? nothing : this.titleId}
      >
        <div class="body-wrapper">
          <header>
            ${this.headingSlot(level)}
            ${this.isDismissible()
              ? html`<button
                  type="button"
                  class="close"
                  aria-label="Close dialog"
                  @click=${() => this.close()}
                >
                  ×
                </button>`
              : null}
          </header>
          <div class="body"><slot></slot></div>
          <footer><slot name="footer"></slot></footer>
        </div>
      </dialog>
    `;
  }
}
