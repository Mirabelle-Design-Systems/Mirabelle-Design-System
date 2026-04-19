import { BaseElement } from "./base-element";
import { sharedStyles } from "./shared-styles";

const styles = `
  ${sharedStyles}

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

export class DsCard extends BaseElement {
  static observedAttributes = ["elevated", "heading-level"];

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

  protected render() {
    const elevated = this.hasAttribute("elevated");
    const rawLevel = this.getAttribute("heading-level") ?? "2";
    const level = HEADING_LEVELS.has(rawLevel) ? rawLevel : "2";

    const hasEyebrow = this.hasSlottedContent("eyebrow");
    const hasTitle = this.hasSlottedContent("title");
    const hasBody = this.hasSlottedContent("");
    const hasFooter = this.hasSlottedContent("footer");

    this.root.innerHTML = `<style>${styles}</style>`;

    const article = document.createElement("article");
    article.dataset.elevated = String(elevated);

    if (hasEyebrow || hasTitle) {
      const header = document.createElement("header");
      if (hasEyebrow) {
        const eyebrow = document.createElement("p");
        eyebrow.className = "eyebrow";
        const slot = document.createElement("slot");
        slot.name = "eyebrow";
        eyebrow.append(slot);
        header.append(eyebrow);
      }
      if (hasTitle) {
        const heading = document.createElement(`h${level}`);
        heading.className = "title";
        const slot = document.createElement("slot");
        slot.name = "title";
        heading.append(slot);
        header.append(heading);
      }
      article.append(header);
    }

    if (hasBody) {
      const body = document.createElement("div");
      body.className = "body";
      body.append(document.createElement("slot"));
      article.append(body);
    }

    if (hasFooter) {
      const footer = document.createElement("footer");
      const slot = document.createElement("slot");
      slot.name = "footer";
      footer.append(slot);
      article.append(footer);
    }

    this.root.append(article);
  }
}
