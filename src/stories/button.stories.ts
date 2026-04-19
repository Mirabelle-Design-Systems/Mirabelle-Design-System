import type { Meta, StoryObj } from "@storybook/web-components";
import { expect, userEvent, within } from "@storybook/test";
import { html } from "lit";

type Args = {
  label: string;
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  disabled: boolean;
  type: "button" | "submit" | "reset";
};

const meta: Meta<Args> = {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    type: { control: "select", options: ["button", "submit", "reset"] }
  },
  args: {
    label: "Continue",
    variant: "primary",
    size: "md",
    disabled: false,
    type: "button"
  },
  render: (args) => html`
    <ds-button
      variant=${args.variant}
      size=${args.size}
      type=${args.type}
      ?disabled=${args.disabled}
    >${args.label}</ds-button>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Primary: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <ds-button variant="primary">Primary</ds-button>
      <ds-button variant="secondary">Secondary</ds-button>
      <ds-button variant="ghost">Ghost</ds-button>
      <ds-button variant="danger">Danger</ds-button>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <ds-button size="sm">Small</ds-button>
      <ds-button size="md">Medium</ds-button>
      <ds-button size="lg">Large</ds-button>
    </div>
  `
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" }
};

export const KeyboardActivation: Story = {
  args: { label: "Press Enter or Space" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvasElement.querySelector("ds-button");
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
      <ds-input label="Name" name="name" value="Mirabelle"></ds-input>
      <ds-button type="submit">Submit</ds-button>
    </form>
  `,
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("ds-button") as HTMLElement;
    const form = canvasElement.querySelector("form") as HTMLFormElement;
    button.shadowRoot!.querySelector("button")!.click();
    await new Promise((r) => setTimeout(r, 20));
    expect(form.dataset.submitted).toBe("true");
  }
};
