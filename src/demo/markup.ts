export const demoMarkup = `
  <a class="skip-link" href="#content">Skip to content</a>
  <main class="ios-showcase" id="content">
    <header class="showcase-header">
      <div class="showcase-copy">
        <span class="eyebrow">Custom made design system</span>
        <h1>Mirabelle DS — Work In Progress</h1>
        <p>
          A custom design system built with Lit-based Web Components (custom elements + shadow DOM), shared CSS design tokens (color, typography, spacing, radius, motion, and layout-oriented    
  primitives), and light/dark themes, with optional React wrappers that render the same tags.
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
        <p>Stack, tokens, brand naming, and accessibility rules for Mirabelle DS.</p>
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
        <span class="category-separator" aria-hidden="true">|</span>
        <p>Control real component props and variants directly on each component instance.</p>
      </div>

      <div class="board-grid component-overview-grid">
        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Button</h3>
          </div>
          <div class="builder-panel">
            <label class="ios-field">
              <span>Label</span>
              <input id="live-button-label" value="Run action" />
            </label>
            <label class="ios-field">
              <span>Variant</span>
              <select id="live-button-variant">
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
                <option value="ghost">ghost</option>
                <option value="danger">danger</option>
              </select>
            </label>
            <label class="ios-field">
              <span>Size</span>
              <select id="live-button-size">
                <option value="sm">sm</option>
                <option value="md" selected>md</option>
                <option value="lg">lg</option>
              </select>
            </label>
            <label class="component-toggle"><input id="live-button-disabled" type="checkbox" /> Disabled</label>
            <label class="component-toggle"><input id="live-button-block" type="checkbox" /> Block</label>
          </div>
          <mirabelle-ds-button id="live-button" variant="primary" size="md">Run action</mirabelle-ds-button>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Card</h3>
          </div>
          <div class="builder-panel">
            <label class="ios-field">
              <span>Heading level</span>
              <select id="live-card-heading-level">
                <option value="2" selected>2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label class="ios-field">
              <span>Eyebrow</span>
              <input id="live-card-eyebrow" value="Playground" />
            </label>
            <label class="ios-field">
              <span>Title</span>
              <input id="live-card-title" value="Card title" />
            </label>
            <label class="ios-field">
              <span>Body</span>
              <input id="live-card-body" value="Card body copy updates in real time." />
            </label>
            <label class="component-toggle"><input id="live-card-elevated" type="checkbox" /> Elevated</label>
          </div>
          <mirabelle-ds-card id="live-card" heading-level="2">
            <span id="live-card-eyebrow-slot" slot="eyebrow">Playground</span>
            <span id="live-card-title-slot" slot="title">Card title</span>
            <p id="live-card-body-slot">Card body copy updates in real time.</p>
            <div slot="footer">
              <mirabelle-ds-badge tone="accent">Footer badge</mirabelle-ds-badge>
            </div>
          </mirabelle-ds-card>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Input</h3>
          </div>
          <div class="builder-panel">
            <label class="ios-field">
              <span>Label</span>
              <input id="live-input-label" value="Email" />
            </label>
            <label class="ios-field">
              <span>Placeholder</span>
              <input id="live-input-placeholder" value="you@example.com" />
            </label>
            <label class="ios-field">
              <span>Helper</span>
              <input id="live-input-helper" value="We only use this for account updates." />
            </label>
            <label class="ios-field">
              <span>Error (optional)</span>
              <input id="live-input-error" value="" />
            </label>
            <label class="component-toggle"><input id="live-input-required" type="checkbox" /> Required</label>
            <label class="component-toggle"><input id="live-input-disabled" type="checkbox" /> Disabled</label>
          </div>
          <mirabelle-ds-input
            id="live-input"
            label="Email"
            name="live-components-input"
            placeholder="you@example.com"
            helper="We only use this for account updates."
          ></mirabelle-ds-input>
          <p class="component-brief" id="live-input-events">Events: waiting for input…</p>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Badge</h3>
          </div>
          <div class="builder-panel">
            <label class="ios-field">
              <span>Text</span>
              <input id="live-badge-text" value="Status: Active" />
            </label>
            <label class="ios-field">
              <span>Tone</span>
              <select id="live-badge-tone">
                <option value="neutral">neutral</option>
                <option value="accent" selected>accent</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="danger">danger</option>
                <option value="info">info</option>
              </select>
            </label>
            <label class="component-toggle"><input id="live-badge-live" type="checkbox" /> aria-live status</label>
          </div>
          <mirabelle-ds-badge id="live-badge" tone="accent">Status: Active</mirabelle-ds-badge>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Dialog</h3>
          </div>
          <div class="builder-panel">
            <label class="ios-field">
              <span>Title</span>
              <input id="live-dialog-title" value="Confirm settings" />
            </label>
            <label class="ios-field">
              <span>Body</span>
              <input id="live-dialog-body" value="This dialog is controlled by live props." />
            </label>
            <label class="ios-field">
              <span>Heading level</span>
              <select id="live-dialog-heading-level">
                <option value="2" selected>2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label class="component-toggle"><input id="live-dialog-dismissible" type="checkbox" checked /> Dismissible</label>
            <button class="preview-button preview-button-secondary" id="live-dialog-open" type="button">Open dialog</button>
          </div>
          <p class="component-brief" id="live-dialog-events">Events: waiting…</p>
          <mirabelle-ds-dialog id="live-dialog" heading-level="2">
            <span id="live-dialog-title-slot" slot="title">Confirm settings</span>
            <p id="live-dialog-body-slot">This dialog is controlled by live props.</p>
            <div slot="footer">
              <mirabelle-ds-button variant="secondary" data-close-dialog="live-dialog">Cancel</mirabelle-ds-button>
              <mirabelle-ds-button variant="primary" data-close-dialog="live-dialog">Continue</mirabelle-ds-button>
            </div>
          </mirabelle-ds-dialog>
        </article>

        <article class="ios-card priority-card">
          <div class="component-overview-head">
            <h3>Toast</h3>
          </div>
          <div class="builder-panel">
            <label class="ios-field">
              <span>Tone</span>
              <select id="live-toast-tone">
                <option value="neutral">neutral</option>
                <option value="success" selected>success</option>
                <option value="warning">warning</option>
                <option value="danger">danger</option>
                <option value="info">info</option>
              </select>
            </label>
            <label class="ios-field">
              <span>Heading</span>
              <input id="live-toast-heading" value="Saved" />
            </label>
            <label class="ios-field">
              <span>Body</span>
              <input id="live-toast-body" value="Your settings were saved." />
            </label>
            <label class="ios-field">
              <span>Duration (ms)</span>
              <input id="live-toast-duration" type="number" min="0" step="500" value="5000" />
            </label>
            <button class="preview-button preview-button-secondary" id="live-toast-open" type="button">Show toast</button>
          </div>
          <p class="component-brief" id="live-toast-events">Events: waiting…</p>
          <mirabelle-ds-toast id="live-toast" tone="success" heading="Saved" duration="5000">
            Your settings were saved.
          </mirabelle-ds-toast>
        </article>
      </div>
    </section>
  </main>
`;
