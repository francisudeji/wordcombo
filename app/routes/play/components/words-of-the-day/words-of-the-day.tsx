import { useGameState } from "../../hooks/use-game";

export function WordsOfTheDay() {
  const { start, target } = useGameState<"wordsOfTheDay">(
    (state) => state.wordsOfTheDay
  );

  return (
    <div className="flex items-center justify-center space-x-4 text-xs uppercase flex-1">
      <p className="uppercase tracking-wide bg-green-100 text-green-900 rounded-md px-1.5 py-1 border border-green-200">
        {start}
      </p>
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
      <p className="uppercase tracking-wide bg-red-100 text-red-900 rounded-md px-1.5 py-1 border border-red-200">
        {target}
      </p>
    </div>
  );
}
