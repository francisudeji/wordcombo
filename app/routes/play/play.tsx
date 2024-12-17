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

export default function Play() {
  return (
    <GameProvider>
      <Toaster />
      <div className="h-dvh py-1 flex-1 flex flex-col max-w-xl mx-auto">
        <div className="top-half flex-1 flex flex-col overflow-y-auto scroll-smooth relative">
          <Header />

          <div className="board flex-1 flex flex-col justify-end p-4 my-10">
            <Board />
          </div>
        </div>
        <div className="sticky inset-0 bottom-0 bottom-half justify-end space-y-4 py-2 px-2 border-t sm:border sm:rounded-lg">
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