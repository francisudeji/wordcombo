import * as React from "react";
import { GameState, GameActions } from "./types";
import {
  handleAlphabetClick,
  handleBackClick,
  handleEnterClick,
} from "./utils";

const initialState = {
  count: 0,
  board: [],
  currentWord: [],
  wordLadder: { startWord: "COLD", targetWord: "WARM" },
  message: "",
} satisfies GameState;

export const GameContext = React.createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

function gameReducer(state: GameState, action: GameActions) {
  const nextState = { ...state };

  switch (action.type) {
    case "message": {
      nextState.message = action.payload ?? "";
      break;
    }
    case "keyboardClick": {
      if (state.message.length) {
        nextState.message = "";
      }

      if (action.payload === "BACK") {
        handleBackClick({ state, nextState });
        break;
      }

      if (action.payload === "ENTER") {
        handleEnterClick({ state, nextState });
        break;
      }

      // For A-Z
      handleAlphabetClick({ state, nextState, action });
      break;
    }
    default: {
      break;
    }
  }

  return nextState;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(gameReducer, { ...initialState });

  const value = { state, dispatch };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
