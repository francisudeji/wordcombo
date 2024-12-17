import { useGameState } from "../../hooks/use-game";

export function CurrentWord() {
  const currentWord = useGameState((state) => state.currentWord);

  return Array.from({ length: 5 }).map((_, index) => {
    return (
      <span
        key={index}
        className="text-xl py-2 px-4 rounded-lg border border-dashed font-medium h-[50px] w-[50px] flex items-center justify-center"
      >
        {currentWord[index] ?? " "}
      </span>
    );
  });
}
