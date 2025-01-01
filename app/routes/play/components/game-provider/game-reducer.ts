import { getStatus } from "../board/utils";
import type { GameActions, GameState } from "./types";

function hasOnlyOneLetterChanged(from: string, to: string) {
  const status = getStatus(from, to);

  return status.filter((s) => s === "-1").length === 1;
}

export function gameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case "message": {
      return { ...state, message: action.payload };
    }

    case "cursorMoved": {
      return {
        ...state,
        cursor: state.board.size === 0 ? state.cursor : action.payload,
      };
    }

    case "dragStarted": {
      return { ...state, cursor: action.payload };
    }

    case "dragHovered": {
      const newCurrentWord = [...state.currentWord];
      newCurrentWord[action.payload] = state.currentWord[state.cursor];
      newCurrentWord[state.cursor] = state.currentWord[action.payload];
      return {
        ...state,
        currentWord: newCurrentWord,
        cursor: action.payload,
      };
    }

    case "dragDropped": {
      const newCurrentWord = [...state.currentWord];
      newCurrentWord[action.payload.index] = action.payload.letter;
      return {
        ...state,
        currentWord: newCurrentWord,
      };
    }

    case "pauseToggled": {
      return { ...state, paused: !state.paused };
    }

    case "keyClicked": {
      if (action.payload.toLocaleLowerCase().startsWith("back")) {
        if (state.board.size === 0) {
          return state;
        }

        if (state.currentWord.length === 0) {
          return state;
        }

        const newCurrentWord = [...state.currentWord];

        if (newCurrentWord[state.cursor]?.length > 0) {
          newCurrentWord.splice(state.cursor, 1);
          return {
            ...state,
            currentWord: newCurrentWord,
          };
        }

        const newCursor = state.cursor <= 0 ? state.cursor : state.cursor - 1;
        newCurrentWord.splice(newCursor, 1);

        return {
          ...state,
          currentWord: newCurrentWord,
          cursor: newCursor,
        } satisfies GameState;
      }

      if (action.payload.toLocaleLowerCase().startsWith("enter")) {
        const lastEntry =
          Array.from(state.board.entries()).at(-1)?.[1] ??
          state.wordsOfTheDay.start.split("");

        /**
         * Validation checks
         * 1. First word is not the start word
         */

        if (
          state.board.size === 0 &&
          state.currentWord.join("") !== state.wordsOfTheDay.start
        ) {
          return { ...state, message: "First word must not be the start word" };
        }
        /**
         * Validation checks
         * 2. Word already exists
         */
        const wordAlreadyExists =
          state.board.has(state.currentWord.join("")) ||
          (state.wordsOfTheDay.start === state.currentWord.join("") &&
            state.board.size > 0);

        if (wordAlreadyExists) {
          return { ...state, message: "Word already exists" };
        }

        /**
         * Validation checks
         * 3. Word is not valid
         */
        if (state.currentWord.length !== state.count) {
          return { ...state, message: "Word is not complete" };
        }

        /**
         * Validation checks
         * 4. Changed more than one letter
         */
        if (
          !hasOnlyOneLetterChanged(
            lastEntry.join(""),
            state.currentWord.join("")
          ) &&
          lastEntry.join("") !== state.currentWord.join("")
        ) {
          return { ...state, message: "Can only swap one letter at a time" };
        }

        const board = new Map(state.board);
        board.set(state.currentWord.join(""), state.currentWord);

        return {
          ...state,
          currentWord: [],
          cursor: 0,
          board,
        } satisfies GameState;
      }

      if (state.board.size === 0) {
        return state;
      }

      if (action.payload === "ArrowLeft") {
        return {
          ...state,
          cursor: state.cursor <= 0 ? state.cursor : state.cursor - 1,
        };
      }

      if (action.payload === "ArrowRight") {
        return {
          ...state,
          cursor:
            state.cursor >= state.count - 1 ? state.cursor : state.cursor + 1,
        };
      }

      if (state.paused) {
        return { ...state, message: "Game is paused. Press play to continue." };
      }

      const newCurrentWord = [...state.currentWord];
      newCurrentWord[state.cursor] = action.payload;

      return {
        ...state,
        currentWord: newCurrentWord,
        cursor:
          state.cursor >= state.count - 1 ? state.cursor : state.cursor + 1,
      } satisfies GameState;
    }
    default: {
      const type: never = action satisfies never;
      throw new Error("Unhandled action type: ", type);
    }
  }
}
