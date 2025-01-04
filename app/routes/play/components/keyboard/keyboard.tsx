import { useGameDispatch } from "../../hooks/use-game";
import { useCallback, useEffect, useState } from "react";
import { keyboardRows, validKeys } from "./utils";
import { KeyboardRow } from "./keyboard-row";

type AlphabeticalKey = Exclude<
  (typeof keyboardRows)[number][number],
  "Backspace" | "Enter"
>;

export function Keyboard() {
  const [highlightedKey, setHighlightedKey] = useState("");
  const dispatch = useGameDispatch();

  const handleKeyClick = useCallback(
    (key: string) => {
      dispatch({ type: "keyClicked", payload: key });
    },
    [dispatch]
  );

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

        // return dispatch({ type: "keyClicked", payload: e.key });
        return handleKeyClick(e.key);
      }

      // For A-Z
      const key = e.key.toUpperCase() as AlphabeticalKey;

      if (validKeys.has(key)) {
        // dispatch({ type: "keyClicked", payload: e.key.toUpperCase() });
        handleKeyClick(key.toUpperCase());
      }

      setHighlightedKey(e.key);

      setTimeout(() => {
        setHighlightedKey("");
      }, 250);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyClick]);

  return (
    <div className="space-y-4">
      {keyboardRows.map((row, index) => {
        return (
          <KeyboardRow
            onClick={(key) => handleKeyClick(key)}
            row={row}
            key={index}
            highlightedKey={highlightedKey}
          />
        );
      })}
    </div>
  );
}
