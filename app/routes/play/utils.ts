interface WordList {
  [date: string]: { start: string; target: string };
}

const wordList: Record<string, WordList[number]> = {
  "2025-01-14": { start: "PASTE", target: "BOARD" },
  "2025-01-15": { start: "BLINK", target: "SPILL" },
  "2025-01-16": { start: "BUILD", target: "TODAY" },
  "2025-01-17": { start: "SPACE", target: "ASSET" },
  "2025-01-18": { start: "ENTRY", target: "ROUTE" },
  "2025-01-19": { start: "START", target: "TIMER" },
  "2025-01-20": { start: "REACT", target: "STATE" },
};

export function getWordsOfTheDay() {
  const todayUTC = new Date().toISOString().split("T")[0];
  const wordsOfTheDay = wordList[todayUTC] || {
    start: "HELLO",
    target: "WORLD",
  };
  return wordsOfTheDay;
}
