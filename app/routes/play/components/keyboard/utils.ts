export const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ["Undo", "Shuffle"],
] as const;

export function isActionKey(
  keyboardKey: (typeof keyboardRows)[number][number]
) {
  return keyboardKey === "Backspace" || keyboardKey === "Enter";
}

export const validKeys = new Set(
  keyboardRows.flat().map((key) => key.toUpperCase())
);
