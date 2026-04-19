import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ForwardedRef,
  type ReactNode
} from "react";

type EventDescriptor = { eventName: string; prop: string };

export interface WrapperOptions {
  tagName: string;
  events?: Record<string, EventDescriptor>;
  booleanProps?: readonly string[];
}

export type WrapperProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
};

export function createWrapper<P extends WrapperProps>(options: WrapperOptions) {
  const { tagName, events, booleanProps } = options;
  const booleanSet = new Set<string>(booleanProps ?? []);
  const eventPropKeys = new Set<string>(events ? Object.keys(events) : []);

  const Component = forwardRef<HTMLElement, P>(function DsReactWrapper(props, forwardedRef) {
    const innerRef = useRef<HTMLElement | null>(null);
    useImperativeHandle(forwardedRef, () => innerRef.current as HTMLElement, []);

    const elementProps: Record<string, unknown> = {};
    const handlerMap = new Map<string, (detail: unknown) => void>();

    for (const [key, value] of Object.entries(props)) {
      if (eventPropKeys.has(key)) {
        if (typeof value === "function") {
          handlerMap.set(key, value as (detail: unknown) => void);
        }
        continue;
      }
      if (booleanSet.has(key)) {
        if (value === true || value === "") {
          elementProps[key] = "";
        }
        continue;
      }
      elementProps[key] = value;
    }

    useEffect(() => {
      const node = innerRef.current;
      if (!node || !events) return;

      const listeners: Array<[string, (event: Event) => void]> = [];
      for (const propKey of Object.keys(events)) {
        const handler = handlerMap.get(propKey);
        if (!handler) continue;
        const descriptor = events[propKey];
        const fn = (event: Event) => handler((event as CustomEvent).detail);
        node.addEventListener(descriptor.eventName, fn);
        listeners.push([descriptor.eventName, fn]);
      }

      return () => {
        for (const [eventName, fn] of listeners) {
          node.removeEventListener(eventName, fn);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, Array.from(handlerMap.values()));

    const { children, ...rest } = elementProps as { children?: ReactNode } & Record<string, unknown>;

    return createElement(
      tagName,
      {
        ref: (node: HTMLElement | null) => {
          innerRef.current = node;
        },
        ...rest
      },
      children
    );
  });

  Component.displayName = `React(${tagName})`;
  return Component;
}
