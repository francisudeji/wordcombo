import { useSyncExternalStore, useDebugValue } from "react";

const initialState = {
  count: 5,
  board: new Map([["HELLO", ["H", "E", "L", "L", "O"]]]),
  currentWord: [],
  wordsOfTheDay: { start: "HELLO", target: "WORLD" },
  message: "",
};

let listeners = [] as (() => void)[];

function subscribe(callback: () => void) {
  console.log("subscribed");
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function emitChange() {
  for (const listener of listeners) {
    console.log("emitting change", listener());
    listener();
  }
}

// function getSnapshot() {
//   return initialState
// }

export function useGameStore(
  // state: typeof initialState,
  selector: (state: typeof initialState) => any
) {
  const store = useSyncExternalStore(subscribe, () => selector(initialState));
  useDebugValue(store);
  return store;
}

function increment() {
  initialState.count += 1;
  emitChange();
}

export function useGameStoreDispatch() {
  return (action: any) => {
    if (action.type === "increment") {
      increment();
    }
  };
}
