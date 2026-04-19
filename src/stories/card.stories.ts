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
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: {
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
      <ds-card
        ?elevated=${args.elevated}
        heading-level=${args.headingLevel}
      >
        <span slot="eyebrow">${args.eyebrow}</span>
        <span slot="title">${args.title}</span>
        <p>${args.body}</p>
        <div slot="footer">
          <ds-badge tone="success">Light + dark</ds-badge>
        </div>
      </ds-card>
    </div>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const Elevated: Story = { args: { elevated: true } };

export const BodyOnly: Story = {
  render: () => html`
    <div style="max-width: 22rem;">
      <ds-card>
        <p>Card with no header or footer. Empty sections should not render.</p>
      </ds-card>
    </div>
  `
};
