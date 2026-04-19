import type { Meta, StoryObj } from "@storybook/web-components";
import { expect, userEvent, within } from "@storybook/test";
import { html } from "lit";

const meta: Meta = {
  title: "Components/Dialog",
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj;

export const Trigger: Story = {
  render: () => html`
    <div>
      <ds-button
        @click=${(e: Event) => {
          const host = (e.target as HTMLElement).getRootNode() as Document;
          const dialog = host.querySelector("ds-dialog") as HTMLElement & {
            open: () => void;
          };
          dialog.open();
        }}
      >
        Open dialog
      </ds-button>

      <ds-dialog>
        <span slot="title">Confirm action</span>
        <p>Are you sure you want to continue? This action cannot be undone.</p>
        <div slot="footer">
          <ds-button
            variant="secondary"
            @click=${(e: Event) => {
              const host = (e.target as HTMLElement).closest("ds-dialog") as HTMLElement & {
                close: () => void;
              };
              host.close();
            }}
          >
            Cancel
          </ds-button>
          <ds-button
            @click=${(e: Event) => {
              const host = (e.target as HTMLElement).closest("ds-dialog") as HTMLElement & {
                close: () => void;
              };
              host.close();
            }}
          >
            Confirm
          </ds-button>
        </div>
      </ds-dialog>
    </div>
  `
};

export const OpenByDefault: Story = {
  render: () => html`
    <ds-dialog open>
      <span slot="title">Welcome</span>
      <p>This dialog opened automatically for demonstration.</p>
      <div slot="footer">
        <ds-button
          @click=${(e: Event) => {
            const host = (e.target as HTMLElement).closest("ds-dialog") as HTMLElement & {
              close: () => void;
            };
            host.close();
          }}
        >
          Close
        </ds-button>
      </div>
    </ds-dialog>
  `
};

export const EscapeCloses: Story = {
  render: () => html`
    <ds-dialog open label="Escape-test dialog">
      <span slot="title">Press Escape</span>
      <p>Pressing Escape should close this dialog.</p>
    </ds-dialog>
  `,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("ds-dialog") as HTMLElement;
    const inner = host.shadowRoot!.querySelector("dialog") as HTMLDialogElement;
    expect(inner.open).toBe(true);
    await userEvent.keyboard("{Escape}");
    await new Promise((r) => setTimeout(r, 20));
    expect(inner.open).toBe(false);
  }
};
