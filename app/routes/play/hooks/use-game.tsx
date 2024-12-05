import { useContext, useMemo } from "react";
import { GameContext } from "../components/game-provider/game-provider";
import type { Selector, SelectorKey } from "../components/game-provider/types";

export function useGame() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}

export function useGameState<T extends SelectorKey>(selector: Selector<T>) {
  const { state } = useContext(GameContext);
  const selectedState = useMemo(() => selector(state), [state, selector]);

  return selectedState;
}

export function useGameDispatch() {
  const { dispatch } = useContext(GameContext);

  return dispatch;
}
