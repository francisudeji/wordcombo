import * as React from "react";
import { GameContext } from "../components/game-provider/game-provider";
import { GameState } from "@components/game-provider/types";

export function useGame() {
  const context = React.useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}

export function useGameState(selector: (state: GameState) => any) {
  const { state } = React.useContext(GameContext);
  const selectedState = React.useMemo(() => selector(state), [state, selector]);

  return selectedState;
}

export function useGameDispatch() {
  const { dispatch } = React.useContext(GameContext);

  return dispatch;
}
