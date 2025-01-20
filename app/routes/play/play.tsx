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

export function loader({ context }: Route.LoaderArgs) {
  const wordsOfTheDay = context.WORDS_OF_THE_DAY;
  return {
    wordsOfTheDay,
  };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const { wordsOfTheDay } = await serverLoader();
  const storedWordsOfTheDay = window.localStorage.getItem("wordsOfTheDay");

  if (!storedWordsOfTheDay) {
    window.localStorage.setItem("wordsOfTheDay", JSON.stringify(wordsOfTheDay));
    return { wordsOfTheDay };
  }

  try {
    const parsedWordsOfTheDay = JSON.parse(storedWordsOfTheDay);
    if (
      parsedWordsOfTheDay &&
      "start" in parsedWordsOfTheDay &&
      "target" in parsedWordsOfTheDay &&
      parsedWordsOfTheDay.start === wordsOfTheDay.start &&
      parsedWordsOfTheDay.target === wordsOfTheDay.target
    ) {
      return { wordsOfTheDay: parsedWordsOfTheDay };
    }
    window.localStorage.setItem("wordsOfTheDay", JSON.stringify(wordsOfTheDay));
  } catch (error) {
    window.localStorage.setItem("wordsOfTheDay", JSON.stringify(wordsOfTheDay));
  }

  return { wordsOfTheDay };
}

clientLoader.hydrate = true;

export default function Play({ loaderData }: Route.ComponentProps) {
  const { wordsOfTheDay } = loaderData;

  return (
    <GameProvider wordsOfTheDay={wordsOfTheDay}>
      <Toaster />
      <div className="h-dvh py-1 flex-1 flex flex-col max-w-xl mx-auto">
        <div className="top-half flex-1 flex flex-col relative">
          <Header />
          <div className="board flex-1 flex flex-col justify-end p-4 my-10">
            <Board />
          </div>
        </div>
        <div className="sticky inset-0 bottom-0 bottom-half justify-end space-y-4 py-2 px-2 border-t bg-white z-10 sm:border sm:rounded-lg dark:border-white/15 dark:bg-neutral-900">
          <CurrentWord />
          <Keyboard />
        </div>
      </div>
    </GameProvider>
  );
}
