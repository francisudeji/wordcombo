import { useGameDispatch, useGameState } from "../../hooks/use-game";
import { useCallback, useEffect } from "react";
import { keyboardRows, validKeys } from "./utils";
import { KeyboardRow } from "./keyboard-row";
import list from "../../../../list.txt?raw";

type AlphabeticalKey = Exclude<
  (typeof keyboardRows)[number][number],
  "Backspace" | "Enter"
>;

const dictionary = list.split("\n").reduce((acc, word) => {
  const uppercaseWord = word.toUpperCase();
  acc[uppercaseWord] = uppercaseWord;
  return acc;
}, {} as Record<string, string>);

export function Keyboard() {
  const { currentWord, count } = useGameState((state) => {
    return {
      currentWord: state.currentWord,
      count: state.count,
    };
  });
  const dispatch = useGameDispatch();

  const handleKeyClick = useCallback(
    (key: string) => {
      if (key !== "Enter") {
        return dispatch({ type: "keyClicked", payload: key });
      }

      const word = currentWord.join("");

      if (word.length === count && !dictionary[word]) {
        return dispatch({ type: "messageUpdated", payload: "Invalid word" });
      }

      dispatch({ type: "keyClicked", payload: key });
    },
    [dispatch, currentWord, count]
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
        !validKeys.has(e.key.toUpperCase() as AlphabeticalKey) &&
        !["ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        return;
      }

      // Special case — prevent the enter key from submitting the form if a button on the on-screen keyboard is focused
      if (
        e.key === "Enter" &&
        (document.activeElement as HTMLElement).tagName === "BUTTON"
      ) {
        return;
      }

      const isActionKey = [
        "Backspace",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key);
      const key = isActionKey ? e.key : e.key.toUpperCase();

      handleKeyClick(key);

      document
        .getElementById(key)
        ?.classList.replace("bg-white", "bg-neutral-100");

      setTimeout(() => {
        document
          .getElementById(key)
          ?.classList.replace("bg-neutral-100", "bg-white");
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
          />
        );
      })}
    </div>
  );
}
