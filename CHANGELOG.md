# Changelog

All notable changes to Mirabelle DS are documented here.  
This project follows semantic versioning where it applies: **tag names** and **custom event names** are part of the public API.

## [Unreleased]

### Changed

- **BREAKING:** `mirabelle-ds-input` host event for live typing renamed from `mirabelle-ds-input` to **`mirabelle-ds-field-input`** (avoids confusion with the element tag). Update `addEventListener` and React `onDsInput` wiring (listener target unchanged; event type string changed).
- **Components** now extend **`LitElement`** with declarative `html` templates. **`lit`** is a runtime `dependency` (not only for Storybook).
- **`mirabelle-ds-dialog`** / **`mirabelle-ds-toast`**: the reactive `open` attribute is implemented as internal properties **`dialogOpen`** / **`toastOpen`** so the public **`open()`** / **`close()`** methods remain available (HTML still uses the `open` attribute).

### Added

- **`src/components/shared-style-sheet.ts`**: one shared **`CSSStyleSheet`** built from `sharedStyles`, adopted by every component via `static styles = [sharedStyleSheet, …]` so the token bridge CSS is parsed once per class, not reinjected per instance.
- GitHub PR template with accessibility and keyboard checklist.
- Storybook story titles grouped under **Mirabelle DS/**.

### Removed

- **`src/components/base-element.ts`** (replaced by Lit’s lifecycle and rendering).
