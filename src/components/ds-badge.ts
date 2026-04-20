import { LitElement, html, css, nothing } from "lit";
import { sharedStyleSheet } from "./shared-style-sheet";

const badgeStyles = css`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
    min-height: 1.75rem;
    padding: 0 var(--ds-space-3);
    border-radius: var(--ds-radius-pill);
    font-size: var(--ds-font-size-100);
    font-weight: var(--ds-font-weight-semibold);
    letter-spacing: 0.02em;
    border: 1px solid transparent;
  }

  .badge[data-tone="neutral"] {
    background: var(--_surface-subtle);
    color: var(--_text-primary);
    border-color: var(--_border-color);
  }

  .badge[data-tone="accent"] {
    background: color-mix(in srgb, var(--_accent) 14%, var(--_surface));
    color: color-mix(in srgb, var(--_accent) 55%, var(--_text-primary));
    border-color: color-mix(in srgb, var(--_accent) 26%, transparent);
  }

  .badge[data-tone="success"] {
    background: color-mix(in srgb, var(--_success) 14%, var(--_surface));
    color: color-mix(in srgb, var(--_success) 55%, var(--_text-primary));
    border-color: color-mix(in srgb, var(--_success) 26%, transparent);
  }

  .badge[data-tone="warning"] {
    background: color-mix(in srgb, var(--_warning) 16%, var(--_surface));
    color: color-mix(in srgb, var(--_warning) 55%, var(--_text-primary));
    border-color: color-mix(in srgb, var(--_warning) 30%, transparent);
  }

  .badge[data-tone="danger"] {
    background: color-mix(in srgb, var(--_danger) 14%, var(--_surface));
    color: color-mix(in srgb, var(--_danger) 55%, var(--_text-primary));
    border-color: color-mix(in srgb, var(--_danger) 26%, transparent);
  }

  .badge[data-tone="info"] {
    background: color-mix(in srgb, var(--ds-color-info) 14%, var(--_surface));
    color: color-mix(in srgb, var(--ds-color-info) 55%, var(--_text-primary));
    border-color: color-mix(in srgb, var(--ds-color-info) 26%, transparent);
  }
`;

const TONES = new Set(["neutral", "accent", "success", "warning", "danger", "info"]);

export class DsBadge extends LitElement {
  static styles = [sharedStyleSheet, badgeStyles];

  static properties = {
    tone: { type: String, reflect: true },
    live: { type: Boolean, reflect: true }
  };

  tone = "neutral";
  live = false;

  render() {
    const tone = TONES.has(this.tone) ? this.tone : "neutral";
    return html`
      <span
        class="badge"
        data-tone=${tone}
        role=${this.live ? "status" : nothing}
        aria-live=${this.live ? "polite" : nothing}
      >
        <slot></slot>
      </span>
    `;
  }
}
