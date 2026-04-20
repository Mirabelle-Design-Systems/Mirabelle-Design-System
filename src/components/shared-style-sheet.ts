import { sharedStyles } from "./shared-styles";

/**
 * One parsed stylesheet for the token bridge (`sharedStyles`), adopted by every Mirabelle
 * component so each instance does not re-parse the same CSS string on every render.
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(sharedStyles);

export const sharedStyleSheet = sheet;
