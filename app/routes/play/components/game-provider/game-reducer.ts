import type { GameActions, GameState } from "./types";

function isOffByOne(from: string, to: string) {
  const changedLetters = [];

  for (let i = 0; i < from.length; i++) {
    if (from.includes(to[i])) {
      continue;
    } else {
      changedLetters.push(to[i]);
    }
  }

  return changedLetters.length === 0 || changedLetters.length === 1;
}

export function gameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case "message": {
      return { ...state, message: action.payload };
    }

    case "cursor_moved": {
      return { ...state, cursor: action.payload };
    }

    case "drag_started": {
      return { ...state, cursor: action.payload };
    }

    case "drag_overed": {
      const newCurrentWord = [...state.currentWord];
      newCurrentWord[action.payload] = state.currentWord[state.cursor];
      newCurrentWord[state.cursor] = state.currentWord[action.payload];
      return {
        ...state,
        currentWord: newCurrentWord,
        cursor: action.payload,
      };
    }

    case "drag_dropped": {
      const newCurrentWord = [...state.currentWord];
      newCurrentWord[action.payload.index] = action.payload.letter;
      return {
        ...state,
        currentWord: newCurrentWord,
      };
    }

    case "toggle_paused": {
      return { ...state, paused: !state.paused };
    }

    case "key_clicked": {
      if (action.payload.toLocaleLowerCase().startsWith("back")) {
        if (state.currentWord.length === 0) {
          return state;
        }

        const newCurrentWord = [...state.currentWord];
        newCurrentWord[state.cursor] = "";

        return {
          ...state,
          currentWord: newCurrentWord,
          cursor: state.cursor <= 0 ? state.cursor : state.cursor - 1,
        } satisfies GameState;
      }

      if (action.payload.toLocaleLowerCase().startsWith("enter")) {
        const lastEntry =
          Array.from(state.board.entries()).at(-1)?.[1] ??
          state.wordsOfTheDay.start.split("");

        /**
         * Validation checks
         * 1. Word is not complete
         */
        if (state.currentWord.length !== state.count) {
          return { ...state, message: "Word is not complete" };
        }

        /**
         * Validation checks
         * 2. Word already exists
         */
        const wordAlreadyExists =
          state.board.has(state.currentWord.join("")) ||
          state.wordsOfTheDay.start === state.currentWord.join("") ||
          state.wordsOfTheDay.target === state.currentWord.join("");

        if (wordAlreadyExists) {
          return { ...state, message: "Word already exists" };
        }

        // TODO: Check if word is in dictionary

        /**
         * Validation checks
         * 3. Word is not valid
         */
        if (lastEntry.length !== state.currentWord.length) {
          return { ...state, message: "Word is not valid" };
        }

        /**
         * Validation checks
         * 4. Changed more than one letter
         */
        if (!isOffByOne(lastEntry.join(""), state.currentWord.join(""))) {
          return { ...state, message: "Can only swap one letter at a time" };
        }

        // TODO: Check if words match target word

        const board = new Map(state.board);
        board.set(state.currentWord.join(""), state.currentWord);

        return {
          ...state,
          currentWord: [],
          cursor: 0,
          board,
        } satisfies GameState;
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
