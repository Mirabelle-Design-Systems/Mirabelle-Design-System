import type { Meta, StoryObj } from "@storybook/web-components";
import { expect, userEvent } from "@storybook/test";
import { html } from "lit";

type Args = {
  title: string;
  body: string;
  headingLevel: "1" | "2" | "3" | "4" | "5" | "6";
  dismissible: boolean;
  label: string;
  open: boolean;
};

const meta: Meta<Args> = {
  title: "Mirabelle DS/Dialog",
  tags: ["autodocs"],
  parameters: {
    actions: {
      handles: ["mirabelle-ds-open", "mirabelle-ds-close"]
    }
  },
  argTypes: {
    title: { control: "text" },
    body: { control: "text" },
    headingLevel: { control: "select", options: ["1", "2", "3", "4", "5", "6"] },
    dismissible: { control: "boolean" },
    label: { control: "text" },
    open: { control: "boolean" }
  },
  args: {
    title: "Confirm action",
    body: "Are you sure you want to continue? This action cannot be undone.",
    headingLevel: "2",
    dismissible: true,
    label: "",
    open: false
  },
  render: (args) => html`
    <div style="display:grid; gap:0.75rem;">
      <mirabelle-ds-button
        @click=${(e: Event) => {
          const host = (e.currentTarget as HTMLElement).parentElement?.querySelector("mirabelle-ds-dialog");
          host?.setAttribute("open", "");
        }}
      >
        Open dialog
      </mirabelle-ds-button>
      <mirabelle-ds-dialog
        heading-level=${args.headingLevel}
        dismissible=${args.dismissible ? "true" : "false"}
        label=${args.label || undefined}
        ?open=${args.open}
      >
        <span slot="title">${args.title}</span>
        <p>${args.body}</p>
        <div slot="footer">
          <mirabelle-ds-button
            variant="secondary"
            @click=${(e: Event) => {
              const host = (e.currentTarget as HTMLElement).closest("mirabelle-ds-dialog") as HTMLElement & {
                close?: () => void;
              };
              host.close?.();
            }}
          >
            Cancel
          </mirabelle-ds-button>
          <mirabelle-ds-button
            @click=${(e: Event) => {
              const host = (e.currentTarget as HTMLElement).closest("mirabelle-ds-dialog") as HTMLElement & {
                close?: () => void;
              };
              host.close?.();
            }}
          >
            Confirm
          </mirabelle-ds-button>
        </div>
      </mirabelle-ds-dialog>
    </div>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Playground: Story = {};

export const ExamplesOpenByDefault: Story = {
  args: {
    open: true,
    title: "Welcome",
    body: "This dialog opened automatically for demonstration."
  }
};

export const EscapeCloses: Story = {
  args: {
    open: true,
    label: "Escape-test dialog",
    title: "Press Escape",
    body: "Pressing Escape should close this dialog."
  },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("mirabelle-ds-dialog") as HTMLElement;
    const inner = host.shadowRoot!.querySelector("dialog") as HTMLDialogElement;
    expect(inner.open).toBe(true);
    await userEvent.keyboard("{Escape}");
    await new Promise((r) => setTimeout(r, 20));
    expect(inner.open).toBe(false);
  }
};
