interface Match {
  isPartialMatch: boolean;
  isFullMatch: boolean;
}
interface BoardProps {
  board: string[][];
  currentWord: string[];
  isMatch: (letter: string) => Match;
}
export function Board({ board, currentWord, isMatch }: BoardProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll px-5 relative tex-slate-900">
      <div className="flex-1">stats</div>
      <div className="">
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
                      className={`border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm rounded-sm ${
                        isMatch(letter).isPartialMatch
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
                  className="border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm rounded-sm"
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
