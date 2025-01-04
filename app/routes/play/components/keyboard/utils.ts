export const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
] as const;

export function isKeyHighlighted(key: string, highlightedKey: string) {
  return key.toLowerCase() === highlightedKey.toLowerCase();
}

export function isActionKey(
  keyboardKey: (typeof keyboardRows)[number][number]
) {
  return keyboardKey === "Backspace" || keyboardKey === "Enter";
}

export const validKeys = new Set(
  keyboardRows.flat().filter((key) => key !== "Enter" && key !== "Backspace")
);
