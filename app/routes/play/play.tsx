import { Board } from "./components/board/board";
import { Keyboard } from "./components/keyboard/keyboard";
import { Header } from "./components/header/header";
import { GameProvider } from "./components/game-provider/game-provider";
import { Toaster } from "sonner";
import type { Route } from "./+types/play";
import { CurrentWord } from "./components/current-word/current-word";

export function meta(): Route.MetaDescriptors {
  return [{ title: "Play | WordCombo" }];
}

export function loader() {
  const wordsOfTheDay = { start: "BLINK", target: "SPILL" };
  return { wordsOfTheDay };
}

export default function Play({ loaderData }: Route.ComponentProps) {
  const { wordsOfTheDay } = loaderData;

  return (
    <GameProvider wordsOfTheDay={wordsOfTheDay}>
      <Toaster />
      <div className="h-dvh py-1 flex-1 flex flex-col max-w-xl mx-auto">
        <div className="top-half flex-1 flex flex-col overflow-y-auto scroll-smooth relative">
          <Header />

          <div className="board flex-1 flex flex-col justify-end p-4 my-10">
            <Board />
          </div>
        </div>
        <div className="sticky inset-0 bottom-0 bottom-half justify-end space-y-4 py-2 px-2 border-t sm:border sm:rounded-lg">
          <CurrentWord />
          <Keyboard />
        </div>
      </div>
    </GameProvider>
  );
}
