import type { Meta, StoryObj } from "@storybook/web-components";
import { expect, userEvent, within } from "@storybook/test";
import { html } from "lit";

type Args = {
  label: string;
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  disabled: boolean;
  block: boolean;
  type: "button" | "submit" | "reset";
};

const meta: Meta<Args> = {
  title: "Mirabelle DS/Button",
  tags: ["autodocs"],
  parameters: {
    actions: {
      handles: ["click mirabelle-ds-button"]
    }
  },
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    block: { control: "boolean" },
    type: { control: "select", options: ["button", "submit", "reset"] }
  },
  args: {
    label: "Continue",
    variant: "primary",
    size: "md",
    disabled: false,
    block: false,
    type: "button"
  },
  render: (args) => html`
    <mirabelle-ds-button
      variant=${args.variant}
      size=${args.size}
      type=${args.type}
      ?disabled=${args.disabled}
      ?block=${args.block}
    >${args.label}</mirabelle-ds-button>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Playground: Story = {};

export const ExamplesVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mirabelle-ds-button variant="primary">Primary</mirabelle-ds-button>
      <mirabelle-ds-button variant="secondary">Secondary</mirabelle-ds-button>
      <mirabelle-ds-button variant="ghost">Ghost</mirabelle-ds-button>
      <mirabelle-ds-button variant="danger">Danger</mirabelle-ds-button>
    </div>
  `
};

export const ExamplesSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <mirabelle-ds-button size="sm">Small</mirabelle-ds-button>
      <mirabelle-ds-button size="md">Medium</mirabelle-ds-button>
      <mirabelle-ds-button size="lg">Large</mirabelle-ds-button>
    </div>
  `
};

export const ExamplesDisabled: Story = {
  args: { disabled: true, label: "Disabled" }
};

export const KeyboardActivation: Story = {
  args: { label: "Press Enter or Space" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvasElement.querySelector("mirabelle-ds-button");
    expect(host).toBeTruthy();
    const inner = host!.shadowRoot!.querySelector("button")!;
    inner.focus();
    expect(host!.shadowRoot!.activeElement).toBe(inner);
    await userEvent.keyboard("{Enter}");
  }
};

export const FormSubmit: Story = {
  render: () => html`
    <form
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        (e.target as HTMLFormElement).dataset.submitted = "true";
      }}
      style="display: grid; gap: 0.75rem; max-width: 16rem;"
    >
      <mirabelle-ds-input label="Name" name="name" value="Mirabelle"></mirabelle-ds-input>
      <mirabelle-ds-button type="submit">Submit</mirabelle-ds-button>
    </form>
  `,
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("mirabelle-ds-button") as HTMLElement;
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    button.shadowRoot!.querySelector("button")!.click();
    await new Promise((r) => setTimeout(r, 20));
    expect(form.dataset.submitted).toBe("true");
  }
};
