import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { defineDesignSystem } from "../index";
import { createWrapper } from "./create-wrapper";

defineDesignSystem();

type BaseProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export type DsButtonProps = BaseProps & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  block?: boolean;
  name?: string;
  "aria-label"?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export const DsButton = createWrapper<DsButtonProps>({
  tagName: "ds-button",
  booleanProps: ["disabled", "block"]
});

export type DsCardProps = BaseProps & {
  elevated?: boolean;
  "heading-level"?: "1" | "2" | "3" | "4" | "5" | "6";
};

export const DsCard = createWrapper<DsCardProps>({
  tagName: "ds-card",
  booleanProps: ["elevated"]
});

export type DsInputProps = BaseProps & {
  label?: string;
  placeholder?: string;
  value?: string;
  helper?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  required?: boolean;
  disabled?: boolean;
  name?: string;
  "aria-label"?: string;
  onDsInput?: (detail: { value: string }) => void;
  onDsChange?: (detail: { value: string }) => void;
};

export const DsInput = createWrapper<DsInputProps>({
  tagName: "ds-input",
  booleanProps: ["required", "disabled"],
  events: {
    onDsInput: { eventName: "ds-input", prop: "onDsInput" },
    onDsChange: { eventName: "ds-change", prop: "onDsChange" }
  }
});

export type DsBadgeProps = BaseProps & {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  live?: boolean;
};

export const DsBadge = createWrapper<DsBadgeProps>({
  tagName: "ds-badge",
  booleanProps: ["live"]
});

export type DsDialogProps = BaseProps & {
  open?: boolean;
  "heading-level"?: "1" | "2" | "3" | "4" | "5" | "6";
  label?: string;
  dismissible?: boolean | "false";
  onDsOpen?: (detail: unknown) => void;
  onDsClose?: (detail: { returnValue: string }) => void;
};

export const DsDialog = createWrapper<DsDialogProps>({
  tagName: "ds-dialog",
  booleanProps: ["open"],
  events: {
    onDsOpen: { eventName: "ds-open", prop: "onDsOpen" },
    onDsClose: { eventName: "ds-close", prop: "onDsClose" }
  }
});

export type DsToastProps = BaseProps & {
  open?: boolean;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  duration?: number;
  heading?: string;
  onDsToastOpen?: (detail: unknown) => void;
  onDsToastClose?: (detail: unknown) => void;
};

export const DsToast = createWrapper<DsToastProps>({
  tagName: "ds-toast",
  booleanProps: ["open"],
  events: {
    onDsToastOpen: { eventName: "ds-toast-open", prop: "onDsToastOpen" },
    onDsToastClose: { eventName: "ds-toast-close", prop: "onDsToastClose" }
  }
});
