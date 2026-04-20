import type { Meta, StoryObj } from "@storybook/web-components";
import { expect } from "@storybook/test";
import { html } from "lit";

type Args = {
  tone: "neutral" | "success" | "warning" | "danger" | "info";
  heading: string;
  body: string;
  duration: number;
  open: boolean;
};

const meta: Meta<Args> = {
  title: "Mirabelle DS/Toast",
  tags: ["autodocs"],
  parameters: {
    actions: {
      handles: ["mirabelle-ds-toast-open", "mirabelle-ds-toast-close"]
    }
  },
  argTypes: {
    heading: { control: "text" },
    body: { control: "text" },
    duration: { control: { type: "number", min: 0, step: 500 } },
    open: { control: "boolean" },
    tone: { control: "select", options: ["neutral", "success", "warning", "danger", "info"] }
  },
  args: {
    tone: "success",
    heading: "Saved",
    body: "Your changes were saved successfully.",
    duration: 0,
    open: true
  },
  render: (args) => html`
    <div role="region" aria-label="Notifications" style="display: grid; gap: 0.5rem;">
      <mirabelle-ds-toast
        tone=${args.tone}
        heading=${args.heading}
        duration=${args.duration}
        ?open=${args.open}
      >${args.body}</mirabelle-ds-toast>
    </div>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Playground: Story = {};

export const ExamplesAllTones: Story = {
  render: () => html`
    <div role="region" aria-label="Notifications" style="display: grid; gap: 0.5rem;">
      <mirabelle-ds-toast open tone="neutral" heading="Neutral" duration="0">Default announcement.</mirabelle-ds-toast>
      <mirabelle-ds-toast open tone="success" heading="Success" duration="0">Saved successfully.</mirabelle-ds-toast>
      <mirabelle-ds-toast open tone="warning" heading="Warning" duration="0">Review before continuing.</mirabelle-ds-toast>
      <mirabelle-ds-toast open tone="danger" heading="Error" duration="0">Something went wrong.</mirabelle-ds-toast>
      <mirabelle-ds-toast open tone="info" heading="Info" duration="0">New release available.</mirabelle-ds-toast>
    </div>
  `
};

export const PoliteLiveRegion: Story = {
  args: { tone: "success", heading: "Saved" },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("mirabelle-ds-toast") as HTMLElement;
    expect(host.getAttribute("role")).toBe("status");
    expect(host.getAttribute("aria-live")).toBe("polite");
  }
};

export const AssertiveForErrors: Story = {
  args: { tone: "danger", heading: "Failed" },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("mirabelle-ds-toast") as HTMLElement;
    expect(host.getAttribute("role")).toBe("alert");
    expect(host.getAttribute("aria-live")).toBe("assertive");
  }
};
