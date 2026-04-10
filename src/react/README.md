# React Layer Plan

Keep the Web Component layer as the source of truth. When you add React later, create a sibling
package such as `packages/react` or `src/react` that does two things:

1. Imports `defineDesignSystem()` once so the custom elements are registered.
2. Exposes thin React wrappers that forward props, refs, and custom events.

Example wrapper shape:

```tsx
import { forwardRef, useEffect, useRef } from "react";
import { defineDesignSystem } from "../index";

defineDesignSystem();

type DsInputProps = React.ComponentPropsWithoutRef<"ds-input"> & {
  onDsInput?: (value: string) => void;
};

export const DsInputReact = forwardRef<HTMLElement, DsInputProps>(function DsInputReact(
  { onDsInput, ...props },
  forwardedRef
) {
  const innerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = innerRef.current;
    if (!node || !onDsInput) return;

    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ value: string }>;
      onDsInput(customEvent.detail.value);
    };

    node.addEventListener("ds-input", handler);
    return () => node.removeEventListener("ds-input", handler);
  }, [onDsInput]);

  return <ds-input ref={(node) => {
    innerRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }} {...props} />;
});
```

That keeps React as an adapter layer rather than a rewrite.
