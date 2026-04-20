import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

type Args = {
  tone: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  label: string;
  live: boolean;
};

const meta: Meta<Args> = {
  title: "Mirabelle DS/Badge",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    live: { control: "boolean" },
    tone: {
      control: "select",
      options: ["neutral", "accent", "success", "warning", "danger", "info"]
    }
  },
  args: { tone: "neutral", label: "Stable", live: false },
  render: (args) => html`
    <mirabelle-ds-badge tone=${args.tone} ?live=${args.live}>${args.label}</mirabelle-ds-badge>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Playground: Story = {};

export const ExamplesAllTones: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mirabelle-ds-badge tone="neutral">Neutral</mirabelle-ds-badge>
      <mirabelle-ds-badge tone="accent">Accent</mirabelle-ds-badge>
      <mirabelle-ds-badge tone="success">Success</mirabelle-ds-badge>
      <mirabelle-ds-badge tone="warning">Warning</mirabelle-ds-badge>
      <mirabelle-ds-badge tone="danger">Danger</mirabelle-ds-badge>
      <mirabelle-ds-badge tone="info">Info</mirabelle-ds-badge>
    </div>
  `
};

export const ExamplesLiveRegion: Story = {
  args: { tone: "success", label: "Saved", live: true }
};
