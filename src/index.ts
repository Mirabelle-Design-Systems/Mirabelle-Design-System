import "./styles/tokens.css";
import "./styles/themes.css";
import "./styles/base.css";

import { DsBadge } from "./components/ds-badge";
import { DsButton } from "./components/ds-button";
import { DsCard } from "./components/ds-card";
import { DsDialog } from "./components/ds-dialog";
import { DsInput } from "./components/ds-input";
import { DsToast } from "./components/ds-toast";

const registry = [
  ["ds-button", DsButton],
  ["ds-card", DsCard],
  ["ds-input", DsInput],
  ["ds-badge", DsBadge],
  ["ds-dialog", DsDialog],
  ["ds-toast", DsToast]
] as const;

export function defineDesignSystem() {
  for (const [tagName, component] of registry) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, component);
    }
  }
}

export { DsBadge, DsButton, DsCard, DsDialog, DsInput, DsToast };
