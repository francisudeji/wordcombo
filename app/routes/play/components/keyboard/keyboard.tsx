import { useGameDispatch } from "../../hooks/use-game";
import { useEffect, useState } from "react";
import { keyboardRows, validKeys } from "./utils";
import { KeyboardRow } from "./keyboard-row";

type AlphabeticalKey = Exclude<
  (typeof keyboardRows)[number][number],
  "BACK" | "ENTER"
>;

export function Keyboard() {
  const [highlightedKey, setHighlightedKey] = useState("");
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

      if (
        [
          // "BACK", // BACK comes from the onscreen keyboard
          // "ENTER", // ENTER comes from the onscreen keyboard
          "Backspace",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
        ].includes(e.key)
      ) {
        if (
          e.key === "Enter" &&
          (document.activeElement as HTMLElement).tagName === "BUTTON" // Prevents the enter key from submitting the form if a button on the on-screen keyboard is focused
        ) {
          return;
        }

        return dispatch({ type: "key_clicked", payload: e.key });
      }

      // For A-Z
      const key = e.key.toUpperCase() as AlphabeticalKey;

      if (validKeys.has(key)) {
        dispatch({ type: "key_clicked", payload: e.key.toUpperCase() });
      }

      const hKey =
        e.key === "Backspace" ? "BACK" : e.key === "Enter" ? "ENTER" : e.key;
      setHighlightedKey(hKey);

      setTimeout(() => {
        setHighlightedKey("");
      }, 250);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {keyboardRows.map((row, index) => {
        return (
          <KeyboardRow
            onClick={(key) => dispatch({ type: "key_clicked", payload: key })}
            row={row}
            key={index}
            highlightedKey={highlightedKey}
          />
        );
      })}
    </div>
  );
}
