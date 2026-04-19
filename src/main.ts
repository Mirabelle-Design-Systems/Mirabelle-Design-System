import { defineDesignSystem } from "./index";

defineDesignSystem();

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("App root not found");
}

root.innerHTML = `
  <a class="skip-link" href="#content">Skip to content</a>
  <main class="ios-showcase" id="content">
    <header class="showcase-header">
      <div class="showcase-copy">
        <span class="eyebrow">Mirabelle Design System</span>
        <h1>Mirabelle Design System</h1>
        <p>
          This is my design system. It takes some visual inspiration from iOS, but the tokens,
          colors, type, spacing, and component decisions are mine and built around the way I want
          the system to feel.
        </p>
      </div>
    </header>

    <nav class="showcase-nav" aria-label="Section navigation">
      <a href="#foundations">Foundations</a>
      <a href="#components">Components</a>
    </nav>

    <section class="category-block" id="foundations">
      <div class="category-heading">
        <h2>Foundations</h2>
        <span class="category-separator" aria-hidden="true">|</span>
        <p>Stack, tokens, brand naming, and accessibility rules for Mirabelle Design System.</p>
      </div>

      <div class="board-grid foundations-grid">
        <article class="ios-card">
          <div class="card-title">
            <h3>Stack</h3>
            <p><code>current stack</code></p>
          </div>
          <div class="stack-gap compact-gap">
            <div class="token-note"><strong>UI core</strong><span>Web Components</span></div>
            <div class="token-note"><strong>Language</strong><span>TypeScript</span></div>
            <div class="token-note"><strong>Build tool</strong><span>Vite</span></div>
            <div class="token-note"><strong>Styling</strong><span>Plain CSS + design tokens</span></div>
            <div class="token-note"><strong>Next layer</strong><span>React wrappers can sit on top</span></div>
          </div>
        </article>

        <article class="ios-card span-2 token-overview-card">
          <div class="card-title">
            <h3>Token Overview</h3>
            <p><code>mirabelle-ds tokens</code></p>
          </div>
          <div class="token-overview-grid">
            <article class="token-category-card">
              <div class="token-category-head">
                <h4>Colors</h4>
                <span>15</span>
              </div>
              <div class="token-list">
                <div class="token-item"><i class="dot background-dot"></i><code>mirabelle-ds-background</code></div>
                <div class="token-item"><i class="dot surface-dot"></i><code>mirabelle-ds-surface</code></div>
                <div class="token-item"><i class="dot surface-alt-dot"></i><code>mirabelle-ds-surface-alt</code></div>
                <div class="token-item"><i class="dot primary-dot"></i><code>mirabelle-ds-primary</code></div>
                <div class="token-item"><i class="dot primary-hover-dot"></i><code>mirabelle-ds-primary-hover</code></div>
                <div class="token-item"><i class="dot primary-text-dot"></i><code>mirabelle-ds-primary-text</code><span>+9 more</span></div>
              </div>
            </article>

            <article class="token-category-card">
              <div class="token-category-head">
                <h4>Dark Mode</h4>
                <span>8</span>
              </div>
              <div class="token-list">
                <div class="token-item"><i class="dot dark-background-dot"></i><code>mirabelle-ds-background-dark</code></div>
                <div class="token-item"><i class="dot dark-surface-dot"></i><code>mirabelle-ds-surface-dark</code></div>
                <div class="token-item"><i class="dot dark-surface-alt-dot"></i><code>mirabelle-ds-surface-alt-dark</code></div>
                <div class="token-item"><i class="dot dark-primary-dot"></i><code>mirabelle-ds-primary-dark</code></div>
                <div class="token-item"><i class="dot dark-primary-hover-dot"></i><code>mirabelle-ds-primary-hover-dark</code></div>
                <div class="token-item"><i class="dot dark-text-dot"></i><code>mirabelle-ds-text-dark</code><span>+2 more</span></div>
              </div>
            </article>

            <article class="token-category-card">
              <div class="token-category-head">
                <h4>Typography</h4>
                <span>16</span>
              </div>
              <div class="token-list no-dots">
                <div class="token-item"><code>mirabelle-ds-font-family-sans</code></div>
                <div class="token-item"><code>mirabelle-ds-font-family-mono</code></div>
                <div class="token-item"><code>mirabelle-ds-font-size-xs</code></div>
                <div class="token-item"><code>mirabelle-ds-font-size-sm</code></div>
                <div class="token-item"><code>mirabelle-ds-font-size-base</code></div>
                <div class="token-item"><code>mirabelle-ds-font-size-md</code><span>+10 more</span></div>
              </div>
            </article>

            <article class="token-category-card">
              <div class="token-category-head">
                <h4>Spacing</h4>
                <span>8</span>
              </div>
              <div class="token-list no-dots">
                <div class="token-item"><code>mirabelle-ds-space-1</code></div>
                <div class="token-item"><code>mirabelle-ds-space-2</code></div>
                <div class="token-item"><code>mirabelle-ds-space-3</code></div>
                <div class="token-item"><code>mirabelle-ds-space-4</code></div>
                <div class="token-item"><code>mirabelle-ds-space-6</code></div>
                <div class="token-item"><code>mirabelle-ds-space-8</code><span>+2 more</span></div>
              </div>
            </article>

            <article class="token-category-card">
              <div class="token-category-head">
                <h4>Radius</h4>
                <span>5</span>
              </div>
              <div class="token-list no-dots">
                <div class="token-item"><code>mirabelle-ds-radius-xs</code></div>
                <div class="token-item"><code>mirabelle-ds-radius-sm</code></div>
                <div class="token-item"><code>mirabelle-ds-radius-base</code></div>
                <div class="token-item"><code>mirabelle-ds-radius-lg</code></div>
                <div class="token-item"><code>mirabelle-ds-radius-pill</code></div>
              </div>
            </article>

            <article class="token-category-card">
              <div class="token-category-head">
                <h4>Motion</h4>
                <span>5</span>
              </div>
              <div class="token-list no-dots">
                <div class="token-item"><code>mirabelle-ds-duration-fast</code></div>
                <div class="token-item"><code>mirabelle-ds-duration-normal</code></div>
                <div class="token-item"><code>mirabelle-ds-duration-slow</code></div>
                <div class="token-item"><code>mirabelle-ds-ease-standard</code></div>
                <div class="token-item"><code>mirabelle-ds-ease-emphasized</code></div>
              </div>
            </article>
          </div>
        </article>
      </div>
    </section>

    <section class="category-block" id="components">
      <div class="category-heading">
        <h2>Components</h2>
      </div>

      <div class="board-grid priority-grid component-overview-grid">
        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Button</h3>
            <span class="variant-pill">3 variants</span>
          </div>
          <p class="component-brief">Primary interactive trigger. Pill-radius, min-height 2.75rem. Primary variant uses color-primary with accessible foreground and clear focus treatment.</p>
          <div class="variant-preview-row">
            <button class="preview-button preview-button-primary" type="button">Primary</button>
            <button class="preview-button preview-button-secondary" type="button">Secondary</button>
            <button class="preview-button preview-button-quiet" type="button">Quiet</button>
          </div>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Card</h3>
            <span class="variant-pill">2 variants</span>
          </div>
          <p class="component-brief">Content container with subtle border, radius-lg, and surface token background. Optional elevated variant keeps contrast and separation without visual noise.</p>
          <div class="variant-preview-column">
            <div class="preview-card preview-card-default">
              <strong>Default card</strong>
              <span>Surface background, border-light, radius-lg</span>
            </div>
            <div class="preview-card preview-card-accent">
              <strong>Accent card</strong>
              <span>Surface-alt emphasis for highlighted content</span>
            </div>
          </div>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Input</h3>
            <span class="variant-pill">3 variants</span>
          </div>
          <p class="component-brief">Text input with border-light token and radius-base. Focus ring uses color-primary while labels, helper text, and errors stay readable and explicit.</p>
          <div class="variant-preview-column">
            <label class="preview-field">
              <span>Default</span>
              <input type="text" value="Typed value" aria-label="Default input preview" />
            </label>
            <label class="preview-field preview-field-focus">
              <span>Focus</span>
              <input type="text" value="Focused state" aria-label="Focused input preview" />
            </label>
            <label class="preview-field preview-field-error">
              <span>Error</span>
              <input type="text" value="Needs correction" aria-label="Error input preview" />
            </label>
          </div>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Badge</h3>
            <span class="variant-pill">5 variants</span>
          </div>
          <p class="component-brief">Status indicator using surface-alt background. Used for tags, severity levels, and counts with semantic color variants and readable text.</p>
          <div class="variant-preview-row variant-preview-wrap">
            <span class="preview-badge preview-badge-neutral">Neutral</span>
            <span class="preview-badge preview-badge-success">Success</span>
            <span class="preview-badge preview-badge-warning">Warning</span>
            <span class="preview-badge preview-badge-error">Error</span>
            <span class="preview-badge preview-badge-info">Info</span>
          </div>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Dialog</h3>
            <span class="variant-pill">Preview only</span>
          </div>
          <p class="component-brief">Roadmap component. Styles shown below are static previews, not a built custom element yet. Target: modal overlay with focus trap and keyboard dismissal.</p>
          <div class="variant-preview-column">
            <div class="preview-dialog">
              <strong>Confirm action</strong>
              <span>Primary and secondary actions</span>
            </div>
            <div class="preview-dialog preview-dialog-destructive">
              <strong>Delete item</strong>
              <span>Destructive confirmation variant</span>
            </div>
          </div>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Toast</h3>
            <span class="variant-pill">Preview only</span>
          </div>
          <p class="component-brief">Roadmap component. Styles shown below are static previews, not a built custom element yet. Target: temporary notification with auto-dismiss and polite screen-reader announcement.</p>
          <div class="variant-preview-column">
            <div class="preview-toast preview-toast-success">Success toast</div>
            <div class="preview-toast preview-toast-warning">Warning toast</div>
            <div class="preview-toast preview-toast-error">Error toast</div>
            <div class="preview-toast preview-toast-info">Info toast</div>
          </div>
        </article>
      </div>
    </section>
  </main>
`;
