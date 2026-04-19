import type { DetailedHTMLProps, HTMLAttributes } from "react";

type DsElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ds-button": DsElementProps & {
        variant?: "primary" | "secondary" | "ghost" | "danger";
        size?: "sm" | "md" | "lg";
        type?: "button" | "submit" | "reset";
        disabled?: boolean | "";
        block?: boolean | "";
        name?: string;
        value?: string;
      };
      "ds-card": DsElementProps & {
        elevated?: boolean | "";
        "heading-level"?: "1" | "2" | "3" | "4" | "5" | "6";
      };
      "ds-input": DsElementProps & {
        label?: string;
        placeholder?: string;
        value?: string;
        helper?: string;
        error?: string;
        type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
        required?: boolean | "";
        disabled?: boolean | "";
        name?: string;
      };
      "ds-badge": DsElementProps & {
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
        live?: boolean | "";
      };
      "ds-dialog": DsElementProps & {
        open?: boolean | "";
        "heading-level"?: "1" | "2" | "3" | "4" | "5" | "6";
        label?: string;
        dismissible?: boolean | "" | "false";
      };
      "ds-toast": DsElementProps & {
        open?: boolean | "";
        tone?: "neutral" | "success" | "warning" | "danger" | "info";
        duration?: number | string;
        heading?: string;
      };
    }
  }
}

export {};
