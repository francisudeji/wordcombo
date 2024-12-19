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
    <div className="flex flex-col px-4 w-full sm:w-3/4 mx-auto rounded-md min-h-full justify-end gap-4">
      {Array.from(board.entries())
        .reverse()
        .map(([word, letters], index) => {
          const colours = getHighlightedColour(word, wordsOfTheDay.target);
          return <Word key={index} letters={letters} colours={colours} />;
        })
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
    <div className={cn("grid grid-cols-5 text-center font-semibold gap-4")}>
      {letters.map((letter, index) => {
        const letterColour = colours?.[index] ?? mapStatusToColour("-1");
        return (
          <span
            key={index}
            className={cn(
              "py-4 ring-1 ring-white/10 rounded-lg text-xl font-medium",
              letterColour
            )}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}
