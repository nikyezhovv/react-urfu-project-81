export const toText = (value: unknown): string =>
  value === null || value === undefined ? "" : String(value);

export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);
