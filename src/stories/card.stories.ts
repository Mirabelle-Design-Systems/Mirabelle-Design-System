import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

type Args = {
  eyebrow: string;
  title: string;
  body: string;
  elevated: boolean;
  headingLevel: "1" | "2" | "3" | "4" | "5" | "6";
};

const meta: Meta<Args> = {
  title: "Mirabelle DS/Card",
  tags: ["autodocs"],
  argTypes: {
    eyebrow: { control: "text" },
    title: { control: "text" },
    body: { control: "text" },
    elevated: { control: "boolean" },
    headingLevel: { control: "select", options: ["1", "2", "3", "4", "5", "6"] }
  },
  args: {
    eyebrow: "Release",
    title: "Design system ready",
    body: "Web Components stay reusable across frameworks.",
    elevated: false,
    headingLevel: "2"
  },
  render: (args) => html`
    <div style="max-width: 22rem;">
      <mirabelle-ds-card
        ?elevated=${args.elevated}
        heading-level=${args.headingLevel}
      >
        <span slot="eyebrow">${args.eyebrow}</span>
        <span slot="title">${args.title}</span>
        <p>${args.body}</p>
        <div slot="footer">
          <mirabelle-ds-badge tone="success">Light + dark</mirabelle-ds-badge>
        </div>
      </mirabelle-ds-card>
    </div>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Playground: Story = {};

export const ExamplesElevated: Story = { args: { elevated: true } };

export const ExamplesBodyOnly: Story = {
  render: () => html`
    <div style="max-width: 22rem;">
      <mirabelle-ds-card>
        <p>Card with no header or footer. Empty sections should not render.</p>
      </mirabelle-ds-card>
    </div>
  `
};
