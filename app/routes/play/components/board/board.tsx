import { useGameState } from "../../hooks/use-game";
import { cn } from "../../../../lib/utils";
import { getHighlightedColour } from "./utils";
import { Paused } from "./paused";

export function Board() {
  const { board, wordsOfTheDay, paused } = useGameState<
    ["board", "wordsOfTheDay", "paused"]
  >((state) => ({
    board: state.board,
    wordsOfTheDay: state.wordsOfTheDay,
    paused: state.paused,
  }));

  if (paused) return <Paused />;

  return (
    <div className="flex flex-col px-4 w-full sm:w-3/4 mx-auto rounded-md min-h-full justify-end gap-4">
      {Array.from(board.entries())
        .reverse()
        .map(([word, letters]) => {
          return (
            <Word
              key={word}
              word={word}
              letters={letters}
              target={wordsOfTheDay.target}
            />
          );
        })}

      <Word
        word={wordsOfTheDay.start}
        letters={wordsOfTheDay.start.split("")}
      />
    </div>
  );
}

function Word({
  word,
  letters,
  target,
}: {
  word: string;
  letters: string[];
  target?: string;
}) {
  const colour = target
    ? getHighlightedColour(word, target)
    : Array.from<string>({ length: word.length }).fill(
        "bg-neutral-500 text-white"
      );

  return (
    <div className={cn("grid grid-cols-5 text-center font-semibold gap-4")}>
      {letters.map((letter, index) => {
        return (
          <span
            key={index}
            className={cn(
              "py-4 ring-1 ring-white/10 rounded-lg text-xl font-medium",
              colour[index]
            )}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}
