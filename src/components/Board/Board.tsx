import { useGameState } from "../../hooks/use-game";
import { cn } from "../../lib/utils";

export function Board() {
  const { board, currentWord, wordsOfTheDay, count } = useGameState(
    (state) => ({
      board: state.board,
      currentWord: state.currentWord,
      wordsOfTheDay: state.wordsOfTheDay,
      count: state.count,
    })
  );

  function determineColors(word: string) {
    const result = Array(word.length).fill(
      "bg-neutral-500 border-neutral-600 text-white"
    ); // Default all to gray
    const targetCharCount: Record<string, number> = {};

    for (const char of wordsOfTheDay.target) {
      targetCharCount[char] = (targetCharCount[char] || 0) + 1;
    }

    for (let i = 0; i < word.length; i++) {
      if (word[i] === wordsOfTheDay.target[i]) {
        result[i] = "bg-green-500 border-green-600 text-white";
        targetCharCount[word[i]] -= 1;
      }
    }

    for (let i = 0; i < word.length; i++) {
      if (
        result[i] === "bg-neutral-500 border-neutral-600 text-white" &&
        targetCharCount[word[i]] > 0
      ) {
        result[i] = "bg-yellow-500 border-yellow-600 text-white";
        targetCharCount[word[i]] -= 1;
      }
    }

    return result;
  }

  return (
    <div className="flex flex-col gap-4 p-4 w-3/4 mx-auto rounded-md min-h-full justify-end">
      <div
        className={cn("grid gap-4 text-center font-semibold", {
          "grid-cols-4": count === 4,
          "grid-cols-5": count === 5,
        })}
      >
        {currentWord.map((letter, index) => {
          return (
            <span key={index} className="py-4 border rounded-md">
              {letter}
            </span>
          );
        })}
      </div>

      {board
        .entries()
        .toArray()
        .reverse()
        .map(([word, letters], rowIndex) => {
          return (
            <div
              key={word}
              className={cn("grid gap-4 text-center font-semibold", {
                "grid-cols-4": count === 4,
                "grid-cols-5": count === 5,
              })}
            >
              {letters.map((letter, index) => {
                if (rowIndex === board.size - 1) {
                  return (
                    <span
                      key={index}
                      className="py-4 border rounded-md bg-white"
                    >
                      {letter}
                    </span>
                  );
                }
                return (
                  <span
                    key={index}
                    className={cn(
                      "py-4 border rounded-md",
                      determineColors(word)[index]
                    )}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
