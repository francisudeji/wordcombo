import { useGameDispatch, useGameState } from "../../hooks/use-game";
import { useCallback, useEffect, useRef } from "react";
import { keyboardRows, validKeys } from "./utils";
import { KeyboardRow } from "./keyboard-row";
import list from "../../../../list.txt?raw";
import { useHistory } from "../../hooks/use-history";

type AlphabeticalKey = Exclude<
  (typeof keyboardRows)[number][number],
  "Backspace" | "Enter" | "Undo" | "Shuffle"
>;

const dictionary = list.split("\n").reduce((acc, word) => {
  const uppercaseWord = word.toUpperCase();
  acc[uppercaseWord] = uppercaseWord;
  return acc;
}, {} as Record<string, string>);

export function Keyboard() {
  const { currentWord, count, cursor, board } = useGameState((state) => {
    return {
      currentWord: state.currentWord,
      count: state.count,
      cursor: state.cursor,
      board: state.board,
    };
  });
  const dispatch = useGameDispatch();
  const history = useHistory();

  const handleKeyClick = useCallback(
    (key: string) => {
      // Handle A-Z
      if (
        ![
          "Backspace",
          "Enter",
          "ArrowLeft",
          "ArrowRight",
          "Undo", // Undo last move(on-screen keyboard), not to be confused the CMD + Z or Ctrl + Z shortcut
          "Shuffle",
        ].includes(key)
      ) {
        history.push(cursor, key);
        return dispatch({ type: "keyClicked", payload: key });
      }

      // Handle enter key to check dictionary and then continue with the rest of the program
      if (key === "Enter") {
        const word = currentWord.join("");
        if (word.length === count && !dictionary[word]) {
          return dispatch({ type: "messageUpdated", payload: "Invalid word" });
        }

        history.clear();
      }

      dispatch({ type: "keyClicked", payload: key });
    },
    [dispatch, currentWord, count, cursor, history]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.altKey || e.key === " " || e.key === "Tab") {
        return;
      }

      // Undo
      if (
        (!e.shiftKey && e.ctrlKey && e.key.toUpperCase() === "Z") ||
        (!e.shiftKey && e.metaKey && e.key.toUpperCase() === "Z")
      ) {
        history.undo((entry) => {
          dispatch({
            type: "undoTriggered",
            payload: entry.index,
          });
        });
      }

      // Redo
      if (
        (e.shiftKey && e.metaKey && e.key.toUpperCase() === "Z") ||
        (e.shiftKey && e.ctrlKey && e.key.toUpperCase() === "Z")
      ) {
        history.redo((entry) => {
          dispatch({
            type: "redoTriggered",
            payload: {
              index: entry.index,
              letter: entry.letter,
            },
          });
        });
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

      if (e.shiftKey || e.metaKey) {
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
  }, [handleKeyClick, dispatch, history]);

  return (
    <div className="space-y-4">
      {keyboardRows.map((row, index) => {
        const currentWordTrueLength = currentWord.filter((l) =>
          Boolean(l)
        ).length;

        return (
          <KeyboardRow
            onClick={(key) => handleKeyClick(key)}
            row={row}
            key={index}
            boardSize={board.size}
            currentWordLength={currentWordTrueLength}
          />
        );
      })}
    </div>
  );
}
