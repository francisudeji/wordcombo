import { useGameState } from "../../hooks/use-game";
import { cn } from "../../../../lib/utils";
import { getHighlightedColour, mapStatusToColour } from "./utils";
import { Paused } from "./paused";

export function Board() {
  const { board, wordsOfTheDay, paused, count } = useGameState((state) => ({
    board: state.board,
    wordsOfTheDay: state.wordsOfTheDay,
    paused: state.paused,
    count: state.count,
  }));

  if (paused) return <Paused />;

  if (board.size === 0) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center text-center">
        <p className="text-sm text-neutral-500 flex items-center">
          Press{" "}
          <kbd className="font-mono border bg-neutral-50 rounded-md py-0.5 px-1 mx-1">
            <samp>Enter</samp>
          </kbd>{" "}
          or
          <kbd className="font-mono border bg-neutral-50 rounded-md py-0.5 px-1 mx-1">
            {" "}
            <samp className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </samp>
          </kbd>{" "}
          to start
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col xs:w-3/4 sm:px-5 w-full sm:w-3/4 mx-auto rounded-md min-h-full justify-end gap-4">
      {Array.from({ length: board.size })
        .map((_, index) => {
          const word = Array.from(board.entries());
          const colours = getHighlightedColour(
            word[index][0],
            wordsOfTheDay.target
          );
          return (
            <Word
              key={index}
              letters={Array.from<string>({ length: count })
                .fill("")
                .map((_, idx) => word[index]?.[1][idx])}
              colours={colours}
            />
          );
        })
        .reverse()}
    </div>
  );
}

function Word({
  letters,
  colours,
}: {
  letters: string[];
  colours?: ReturnType<typeof getHighlightedColour>;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-5 text-center font-semibold gap-2 sm:gap-4"
      )}
    >
      {letters.map((letter, index) => {
        const letterColour = colours?.[index] ?? mapStatusToColour("-1");
        return (
          <span
            key={index}
            className={cn(
              "py-4 ring-1 ring-white/10 rounded-lg text-xl font-medium flex items-center justify-center",
              letterColour,
              {
                "animate-punchy1": index === 0,
                "animate-punchy2": index === 1,
                "animate-punchy3": index === 2,
                "animate-punchy4": index === 3,
                "animate-punchy5": index === 4,
              }
            )}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}
