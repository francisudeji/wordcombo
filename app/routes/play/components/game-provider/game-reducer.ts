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
      return { ...state, message: action.payload as string };
    }

    case "toggle_paused": {
      return { ...state, paused: !state.paused };
    }

    case "key_clicked": {
      if (action.payload === "BACK") {
        if (state.currentWord.length === 0) {
          return state;
        }

        return {
          ...state,
          currentWord: state.currentWord.slice(0, state.currentWord.length - 1),
        } satisfies GameState;
      }

      if (action.payload === "ENTER") {
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
          board,
        } satisfies GameState;
      }

      if (state.paused) {
        return { ...state, message: "Game is paused. Press play to continue." };
      }

      if (state.currentWord.length === state.count) {
        return state;
      }

      return {
        ...state,
        currentWord: [...state.currentWord, action.payload as string],
      } satisfies GameState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
