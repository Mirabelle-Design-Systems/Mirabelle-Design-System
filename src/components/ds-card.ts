import { LitElement, html, css } from "lit";
import { sharedStyleSheet } from "./shared-style-sheet";

const cardStyles = css`
  :host {
    display: block;
  }

  article {
    display: grid;
    gap: var(--ds-space-4);
    height: 100%;
    padding: var(--ds-space-6);
    border-radius: calc(var(--ds-radius-lg) + 0.125rem);
    border: 1px solid var(--_border-color);
    background: var(--_surface);
    box-shadow: none;
  }

  article[data-elevated="true"] {
    box-shadow: var(--ds-shadow-md);
  }

  header:empty,
  footer:empty {
    display: none;
  }

  .eyebrow {
    margin: 0 0 var(--ds-space-1) 0;
    color: var(--_accent);
    font-size: var(--ds-font-size-100);
    font-weight: var(--ds-font-weight-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .title {
    margin: 0;
    font-size: var(--ds-font-size-500);
    font-weight: var(--ds-font-weight-semibold);
    line-height: var(--ds-line-height-snug);
    letter-spacing: -0.02em;
    color: var(--_text-primary);
  }

  .body {
    color: var(--_text-secondary);
    line-height: var(--ds-line-height-normal);
  }

  footer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ds-space-3);
  }
`;

const HEADING_LEVELS = new Set(["1", "2", "3", "4", "5", "6"]);

export class DsCard extends LitElement {
  static styles = [sharedStyleSheet, cardStyles];

  static properties = {
    elevated: { type: Boolean, reflect: true },
    headingLevel: { attribute: "heading-level", type: String, reflect: true }
  };

  elevated = false;
  headingLevel = "2";

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("slotchange", () => this.requestUpdate());
  }

  private hasSlottedContent(slotName: string): boolean {
    if (slotName === "") {
      return Array.from(this.childNodes).some((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          return !(node as Element).hasAttribute("slot");
        }
        return node.nodeType === Node.TEXT_NODE && (node.textContent ?? "").trim().length > 0;
      });
    }
    return !!this.querySelector(`[slot="${slotName}"]`);
  }

  private headingTag(level: string) {
    const titleSlot = html`<slot name="title"></slot>`;
    switch (level) {
      case "1":
        return html`<h1 class="title">${titleSlot}</h1>`;
      case "3":
        return html`<h3 class="title">${titleSlot}</h3>`;
      case "4":
        return html`<h4 class="title">${titleSlot}</h4>`;
      case "5":
        return html`<h5 class="title">${titleSlot}</h5>`;
      case "6":
        return html`<h6 class="title">${titleSlot}</h6>`;
      default:
        return html`<h2 class="title">${titleSlot}</h2>`;
    }
  }

  render() {
    const rawLevel = this.headingLevel ?? "2";
    const level = HEADING_LEVELS.has(rawLevel) ? rawLevel : "2";
    const hasEyebrow = this.hasSlottedContent("eyebrow");
    const hasTitle = this.hasSlottedContent("title");
    const hasBody = this.hasSlottedContent("");
    const hasFooter = this.hasSlottedContent("footer");

    return html`
      <article data-elevated=${String(this.elevated)}>
        ${hasEyebrow || hasTitle
          ? html`<header>
              ${hasEyebrow ? html`<p class="eyebrow"><slot name="eyebrow"></slot></p>` : null}
              ${hasTitle ? this.headingTag(level) : null}
            </header>`
          : null}
        ${hasBody ? html`<div class="body"><slot></slot></div>` : null}
        ${hasFooter ? html`<footer><slot name="footer"></slot></footer>` : null}
      </article>
    `;
  }
}
