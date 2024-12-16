import { useContext, useMemo, useCallback } from "react";
import {
  GameStateContext,
  GameDispatchContext,
} from "../components/game-provider/game-provider";
import type { Selector, SelectorKey } from "../components/game-provider/types";

export function useGameState<T extends SelectorKey>(selector: Selector<T>) {
  const state = useContext(GameStateContext);

  if (state === undefined) {
    throw new Error("useGameState must be used within a GameProvider");
  }

  const selectedState = useCallback(() => selector(state), [state, selector]);

  return useMemo(() => selectedState(), [selectedState]);
}

export function useGameDispatch() {
  const dispatch = useContext(GameDispatchContext);

  if (dispatch === undefined) {
    throw new Error("useGameDispatch must be used within a GameProvider");
  }

  return dispatch;
}
