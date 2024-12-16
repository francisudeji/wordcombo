import { WordsOfTheDay } from "./components/words-of-the-day/words-of-the-day";
import { Board } from "./components/board/board";
import { Keyboard } from "./components/keyboard/keyboard";
import { IconButton } from "./components/button/icon-button";
import { Header } from "./components/header/header";
import { GameProvider } from "./components/game-provider/game-provider";
import { Toaster } from "sonner";
import type { Route } from "./+types/play";
import { useGameState } from "./hooks/use-game";

export function meta(): Route.MetaDescriptors {
  return [{ title: "Play | WordCombo" }];
}

const SHOW_BOTTOM_TOOL_BAR = false;

function CurrentWord() {
  const currentWord = useGameState<"currentWord">((state) => state.currentWord);

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

export default function Play() {
  return (
    <GameProvider>
      <Toaster />
      <div className="h-dvh py-1 flex-1 flex flex-col max-w-xl mx-auto">
        <div className="top-half flex-1 flex flex-col overflow-y-auto scroll-smooth relative">
          <Header />

          <div className="board flex-1 flex flex-col justify-end p-4 mt-10">
            <Board />
          </div>
        </div>
        <div className="sticky inset-0 bottom-0 bottom-half justify-end space-y-4 py-2 px-2 border-t sm:border sm:rounded-lg mt-10">
          {SHOW_BOTTOM_TOOL_BAR && (
            <div className="flex justify-between">
              <IconButton title="Toggle keyboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="w-6 h-6"
                >
                  <path d="M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10M8 12h.01" />
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                </svg>
              </IconButton>
              <WordsOfTheDay />
              <IconButton title="Toggle keyboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="w-6 h-6"
                >
                  <path d="M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10M8 12h.01" />
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                </svg>
              </IconButton>
            </div>
          )}

          <div className="grid grid-cols-1 place-items-center">
            <div className="flex items-center justify-center bg-white border rounded-3xl p-4 space-x-4 shadow-lg shadow-neutral-200 -mt-[50px]">
              <CurrentWord />
            </div>
          </div>

          <Keyboard />
        </div>
      </div>
    </GameProvider>
  );
}
