import { BaseElement } from "./base-element";
import { sharedStyles } from "./shared-styles";

const styles = `
  ${sharedStyles}

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
      animation: ds-dialog-in var(--ds-duration-normal) var(--ds-ease-emphasized);
    }
    dialog[open]::backdrop {
      animation: ds-backdrop-in var(--ds-duration-normal) var(--ds-ease-standard);
    }
  }

  @keyframes ds-dialog-in {
    from { opacity: 0; transform: translateY(6px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }

  @keyframes ds-backdrop-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const HEADING_LEVELS = new Set(["1", "2", "3", "4", "5", "6"]);

let dialogCounter = 0;

export class DsDialog extends BaseElement {
  static observedAttributes = ["open", "heading-level", "label", "dismissible"];

  private previousActive: Element | null = null;
  private dialogEl: HTMLDialogElement | null = null;
  private titleId = `ds-dialog-title-${++dialogCounter}`;

  open(): void {
    if (!this.hasAttribute("open")) {
      this.setAttribute("open", "");
    }
  }

  close(returnValue?: string): void {
    if (this.dialogEl?.open) {
      this.dialogEl.close(returnValue ?? "");
    }
    this.removeAttribute("open");
  }

  private handleClose = () => {
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
    }
    const restore = this.previousActive;
    this.previousActive = null;
    if (restore instanceof HTMLElement) {
      restore.focus({ preventScroll: true });
    }
    this.dispatchEvent(
      new CustomEvent("ds-close", {
        bubbles: true,
        composed: true,
        detail: { returnValue: this.dialogEl?.returnValue ?? "" }
      })
    );
  };

  private handleCancel = (event: Event) => {
    if (!this.isDismissible()) {
      event.preventDefault();
    }
  };

  private handleBackdropClick = (event: MouseEvent) => {
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

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === "open") {
      this.syncOpenState();
      return;
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }

  private syncOpenState() {
    if (!this.dialogEl) return;
    const shouldBeOpen = this.hasAttribute("open");

    if (shouldBeOpen && !this.dialogEl.open) {
      this.previousActive = (this.getRootNode() as Document | ShadowRoot).activeElement;
      this.dialogEl.showModal();
      this.dispatchEvent(
        new CustomEvent("ds-open", { bubbles: true, composed: true })
      );
    } else if (!shouldBeOpen && this.dialogEl.open) {
      this.dialogEl.close();
    }
  }

  protected render() {
    const rawLevel = this.getAttribute("heading-level") ?? "2";
    const level = HEADING_LEVELS.has(rawLevel) ? rawLevel : "2";
    const ariaLabel = this.getAttribute("label");

    this.root.innerHTML = `<style>${styles}</style>`;

    const dialog = document.createElement("dialog");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    if (ariaLabel) {
      dialog.setAttribute("aria-label", ariaLabel);
    } else {
      dialog.setAttribute("aria-labelledby", this.titleId);
    }

    dialog.addEventListener("close", this.handleClose);
    dialog.addEventListener("cancel", this.handleCancel);
    dialog.addEventListener("click", this.handleBackdropClick);

    const wrapper = document.createElement("div");
    wrapper.className = "body-wrapper";

    const header = document.createElement("header");

    const heading = document.createElement(`h${level}`);
    heading.className = "title";
    heading.id = this.titleId;
    const titleSlot = document.createElement("slot");
    titleSlot.name = "title";
    heading.append(titleSlot);
    header.append(heading);

    if (this.isDismissible()) {
      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "close";
      closeBtn.setAttribute("aria-label", "Close dialog");
      closeBtn.textContent = "\u00D7";
      closeBtn.addEventListener("click", () => this.close());
      header.append(closeBtn);
    }

    wrapper.append(header);

    const body = document.createElement("div");
    body.className = "body";
    body.append(document.createElement("slot"));
    wrapper.append(body);

    const footer = document.createElement("footer");
    const footerSlot = document.createElement("slot");
    footerSlot.name = "footer";
    footer.append(footerSlot);
    wrapper.append(footer);

    dialog.append(wrapper);
    this.root.append(dialog);

    this.dialogEl = dialog;

    if (this.hasAttribute("open")) {
      queueMicrotask(() => this.syncOpenState());
    }
  }

  disconnectedCallback() {
    if (this.dialogEl?.open) {
      this.dialogEl.close();
    }
  }
}
