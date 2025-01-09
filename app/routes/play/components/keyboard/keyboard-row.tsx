import { cn } from "~/lib/utils";
import { isActionKey, type keyboardRows } from "./utils";

interface KeyboardRowProps {
  row: (typeof keyboardRows)[number];
  onClick: (key: string) => void;
  boardSize: number;
  currentWordLength: number;
}

export function KeyboardRow({
  row,
  onClick,
  boardSize,
  currentWordLength,
}: KeyboardRowProps) {
  const isSecondRow = row[0] === "A";
  const isSecondToLastRow = row[0] === "Enter";

  return (
    <div
      className={cn("flex w-full", {
        "gap-2 ": !isSecondRow,
      })}
    >
      {isSecondRow && <div className="flex-[0.5]"></div>}
      {row.map((key, index) => {
        const isUndoKey = key === "Undo";
        const isUndoKeyDisabled = isUndoKey && boardSize < 2;

        const isShuffleKey = key === "Shuffle";
        const isShuffleKeyDisabled =
          (isShuffleKey && currentWordLength < 5) ||
          (isShuffleKey && boardSize === 0);

        return (
          <button
            key={index}
            id={key}
            className={cn(
              "w-full select-none font-medium rounded-md py-3 flex text-lg items-center justify-center bg-white text-center outline-none ring-1 ring-neutral-300 transform transition-transform focus:ring-2 focus:bg-neutral-100 focus:ring-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 active:scale-95 focus:scale-100 aria-disabled:ring-neutral-300/50 aria-disabled:text-neutral-400 aria-disabled:cursor-not-allowed",
              isActionKey(key) && isSecondToLastRow ? "flex-[1.5]" : "flex-1",
              isSecondRow && "second-row-margin flex-1"
            )}
            aria-disabled={
              (isUndoKey && isUndoKeyDisabled) ||
              (isShuffleKey && isShuffleKeyDisabled)
            }
            onClick={() => {
              if (
                (isUndoKey && isUndoKeyDisabled) ||
                (isShuffleKey && isShuffleKeyDisabled)
              ) {
                return;
              }

              onClick(key);
            }}
          >
            {getKeyLabel(key)}
          </button>
        );
      })}
      {isSecondRow && <div className="flex-[0.5]"></div>}
    </div>
  );
}

function getKeyLabel(keyboardKey: string) {
  if (keyboardKey === "Backspace") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
        />
      </svg>
    );
  }
  if (keyboardKey === "Enter") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }

  if (keyboardKey === "Undo") return "Undo last move";

  return keyboardKey;
}
