import "./styles/tokens.css";
import "./styles/themes.css";
import "./styles/base.css";

import { DsBadge } from "./components/ds-badge";
import { DsButton } from "./components/ds-button";
import { DsCard } from "./components/ds-card";
import { DsInput } from "./components/ds-input";

const registry = [
  ["ds-button", DsButton],
  ["ds-card", DsCard],
  ["ds-input", DsInput],
  ["ds-badge", DsBadge]
] as const;

export function defineDesignSystem() {
  for (const [tagName, component] of registry) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, component);
    }
  }
}

export { DsBadge, DsButton, DsCard, DsInput };
