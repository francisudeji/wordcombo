export const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
] as const;

export function isKeyHighlighted(key: string, highlightedKey: string) {
  return key.toLowerCase() === highlightedKey.toLowerCase();
}

export function isActionKey(keyboardKey: string) {
  return keyboardKey === "BACK" || keyboardKey === "ENTER";
}

export const validKeys = new Set(
  keyboardRows.flat().filter((key) => key !== "ENTER" && key !== "BACK")
);
