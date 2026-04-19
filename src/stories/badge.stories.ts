import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

type Args = {
  tone: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  label: string;
  live: boolean;
};

const meta: Meta<Args> = {
  title: "Components/Badge",
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "accent", "success", "warning", "danger", "info"]
    }
  },
  args: { tone: "neutral", label: "Stable", live: false },
  render: (args) => html`
    <ds-badge tone=${args.tone} ?live=${args.live}>${args.label}</ds-badge>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Neutral: Story = {};

export const AllTones: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <ds-badge tone="neutral">Neutral</ds-badge>
      <ds-badge tone="accent">Accent</ds-badge>
      <ds-badge tone="success">Success</ds-badge>
      <ds-badge tone="warning">Warning</ds-badge>
      <ds-badge tone="danger">Danger</ds-badge>
      <ds-badge tone="info">Info</ds-badge>
    </div>
  `
};

export const LiveRegion: Story = {
  args: { tone: "success", label: "Saved", live: true }
};
