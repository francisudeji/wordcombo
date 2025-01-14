import { getStatus } from "../board/utils";
import type { GameActions, GameState } from "./types";

function isOneEditOrSwap(from: string, to: string): boolean {
  const status = getStatus(from, to);

  const isOneChange = status.filter((s) => s === "-1").length === 1;
  const isSwap = status.every((s) => s !== "-1");

  return isOneChange || isSwap;
}

function shuffleCurrentWord(word: string[]): string[] {
  const shuffled = [...word];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function gameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case "messageUpdated": {
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
      const nextCurrentWord = [...state.currentWord];
      nextCurrentWord[action.payload] = state.currentWord[state.cursor];
      nextCurrentWord[state.cursor] = state.currentWord[action.payload];
      return {
        ...state,
        currentWord: nextCurrentWord,
        cursor: action.payload,
      };
    }

    case "dragDropped": {
      const nextCurrentWord = [...state.currentWord];
      nextCurrentWord[action.payload.index] = action.payload.letter;
      return {
        ...state,
        currentWord: nextCurrentWord,
      };
    }

    case "statusUpdated": {
      return { ...state, status: action.payload };
    }

    case "undoTriggered": {
      const nextCursor = action.payload;
      const nextCurrentWord = [...state.currentWord];
      nextCurrentWord[nextCursor] = "";
      return {
        ...state,
        currentWord: nextCurrentWord,
        cursor: nextCursor,
      };
    }

    case "redoTriggered": {
      const nextCursor = action.payload.index;
      const nextCurrentWord = [...state.currentWord];
      nextCurrentWord[nextCursor] = action.payload.letter;
      return {
        ...state,
        currentWord: nextCurrentWord,
        cursor: nextCursor,
      };
    }

    case "keyClicked": {
      if (state.status === "paused") {
        return { ...state, message: "Game is paused. Press play to continue." };
      }

      if (action.payload === "Undo") {
        const lastEntryKey = Array.from(state.board.keys()).at(-1);
        const board = new Map(state.board);

        if (lastEntryKey) {
          board.delete(lastEntryKey);
          return { ...state, board };
        }

        return state;
      }

      if (action.payload === "Shuffle") {
        const shuffled = shuffleCurrentWord(state.currentWord);

        return { ...state, currentWord: shuffled };
      }

      if (action.payload === "Backspace") {
        if (state.board.size === 0) {
          return state;
        }

        const nextCurrentWord = [...state.currentWord];

        if (nextCurrentWord[state.cursor]?.length > 0) {
          nextCurrentWord.splice(state.cursor, 1, "");
          return {
            ...state,
            currentWord: nextCurrentWord,
          };
        }

        const nextCursor = state.cursor <= 0 ? state.cursor : state.cursor - 1;
        nextCurrentWord.splice(nextCursor, 1, "");

        return {
          ...state,
          currentWord: nextCurrentWord,
          cursor: nextCursor,
        } satisfies GameState;
      }

      if (action.payload === "Enter") {
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

        if (
          state.currentWord.filter((w) => Boolean(w)).length !== state.count
        ) {
          return { ...state, message: "Word is not complete" };
        }

        /**
         * Validation checks
         * 4. Changed more than one letter
         */
        if (
          !isOneEditOrSwap(lastEntry.join(""), state.currentWord.join("")) &&
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

      const nextCurrentWord = [...state.currentWord];
      nextCurrentWord[state.cursor] = action.payload;

      return {
        ...state,
        currentWord: nextCurrentWord,
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
