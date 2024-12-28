import { useGameState } from "../../hooks/use-game";
import { cn } from "../../../../lib/utils";
import { getHighlightedColour, mapStatusToColour } from "./utils";
import { Paused } from "./paused";

export function Board() {
  const { board, wordsOfTheDay, paused } = useGameState((state) => ({
    board: state.board,
    wordsOfTheDay: state.wordsOfTheDay,
    paused: state.paused,
  }));

  if (paused) return <Paused />;

  return (
    <div className="flex flex-col xs:w-3/4 sm:px-4 w-full sm:w-3/4 mx-auto rounded-md min-h-full justify-end gap-4">
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
              letters={Array.from<string>({ length: 5 })
                .fill("")
                .map((_, idx) => word[index]?.[1][idx])}
              colours={colours}
            />
          );
        })
        .reverse()
        .concat(<Word key="start" letters={wordsOfTheDay.start.split("")} />)}
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
              "py-4 ring-1 ring-white/10 rounded-lg text-xl font-medium max-w-[60px] max-h-[60px] flex items-center justify-center",
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
