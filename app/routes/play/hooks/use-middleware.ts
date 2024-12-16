import { useSyncExternalStore, useCallback, useState } from "react";

// const listeners = [] as (() => void)[];
const emptyListeners = new Map();
const getServerSnapshot = () => {
  return emptyListeners;
};

// function emitChange() {
//   for (const listener of listeners) {
//     listener();
//   }
// }

export function useActions() {
  const [actions, setActions] = useState(() => new Map());

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener(
      "ENTER_KEY_ACTION",
      (e: CustomEvent<Record<"word", string>>) => {
        setActions((prevActions) => {
          const word = e.detail.word;
          const newActions = new Map(prevActions);
          newActions.set("ENTER_KEY_ACTION", word);
          return newActions;
        });
        callback();
      }
    );
    // listeners.push(callback);
    return () => {
      window.removeEventListener("ENTER_KEY_ACTION", callback);
      // listeners.splice(listeners.indexOf(callback), 1);
    };
  }, []);

  const getSnapshot = useCallback(() => {
    return actions;
  }, [actions]);

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return store;
}
