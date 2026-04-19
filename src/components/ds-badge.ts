import { BaseElement } from "./base-element";
import { sharedStyles } from "./shared-styles";

const styles = `
  ${sharedStyles}

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

export class DsBadge extends BaseElement {
  static observedAttributes = ["tone", "live"];

  protected render() {
    const rawTone = this.getAttribute("tone") ?? "neutral";
    const tone = TONES.has(rawTone) ? rawTone : "neutral";
    const live = this.hasAttribute("live");

    this.root.innerHTML = `<style>${styles}</style>`;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.dataset.tone = tone;
    if (live) {
      badge.setAttribute("role", "status");
      badge.setAttribute("aria-live", "polite");
    }
    badge.append(document.createElement("slot"));

    this.root.append(badge);
  }
}
