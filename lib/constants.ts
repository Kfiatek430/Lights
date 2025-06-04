export const PATTERNS = ["Zimny", "Neutralny", "Ciepły", "Relaks"] as const;

export const PATTERN_OPTIONS = [
  {
    value: "Zimny",
    label: "Zimny",
  },
  {
    value: "Neutralny",
    label: "Neutralny",
  },
  {
    value: "Ciepły",
    label: "Ciepły",
  },
  {
    value: "Relaks",
    label: "Relaks",
  },
] as const;

export const MODES = ["3b", "8b", "16b"] as const;

export const MODE_OPTIONS = [
  {
    value: "3b",
    label: "3-bit",
  },
  {
    value: "8b",
    label: "8-bit",
  },
  {
    value: "16b",
    label: "16-bit",
  },
] as const;

export type Mode = (typeof MODES)[number];
export type Pattern = (typeof PATTERNS)[number];
