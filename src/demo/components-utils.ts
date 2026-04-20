export function setOptionalAttr(el: Element, name: string, value: string): void {
  if (value.trim()) {
    el.setAttribute(name, value);
  } else {
    el.removeAttribute(name);
  }
}

export function setBooleanAttr(el: Element, name: string, on: boolean): void {
  if (on) {
    el.setAttribute(name, "");
  } else {
    el.removeAttribute(name);
  }
}

export function bindInputSync(
  controls: Array<HTMLInputElement | HTMLSelectElement>,
  callback: () => void
): void {
  controls.forEach((control) => {
    control.addEventListener("input", callback);
    control.addEventListener("change", callback);
  });
}
