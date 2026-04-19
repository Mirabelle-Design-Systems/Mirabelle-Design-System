import type { Meta, StoryObj } from "@storybook/web-components";
import { expect, userEvent, within } from "@storybook/test";
import { html } from "lit";

type Args = {
  label: string;
  placeholder: string;
  helper: string;
  error: string;
  required: boolean;
  disabled: boolean;
  type: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  value: string;
};

const meta: Meta<Args> = {
  title: "Components/Input",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"]
    }
  },
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helper: "We only use this to send receipts.",
    error: "",
    required: false,
    disabled: false,
    type: "email",
    value: ""
  },
  render: (args) => html`
    <ds-input
      label=${args.label}
      placeholder=${args.placeholder}
      helper=${args.helper}
      error=${args.error}
      type=${args.type}
      value=${args.value}
      ?required=${args.required}
      ?disabled=${args.disabled}
      style="max-width: 18rem;"
    ></ds-input>
  `
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helper: "Use the email on file with your account." }
};

export const WithError: Story = {
  args: { error: "Enter a valid email address." }
};

export const Required: Story = {
  args: { required: true, label: "Full name", helper: "Required field" }
};

export const Disabled: Story = {
  args: { disabled: true, value: "locked@example.com" }
};

export const LabelAssociation: Story = {
  args: { label: "Project name", helper: "Lowercase letters and dashes only." },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("ds-input") as HTMLElement;
    const shadow = host.shadowRoot!;
    const label = shadow.querySelector("label")!;
    const input = shadow.querySelector("input")!;
    expect(label.getAttribute("for")).toBe(input.id);
    expect(input.getAttribute("aria-describedby")).toContain("helper");
  }
};

export const ErrorAnnounces: Story = {
  args: { error: "Value is required", required: true },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("ds-input") as HTMLElement;
    const shadow = host.shadowRoot!;
    const input = shadow.querySelector("input")!;
    const alert = shadow.querySelector('[role="alert"]');
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(alert).toBeTruthy();
  }
};

export const TypingFires: Story = {
  args: { label: "Search", type: "search", placeholder: "Search" },
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("ds-input") as HTMLElement;
    const input = host.shadowRoot!.querySelector("input")!;
    await userEvent.click(input);
    await userEvent.keyboard("mirabelle");
    expect((host as unknown as { value: string }).value).toBe("mirabelle");
  }
};
