import { useGameState } from "@hooks/use-game";

export function Board() {
  const { board, currentWord, wordLadder } = useGameState();

  const matches = (letter: string) => {
    let isPartialMatch = false;
    let isFullMatch = false;

    for (let i = 0; i < wordLadder.targetWord.length; i++) {
      isFullMatch = letter === wordLadder.targetWord[i];

      isPartialMatch = wordLadder.targetWord.includes(letter);
    }
    return { isPartialMatch, isFullMatch };
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-scroll px-2 relative tex-slate-900 md:px-16">
      <div className="space-y-4">
        {board.map((b, index) => {
          return (
            <div
              key={`word-${index}`}
              className="grid grid-cols-4 gap-4 text-center font-semibold"
            >
              {b.map((letter, index) => {
                return (
                  <span
                    key={index}
                    className={`border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm rounded-md ${
                      matches(letter).isPartialMatch
                        ? "bg-green-600 text-white"
                        : "bg-transparent"
                    }`}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          );
        })}
        <div className="grid grid-cols-4 gap-4 text-center">
          {currentWord.map((letter, index) => {
            return (
              <span
                key={index}
                className="border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm rounded-md"
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
