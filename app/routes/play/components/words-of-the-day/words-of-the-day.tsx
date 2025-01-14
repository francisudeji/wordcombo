import { useGameState } from "../../hooks/use-game";
import { WordOfTheDay } from "./word-of-the-day";

export function WordsOfTheDay() {
  const { wordsOfTheDay, status } = useGameState((state) => {
    return {
      wordsOfTheDay: state.wordsOfTheDay,
      status: state.status,
    };
  });

  const { start, target } = wordsOfTheDay;

  if (status === "paused") return null;

  return (
    <div className="grid grid-cols-1 place-items-center absolute top-0 left-0 w-full pointer-events-none">
      <div className="flex items-center justify-center bg-white border rounded-2xl p-2 space-x-2 sm:space-x-4 shadow mt-[50px] dark:bg-neutral-900 dark:border-white/15 dark:shadow-none">
        <WordOfTheDay word={start} />
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
        <WordOfTheDay word={target} />
      </div>
    </div>
  );
}
