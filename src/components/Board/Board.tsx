interface BoardProps {
  board: string[][];
  currentWord: string[];
  // isPartialMatch: (letter: string) => boolean;
  isMatch: (letter: string) => {
    isPartialMatch: boolean;
    isFullMatch: boolean;
  };
}
export function Board({ board, currentWord, isMatch }: BoardProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll px-5 relative">
      <div className="flex-1">stats</div>
      <div className="">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            {currentWord.map((letter, index) => {
              return (
                <span
                  key={index}
                  className="border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm"
                >
                  {letter}
                </span>
              );
            })}
          </div>
          {board.map((b, index) => {
            return (
              <div
                key={`word-${index}`}
                className="grid grid-cols-4 gap-4 text-center"
              >
                {b.map((letter, index) => {
                  return (
                    <span
                      key={index}
                      className={`border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm rounded-md ${
                        isMatch(letter).isPartialMatch
                          ? "bg-green-500 text-white"
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
        </div>
      </div>

      {/* <div className="sticky bottom-0 h-10 -mt-5 bg-red-100 dark:bg-slate-600/20 blur-sm">
        <p className="invisible">a</p>
      </div> */}
    </div>
  );
}
