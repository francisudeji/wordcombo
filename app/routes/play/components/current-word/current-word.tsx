import { cn } from "~/lib/utils";
import { useGameState } from "../../hooks/use-game";

export function CurrentWord() {
  const { currentWord, message, count, cursor } = useGameState((state) => ({
    currentWord: state.currentWord,
    message: state.message,
    count: state.count,
    cursor: state.cursor,
  }));

  return (
    <div className="grid grid-cols-1 place-items-center ">
      <div
        className={cn(
          "flex items-center justify-center bg-white border rounded-3xl p-4 space-x-4 shadow-lg shadow-neutral-200 -mt-[50px]",
          message ? "animate-wiggle" : ""
        )}
      >
        {Array.from({ length: count }).map((_, index) => {
          return (
            <span
              key={index}
              className={cn(
                "text-xl py-2 px-4 rounded-lg border border-dashed font-medium h-[50px] w-[50px] flex items-center justify-center transform transition-transform duration-200 hover:scale-105",
                {
                  "border-indigo-300": index === cursor,
                }
              )}
            >
              {currentWord[index] ?? " "}
            </span>
          );
        })}
      </div>
    </div>
  );
}
