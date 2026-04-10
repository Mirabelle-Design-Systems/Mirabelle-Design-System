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
    background: color-mix(in srgb, var(--_surface) 92%, transparent);
    box-shadow: none;
    backdrop-filter: blur(16px);
  }

  article[data-elevated="true"] {
    box-shadow: var(--ds-shadow-md);
  }

  .eyebrow {
    margin: 0;
    color: var(--_accent);
    font-size: var(--ds-font-size-100);
    font-weight: var(--ds-font-weight-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .title {
    margin: 0;
    font-size: var(--ds-font-size-500);
    line-height: var(--ds-line-height-snug);
    letter-spacing: -0.02em;
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

export class DsCard extends BaseElement {
  static observedAttributes = ["elevated"];

  protected render() {
    const elevated = this.hasAttribute("elevated");

    this.root.innerHTML = `
      <style>${styles}</style>
      <article data-elevated="${String(elevated)}">
        <header>
          <p class="eyebrow"><slot name="eyebrow"></slot></p>
          <h2 class="title"><slot name="title"></slot></h2>
        </header>
        <div class="body"><slot></slot></div>
        <footer><slot name="footer"></slot></footer>
      </article>
    `;
  }
}
