import { IconButton } from "../../components/button/icon-button";
import { useGameState } from "../../hooks/use-game";
import { WordsOfTheDay } from "../words-of-the-day/words-of-the-day";
import { ClientOnly } from "./client-only";
import { Timer } from "./timer";

export function Header() {
  const paused = useGameState((state) => state.paused);
  return (
    <header className="sticky inset-0 bg-white top-0 header py-1 border-b sm:border sm:rounded-md px-2">
      <div className="flex items-center justify-between ">
        <IconButton title="Back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </IconButton>
        <ClientOnly>
          {() => {
            return <Timer paused={paused} />;
          }}
        </ClientOnly>
        <IconButton title="Back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </IconButton>
      </div>

      <WordsOfTheDay />
    </header>
  );
}
