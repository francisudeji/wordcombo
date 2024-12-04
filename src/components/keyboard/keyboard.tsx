import { useGameDispatch } from "../../hooks/use-game";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
] as const;

type AlphabeticalKey = Exclude<
  (typeof keyboardRows)[number][number],
  "BACK" | "ENTER"
>;

function isKeyHighlighted(key: string, highlightedKey: string) {
  return key.toLowerCase() === highlightedKey.toLowerCase();
}

function isActionKey(keyboardKey: string) {
  return keyboardKey === "BACK" || keyboardKey === "ENTER";
}

function getKey(keyboardKey: string) {
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
}

const validKeys = new Set(
  keyboardRows.flat().filter((key) => key !== "ENTER" && key !== "BACK")
);

export function KeyboardRow({
  row,
  highlightedKey,
  onClick,
}: {
  row: (typeof keyboardRows)[number];
  highlightedKey: string;
  onClick: (key: string) => void;
}) {
  const isSecondRow = row[0] === "A";

  return (
    <div
      className={cn("grid grid-flow-col gap-2", {
        "px-4": isSecondRow,
      })}
    >
      {row.map((key) => {
        return (
          <button
            key={key}
            className={cn(
              "font-normal rounded-md py-2 flex items-center justify-center text-center bg-white outline-none ring-1 ring-neutral-300 focus:ring-2 focus:bg-neutral-100 focus:ring-neutral-300 hover:bg-neutral-100 active:bg-neutral-200",
              {
                "w-[46px] sm:w-auto": isActionKey(key),
                "w-[34px] sm:w-auto": !isActionKey(key),
                "bg-neutral-100": isKeyHighlighted(key, highlightedKey),
                "bg-white": !isKeyHighlighted(key, highlightedKey),
              }
            )}
            onClick={() => onClick(key)}
          >
            {getKey(key)}
          </button>
        );
      })}
    </div>
  );
}

export function Keyboard() {
  const [highlightedKey, setHighlightedKey] = useState("");
  const timeoutRef = useRef<number | null>(null);
  const dispatch = useGameDispatch();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.shiftKey ||
        e.key === " " ||
        e.key === "Tab"
      ) {
        return;
      }

      const hKey =
        e.key === "Backspace" ? "BACK" : e.key === "Enter" ? "ENTER" : e.key;
      setHighlightedKey(hKey);

      timeoutRef.current = setTimeout(() => {
        setHighlightedKey("");
      }, 250);

      if (e.key === "Backspace") {
        return dispatch({ type: "clicked_key", payload: "BACK" });
      }

      if (e.key === "Enter") {
        return dispatch({ type: "clicked_key", payload: "ENTER" });
      }

      // For A-Z
      const key = e.key.toUpperCase() as AlphabeticalKey;

      if (validKeys.has(key)) {
        dispatch({ type: "clicked_key", payload: e.key.toUpperCase() });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dispatch]);

  return (
    <div className="new-keyboard space-y-4">
      {keyboardRows.map((row, index) => {
        return (
          <KeyboardRow
            onClick={(key) => dispatch({ type: "clicked_key", payload: key })}
            row={row}
            key={index}
            highlightedKey={highlightedKey}
          />
        );
      })}
    </div>
  );
}
