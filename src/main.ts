import { defineDesignSystem } from "./index";
import { bindComponentsControls } from "./demo/components-bindings";
import { demoMarkup } from "./demo/markup";

defineDesignSystem();

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("App root not found");
}

root.innerHTML = demoMarkup;

bindComponentsControls(root);
