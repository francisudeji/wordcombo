import { createContext, useEffect, useMemo, useReducer, useRef } from "react";
import { type GameState, type GameActions } from "./types";
import { toast } from "sonner";

const initialState = {
  count: 5,
  board: new Map([["HELLO", ["H", "E", "L", "L", "O"]]]),
  currentWord: [],
  wordsOfTheDay: { start: "HELLO", target: "WORLD" },
  message: "",
} satisfies GameState;

export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

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

function gameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case "message": {
      return { ...state, message: action.payload as string };
    }
    case "clicked_key": {
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
        const lastEntry = Array.from(state.board.entries()).at(-1)?.[1] ?? [];
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
        if (state.board.has(state.currentWord.join(""))) {
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

// function reviver(key, value) {
//   if (typeof value === "object" && value !== null) {
//     if (value.dataType === "Map") {
//       return new Map(value.value);
//     }
//   }
//   return value;
// }

// function getInitialState() {
//   const storedState = localStorage.getItem("gameState");

//   if (storedState) {
//     return JSON.parse(storedState, reviver);
//   }

//   return initialState;
// }

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (state.message) {
      toast.error(state.message, {
        dismissible: true,
        position: "top-center",
        duration: 1500,
      });

      timer.current = setTimeout(() => {
        dispatch({ type: "message", payload: "" });
      }, 1500);
    }

    return () => {
      toast.dismiss();
      if (timer.current) {
        clearTimeout(timer.current);

        timer.current = null;
      }
    };
  }, [state.message]);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
