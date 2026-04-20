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
  ["mirabelle-ds-button", DsButton],
  ["mirabelle-ds-card", DsCard],
  ["mirabelle-ds-input", DsInput],
  ["mirabelle-ds-badge", DsBadge],
  ["mirabelle-ds-dialog", DsDialog],
  ["mirabelle-ds-toast", DsToast]
] as const;

/** Registers every Mirabelle DS custom element (`mirabelle-ds-*`) once on `customElements`. Safe to call repeatedly (skips tags that are already defined). */
export function defineDesignSystem() {
  for (const [tagName, component] of registry) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, component);
    }
  }
}

export { DsBadge, DsButton, DsCard, DsDialog, DsInput, DsToast };
