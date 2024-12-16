/**
 *  1 — letter is in the right position
 *  0 — letter is in the word but in the wrong position
 * -1 — letter is not in the word
 */
type Status = "1" | "0" | "-1";

function determineColour(guessWord: string, targetWord: string) {
  const result = Array<Status>(guessWord.length).fill("-1");

  const targetWordCharCount: Record<string, number> = {};

  for (const char of targetWord) {
    targetWordCharCount[char] = (targetWordCharCount[char] || 0) + 1;
  }

  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] === targetWord[i]) {
      result[i] = "1";
      targetWordCharCount[guessWord[i]] -= 1;
    }
  }

  for (let i = 0; i < guessWord.length; i++) {
    if (result[i] === "-1" && targetWordCharCount[guessWord[i]] > 0) {
      result[i] = "0";
      targetWordCharCount[guessWord[i]] -= 1;
    }
  }

  return result;
}

export function mapStatusToColour(status: Status) {
  switch (status) {
    case "1":
      return "bg-green-500 border-green-600-TODO text-white";
    case "0":
      return "bg-yellow-500 border-yellow-600-TODO text-white";
    case "-1":
      return "bg-neutral-500 border-neutral-600-TODO text-white";
    default:
      throw new Error("Invalid status");
  }
}

export function getHighlightedColour(guessWord: string, targetWord: string) {
  return determineColour(guessWord, targetWord).map((status) =>
    mapStatusToColour(status)
  );
}
