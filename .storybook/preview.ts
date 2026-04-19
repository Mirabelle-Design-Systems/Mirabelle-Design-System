import type { Preview } from "@storybook/web-components";
import { defineDesignSystem } from "../src";

defineDesignSystem();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          { id: "button-name", enabled: true },
          { id: "label", enabled: true },
          { id: "aria-valid-attr", enabled: true }
        ]
      },
      options: {}
    },
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "var(--ds-color-bg-canvas)" },
        { name: "surface", value: "var(--ds-color-bg-surface)" }
      ]
    }
  },
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme ?? "light";
      document.documentElement.setAttribute("data-theme", theme);
      return story();
    }
  ]
};

export default preview;
