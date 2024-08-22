import { handleDictionaryLookUp } from "../game-provider/utils";
import { useGameDispatch, useGameState } from "../../hooks/use-game";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
] as const;

interface KeyboardLayoutProps {
  onClick: (letter: string) => void;
}

type KeyboardKey = (typeof keyboardRows)[number][number];

interface KeyboardKeyProps extends KeyboardLayoutProps {
  keyboardKey: KeyboardKey;
}

function KeyboardKey({ keyboardKey, onClick }: KeyboardKeyProps) {
  const getDisplayKey = (keyboardKey: KeyboardKey) => {
    if (keyboardKey === "BACK") {
      return (
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
            d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
          />
        </svg>
      );
    }
    if (keyboardKey === "ENTER") {
      return (
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
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      );
    }

    return keyboardKey;
  };

  return (
    <button
      onClick={() => onClick(keyboardKey)}
      className={`py-4 text-slate-900 w-full font-semibold flex items-center justify-center text-center border border-slate-300 rounded-md shadow-sm shadow-slate-300 focus:bg-slate-200 hover:bg-slate-200 active:bg-slate-300`}
    >
      {getDisplayKey(keyboardKey)}
    </button>
  );
}

export function Keyboard() {
  const { currentWord } = useGameState();
  const dispatch = useGameDispatch();

  const handleClick = async (input: string) => {
    // TODO: Temp fix to do async call
    if (input === "ENTER") {
      const exists = await handleDictionaryLookUp(currentWord.join(""));
      if (!exists) {
        dispatch({ type: "message", payload: "Not a dictionary word" });
        return;
      }
    }

    dispatch({ type: "keyboardClick", payload: input });
  };

  return (
    <div className="flex flex-col gap-y-2">
      {keyboardRows.map((row, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between gap-x-1 md:gap-x-2"
          >
            {row.map((key) => (
              <KeyboardKey key={key} keyboardKey={key} onClick={handleClick} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
