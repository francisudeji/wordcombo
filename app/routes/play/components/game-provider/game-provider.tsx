import { createContext, useEffect, useReducer, useRef } from "react";
import { type GameState, type GameActions } from "./types";
import { toast } from "sonner";
import { gameReducer } from "./game-reducer";

const initialState = {
  count: 5,
  board: new Map(),
  currentWord: [],
  wordsOfTheDay: { start: "HELLO", target: "WORLD" },
  message: "",
  paused: false,
} satisfies GameState;

export const GameStateContext = createContext<GameState>(initialState);
export const GameDispatchContext = createContext<React.Dispatch<GameActions>>(
  () => null
);

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

  function customDispatch(action: GameActions) {
    // if (action.type === "key_clicked") {
    //   if (action.payload === "ENTER") {
    //     window.dispatchEvent(
    //       new CustomEvent("ENTER_KEY_ACTION", {
    //         detail: { word: state.currentWord.join("") },
    //       })
    //     );
    //   }
    // }
    dispatch(action);
  }

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={customDispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}
