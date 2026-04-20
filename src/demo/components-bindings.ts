import { bindInputSync, setBooleanAttr, setOptionalAttr } from "./components-utils";

type LiveButtonEl = HTMLElement & {
  variant: string;
  size: string;
  disabled: boolean;
  block: boolean;
};

type LiveCardEl = HTMLElement & {
  headingLevel: string;
  elevated: boolean;
};

type LiveInputEl = HTMLElement & {
  label: string;
  placeholder: string;
  helper: string;
  error: string;
  required: boolean;
  disabled: boolean;
};

type LiveBadgeEl = HTMLElement & {
  tone: string;
  live: boolean;
};

type LiveDialogEl = HTMLElement & {
  headingLevel: string;
  dismissible: boolean;
  open: () => void;
};

type LiveToastEl = HTMLElement & {
  tone: string;
  heading: string;
  duration: number;
  show: () => void;
};

export function bindComponentsControls(container: HTMLElement): void {
  const liveButton = container.querySelector<LiveButtonEl>("#live-button");
  const liveButtonLabel = container.querySelector<HTMLInputElement>("#live-button-label");
  const liveButtonVariant = container.querySelector<HTMLSelectElement>("#live-button-variant");
  const liveButtonSize = container.querySelector<HTMLSelectElement>("#live-button-size");
  const liveButtonDisabled = container.querySelector<HTMLInputElement>("#live-button-disabled");
  const liveButtonBlock = container.querySelector<HTMLInputElement>("#live-button-block");
  if (
    liveButton &&
    liveButtonLabel &&
    liveButtonVariant &&
    liveButtonSize &&
    liveButtonDisabled &&
    liveButtonBlock
  ) {
    const syncButton = () => {
      liveButton.textContent = liveButtonLabel.value || "Run action";
      liveButton.variant = liveButtonVariant.value;
      liveButton.setAttribute("variant", liveButtonVariant.value);
      liveButton.size = liveButtonSize.value;
      liveButton.setAttribute("size", liveButtonSize.value);
      liveButton.disabled = liveButtonDisabled.checked;
      setBooleanAttr(liveButton, "disabled", liveButtonDisabled.checked);
      liveButton.block = liveButtonBlock.checked;
      setBooleanAttr(liveButton, "block", liveButtonBlock.checked);
    };
    bindInputSync(
      [liveButtonLabel, liveButtonVariant, liveButtonSize, liveButtonDisabled, liveButtonBlock],
      syncButton
    );
    syncButton();
  }

  const liveCard = container.querySelector<LiveCardEl>("#live-card");
  const liveCardHeading = container.querySelector<HTMLSelectElement>("#live-card-heading-level");
  const liveCardEyebrow = container.querySelector<HTMLInputElement>("#live-card-eyebrow");
  const liveCardTitle = container.querySelector<HTMLInputElement>("#live-card-title");
  const liveCardBody = container.querySelector<HTMLInputElement>("#live-card-body");
  const liveCardElevated = container.querySelector<HTMLInputElement>("#live-card-elevated");
  const liveCardEyebrowSlot = container.querySelector("#live-card-eyebrow-slot");
  const liveCardTitleSlot = container.querySelector("#live-card-title-slot");
  const liveCardBodySlot = container.querySelector("#live-card-body-slot");
  if (
    liveCard &&
    liveCardHeading &&
    liveCardEyebrow &&
    liveCardTitle &&
    liveCardBody &&
    liveCardElevated &&
    liveCardEyebrowSlot &&
    liveCardTitleSlot &&
    liveCardBodySlot
  ) {
    const syncCard = () => {
      liveCard.headingLevel = liveCardHeading.value;
      liveCard.setAttribute("heading-level", liveCardHeading.value);
      liveCard.elevated = liveCardElevated.checked;
      setBooleanAttr(liveCard, "elevated", liveCardElevated.checked);
      liveCardEyebrowSlot.textContent = liveCardEyebrow.value || "Playground";
      liveCardTitleSlot.textContent = liveCardTitle.value || "Card title";
      liveCardBodySlot.textContent = liveCardBody.value || "Card body copy updates in real time.";
    };
    bindInputSync([liveCardHeading, liveCardEyebrow, liveCardTitle, liveCardBody, liveCardElevated], syncCard);
    syncCard();
  }

  const liveInput = container.querySelector<LiveInputEl>("#live-input");
  const liveInputLabel = container.querySelector<HTMLInputElement>("#live-input-label");
  const liveInputPlaceholder = container.querySelector<HTMLInputElement>("#live-input-placeholder");
  const liveInputHelper = container.querySelector<HTMLInputElement>("#live-input-helper");
  const liveInputError = container.querySelector<HTMLInputElement>("#live-input-error");
  const liveInputRequired = container.querySelector<HTMLInputElement>("#live-input-required");
  const liveInputDisabled = container.querySelector<HTMLInputElement>("#live-input-disabled");
  const liveInputEvents = container.querySelector("#live-input-events");
  if (
    liveInput &&
    liveInputLabel &&
    liveInputPlaceholder &&
    liveInputHelper &&
    liveInputError &&
    liveInputRequired &&
    liveInputDisabled &&
    liveInputEvents
  ) {
    const syncInput = () => {
      liveInput.label = liveInputLabel.value.trim();
      setOptionalAttr(liveInput, "label", liveInputLabel.value.trim());
      liveInput.placeholder = liveInputPlaceholder.value.trim();
      setOptionalAttr(liveInput, "placeholder", liveInputPlaceholder.value.trim());
      liveInput.helper = liveInputHelper.value.trim();
      setOptionalAttr(liveInput, "helper", liveInputHelper.value.trim());
      liveInput.error = liveInputError.value.trim();
      setOptionalAttr(liveInput, "error", liveInputError.value.trim());
      liveInput.required = liveInputRequired.checked;
      setBooleanAttr(liveInput, "required", liveInputRequired.checked);
      liveInput.disabled = liveInputDisabled.checked;
      setBooleanAttr(liveInput, "disabled", liveInputDisabled.checked);
    };
    bindInputSync(
      [liveInputLabel, liveInputPlaceholder, liveInputHelper, liveInputError, liveInputRequired, liveInputDisabled],
      syncInput
    );
    liveInput.addEventListener("mirabelle-ds-field-input", (event) => {
      const detail = (event as CustomEvent<{ value: string }>).detail?.value ?? "";
      liveInputEvents.textContent = `Events: mirabelle-ds-field-input -> "${detail}"`;
    });
    liveInput.addEventListener("mirabelle-ds-change", (event) => {
      const detail = (event as CustomEvent<{ value: string }>).detail?.value ?? "";
      liveInputEvents.textContent = `Events: mirabelle-ds-change -> "${detail}"`;
    });
    syncInput();
  }

  const liveBadge = container.querySelector<LiveBadgeEl>("#live-badge");
  const liveBadgeText = container.querySelector<HTMLInputElement>("#live-badge-text");
  const liveBadgeTone = container.querySelector<HTMLSelectElement>("#live-badge-tone");
  const liveBadgeLive = container.querySelector<HTMLInputElement>("#live-badge-live");
  if (liveBadge && liveBadgeText && liveBadgeTone && liveBadgeLive) {
    const syncBadge = () => {
      liveBadge.textContent = liveBadgeText.value || "Status: Active";
      liveBadge.tone = liveBadgeTone.value;
      liveBadge.setAttribute("tone", liveBadgeTone.value);
      liveBadge.live = liveBadgeLive.checked;
      setBooleanAttr(liveBadge, "live", liveBadgeLive.checked);
    };
    bindInputSync([liveBadgeText, liveBadgeTone, liveBadgeLive], syncBadge);
    syncBadge();
  }

  const liveDialog = container.querySelector<LiveDialogEl>("#live-dialog");
  const liveDialogTitle = container.querySelector<HTMLInputElement>("#live-dialog-title");
  const liveDialogBody = container.querySelector<HTMLInputElement>("#live-dialog-body");
  const liveDialogHeading = container.querySelector<HTMLSelectElement>("#live-dialog-heading-level");
  const liveDialogDismissible = container.querySelector<HTMLInputElement>("#live-dialog-dismissible");
  const liveDialogOpen = container.querySelector<HTMLButtonElement>("#live-dialog-open");
  const liveDialogTitleSlot = container.querySelector("#live-dialog-title-slot");
  const liveDialogBodySlot = container.querySelector("#live-dialog-body-slot");
  const liveDialogEvents = container.querySelector("#live-dialog-events");
  if (
    liveDialog &&
    liveDialogTitle &&
    liveDialogBody &&
    liveDialogHeading &&
    liveDialogDismissible &&
    liveDialogOpen &&
    liveDialogTitleSlot &&
    liveDialogBodySlot &&
    liveDialogEvents
  ) {
    const syncDialog = () => {
      liveDialog.headingLevel = liveDialogHeading.value;
      liveDialog.dismissible = liveDialogDismissible.checked;
      liveDialogTitleSlot.textContent = liveDialogTitle.value || "Confirm settings";
      liveDialogBodySlot.textContent = liveDialogBody.value || "This dialog is controlled by live props.";
    };
    bindInputSync([liveDialogTitle, liveDialogBody, liveDialogHeading, liveDialogDismissible], syncDialog);
    liveDialogOpen.addEventListener("click", () => {
      liveDialog.open();
    });
    liveDialog.addEventListener("mirabelle-ds-open", () => {
      liveDialogEvents.textContent = "Events: mirabelle-ds-open";
    });
    liveDialog.addEventListener("mirabelle-ds-close", (event) => {
      const returnValue = (event as CustomEvent<{ returnValue: string }>).detail?.returnValue ?? "";
      liveDialogEvents.textContent = `Events: mirabelle-ds-close -> "${returnValue}"`;
    });
    syncDialog();
  }

  const liveToast = container.querySelector<LiveToastEl>("#live-toast");
  const liveToastTone = container.querySelector<HTMLSelectElement>("#live-toast-tone");
  const liveToastHeading = container.querySelector<HTMLInputElement>("#live-toast-heading");
  const liveToastBody = container.querySelector<HTMLInputElement>("#live-toast-body");
  const liveToastDuration = container.querySelector<HTMLInputElement>("#live-toast-duration");
  const liveToastOpen = container.querySelector<HTMLButtonElement>("#live-toast-open");
  const liveToastEvents = container.querySelector("#live-toast-events");
  if (
    liveToast &&
    liveToastTone &&
    liveToastHeading &&
    liveToastBody &&
    liveToastDuration &&
    liveToastOpen &&
    liveToastEvents
  ) {
    const syncToast = () => {
      liveToast.tone = liveToastTone.value;
      liveToast.setAttribute("tone", liveToastTone.value);
      liveToast.heading = liveToastHeading.value.trim();
      setOptionalAttr(liveToast, "heading", liveToastHeading.value.trim());
      liveToast.textContent = liveToastBody.value || "Your settings were saved.";
      const parsedDuration = Number(liveToastDuration.value);
      if (Number.isFinite(parsedDuration) && parsedDuration >= 0) {
        liveToast.duration = parsedDuration;
        liveToast.setAttribute("duration", String(parsedDuration));
      }
    };
    bindInputSync([liveToastTone, liveToastHeading, liveToastBody, liveToastDuration], syncToast);
    liveToastOpen.addEventListener("click", () => {
      syncToast();
      liveToast.show();
    });
    liveToast.addEventListener("mirabelle-ds-toast-open", () => {
      liveToastEvents.textContent = "Events: mirabelle-ds-toast-open";
    });
    liveToast.addEventListener("mirabelle-ds-toast-close", () => {
      liveToastEvents.textContent = "Events: mirabelle-ds-toast-close";
    });
    syncToast();
  }
}
