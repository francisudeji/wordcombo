import {
  createContext,
  useEffect,
  useReducer,
  useRef,
  type PropsWithChildren,
} from "react";
import { type GameState, type GameActions } from "./types";
import { toast } from "sonner";
import { gameReducer } from "./game-reducer";

function createInitialState({
  wordsOfTheDay,
}: {
  wordsOfTheDay: GameState["wordsOfTheDay"];
}): GameState {
  if (wordsOfTheDay.start.length !== wordsOfTheDay.target.length) {
    throw new Error("Start and target words must be the same length");
  }

  const board = new Map<string, string[]>();

  return {
    count: wordsOfTheDay.start.length,
    board,
    currentWord: [...wordsOfTheDay.start],
    wordsOfTheDay,
    message: "",
    paused: false,
    cursor: board.size === 0 ? -1 : 0,
  } satisfies GameState;
}

export const GameStateContext = createContext<GameState | null>(null);
export const GameDispatchContext = createContext<React.Dispatch<GameActions>>(
  () => null
);

interface GameProviderProps {
  wordsOfTheDay: { start: string; target: string };
}

export function GameProvider({
  wordsOfTheDay,
  children,
}: PropsWithChildren<GameProviderProps>) {
  const [state, dispatch] = useReducer(
    gameReducer,
    { wordsOfTheDay },
    createInitialState
  );
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

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}
