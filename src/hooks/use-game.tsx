import * as React from "react";
import { GameContext } from "../components/game-provider/game-provider";

export function useGame() {
  const context = React.useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}

export function useGameState() {
  const { state } = React.useContext(GameContext);

  return state;
}

export function useGameDispatch() {
  const { dispatch } = React.useContext(GameContext);

  return dispatch;
}
